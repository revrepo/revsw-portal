(function() {
  'use strict';
  angular
    .module('revapm.Portal.Signup')
    .controller('SignupBillingPlansController', SignupBillingPlansController)
    .filter('lowcase', function() {
      return function(input) {
        return (!!input) ? input.charAt(0).toLowerCase() + input.substr(1) : '';
      };
    });
  /**
   * @name SignupBillingPlansController
   * @description
   *
   *
   * @param {[type]} $scope        [description]
   * @param {[type]} Users         [description]
   * @param {[type]} AlertService  [description]
   * @param {[type]} $stateParams  [description]
   * @param {[type]} $localStorage [description]
   * @param {[type]} Countries     [description]
   * @param {[type]} $config       [description]
   * @param {[type]} $uibModal     [description]
   * @param {[type]} BillingPlans  [description]
   */
  function SignupBillingPlansController($scope, $rootScope, Users, AlertService, $state, $stateParams, $localStorage, Countries, $config, $uibModal, BillingPlans) {
    'ngInject';
    var billing_plan_handler = $stateParams.billing_plan_handler;
    var $ctrl = this;

    this.isRegistryFinish = false;
    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.CONTACT_DATA = $config.PATTERNS.CONTACT_DATA;
    $scope.currentPB = $localStorage.selectedBP;
    $ctrl.countries = [];
    // NOTE: Countries is used only on form  /vs2017-promo
    $scope.$on('$stateChangeSuccess', function(state) {
      if ($state.is('signup.vs_promo')) {
        Countries.query().$promise.then(function(data) {
          $ctrl.countries = data;
        });
      }
      if (!$scope.currentPB || $scope.currentPB.chargify_handle !== $stateParams.billing_plan_handler) {
        BillingPlans.query({
            vendor: $rootScope.vendorConfig.vendor
          }).$promise
          .then(function(data) {
            $scope.currentPB = _.find(data, function(item) {
              return item.chargify_handle === $stateParams.billing_plan_handler;
            });
            $localStorage.selectedBP = $scope.currentPB;
          });
      }
    });
    // NOTE: delete not need information
    $scope.$destroy = function() {
      delete $localStorage.selectedBP;
    };
    this.model = {
      'billing_plan': billing_plan_handler,
      'country': 'US',
      'vendor': $rootScope.vendorConfig.vendor,
      'promocode': $stateParams.promo
    };
    /**
     * @name  onSignUp
     * @description]
     *
     * Call API for registration new User
     *
     * @param  {Object} model
     * @return
     */
    this.onSignUp = function onSignUp(model) {
      this._loading = true;
      if (!model) {
        return;
      }
      model.passwordConfirm = model.password;
      $scope.userData = _.clone(model);
      AlertService.clear();

      Users.signup(model)
        .$promise
        .then(function(data) {
          $ctrl.user = model;
          $ctrl.isRegistryFinish = true;
        })
        .catch(function(err) {
          AlertService.danger(err);
          $ctrl._loading = false;
        });
    };
    /**
     * @name  onShortSignUp
     * @description]
     *
     * Call API for registration new User
     *
     * @param  {Object} model
     * @return
     */
    this.onSignUpShort = function onSignUpShort(model) {
      $ctrl._loading = true;

      if (!model) {
        return;
      }
      // if (model.passwordConfirm !== model.password) {
      //   AlertService.danger('Passwords did not match', 5000);
      //   return;
      // }
      $scope.userData = _.clone(model);
      AlertService.clear();

      Users.signupShort(model)
        .$promise
        .then(function(data) {
          $ctrl.user = model;
          $ctrl.isRegistryFinish = true;
        })
        .catch(function(err) {
          AlertService.danger(err);
          $ctrl._loading = false;
        })
        .finally(function() {
          // $ctrl._loading = false;
        });
    };
    /**
     * @name  onRepeatSendRegistrationEmail
     * @description
     *
     * @param  {String} email
     * @param  {String} password
     * @return
     */
    this.onRepeatSendRegistrationEmail = function(email, password) {

      var modalInstance = $uibModal.open({
        templateUrl: 'parts/auth/resend-subscription-info.html',
        controller: 'resendRegistrationEmailController',
        size: 'md',
        resolve: {
          auth: function() {
            return {
              email: email,
              password: password
            };
          }
        }
      });

      modalInstance.result.then(function(data) {
        //AlertService.success(data.message, 6000);
      });
    };

    this._loading = false;
  }
})();
