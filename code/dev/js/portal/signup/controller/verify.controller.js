(function () {
  'use strict';

  angular
    .module('revapm.Portal.Signup')
    .controller('VerifyController', VerifyController);

  /*@ngInject*/
  function VerifyController($scope,
                            Users,
                            User,
                            $stateParams,
                            $state,
                            AlertService,
                            $localStorage,
                            $window) {
    $scope.user = User.getUser();

      $scope.resendToken = function (model) {
      Users.resend({email: model.email})
        .$promise
        .then(function () {
          AlertService.success('Verification link is sent to ' + model.email, 5000);
        })
        .catch(AlertService.danger);
    }

    $scope.getQueryString = function (model) {
      var q = '?first_name=' + encodeURIComponent(model.firstname ? model.firstname : '') +
        '&last_name=' + encodeURIComponent(model.lastname ? model.lastname : '') +
        '&email=' + encodeURIComponent(model.email ? model.email : '') +
        '&phone=' + encodeURIComponent(model.phone_number ? model.phone_number : '') +
        '&reference=' + encodeURIComponent(model.user_id ? model.user_id : '') +
        '&organization=' + encodeURIComponent(model.companyName ? model.companyName : '') +
        '&billing_address=' + encodeURIComponent(model.address1 ? model.address1 : '') +
        '&billing_address_2=' + encodeURIComponent(model.address2 ? model.address2 : '') +
        '&billing_city=' + encodeURIComponent(model.city ? model.city : '') +
        '&billing_state=' + encodeURIComponent((model.state && model.country === 'US') ?
          model.state : '') +
        '&billing_zip=' + encodeURIComponent(model.zipcode ? model.zipcode : '') +
        '&billing_country=' + encodeURIComponent(model.country ? model.country : '');
      return q;
    };

    if($stateParams.token){
      Users.verify({token: $stateParams.token})
        .$promise
        .then(function (res) {
          $localStorage.user = {email: res.email};
          var q = $scope.getQueryString(res);
          $window.location.href = res.hosted_page + q;
        })
        .catch(function () {
          $state.go('resend_token');
        })
    }
  };
})();
