(function() {
  'use strict';

  angular
    .module('revapm.Portal.AzureSubscriptions')
    .config(routesConfig);


  function routesConfig($stateProvider) {
    'ngInject';
    $stateProvider
      .state('index.azureMarketplace.subscriptions', {
        url: '/subscriptions',
        views: {
          main: {
            controller: 'AzureSubscriptionsListController',
            templateUrl: 'parts/azure-subscriptions/list.html'
          }
        }
      });
  }
})();
