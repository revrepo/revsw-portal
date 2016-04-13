(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('resendRegistrationEmailController', resendRegistrationEmailController);

  /*@ngInject*/
  function resendRegistrationEmailController($scope, $modalInstance, User, Users, AlertService, auth) {
    $scope.data = auth;
    $scope.data.loading = false;

    $scope.close = function() {
      $scope.data.loading = false;
      $modalInstance.dismiss();
    };

    $scope.onResendEmail = function() {
      if (!$scope.data.email) {
        // Show error
        AlertService.danger('Wrong email address');
      } else {
        $scope.data.loading = true;
        Users.resend({
            email: $scope.data.email
          }).$promise
          .then(function(data) {
            console.log(data)
            if (data && data && data.message) {
              AlertService.success(data.message, 6000);
              // Show message
              $modalInstance.close(data.message);
            }
          })
          .catch(function(err) {
            AlertService.danger(err.data.message);
          })
          .finally(function() {
            $scope.data.loading = false;
          });
        //$modalInstance.close();
      }
    };
  }
})();
