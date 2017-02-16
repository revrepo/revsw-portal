(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Vendors', VendorsResource);

  /*@ngInject*/
  function VendorsResource(Resource, $config) {

    return Resource($config.API_URL + '/vendor_profiles/:vendorUrl', {vendorUrl: '@vendorUrl'}, {
      get: {
        url: $config.API_URL + '/vendor_profiles/:vendorUrl',
        method: 'GET'
      }
    });
  }
})();
