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
            templateUrl: 'parts/domains/_list.html'
          }
        }
      })
      .state('index.webApp.domains.advanced', {
        url: '/configure/:id',
        views: {
          page: {
            controller: 'DomainsConfigureAdvancedController',
            templateUrl: 'parts/domains/_configure_advanced.html'
          }
        }
      })
      .state('index.webApp.domains.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/domains/_new.html'
            //controller: 'DomainsNewController'
          }
        }
      })
      .state('index.webApp.domains.edit', {
        url: '/edit/:id',
        views: {
          page: {
            templateUrl: 'parts/domains/_edit.html',
            controller: 'DomainsCrudController'
          }
        }
      });
  }
})();
