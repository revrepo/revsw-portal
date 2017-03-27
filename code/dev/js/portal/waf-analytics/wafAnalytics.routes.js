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
            templateUrl: 'parts/waf-analytics/waf.tpl.html'
          }
        }
      });
  }
})();
