(function () {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.AppsAnalytics')
    .config(configWidgetAppsMobileBWChat)
    .controller('widgeAppsMobileHTTPCodesController', widgeAppsMobileHTTPCodesController);

  function configWidgetAppsMobileBWChat(dashboardProvider) {
    'ngInject';
    dashboardProvider
      // “HTTP Status Codes Graph”
      .widget('widget-apps-mobile-http-codes-chart', {
        title: 'HTTP Status Codes Graph',
        description: 'Apps Analitycs - HTTP Status Codes Graph',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-http-codes-chart/view-mobile-http-codes-chart.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/apps-analytics/widget-title-with-params-trafic-levels.tpl.html',
        controller: 'widgeAppsMobileHTTPCodesController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/apps-analytics/edit-config-apps-analytics.tpl.html',
          controller: 'widgetsAppsAnalyticsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          country: 'All Countries',
          count_last_day: '1'
        }
      });
  }

  function widgeAppsMobileHTTPCodesController(config) {
    var vm = this;
    vm.config = config;
  }

})();
