(function () {
  'use strict';

  angular
    .module('revapm.Portal.Signup')
    .controller('VerifyController', VerifyController);

  /*@ngInject*/
  function VerifyController($scope, Users, User, $stateParams, $state, AlertService) {
    $scope.user = User.getUser();
    $scope.resendToken = function (email) {
      Users.resend({email: email})
        .$promise
        .then(function () {
          AlertService.success('Verification link is sent to ' + email, 5000);
        })
        .catch(AlertService.danger);
    }
    if($stateParams.token){
      Users.verify({token: $stateParams.token})
        .$promise
        .then(function () {
            $state.go('billing_plans');
        })
        .catch(function () {
            $state.go('resend_token');
        })
    }
  };
})();
