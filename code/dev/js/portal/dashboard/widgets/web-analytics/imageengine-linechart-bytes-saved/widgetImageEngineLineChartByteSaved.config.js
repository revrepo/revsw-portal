(function () {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .config(configWidgetImageengineLinechartBytesSaved);


  function configWidgetImageengineLinechartBytesSaved(dashboardProvider) {
    'ngInject';
    dashboardProvider
      // “Bandwidth Saved By ImageEngine Graph”
      .widget('widget-web-analytics-imageengine-linechart-bytes-saved', {
        title: 'Saved By ImageEngine',
        description: 'Web Analitycs - Bandwidth Saved By ImageEngine Graph',
        templateUrl: 'parts/dashboard/widgets/web-analytics/imageengine-linechart-bytes-saved/view-imageengine-linechart-bytes-saved.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/web-analytics/widget-title-with-params-hours.tpl.html',
        controller: 'widgetImageEngineLinechartBytesSavedController',
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
