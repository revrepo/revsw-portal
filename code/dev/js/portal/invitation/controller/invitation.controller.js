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
    User) {

    var currUser;

    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    $scope.setState('Invitation');
    $scope.setResource(Invitation);

    if (User.isAuthed()) {
      $state.go('index.accountSettings.profile');
      return;
    }

    $scope.$on('$stateChangeSuccess', function (state) {
      currUser = $stateParams.user;
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
      Invitation.completeInvitation({ id: currUser }, {
        password: model.pass.$modelValue,
        invitation_token: $stateParams.token
      })
        .$promise
        .then(function (e) {
          if (e.statusCode === 200) {
            $scope.alertService.success(e);
            $state.go('login');
          }
        })
        .catch($scope.alertService.danger);
    };
  }
})();
