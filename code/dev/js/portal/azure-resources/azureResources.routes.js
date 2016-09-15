(function() {
  'use strict';

  angular
    .module('revapm.Portal.AzureResources')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.azureMarketplace.resources', {
        url: '/resources?subscriptionId',
        views: {
          main: {
            controller: 'AzureResourcesController',
            templateUrl: 'parts/azure-resources/list.html'
          }
        }
      });
  }
})();
