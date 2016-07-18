(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('PasswordRestoreController', PasswordRestoreController);

  /*@ngInject*/
  function PasswordRestoreController($scope, User, $stateParams, AlertService, $timeout, $state) {
    var $ctrl = this;
    var token = $stateParams.token;

    this.password = '';
    this.passwordRepeat = '';
    this.loading = false;

    this.reset = function(formData) {
      AlertService.clear();
      $ctrl.loading = true;
      User.resetPassword(token, formData.password)
        .then(function(data) {
          AlertService.success(data);
          $timeout(function() {
            $state.go('login');
          }, 3000);
        })
        .catch(AlertService.danger)
        .finally(function() {
          $ctrl.loading = false;
        });
    };
  }
})();
