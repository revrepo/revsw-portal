(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('AzureResources', AzureResourcesResource);

  /*@ngInject*/
  function AzureResourcesResource(Resource, $config) {

    return Resource($config.API_URL + '/azure/subscriptions/:subscription_id/providers/RevAPM.MobileCDN/accounts', {
      subscription_id: '@subscription_id'
    }, {
      query: {
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
