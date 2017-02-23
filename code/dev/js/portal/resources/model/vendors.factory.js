(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Vendors', VendorsResource);

  /*@ngInject*/
  function VendorsResource(Resource, $config) {

    return Resource($config.API_URL + '/vendor_profiles/:vendorUrl', {
      vendorUrl: '@vendorUrl',
      vendor: '@vendor',
      account_id: '@account_id'
    }, {
      get: {
        url: $config.API_URL + '/vendor_profiles/:vendorUrl',
        method: 'GET'
      },

      getByName: {
        url: $config.API_URL + '/vendor_profiles/name/:vendor',
        method: 'GET'
      },

      updateAccountVendor: {
        url: API_URL + '/vendor_profiles/:account_id',
        method: 'PUT',
        isArray: false,
        transformRequest: function transformRequestUpdateState(data) {
          return angular.toJson({
            vendor_profile: data.vendor
          });
        }
      }
    });
  }
})();
