(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Vendors', VendorsResource);

  /*@ngInject*/
  function VendorsResource(Resource, $config) {

    return Resource($config.API_URL + '/vendor_profiles/:vendor', {vendor: '@vendor'}, {
      get: {
        url: $config.API_URL + '/vendor_profiles/:vendor',
        method: 'GET'
      }
    });
  }
})();
