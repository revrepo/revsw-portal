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
      // .state('index.reports.topreports', {
      //   url: '/reports/topreports',
      //   views: {
      //     main: {
      //       controller: 'TopReportsTrafficController',
      //       templateUrl: 'parts/reports/top-reports.html'
      //     }
      //   }
      // })
      // .state('index.reports.top', {
      //   url: '/reports/top',
      //   views: {
      //     main: {
      //       controller: 'TopObjectsController',
      //       templateUrl: 'parts/reports/top.html'
      //     }
      //   }
      // })
      // .state('index.reports.fbt', {
      //   url: '/reports/fbt',
      //   views: {
      //     main: {
      //       controller: 'FBTReportsController',
      //       templateUrl: 'parts/reports/fbt.html'
      //     }
      //   }
      // })
      // .state('index.reports.mob', {
      //   url: '/reports/mobile',
      //   views: {
      //     main: {
      //       controller: 'MobileReportsController',
      //       templateUrl: 'parts/reports/mobile.html'
      //     }
      //   }
      // })
      // .state('index.reports.heatmaps', {
      //   url: '/reports/heatmaps',
      //   views: {
      //     main: {
      //       controller: 'TrafficHeatmapsController',
      //       templateUrl: 'parts/reports/heatmaps.html'
      //     }
      //   }
      // })
      // .state('index.reports.lm_rtt_heatmaps', {
      //   url: '/reports/lm_rtt_heatmaps',
      //   views: {
      //     main: {
      //       controller: 'LMRTTHeatmapsController',
      //       templateUrl: 'parts/reports/lm-rtt-heatmaps.html'
      //     }
      //   }
      // });
  }
})();
