(function () {
  'use strict';

  angular
    .module('revapm.Portal.SSLNames')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.webApp.ssl_names', {
        url: '/ssl_names',
        views: {
          main: {
            controller: 'SSLNamesCrudController',
            templateUrl: 'parts/ssl_names/list.html'
          }
        }
      })
      .state('index.webApp.ssl_names.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/ssl_names/new.html'
          }
        }
      });
  }
})();
