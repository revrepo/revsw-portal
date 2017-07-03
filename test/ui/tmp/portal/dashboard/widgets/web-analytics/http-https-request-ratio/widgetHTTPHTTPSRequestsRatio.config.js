(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .config(configWidgetHTTPHTTPSRequestsRatio);


  function configWidgetHTTPHTTPSRequestsRatio(dashboardProvider) {
    'ngInject';
    dashboardProvider
    // “HTTP/HTTPS Requests Ratio”
      .widget('widget-web-analytics-http-https-request-ratio', {
      title: 'HTTP/HTTPS Requests Ratio',
      description: 'Display HTTP/HTTPS Requests Ratio',
      templateUrl: 'parts/dashboard/widgets/web-analytics/http-https-request-ratio/view-http-https-request-ratio.tpl.html',
      titleTemplateUrl: 'parts/dashboard/widgets/web-analytics/widget-title-with-params-hours.tpl.html',
      controller: 'widgetHTTPHTTPSRequestsRatioController',
      controllerAs: 'vm',
      edit: {
        templateUrl: 'parts/dashboard/widgets/web-analytics/edit-config-web-analytics-hours.tpl.html',
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
