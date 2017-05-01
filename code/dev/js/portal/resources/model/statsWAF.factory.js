(function () {
  'use strict';
  /**
   * Angular Resource factory for access to Stats WAF information
   */
  angular
    .module('revapm.Portal.Resources')
    .factory('StatsWAF', StatsWAFResource);

  /*@ngInject*/
  function StatsWAFResource(Resource, $config) {
    return Resource($config.API_URL + '/stats/waf/:domainId', {
      // domainId: ''
    }, {
      traffic: {
        method: 'GET'
      },
      // Actions
      country: {
        method: 'GET',
        url: $config.API_URL + '/stats/waf/top/:domainId',
        params: {
          report_type: 'country',
          count: 10
        }
      },
      topObjects: {
        method: 'GET',
        url: $config.API_URL + '/stats/waf/top_objects/:domainId',
        params: {}
      }
    });
  }
})();
