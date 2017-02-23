(function () {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.AppsAnalytics')
    .config(configWidgetAppsTopReports);

  function configWidgetAppsTopReports(dashboardProvider) {
    'ngInject';
    dashboardProvider
      // “Top 10 Domains By Requests”
      .widget('widget-apps-mobile-top-10-domains-hits', {
        title: 'Top 10 Domains By Requests',
        description: 'Apps Top Reports - Top 10 Domains By Requests',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/view-top-10-domain-hits.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/widget-title-with-params-mobile-top-reports.tpl.html',
        controller: 'widgetsAppsSDKDestributionsReportsController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/edit-config-mobile-top-reports.tpl.html',
          controller: 'widgetsMobileTopsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          delay: '24',
          name: 'domain',
          type: 'hits',
          count: 10
        }
      })
      // “Top 10 Domains By Traffic”
      .widget('widget-apps-mobile-top-10-domains-gbt', {
        title: 'Top 10 Domains By Traffic',
        description: 'Apps Top Reports - Top 10 Domains By Traffic',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/view-top-10-domain-gbt.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/widget-title-with-params-mobile-top-reports.tpl.html',
        controller: 'widgetsAppsSDKDestributionsReportsController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/edit-config-mobile-top-reports.tpl.html',
          controller: 'widgetsMobileTopsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          delay: '24',
          name: 'domain',
          type: 'gbt',
          count: 10
        }
      })
      //"Top 20 Countries By Requests"
      .widget('widget-apps-mobile-top-countries-hits', {
        title: 'Top 20 Countries By Requests',
        description: 'Apps Top Reports - Top 20 Countries By Requests',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/view-top-countries-hits.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/widget-title-with-params-mobile-top-reports.tpl.html',
        controller: 'widgetsAppsSDKTopsReportsController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/edit-config-mobile-top-reports.tpl.html',
          controller: 'widgetsMobileTopsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          delay: '24',
          name: 'country',
          type: 'hits',
          count: 20
        }
      })
      //"Top 20 Countries By Users"
      .widget('widget-apps-mobile-top-countries-users', {
        title: 'Top 20 Countries By Users',
        description: 'Apps Top Reports - Top 20 Countries By Users',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/view-top-countries-users.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/widget-title-with-params-mobile-top-reports.tpl.html',
        controller: 'widgetsAppsSDKTopsReportsController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/edit-config-mobile-top-reports.tpl.html',
          controller: 'widgetsMobileTopsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          delay: '24',
          name: 'country',
          type: 'users',
          count: 20
        }
      })
      //"Top 20 Providers By Requests"
      .widget('widget-apps-mobile-top-operators-hits', {
        title: 'Top 20 Providers By Requests',
        description: 'Apps Top Reports - Top 20 Providers By Requests',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/view-top-operators-hits.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/widget-title-with-params-mobile-top-reports.tpl.html',
        controller: 'widgetsAppsSDKTopsReportsController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/edit-config-mobile-top-reports.tpl.html',
          controller: 'widgetsMobileTopsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          delay: '24',
          name: 'operator',
          type: 'hits',
          count: 20
        }
      });
  }

})();
