(function() {
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
    $config,
    AlertService,
    $injector) {

    //Invoking crud actions
    $injector.invoke(CRUDController,
      this, {
        $scope: $scope
      });

    $scope.$on('$stateChangeSuccess', function(state) {
      if ($state.is('signup')) {
        $scope.model = _.clone(User.getUser());
        $scope.model.country = 'US';
      }
    });

    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;

    /**
     * @name chooseBillingPlan
     * @description
     *
     * Choose Billin Plan for registration
     *
     * @param  {Object} bp Billing Plan
     * @return
     */
    $scope.chooseBillingPlan = function(bp) {
      $state.go('signup.contact_info2', {
        billing_plan_handler: bp.chargify_handle
      });
    };

    $scope.initBillingPlans = function() {
      $scope.newUser = {};
      $scope.setResource(BillingPlans);
      $scope.list();
    };

    $scope.initLoginRedirect = function() {
      setTimeout(function() {
        $state.go('login');
      }, 10000);
    };

    $scope.countries = Countries.query();

    $scope.zipRegex = '[0-9]{1,10}';
    $scope.phoneRegex = '[0-9, \\s, \\+, \\-, \\(, \\)]{1,20}';

    $scope.createUser = function(model) {
      if (!model) {
        return;
      }
      if (model.passwordConfirm !== model.password) {
        $scope.alertService.danger('Passwords did not match', 5000);
        return;
      }
      $scope.userData = _.clone(model);
      $scope.alertService.clear();

      Users.signup(model)
        .$promise
        .then(function(data) {
          $localStorage.user.email = model.email;
          $state.go('email_sent');
        })
        .catch(function(err) {
          model.passwordConfirm = model.password;
          // NOTE: detect type problem
          console.log(err);
          // - 1. Not fount billing plan info
          // - 2. User with email alraedy exists
          // - 3. Server error (email, send)

          AlertService.danger(err);
        });
    };
    $scope._loading = false;
  }
})();
