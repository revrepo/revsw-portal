(function () {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.AppsAnalytics')
    .config(configWidgetAppsMobileBWChat)
    .controller('widgeAppsMobileBWController', widgeAppsMobileBWController);

  function configWidgetAppsMobileBWChat(dashboardProvider) {
    'ngInject';
    dashboardProvider
      // “Bandwidth Usage Graph”
      .widget('widget-apps-mobile-bw-chart', {
        title: 'Bandwidth Usage Graph',
        description: 'Apps Analytics - Bandwidth Usage Graph',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-bw-chart/view-mobile-bw-chart.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/apps-analytics/widget-title-with-params-trafic-levels.tpl.html',
        controller: 'widgeAppsMobileBWController',
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

  function widgeAppsMobileBWController(config) {
    var vm = this;
    vm.config = config;
  }



})();
