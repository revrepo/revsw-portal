(function () {
  'use strict';

  angular
    .module('revapm.Portal.Signup')
    .controller('SignupController', SignupController);

  /*@ngInject*/
  function SignupController($scope,
                            Users,
                            $localStorage,
                            User,
                            Companies,
                            BillingPlans,
                            CRUDController,
                            Countries,
                            $state,
                            AlertService,
                            $injector) {

    //Invoking crud actions
    $injector.invoke(CRUDController,
      this, {$scope: $scope});

    $scope.$on('$stateChangeSuccess', function (state) {
      if ($state.is('signup')){
        $scope.model = User.getUser();
        if(!$scope.model.billing_plan){
          $state.go('billing_plans');
        }
      }


    });


    //$scope.user = User.getUser();


    $scope.chooseBillingPlan = function (id, name) {
      $localStorage.user = {billing_plan: id};
      $state.transitionTo('signup');
    };



    $scope.initBillingPlans = function () {
      $scope.newUser = {};
      $scope.setResource(BillingPlans);
      $scope.list();
    };

    $scope.countries = Countries.query();

    $scope.getQueryString = function (model) {
        var q = '?first_name=' + encodeURIComponent(model.firstname ? model.firstname : '') +
          '&last_name=' + encodeURIComponent(model.lastname ? model.lastname : '') +
          '&email=' + encodeURIComponent(model.email ? model.email : '') +
          '&phone=' + encodeURIComponent(model.phone_number ? model.phone_number : '') +
          '&reference=' + encodeURIComponent(model.user_id ? model.user_id : '') +
          '&organization=' + encodeURIComponent(model.companyName ? model.companyName : '') +
          '&billing_address=' + encodeURIComponent(model.address1 ? model.address1 : '') +
          '&billing_address_2=' + encodeURIComponent(model.address2 ? model.address2 : '') +
          '&billing_city=' +  encodeURIComponent(model.city ? model.city : '') +
          '&billing_zip=' + encodeURIComponent(model.zipcode ? model.zipcode : '') +
          '&billing_country=' + encodeURIComponent(model.country ? model.country : '');
        $scope.query = q;
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
          $localStorage.user.email = model.email;
          $state.go('email_sent');
        })
        .catch(function (err) {
          AlertService.danger(err, 5000);
        });
    };
    $scope._loading = false;
  };
})();
