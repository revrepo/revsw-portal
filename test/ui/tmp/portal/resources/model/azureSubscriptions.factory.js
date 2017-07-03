(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('AzureSubscriptions', AzureSubscriptionsResource);

  /*@ngInject*/
  function AzureSubscriptionsResource(Resource, $config) {
    var API_URL = $config.API_URL;
    API_URL = API_URL.replace('/v1', '');
    return Resource(API_URL + '/subscriptions/:id', {
      id: '@subscription_id'
    }, {
      updateState: {
        url: API_URL + '/subscriptions/:id',
        method: 'PUT',
        isArray: false,
        transformRequest: function transformRequestUpdateState(data) {
          return angular.toJson({
            state: data.subscription_state
          });
        }
      },
      resources: {
        url: API_URL+  '/subscriptions/:subscription_id/providers/RevAPM.MobileCDN/accounts',
        isArray: true,
        transformResponse: function transformResponseResource(data, head, status) {
          var res = angular.fromJson(data);
          var result = res;
          if (status === 200) {
            result = res.value;
          }
          return result;
        }
      }
    });
  }
})();
