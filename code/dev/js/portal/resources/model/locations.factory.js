(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Locations', LocationsResource);

  /*@ngInject*/
  function LocationsResource(Resource, $config) {

    return Resource($config.API_URL + '/locations/:action', {
     action: '@action'
    }, {
      firstmile: {
        method: 'GET',
        params:{action: 'firstmile'},
        isArray: true
      },
      lastmile: {
        method: 'GET',
        action: 'lastmile',
        isArray: true
      },
      billingZones: {
        method: 'GET',
        params:{action: 'billing_zones'},
        isArray: true
      },
      networkIPBlocks: {
        method: 'GET',
        params: { action: 'network_ip_blocks' },
        isArray: false
      }
    });
  }
})();
