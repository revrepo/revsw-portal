(function() {
  'use strict';

  angular
    .module('revapm.Portal.Signup')
    .controller('SignupController', SignupController);

  /*@ngInject*/
  function SignupController($scope, $rootScope,
    Users,
    $localStorage,
    User,
    Companies,
    BillingPlans,
    CRUDController,
    Countries,
    $state,
    $config,
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
      $scope.list({vendor: $rootScope.vendorConfig.vendor});
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
          $scope.alertService.danger(err);
        });
    };
    $scope._loading = false;

    $scope.getColumnsClasses = function(index,cnt){
      var classes = 'col-xs-12 col-sm-6 col-md-2';
      if(cnt === 1){
        classes = 'col-xs-12 col-sm-6 col-md-4 col-lg-3';
        if (index===0){
          classes += ' col-xs-offset-0  col-sm-offset-3 col-md-offset-4  col-lg-offset-4';
        }
      }
      if(cnt === 2){
        classes = 'col-xs-12 col-sm-4 col-md-4';
        if (index===0){
          classes += ' col-xs-offset-0 col-sm-offset-0 col-md-offset-2  col-lg-offset-2';
        }
      }
      if(cnt === 3){
        classes = 'col-xs-12 col-sm-6 col-md-4';
      }
      if(cnt === 4){
        classes = 'col-xs-12 col-sm-6 col-md-3';
      }
      if(cnt === 5){
        classes = 'col-xs-12 col-sm-6 col-md-2';
        if (index===0){
          classes += ' col-md-offset-1';
        }
      }
      return  classes;
    };
  }
})();
