(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.security.waf_analytics', {
        url: '/waf',
        views: {
          main: {
            templateUrl: 'parts/waf-analytics/waf-analytics.tpl.html'
          }
        }
      })
      .state('index.security.waf_events', {
        url: '/waf',
        views: {
          main: {
            templateUrl: 'parts/waf-analytics/waf.tpl.html'
          }
        }
      }).state('index.security.waf_heatmaps', {
        url: '/waf',
        views: {
          main: {
            templateUrl: 'parts/waf-analytics/waf.tpl.html'
          }
        }
      });
  }
})();
