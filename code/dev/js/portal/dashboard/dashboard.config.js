(function () {
  'use strict';

  angular
    .module('revapm.Portal.Dashboard')
    .config(widgetsWebAnalyticsConfig);

  /*@ngInject*/
  function widgetsWebAnalyticsConfig(dashboardProvider) {
    dashboardProvider
      // #1  “Conversion Rate”
      .widget('bluetriangletech-conversions-subcategories', {
        title: 'Conversion Rate',
        description: 'Conversion Rate, Average Order Value and Page Views by PRT for Subcategories',
        templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
        controller: 'widgetBTTConversionReportController',
        controllerAs: 'iframe',
        edit: {
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
          controller: 'widgetEditBTTiframeController',
          controllerAs: 'vm',
        },
        config: {
          height: '100%',
          country: 'All Countries',
          count_last_day: '1'
        }
      })
      // #2 ”Bounce Rate”
      .widget('bluetriangletech-bounce-rate', {
        title: 'Bounce Rate',
        description: 'Bounce Rate and Page Views Per Session by PRT for subcategory',
        templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
        controller: 'widgetBTTBounceRateReportController',
        controllerAs: 'iframe',
        edit: {
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
          controller: 'widgetEditBTTiframeController',
          controllerAs: 'vm',
        },
        config: {
          height: '100%',
          className: 'bluetriangletech--bounce-rate',
          country: 'All Countries',
          count_last_day: '1'
        }
      })
      // #3 'Brand Conversion Rate'
      .widget('bluetriangletech-brand-conversion-rate', {
        title: 'Brand Conversion Rate',
        description: 'Brand Conversion Rate, Average Brand and Page Views by PRT for subcategory',
        templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
        controller: 'widgetBTTBrandConversionRateReportController',
        controllerAs: 'iframe',
        edit: {
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
          controller: 'widgetEditBTTiframeController',
          controllerAs: 'vm',
        },
        config: {
          height: '100%',
          className: 'bluetriangletech--brand-conversion-rate',
          country: 'All Countries',
          count_last_day: '1'
        }
      })
      // #4 'Lost Revenue Calculator'
      .widget('bluetriangletech-lost-revenue-calculator', {
        title: 'Lost Revenue Calculator',
        description: 'Lost Revenue Calculator for subcategory',
        templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
        controller: 'widgetBTTLostRevenueCalculatorReportController',
        controllerAs: 'iframe',
        edit: {
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
          controller: 'widgetEditBTTiframeController',
          controllerAs: 'vm',
        },
        config: {
          height: '100%',
          className: 'bluetriangletech--lost-revenue-calculator',
          country: 'All Countries',
          count_last_day: '1'
        }
      })
      // #5 'BTT Traffic Parameters'
      .widget('bluetriangletech-traffic-info', {
        title: 'BTT Traffic Parameters',
        description: 'BTT Traffic Parameters',
        templateUrl: 'parts/dashboard/widgets/bluetriangletech/view-iframe-bluetriangletech.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/bluetriangletech/widget-title-with-params-bluetriangletech.html',
        controller: 'widgetBTTTrafficInfoReportController',
        controllerAs: 'iframe',
        edit: {
          templateUrl: 'parts/dashboard/widgets/bluetriangletech/edit-bluetriangletech.html',
          controller: 'widgetEditBTTiframeController',
          controllerAs: 'vm',
        },
        config: {
          height: '100%',
          className: 'bluetriangletech--traffic-info',
          country: 'All Countries',
          count_last_day: '1'
        }
      })
      // Widget “Norse Live Attack Map”
      .widget('widget-norse-live-attack-map', {
        title: 'Norse Live Attack Map',
        description: 'Display Norse Live Attack Map',
        templateUrl: 'parts/dashboard/widgets/norse/view-iframe-norse.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/norse/widget-title-without-params-norse.html',
        controller: function widgetNorseLiveAttackMapIframeController($sce, config) {
          'ngInject';
          var vm = this;
          if (config.url) {
            // NOTE: change all links to one available
            config.url = '//map.norsecorp.com';
            vm.url = $sce.trustAsResourceUrl(config.url);
          }
        },
        controllerAs: 'iframe',
        edit: {
          templateUrl: 'parts/dashboard/widgets/norse/edit-norse.html',
          controller: function widgetEditBTTiframeController($sce, config) {
            'ngInject';
            var vm = this;
          },
          controllerAs: 'vm',
        },
        config: {
          url: 'http://map.norsecorp.com/#/'
        }
      })
      // Widget ““Third-Party iFrame Page” ”
      .widget('third-party-iframe-page', {
        title: 'Third-Party iFrame Page',
        description: 'Display Third-Party iFrame Page',
        templateUrl: 'parts/dashboard/widgets/third-party-iframe/view-iframe-third-party-iframe.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/third-party-iframe/widget-title-with-params-third-party-iframe.html',
        controller: function widget3dPartyIframeController($sce, config) {
          'ngInject';
          var vm = this;
          if (config.url) {
            // TODO: add security key for API call
            vm.url = $sce.trustAsResourceUrl(window.API_URL+'/curl?url='+config.url);
          }
        },
        controllerAs: 'iframe',
        edit: {
          templateUrl: 'parts/dashboard/widgets/third-party-iframe/edit-third-party-iframe.html',
          controller: function widgetEdit3dPartyIframeController($sce, config) {
            'ngInject';
            var vm = this;
          },
          controllerAs: 'vm',
        },
        config: {
          url: null // 'https://www.statuspage.io/'
        }
      });
  }
})();
