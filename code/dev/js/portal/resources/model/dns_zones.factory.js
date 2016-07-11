(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('DNSZones', DNSZonesResource);

  /*@ngInject*/
  function DNSZonesResource(Resource, $config) {

    return Resource($config.API_URL + '/dns_zones/:id', {
      id: '@id'
    });
  }
})();
