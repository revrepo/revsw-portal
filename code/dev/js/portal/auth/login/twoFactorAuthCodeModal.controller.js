(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('TwoFactorAuthCodeModalController', TwoFactorAuthCodeModalController);

  /*@ngInject*/
  function TwoFactorAuthCodeModalController($scope, $uibModalInstance, auth, User, AlertService, $config) {

    var code = '';

    $scope.data = {
      code: '',
      loading: false
    };

    $scope.close = function () {
      $scope.data.loading = false;
      $uibModalInstance.dismiss();
    };

    $scope.login = function (form) {
      if (form.$invalid) {
        return;
      }
      AlertService.clear();
      $scope.data.loading = true;
      try {
        User.login(auth.email, auth.password, this.code.replace(/\D/g, ''))
          .then(function (data) {
            $uibModalInstance.close(data);
          })
          .catch(function (err) {
            $scope.data.code = '';
            if (err.status === $config.STATUS.UNAUTHORIZED) {
              AlertService.danger('Wrong one Time Password', 5000);
            }
            if (err.data.message) {
              AlertService.danger(err.data.message, 5000);
            }
          })
          .finally(function () {
            $scope.data.loading = false;
          });
      } catch (e) {
        AlertService.danger(e.message);
        $scope.data.loading = false;
      }
    };

    // Replace digits with wildcard
    $scope.wildcard = function (e) {      
      if (e.keyCode == 8 || e.keyCode == 46) {
        this.code = this.code.slice(0, -1);
      } else {
        if (e.target.value.includes(e.key)) {
          this.code += e.key;
          setTimeout(function () {
            e.target.value = e.target.value.replace(e.key, '*');
          }, $config.OTP_WILDCARD_DELAY);
        }
      }
    }
  }
})();
