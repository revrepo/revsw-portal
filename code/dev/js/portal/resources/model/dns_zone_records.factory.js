(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('DNSZoneRecords', DNSZoneRecordsResource);

  /*@ngInject*/
  function DNSZoneRecordsResource(Resource, $config) {
    function clearSendData (data) {
     delete data.dns_zone_id;
     return angular.toJson(data);
    }
    return Resource($config.API_URL + '/dns_zones/:dns_zone_id/records/:id', {
      id: '@id',
      dns_zone_id: '@dns_zone_id'
    },{
      create:{
        method: 'POST',
        transformRequest: clearSendData
      },
      delete:{
        method: 'DELETE',
        transformRequest: clearSendData
      },
      autoDiscover: {
        url: $config.API_URL + '/dns_zones/auto_discover/:zone_name',
        method: 'GET'
      }
    });
  }
})();
