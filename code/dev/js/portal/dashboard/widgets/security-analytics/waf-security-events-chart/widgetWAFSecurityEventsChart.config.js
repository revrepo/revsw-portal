(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.SecurityAnalytics')
    .config(configWidgetWAFSecurityEventsChart);


  function configWidgetWAFSecurityEventsChart(dashboardProvider) {
    'ngInject';
    dashboardProvider
      // “Security Events Graph”
      .widget('widget-waf-security-events-chart', {
        title: 'Security Events Graph',
        description: 'Display Security Events Graph',
        templateUrl: 'parts/dashboard/widgets/security-analytics/waf-security-events-chart/view-waf-security-events-chart.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/security-analytics/widget-title-with-params-waf.tpl.html',
        controller: 'widgetWAFSecurityEventsChartController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/security-analytics/edit-config-security-analytics-waf.tpl.html',
          controller: 'widgetsWAFAnalyticsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          country: 'All Countries',
          rule_id: '',
          zone: '',
          count_last_day: '1'
        }
      });
  }

})();
