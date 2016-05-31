(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('PasswordRestoreController', PasswordRestoreController);

  /*@ngInject*/
  function PasswordRestoreController($scope, User, $stateParams, AlertService, $timeout, $state) {

    $scope.alerts = AlertService;
    $scope.token = $stateParams.token;

    $scope.password = '';
    $scope.passwordRepeat = '';
    $scope.loading = false;

    $scope.reset = function() {
      AlertService.clear();
      $scope.loading = true;
      User.resetPassword($scope.token, $scope.password)
        .then(function(data) {
          AlertService.success(data);
          $timeout(function() {
            $state.go('login');
          }, 3000);
        })
        .catch(AlertService.danger)
        .finally(function() {
          $scope.loading = false;
        });
    };
  }
})();
