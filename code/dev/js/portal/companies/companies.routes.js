(function () {
  'use strict';

  angular
    .module('revapm.Portal.Companies')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.accountSettings.companies', {
        url: '/accounts',
        views: {
          main: {
            controller: 'CompaniesCrudController',
            templateUrl: 'parts/companies/list.html'
          }
        }
      })
     .state('index.accountSettings.accountresources', {
        url: '/accountresources',
        views: {
          main: {
            controller: 'AccountResourcesController',
            templateUrl: 'parts/companies/account-resources.html'
          }
        }
      })
      .state('index.accountSettings.companies.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/companies/new.html'
          }
        }
      })
      .state('index.accountSettings.companies.edit', {
        url: '/edit/:id',
        views: {
          page: {
            templateUrl: 'parts/profile/edit-company.html',
            controller: 'CompanyProfileEditController'
          }
        }
      });
  }
})();
