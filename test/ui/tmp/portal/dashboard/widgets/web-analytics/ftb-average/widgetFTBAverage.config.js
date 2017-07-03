(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .config(configWidgetWebAnalyticsFTBAverage);


  function configWidgetWebAnalyticsFTBAverage(dashboardProvider) {
    'ngInject';
    dashboardProvider
    // “Average FBT”
      .widget('widget-web-analytics-ftb-average', {
      title: 'Average FBT',
      description: 'Display Average FBT',
      templateUrl: 'parts/dashboard/widgets/web-analytics/ftb-average/view-ftb-average.tpl.html',
      titleTemplateUrl: 'parts/dashboard/widgets/web-analytics/widget-title-with-params.tpl.html',
      controller: 'widgetFTBAverageController',
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
