(function () {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.accountSettings.profile', {
        url: '/profile',
        views: {
          main: {
            controller: 'ProfileEditController',
            templateUrl: 'parts/profile/edit.html'
          }
        }
      })
      .state('index.accountSettings.company', {
        url: '/profile/company',
        views: {
          main: {
            controller: 'CompanyProfileEditController',
            templateUrl: 'parts/profile/edit-company.html'
          }
        }
      })
      .state('index.accountSettings.billing', {
        url: '/profile/billing',
        views: {
          main: {
            controller: 'BillingController',
            templateUrl: 'parts/profile/billing.html'
          }
        }
      })
      .state('index.accountSettings.invoices', {
        url: '/profile/invoices',
        views: {
          main: {
            controller: 'InvoicesController',
            templateUrl: 'parts/profile/invoices.html'
          }
        }
      })
      .state('index.accountSettings.invoice', {
        url: '/profile/invoices/:id',
        views: {
          main: {
            controller: 'InvoicesController',
            templateUrl: 'parts/profile/invoice.html'
          }
        }
      })
      .state('index.accountSettings.activitylog', {
        url: '/activitylog',
        views: {
          main: {
            controller: 'ActivityLogController',
            templateUrl: 'parts/profile/activity-log.html'
          }
        }
      })
      .state('index.accountSettings.2fa', {
        url: '/2fa',
        views: {
          main: {
            controller: 'TwoFactorAuthController',
            templateUrl: 'parts/profile/two-factor-auth.html'
          }
        }
      });
  }
})();
