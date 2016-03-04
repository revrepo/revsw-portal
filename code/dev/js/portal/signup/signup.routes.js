(function () {
  'use strict';

  angular
    .module('revapm.Portal.Signup')
    .config(routesConfig);

  /!*@ngInject*!/
  function routesConfig($stateProvider) {

    $stateProvider
      .state('signup', {
        url: '/signup/contact_info',
        views: {
          layout: {
            controller: 'SignupController',
            templateUrl: 'parts/signup/signup.html'
          },
        params: {'billing_plan': null}
        }
      })
      .state('billing_plans', {
        url: '/signup/billing_plans',
        views: {
          layout: {
            controller: 'SignupController',
            templateUrl: 'parts/signup/billing_plans.html'
          }
        }
      })
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

