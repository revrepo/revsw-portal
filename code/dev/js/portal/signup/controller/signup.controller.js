(function () {
  'use strict';

  angular
    .module('revapm.Portal.Signup')
    .controller('SignupController', SignupController);

  /*@ngInject*/
  function SignupController($scope, Users, $q, User, Companies, BillingPlans, CRUDController, Countries, $state, AlertService, $config, $modal, $injector) {

    //Invoking crud actions
    $injector.invoke(CRUDController,
      this, {$scope: $scope});

    $scope.setResource(BillingPlans);

    $scope.$on('$stateChangeSuccess', function (state) {
    });
    $scope.user = User.getUser();
    $scope.initBillingPlans = function () {
      $scope.list();
      if($scope.user != null) {
        $scope.queryString = $scope.getQueryString($scope.user);
      }

    };

    $scope.countries = Countries.query();

    $scope.getQueryString = function (model) {
    // var company = Companies.get({id: model.companyId});
     // console.log(company);
      Companies.get({id: model.companyId}).$promise.then(function (res) {
        console.log(res);
        var q = '?first_name=' + encodeURIComponent(model.firstname ? model.firstname : '') +
          '&last_name=' + encodeURIComponent(model.lastname ? model.lastname : '') +
          '&email=' + encodeURIComponent(model.email ? model.email : '') +
          '&phone=' + encodeURIComponent(res.phone_number ? res.phone_number : '') +
          '&reference=' + encodeURIComponent(model.user_id ? model.user_id : '') +
          '&organization=' + encodeURIComponent(res.companyName ? res.companyName : '') +
          '&billing_address=' + encodeURIComponent(res.address1 ? res.address1 : '') +
          '&billing_address_2=' + encodeURIComponent(res.address2 ? res.address2 : '') +
          '&billing_city=' +  encodeURIComponent(res.city ? res.city : '') +
          '&billing_zip=' + encodeURIComponent(res.zipcode ? res.zipcode : '') +
          '&billing_country=' + encodeURIComponent(res.country ? res.country : '');
        $scope.query = q;
      })

    };





    $scope.createUser = function (model) {
      if (!model) {
        return;
      }
      if (model.passwordConfirm !== model.password) {
        $scope.alertService.danger('Passwords did not match', 5000);
        return;
      }
      $scope.userData = _.clone(model);
      $scope.alertService.clear();
      delete model.passwordConfirm;
      model.collection_method = ['Automatic'];
      model.billing_schedule = 'monthly';

      Users.signup(model)
        .$promise
        .then(function (data) {
          User.login(model.email, model.password)
            .$promise
            .then(function () {
            $state.go('email_sent');
          });

        })
        .catch(function (err) {
          AlertService.danger(err, 5000);
        });
    };
    $scope._loading = false;
  };
})();
