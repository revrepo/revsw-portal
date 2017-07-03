(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('DNSZones', DNSZonesResource);

  /*@ngInject*/
  function DNSZonesResource(Resource, $config) {

    return Resource($config.API_URL + '/dns_zones/:id', {
      id: '@id'
    }, {
      checkIntegration: {
        url: $config.API_URL + '/dns_zones/:id/checkintegration/:check_type',
        method: 'GET',
        isArray: false
      }
    });
  }
})();
