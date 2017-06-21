(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .config(configWidgetWebAnalyticsEdgeCacheHitMissRatio);


  function configWidgetWebAnalyticsEdgeCacheHitMissRatio(dashboardProvider) {
    'ngInject';
    dashboardProvider
    // “Edge Cache Hit/Miss Ratio”
      .widget('widget-web-analytics-edge-cache-hit-miss-ratio', {
      title: 'Edge Cache Hit/Miss Ratio',
      description: 'Display Edge Cache Hit/Miss Ratio',
      templateUrl: 'parts/dashboard/widgets/web-analytics/edge-cache-hit-miss-ratio/view-edge-cache-hit-miss-ratio.tpl.html',
      titleTemplateUrl: 'parts/dashboard/widgets/web-analytics/widget-title-with-params-hours.tpl.html',
      controller: 'widgetEdgeCacheHitMissRatioController',
      controllerAs: 'vm',
      edit: {
        templateUrl: 'parts/dashboard/widgets/web-analytics/edit-config-web-analytics-hours.tpl.html',
        controller: 'widgetsWebAnalyticsEditConfigController',
        controllerAs: 'vm',
      },
      config: {
        country: 'All Countries',
        delay: '1'
      }
    });
  }

})();
