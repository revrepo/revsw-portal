(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.DNSAnalytics')
    .config(configWidgetWAFSecurityEventsChart);


  function configWidgetWAFSecurityEventsChart(dashboardProvider) {
    'ngInject';
    dashboardProvider
      // “DNS Queries Graph”
      .widget('widget-dns-queries-line-chart', {
        title: 'DNS Queries',
        description: 'Display DNS Queries Graph',
        templateUrl: 'parts/dashboard/widgets/dns-analytics/dns-queries-line-chart/view-dns-queries-line-chart.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/dns-analytics/widget-title-with-params-zone.tpl.html',
        controller: 'widgetsDNSAnalyticsDefaultChartController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/dns-analytics/edit-config-dns-analytics-zone.tpl.html',
          controller: 'widgetsDNSAnalyticsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          period: '1h'
        }
      });
  }

})();
