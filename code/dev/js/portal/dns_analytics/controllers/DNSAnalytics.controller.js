(function () {
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
    $q
  ) {
    var vm = this;
    vm._loading = false;
    vm.period = '1h'; // default period
    vm.totalDNSZoneRecords = 0;
    vm.accountTotalDNSZones = 0;
    vm.totalDNSZoneQueries30d = 0;

    var totalDNSZoneQueries_ = 0;
    var info_ = null;

    // NOTE: Option for display graph
    vm.chartOptions = {
      chart: {
        zoomType: 'x',
        events: {
          redraw: function () {
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
          formatter: function () {
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
    User.getUserDNSZones()
      .then(function (data) {
        vm.accountTotalDNSZones = data.length;
      });

    /**
     * @name onDNSZoneSelected
     * @description method call then change selected DNS Zone
     */
    vm.onDNSZoneSelected = function () {
      if (!vm.selectedZone || !vm.selectedZone.id) {
        return;
      }
      vm.reload();
    };

    /**
     * @name reload
     * @description Reload data for Account DNS Zone
     */
    vm.reload = function () {
      if (!vm.selectedZone || !vm.selectedZone.id) {
        return;
      }
      vm._loading = true;

      var optionsDNSZone = angular.merge({
        id: vm.selectedZone.id
      }, {
        period: vm.period
      }, {});

      var _xAxisPointStart = null;
      var _xAxisPointInterval = null;
      var series = [{
        name: 'Queries',
        showInLegend: false,
        data: []
      }];
      // NOTE: for better performance - make only one request for equals period
      var requestDataLast30Day_ = $q.when({});
      if (vm.period !== '30d') {
        requestDataLast30Day_ = Stats.dns_stats_usage_zone(angular.merge({}, optionsDNSZone, {
          period: '30d'
        })).$promise;
      }
      // NOTE: Get data for Selected DNS Zone
      $q.all([
          Stats.dns_stats_usage_zone(optionsDNSZone).$promise, //
          requestDataLast30Day_
        ])
        .then(function (arraysData) {
          var dataMonth = arraysData[0];
          var data = arraysData[0];
          if (vm.period !== '30d') {
            dataMonth = arraysData[1];
          }
          if (dataMonth) {
            vm.totalDNSZoneQueries30d = dataMonth.metadata.queries;
          }
          if (data.metadata) {
            vm.totalDNSZoneRecords = data.metadata.records;
          }
          var interval = data.metadata.interval_sec || 1800;
          _xAxisPointStart = parseInt(data.metadata.start_timestamp);
          _xAxisPointInterval = parseInt(data.metadata.interval_sec) * 1000;
          totalDNSZoneQueries_ = 0;
          if (data.data && data.data.length > 0) {
            series[0].data = data.data;
            totalDNSZoneQueries_ = data.metadata.queries;
          } else {
            series[0].data = [];
          }
          return $q.when(series);
        })
        .then(function setNewData(data) {
          // model better to update once
          vm.dnsZoneData = {
            pointStart: _xAxisPointStart,
            // pointInterval: _xAxisPointInterval,
            series: series
          };
        })
        .finally(function () {
          vm._loading = false;
        });
    };
  }
})();
