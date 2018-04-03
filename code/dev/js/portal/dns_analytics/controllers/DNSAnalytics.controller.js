(function() {
  'use strict';

  angular
    .module('revapm.Portal.DNSAnalytics')
    .controller('DNSAnalyticsController', DNSAnalyticsController);

  /*@ngInject*/
  function DNSAnalyticsController($scope,
    $rootScope,
    $localStorage,
    User,
    AlertService,
    Stats,
    Countries,
    $timeout,
    $state,
    $config,
    Util,
    $q,
    $sce
  ) {
    var vm = this;
    vm._loading = false;
    vm.filters = {
      period: '1h' // default period
    };
    vm.totalDNSZoneRecords = 0;
    vm.accountTotalDNSZones = 0;
    vm.totalDNSZoneQueries30d = 0;

    var totalDNSZoneQueries_ = 0;
    var info_ = null;

    $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
    $scope.popoverHelpHTML = {
      'totalDNSZoneRecords': $sce.trustAsHtml('The metric reports the total number of DNS records registered in the reported DNS zone'),
      'accountTotalDNSZones': $sce.trustAsHtml('The metric reports the total number of DNS zones registered for the customer account'),
      'totalDNSZoneQueries30d': $sce.trustAsHtml('The metric reports the total number of DNS requests received for the last 30 days for the ' +
        'reported DNS zone')
    };
    // NOTE: Option for display graph
    vm.chartOptions = {
      chart: {
        zoomType: 'x',
        events: {
          redraw: function() {
            if (info_) {
              info_.destroy();
              info_ = null;
            }
            var x = this.xAxis[0].toPixels(this.xAxis[0].min) + 3;
            totalDNSZoneQueries_ = parseFloat(totalDNSZoneQueries_.toFixed(2));
            info_ = this /*chart*/ .renderer
              .label('Total: <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(totalDNSZoneQueries_) + '</span> Queries',
                x /* x */ , 3 /* y */ , '', 0, 0, true /*html*/ )
              .css({
                color: '#444'
              })
              .attr({
                fill: 'rgba(240, 240, 240, 0.6)',
                stroke: '#3c65ac',
                'stroke-width': 1,
                padding: 6,
                r: 2,
                zIndex: 5
              })
              .add();
          }
        }
      },
      yAxis: {
        title: {
          text: 'Queries'
        },
        labels: {
          formatter: function() {
            return Util.formatNumber(this.value);
          }
        }
      },
      xAxis: {
        type: 'datetime',
        pointInterval: 3 * 60 * 1000, // 3 min
      },
      tooltip: {
        xDateFormat: '<span style="color: #000; font-weight: bold;">%H:%M:%S</span> %b %d',
        shared: false,
        headerFormat: '{point.key}<br>',
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.3f}</b><br/>',
      },
      plotOptions: {
        areaspline: {
          marker: {
            enabled: false
          },
          // @see http://api.highcharts.com/highcharts/plotOptions.areaspline.stacking
          stacking: 'normal'
        }
      },
    };

    // get Total count DNS Zones for current account
    User.getUserDNSZones(false, 'dns_analytics')
      .then(function(data) {
        vm.accountTotalDNSZones = data.length;
      });

    /**
     * @name onDNSZoneSelected
     * @description method call then change selected DNS Zone
     */
    vm.onDNSZoneSelected = function() {
      if (!vm.selectedZone || !vm.selectedZone.id) {
        return;
      }
      vm.reload();
    };

    /**
     * @name reload
     * @description Reload data for Account DNS Zone
     */
    vm.reload = function() {
      if (!vm.selectedZone || !vm.selectedZone.id) {
        return;
      }
      vm.newFilters = false;
      $timeout(function() {
        // NOTE: update filter for reload data into directive
        vm.newFilters = angular.copy(vm.filters);
      }, 100);

      vm._loading = true;

      var optionsDNSZone = angular.merge({
        id: vm.selectedZone.id
      }, {
        period: vm.filters.period
      }, {});
      Stats.dns_stats_usage_zone(angular.merge({}, optionsDNSZone, {
          period: '30d'
        })).$promise
        .then(function(arraysData) {
          var dataMonth = arraysData;
          var data = arraysData;
          vm.totalDNSZoneQueries30d = Util.formatNumber(dataMonth.metadata.queries);

          if (data.metadata) {
            vm.totalDNSZoneRecords = Util.formatNumber(data.metadata.records);
          }

          totalDNSZoneQueries_ = 0;
          if (data.data && data.data.length > 0) {
            totalDNSZoneQueries_ = data.metadata.queries;
          }
        })

        .finally(function() {
          vm._loading = false;
        });

    };
  }
})();
