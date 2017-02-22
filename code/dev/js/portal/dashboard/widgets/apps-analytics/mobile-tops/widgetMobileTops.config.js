(function () {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.AppsAnalytics')
    .config(configWidgetAppsTopReports)
    .controller('widgetAppsTopReportsDomainsController', widgetAppsTopReportsDomainsController);

  function configWidgetAppsTopReports(dashboardProvider) {
    'ngInject';
    dashboardProvider
      // “Top 10 Domains By Requests”
      .widget('widget-apps-mobile-top-10-domains-hits', {
        title: 'Top 10 Domains By Requests',
        description: 'Apps Top Reports - Top 10 Domains By Requests',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/view-top-10-domain-hits.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/widget-title-with-params-mobile-top-reports.tpl.html',
        controller: 'widgetAppsTopReportsDomainsController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/edit-config-mobile-top-reports.tpl.html',
          controller: 'widgetsMobileTopsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          delay: '24',
          name: 'domain',
          type: 'hits'
        }
      })
      // “Top 10 Domains By Traffic”
      .widget('widget-apps-mobile-top-10-domains-gbt', {
        title: 'Top 10 Domains By Traffic',
        description: 'Apps Top Reports - Top 10 Domains By Traffic',
        templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/view-top-10-domain-gbt.tpl.html',
        titleTemplateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/widget-title-with-params-mobile-top-reports.tpl.html',
        controller: 'widgetAppsTopReportsDomainsController',
        controllerAs: 'vm',
        edit: {
          templateUrl: 'parts/dashboard/widgets/apps-analytics/mobile-tops/edit-config-mobile-top-reports.tpl.html',
          controller: 'widgetsMobileTopsEditConfigController',
          controllerAs: 'vm',
        },
        config: {
          delay: '24',
          name: 'domain',
          type: 'gbt'
        }
      });
  }


  /**
   * @name widgetAppsTopReportsDomainsController
   * @description controller for view all Mobile Top Reports for Domains
   *
   * @param {any} config
   */
  function widgetAppsTopReportsDomainsController(config, Stats) {
    var _filters_field_list = ['from_timestamp', 'to_timestamp', 'app_id', 'account_id'];
    var vm = this;
    vm.config = config;
    vm.delay = '24'; // NOTE:  default delay

    vm.gbtChartOpts = {
      tooltip: {
        formatter: function () {
          return '<b>' + this.point.name + ': </b>' +
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Util.humanFileSize(this.y, 2) + ')';
        }
      },
    };
    vm.hitsChartOpts = {
      tooltip: {
        formatter: function () {
          return '<b>' + this.point.name + ': </b>' +
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Highcharts.numberFormat(this.y, 0, '.', '\'') + ' hits)';
        }
      },
    };
    vm.usersChartOpts = {
      tooltip: {
        formatter: function () {
          return '<b>' + this.point.name + ': </b>' +
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Highcharts.numberFormat(this.y, 0, '.', '\'') + ' users)';
        }
      },
    };

    function generateFilterParams(filters) {
      var params = {
        from_timestamp: moment().subtract(vm.delay, 'hours').valueOf(),
        to_timestamp: Date.now()
      };
      _.forEach(filters, function (val, key) {
        if (_.indexOf(_filters_field_list, key) !== -1) {
          if (val !== '-' && val !== '') {
            params[key] = val;
          }
        } else {
          if (key === 'delay') {
            params.from_timestamp = moment().subtract(val, 'hours').valueOf();
            params.to_timestamp = Date.now();
            delete params.delay;
          }
        }
      });
      return params;
    }

    //  ---------------------------------
    var reloadOther_ = function (type, name, count, filters) {
      filters.report_type = name;
      filters.count = count;
      return Stats.sdk_distributions(filters)
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            vm[name + '_' + type] = data.data.map(function (item) {
              return {
                name: item.key,
                y: (type === 'gbt' ? (item.received_bytes + item.sent_bytes) : item.count)
              };
            });
          } else {
            vm[name + '_' + type] = [];
          }
        })
        .catch(function () {
          vm[name + '_' + type] = [];
        });
    };

    vm.reload = function () {
      if (!vm.config.account_id && !vm.config.app_id) {
        return;
      }
      reloadOther_(vm.config.type, vm.config.name, 10, angular.merge({
        account_id: vm.config.account_id,
        app_id: vm.config.app_id || null
      }, generateFilterParams(vm.config.filters)));
    };

    vm.reload();

  }
})();
