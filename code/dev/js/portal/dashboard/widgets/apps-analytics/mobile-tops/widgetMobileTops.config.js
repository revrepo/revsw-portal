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
      })
      // "WiFi/Cellular Distribution By Requests"
      .widget('widget-apps-mobile-top-networks-hits', {
        title: 'WiFi/Cell. Dist. By Requests',
        description: 'Apps Top Reports - WiFi/Cellular Distribution By Requests',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/view-top-networks-hits.tpl.html',
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
          name: 'network',
          type: 'hits',
          count: 2
        }
      })
      // "Edge Cache Hit Ratio By Requests"
      .widget('widget-apps-traffic-dist-cache-hits', {
        title: 'Edge Cache Hit Ratio By Req.',
        description: 'Apps Top Reports - Edge Cache Hit Ratio By Requests',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/traffic-distributions/view-cache-hits.tpl.html',
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
          name: 'cache',
          type: 'hits',
          count: 10
        }
      })
      // "Origin/CDN Traffic Distribution By Requests"
      .widget('widget-apps-traffic-dist-cache-hits', {
        title: 'Origin/CDN Dist. By Req.',
        description: 'Apps Top Reports - Origin/CDN Traffic Distribution By Requests',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/traffic-distributions/view-distributions-hits.tpl.html',
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
          name: 'destination',
          type: 'hits',
          count: 10
        }
      })
      // "Origin/CDN Traffic Distribution By Traffic"
      .widget('widget-apps-traffic-dist-cache-gbt', {
        title: 'Origin/CDN Dist. By Traffic',
        description: 'Apps Top Reports - Origin/CDN Traffic Distribution By Traffic',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/traffic-distributions/view-distributions-gbt.tpl.html',
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
          name: 'destination',
          type: 'gbt',
          count: 10
        }
      });
  }

})();
