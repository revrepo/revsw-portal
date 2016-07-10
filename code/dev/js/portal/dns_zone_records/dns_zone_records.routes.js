(function() {
  'use strict';

  angular
    .module('revapm.Portal.DNSZoneRecords')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.dnsServices.dns_zone_records', {
        url: '/dns/zones/:dns_zone_id/records',
        views: {
          main: {
            controller: 'DNSZoneRecordsCrudController',
            templateUrl: 'parts/dns_zone_records/list.html'
          }
        }
      })
      .state('index.dnsServices.dns_zone_records.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/dns_zone_records/new.html'
          }
        }
      })
      .state('index.dnsServices.dns_zone_records.edit', {
        url: '/:id',
        views: {
          page: {
            templateUrl: 'parts/dns_zone_records/edit.html',
            controller: 'DNSZoneRecordsCrudController',
          }
        }
      });
  }
})();
