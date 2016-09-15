(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('AzureSubscriptions', AzureSubscriptionsResource);

  /*@ngInject*/
  function AzureSubscriptionsResource(Resource, $config) {

    return Resource($config.API_URL + '/azure/subscriptions/:id', {
      id: '@subscription_id'
    }, {
      updateState: {
        url: $config.API_URL + '/azure/subscriptions/:id',
        method: 'PUT',
        isArray: false,
        transformRequest: function transformRequestUpdateState(data) {
          return angular.toJson({
            state: data.subscription_state
          });
        }
      }
    });
  }
})();
