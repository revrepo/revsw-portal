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
      })
      .state('index.azureMarketplace.subscription_resources', {
        url: '/subscription_resources?subscriptionId',
        views: {
          main: {
            controller: 'AzureSubscriptionResourcesController',
            templateUrl: 'parts/azure-subscriptions/list-resources.html'
          }
        }
      });
  }
})();

