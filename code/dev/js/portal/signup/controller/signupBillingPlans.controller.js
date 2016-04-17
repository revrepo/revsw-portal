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
  function SignupBillingPlansController($scope, Users, AlertService, $stateParams, $localStorage, Countries) {
    'ngInject';
    var $ctrl = this;
    var billing_plan_handler = $stateParams.billing_plan_handler;
    this.countries = Countries.query();
    this.model = {
      'billing_plan': billing_plan_handler,
      'country': 'US',
      // TODO: delete data after finish tests
      //   'email': 'nikolay.gerzhan@gmail.com',
      //   'last_name': 'Gerzhan',
      //   'address1': 'Мужества 22-18',
      //   'city': 'Красноярск',
      //   'zipcode': '660043',
      //   'password': '12345678',
      //   'passwordConfirm': '12345678',
      //   'first_name': 'Nikolay',
      //   'phone_number': '89832877503',
      //   'company_name': 'Demo',
      //   'state': 'Krasnoyrskiy kray',
      //   'city': 'Krasnoyrsk'
    };
    this.isRegistryFinish = false;
    this.onSignUp = function onSignUp(model) {
      this._loading = true;
      if (!model) {
        return;
      }
      if (model.passwordConfirm !== model.password) {
        AlertService.danger('Passwords did not match', 5000);
        return;
      }
      $scope.userData = _.clone(model);
      AlertService.clear();
//      delete model.passwordConfirm;
//      model.collection_method = ['Automatic'];
//      model.billing_schedule = 'monthly';

      Users.signup(model)
        .$promise
        .then(function(data) {
          $ctrl.user = model;
          $ctrl.isRegistryFinish = true;
        })
        .catch(function(err) {
          // model.passwordConfirm = model.password; // TODO: delete after finish testing registration
          AlertService.danger(err, 5000);
        });
    };
    this._loading = false;
  }
})();
