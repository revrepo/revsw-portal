(function () {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.webApp.domains', {
        url: '/domains',
        views: {
          main: {
            controller: 'DomainsCrudController',
            templateUrl: 'parts/domains/list.html'
          }
        }
      })
      .state('index.webApp.domains.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/domains/new.html'
            //controller: 'DomainsNewController'
          }
        }
      })
      .state('index.webApp.domains.edit', {
        url: '/edit/:id?isAdvanced',
        views: {
          page: {
            templateUrl: 'parts/domains/edit.html',
            controller: 'DomainsCrudController'
          }
        }
      })
      .state('index.webApp.domains.versions', {
        url: '/versions/:id',
        views: {
          page: {
            controller: 'DomainVersionsController',
            templateUrl: 'parts/domains/versions.html'
          }
        }
      });
  }
})();
