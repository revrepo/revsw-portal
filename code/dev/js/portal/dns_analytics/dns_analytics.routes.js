(function() {
  'use strict';

  angular
    .module('revapm.Portal.DNSAnalytics')
    .config(ReportsRoutes);

  /*@ngInject*/
  function ReportsRoutes($stateProvider) {
    $stateProvider
      // DNS Analytics
      .state('index.dnsServices.dns_analytics', {
        url: '/dns/analytics',
        views: {
          main: {
            controller: 'DNSAnalyticsController',
            controllerAs: 'vm',
            templateUrl: 'parts/dns_analytics/dns_analytics.tpl.html'
          }
        }
      });
  }
})();
