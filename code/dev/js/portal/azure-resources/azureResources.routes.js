(function() {
  'use strict';

  angular
    .module('revapm.Portal.AzureResources')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.azureMarketplace.resources', {
        url: '/resources',
        views: {
          main: {
            controller: 'AzureResourcesCrudController',
            templateUrl: 'parts/azure-resources/list.html'
          }
        }
      });
  }
})();
