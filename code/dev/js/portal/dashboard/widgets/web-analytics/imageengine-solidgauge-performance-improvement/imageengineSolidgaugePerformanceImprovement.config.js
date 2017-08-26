(function () {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .config(configWidgetImageengineSolidgaugePerformanceImprovement);

  function configWidgetImageengineSolidgaugePerformanceImprovement(dashboardProvider) {
    'ngInject';
    dashboardProvider
      // “Performance Improvement By ImageEngine”
      .widget('widget-web-analytics-imageengine-solidgauge-performance-improvement', {
        title: 'Performance Improvement By IO',
        description: 'Display Performance Improvement By Image Optimization',
        templateUrl: 'parts/dashboard/widgets/web-analytics/imageengine-solidgauge-performance-improvement/view-imageengine-solidgauge-performance-improvement.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/web-analytics/widget-title-with-params-hours.tpl.html',
        controller: 'widgetImageengineSolidgaugePerformanceImprovementController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/web-analytics/edit-config-web-analytics-hours-and-all.tpl.html',
          controller: 'widgetsWebAnalyticsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          country: 'All Countries',
          delay: '24',
          browser: 'All Browsers'
        }
      });
  }

})();
