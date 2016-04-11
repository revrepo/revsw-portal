(function() {
  'use strict';

  angular
    .module('revapm.Portal.Signup')
    .config(routesConfig);

  function SignupBillingPlansController($scope, Users, AlertService, $stateParams, $localStorage, Countries) {
    'ngInject';
    var $ctrl = this;
    var billing_plan_handler = $stateParams.billing_plan_handler;
    this.countries = Countries.query();
    this.model = {
      'billing_plan': billing_plan_handler,
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
      //   'country': 'RU',
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
      delete model.passwordConfirm;
      model.collection_method = ['Automatic'];
      model.billing_schedule = 'monthly';

      Users.signup(model)
        .$promise
        .then(function(data) {
          $ctrl.user = model;
          //$localStorage.user  = model.email;
          $ctrl.isRegistryFinish = true;
        })
        .catch(function(err) {
          // model.passwordConfirm = model.password;
          AlertService.danger(err, 5000);
        });
    };
    this._loading = false;
  }
  /* @ngInject */
  function routesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/signup', '/signup/plans');
    $stateProvider
      .state('signup', {
        url: '/signup',
        views: {
          layout: {
            // controller: 'SignupController',
            templateUrl: 'parts/signup/signup.html'
          }
        }
      })
    $stateProvider
      .state('signup.billing_plans', {
        url: '/plans',
        views: {
          form: {
            controller: 'SignupController',
            templateUrl: 'parts/signup/form-billing-plans.tpl.html'
          }
        }
      })
      // step N1 - choose billing plan
      .state('signup.contact_info', {
        url: '/to/:billing_plan_handler',
        views: {
          form: {
            controller: SignupBillingPlansController,
            controllerAs: '$ctrl',
            templateUrl: 'parts/signup/form-contact-info.tpl.html'
          }
        }
      })
      // step 2 - enter contact information
      // NOTE:
      // .state('contact_info', {
      //   url: '/signup/:billing_plan',
      //   views: {
      //     layout: {
      //       controller: 'SignupController',
      //       templateUrl: 'parts/signup/signup.html'
      //     },
      //     params: {
      //       'billing_plan': null
      //     }
      //   }
      // })

    // .state('signup', {
    //     url: '/signup/contact_info',
    //     views: {
    //       layout: {
    //         controller: 'SignupController',
    //         templateUrl: 'parts/signup/signup.html'
    //       },
    //       params: {
    //         'billing_plan': null
    //       }
    //     }
    //   })
    // .state('billing_plans', {
    //   url: '/signup/billing_plans',
    //   views: {
    //     layout: {
    //       controller: 'SignupController',
    //       templateUrl: 'parts/signup/billing_plans.html'
    //     }
    //   }
    // })
    .state('success', {
        url: '/signup/success',
        views: {
          layout: {
            controller: 'SignupController',
            templateUrl: 'parts/signup/end.html'
          }
        }
      })
      .state('email_sent', {
        url: '/signup/email',
        views: {
          layout: {
            controller: 'VerifyController',
            templateUrl: 'parts/signup/email_sent.html'
          }
        }
      })
      .state('verify', {
        url: '/profile/verify/:token',
        views: {
          layout: {
            controller: 'VerifyController',
            templateUrl: 'parts/signup/verify.html'
          }
        }
      })
      .state('resend_token', {
        url: '/profile/verify/resend_token',
        views: {
          layout: {
            controller: 'VerifyController',
            templateUrl: 'parts/signup/resend.html'
          }
        }
      });
  }
})();
