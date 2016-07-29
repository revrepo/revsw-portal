(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('DomainsConfig', DomainsResource);

  /*@ngInject*/
  function DomainsResource(Resource, $config) {

    return Resource($config.API_URL + '/domain_configs/:id', { id: '@id' }, {
      status: {
        url: $config.API_URL + '/domain_configs/:id/config_status',
        method: 'GET',
        isArray: false
      },
      versions: {
        url: $config.API_URL + '/domain_configs/:id/versions',
        method: 'GET',
        isArray: true
      },
      checkIntegration: {
        url: $config.API_URL + '/domain_configs/:id/check_integration/:check_type',
        method: 'GET',
        check_type: '@check_type',
        isArray: false
      },
      // TODO: re-base to cache.factory.js after fix API (query options)
      purge: {
        url: $config.API_URL + '/purge',
        method: 'GET',
        isArray: false,
        params: {
          domain_id: '@id'
        }
      }
    });
  }
})();
