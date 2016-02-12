(function () {
  'use strict';

  angular
    .module('revapm.Portal.Signup')
    .controller('SignupController', SignupController);

  /*@ngInject*/
  function SignupController($scope, Users, User, Companies, BillingPlans, CRUDController, Countries, $state, AlertService, $config, $modal, $injector) {

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
     var company = Companies.get({id: model.companyId}, function () {
          });
      var q = '?first_name=' + encodeURIComponent(model.firstname) +
        '&last_name=' + encodeURIComponent(model.lastname) +
        '&email=' + encodeURIComponent(model.email) +
        '&phone=' + encodeURIComponent(company.phone_number) +
        '&reference=' + encodeURIComponent(model.user_id) +
        '&organization=' + encodeURIComponent(model.company_name) +
        '&billing_address=' + encodeURIComponent(company.address1) +
        '&billing_address2=' + encodeURIComponent(company.address2) +
        '&billing_city=' +  encodeURIComponent(company.city) +
        '&billing_zip=' + encodeURIComponent(company.zipcode) +
        '&billing_country=' + encodeURIComponent(company.country);
      return q;
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
          User.login(model.email, model.password).then(function () {
            $state.go('email_sent');
          });

        })
        .catch($scope.alertService.danger);
    };
    $scope._loading = false;
  };
})();
