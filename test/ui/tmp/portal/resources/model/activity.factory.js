(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Activity', ActivityResource);

  /*@ngInject*/
  function ActivityResource(Resource, $config) {

    return Resource($config.API_URL + '/activity/:action', { action: '' }, {
      query:{
        isArray: false,
      },
      page: {
        method: 'GET',
        isArray: true,
        transformResponse: function(data, headersGetter) {
          // NOTE: transform response data to array (for use default methods from CRUDController)
          try {
            data = angular.fromJson(data).data;
          } catch (e) {
            data = null;
          }
          return data;
        }
      },
      summary: { method: 'GET', isArray: false }
    });

  }
})();
