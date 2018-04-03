(function () {
  'use strict';

  angular
    .module('revapm.Portal.Invitation')
    .controller('InvitationCrudController', InvitationCrudController);

  /*@ngInject*/
  function InvitationCrudController($scope, $rootScope,
    $localStorage,
    CRUDController,
    $state,
    $config,
    $injector,
    $stateParams,
    Invitation,
    User,
    Util,
    Users) {

    var currUser;

    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });


    $scope._loading = true;


    $scope.setState('Invitation');
    $scope.setResource(Invitation);

    Invitation.getTokenStatus({ id: $stateParams.token }).$promise.then(function (data) {
      if (data.statusCode !== 200) {
        $scope
        .alertService
        .danger('The user account is already password-protected. ' +
                'Please log in to the system using configured password or use “Forgot Password” function to reset it.');
        $state.go('login');
      } else {
        $scope._loading = false;
      }
    });

    if (User.isAuthed()) {
      User.logout();
      return;
    }

    $scope.$on('$stateChangeSuccess', function (state) {
      currUser = $stateParams.user;
      $scope.randomImageStyle = { 'background-image': 'url(' + Util.getRandomImageURL() + ')' };
      $localStorage.lastUrl = null;      
    });

    $scope.disableSubmit = function (model) {
      if (!$scope.pass || !$scope.passAgain) {
        return true;
      } else {
        return $scope.pass.length < 8 ||
          $scope.passAgain.length < 8 ||
          $scope.pass !== $scope.passAgain;
      }
    };

    $scope.createPassword = function (model) {
      return false;
      if (!model) {
        return;
      }
      // call the invitation finish API endpoint with our token and new password
      Invitation.completeInvitation({ id: currUser }, {
        password: model.pass.$modelValue,
        invitation_token: $stateParams.token
      })
        .$promise
        .then(function (e) {
          // if invitation process finished successfully, redirect to login page
          if (e.statusCode === 200) {
            $scope.alertService.success(e);
            $state.go('login');
          }
        })
        .catch($scope.alertService.danger);
    };
  }
})();
