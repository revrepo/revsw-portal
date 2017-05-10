(function() {
  'use strict';
  angular
    .module('revapm.Portal.Signup')
    .controller('SignupBillingPlansController', SignupBillingPlansController);

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
   */
  function SignupBillingPlansController($scope, $rootScope, Users, AlertService, $state, $stateParams, $localStorage, Countries, $config, $uibModal) {
    'ngInject';
    var billing_plan_handler = $stateParams.billing_plan_handler;
    var $ctrl = this;

    this.isRegistryFinish = false;
    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.CONTACT_DATA = $config.PATTERNS.CONTACT_DATA;
    $ctrl.countries = [];
    // NOTE: Countries is used only on form  /vs2017-promo
    $scope.$on('$stateChangeSuccess', function (state) {
      if ($state.is('signup.vs_promo')) {
        Countries.query().$promise.then(function (data) {
          $ctrl.countries = data;
        });
      }
    });

    this.model = {
      'billing_plan': billing_plan_handler,
      'country': 'US',
      'vendor': $rootScope.vendorConfig.vendor
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
        .finally(function () {
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
