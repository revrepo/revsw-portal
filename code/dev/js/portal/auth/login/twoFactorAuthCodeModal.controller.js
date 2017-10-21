(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('TwoFactorAuthCodeModalController', TwoFactorAuthCodeModalController);

  /*@ngInject*/
  function TwoFactorAuthCodeModalController($scope, $uibModalInstance, auth, User, AlertService, $config) {

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
        User.login(auth.email, auth.password, $scope.code.replace(/\D/g, ''))
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

    // Var for holding the OTP
    $scope.code = '';
    // Replace digits with wildcard
    $scope.wildcard = function (e) {
      if (($scope.code.length - e.target.value.length) > 1) {
        $scope.code = '';
        e.target.value = '';
      }
      if (e.target.value === '') {
        $scope.code = '';
      } else {
        if (e.keyCode === 8 || e.keyCode === 46) { // Check if key is backspace or delete
          $scope.code = $scope.code.slice(0, -1);
        } else if (e.target.value.includes(e.key)) {
          $scope.code += e.key;
          setTimeout(function () {
            e.target.value = e.target.value.replace(e.key, '*');
          }, $config.OTP_WILDCARD_DELAY);
        } else {
          $scope.code = e.target.value;
        }
      }
    };
  }
})();
