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
    Util) {

    var currUser;

    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    $scope.setState('Invitation');
    $scope.setResource(Invitation);

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
      return model.pass.$invalid ||
        model.passAgain.$invalid ||
        model.pass.$modelValue.length < 8 ||
        model.passAgain.$modelValue.length < 8 ||
        model.pass.$modelValue !== model.passAgain.$modelValue;
    };

    $scope.createPassword = function (model) {
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
