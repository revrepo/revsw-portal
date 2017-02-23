(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Vendors', VendorsResource);

  /*@ngInject*/
  function VendorsResource(Resource, $config) {

    return Resource($config.API_URL + '/vendor_profiles/:vendorUrl', {vendorUrl: '@vendorUrl', vendor: '@vendor'}, {
      get: {
        url: $config.API_URL + '/vendor_profiles/:vendorUrl',
        method: 'GET'
      },

      getByName: {
        url: $config.API_URL + '/vendor_profiles/name/:vendor',
        method: 'GET'
      }
    });
  }
})();
