(function() {
  'use strict';

  angular
    .module('revapm.Portal.DNSZones')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.dnsServices.dns_zones', {
        url: '/dns/zones',
        views: {
          main: {
            controller: 'DNSZonesCrudController',
            templateUrl: 'parts/dns_zones/list.html'
          }
        }
      })
      .state('index.dnsServices.dns_zones.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/dns_zones/new.html'
          }
        }
      })
      .state('index.dnsServices.dns_zones.edit', {
        url: '/edit/:id',
        views: {
          page: {
            templateUrl: 'parts/dns_zones/edit.html',
            controller: 'DNSZonesCrudController'
          }
        }
      });
  }
})();
