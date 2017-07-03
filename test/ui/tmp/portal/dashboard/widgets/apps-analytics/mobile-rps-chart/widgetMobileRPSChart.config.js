(function () {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.AppsAnalytics')
    .config(configWidgetAppsMobileRPSChat)
    .controller('widgeAppsMobileRPSController',widgeAppsMobileRPSController);

  function configWidgetAppsMobileRPSChat(dashboardProvider) {
    'ngInject';
    dashboardProvider
      // “Requests Per Second Graph”
      .widget('widget-apps-mobile-rps-chart', {
        title: 'Requests Per Second Graph',
        description: 'Apps Analytics - Requests Per Second Graph',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-rps-chart/view-mobile-rps-chart.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/apps-analytics/widget-title-with-params-trafic-levels.tpl.html',
        controller: 'widgeAppsMobileRPSController',
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

  function widgeAppsMobileRPSController(config) {
    var vm = this;
    vm.config = config;
  }



})();
