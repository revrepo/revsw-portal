(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .config(ReportsRoutes);

  /*@ngInject*/
  function ReportsRoutes($stateProvider) {
    $stateProvider
      .state('index.mobile.traffic', {
        url: '/mobile/traffic',
        views: {
          main: {
            controller: 'MobileTrafficController',
            templateUrl: 'parts/reports/mobile-traffic.html'
          }
        }
      })
      .state('index.mobile.tops', {
        url: '/mobile/tops',
        views: {
          main: {
            controller: 'MobileTopsController',
            templateUrl: 'parts/reports/mobile-tops.html'
          }
        }
      })
      .state('index.mobile.distributions', {
        url: '/mobile/distributions',
        views: {
          main: {
            controller: 'MobileDistributionsController',
            templateUrl: 'parts/reports/mobile-distributions.html'
          }
        }
      });
  }
})();
