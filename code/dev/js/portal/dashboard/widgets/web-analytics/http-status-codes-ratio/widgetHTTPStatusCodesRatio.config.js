(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .config(configWidgetWebAnalyticsHTTPStatusCodesRatio);


  function configWidgetWebAnalyticsHTTPStatusCodesRatio(dashboardProvider) {
    'ngInject';
    dashboardProvider
    // “HTTP Status Codes Ratio”
      .widget('widget-web-analytics-http-status-codes-ratio', {
      title: 'HTTP Status Codes Ratio',
      description: 'Display HTTP Status Codes Ratio',
      templateUrl: 'parts/dashboard/widgets/web-analytics/http-status-codes-ratio/view-http-status-codes-ratio.tpl.html',
      titleTemplateUrl: 'parts/dashboard/widgets/web-analytics/widget-title-with-params-hours.tpl.html',
      controller: 'widgetHTTPStatusCodesRatioController',
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
