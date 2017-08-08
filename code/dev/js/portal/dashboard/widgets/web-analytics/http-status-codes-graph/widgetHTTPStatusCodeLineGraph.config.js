(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .config(configWidgetWebAnalyticsHTTPStausCodesGraph);


  function configWidgetWebAnalyticsHTTPStausCodesGraph(dashboardProvider) {
    'ngInject';
    dashboardProvider
    // “HTTP Status Codes Graph”
      .widget('widget-web-analytics-http-staus-codes-graph', {
      title: 'HTTP Status Codes Graph',
      description: 'Display HTTP Status Codes Graph',
      templateUrl: 'parts/dashboard/widgets/web-analytics/http-status-codes-graph/view-http-status-codes-graph.tpl.html',
      titleTemplateUrl: 'parts/dashboard/widgets/web-analytics/widget-title-with-params.tpl.html',
      controller: 'widgetHTTPStatusCodeLineGraphController',
      controllerAs: 'vm',
      edit: {
        templateUrl: 'parts/dashboard/widgets/web-analytics/edit-config-web-analytics.tpl.html',
        controller: 'widgetsWebAnalyticsEditConfigController',
        controllerAs: 'vm',
      },
      config: {
        country: 'All Countries',
        count_last_day: '1'
      }
    });
  }

})();
