(function () {
  'use strict';

  angular
    .module('revapm.Portal.DNSAnalytics')
    .directive('dnsZoneStatsUsageChart', dnsZoneStatsUsageChartDirective);

  /*@ngInject*/
  function dnsZoneStatsUsageChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/dns_analytics/charts/dns-zone-stats-usage-chart.tpl.html',
      scope: {
        ngZone: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        filtersSets: '=',
        flPeriod: '='
      },
      /*@ngInject*/
      controller: function ($scope, Stats, $q, Util) {

        var _filters_field_list = ['period', 'from_timestamp', 'to_timestamp', 'country', 'device', 'os', 'browser'];

        function generateFilterParams(filters) {
          var params = {
            period: $scope.flPeriod
            // from_timestamp: moment().subtract(1, 'days').valueOf(),
            // to_timestamp: Date.now()
          };
          _.forEach(filters, function (val, key) {
            if (_.indexOf(_filters_field_list, key) !== -1) {
              if (val !== '-' && val !== '') {
                params[key] = val;
              }
            } else {
              if (key === 'count_last_day') {
                params.from_timestamp = moment().subtract(val, 'days').valueOf();
                params.to_timestamp = Date.now();
                delete params.count_last_day;
              }
            }
          });
          return params;
        }

        $scope.heading = 'DNS Queries Per Second';
        $scope._loading = false;
        $scope.filters = {
          // from_timestamp: moment().subtract(1, 'days').valueOf(),
          // to_timestamp: Date.now()
          period: '24h'
        };
        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }
        $scope.traffic = {
          series: [{
            name: 'Queries',
            showInLegend: false,
            data: []
          }]
        };

        //  ---------------------------------
        var info_ = null,
          success_ = 0,
          failure_ = 0,
          tickInterval_ = 10;

        $scope.chartOptions = {
          chart: {
            zoomType: 'x',
            events: {
              redraw: function () {
                if (info_) {
                  info_.destroy();
                  info_ = null;
                }
                var x = this.xAxis[0].toPixels(this.xAxis[0].min) + 3;
                // var rel_success = 0,
                //   rel_failure = 0;
                // if ((failure_ + success_) !== 0) {
                //   rel_success = Math.round(success_ * 1000 / (failure_ + success_)) / 10;
                //   rel_failure = Math.round(failure_ * 1000 / (failure_ + success_)) / 10;
                // }
                // TODO: TOTAL only !!!
                info_ = this /*chart*/ .renderer
                  .label('Total <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(success_) +
                    // '</span> Requests, <span style="font-weight: bold; color: #3c65ac;">' + rel_success +
                    '</span>',
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
              text: 'Queries Per Second'
            },
            labels: {
              formatter: function () {
                return Util.formatNumber(this.value);
              }
            }
          },
          xAxis: {
            type: 'datetime',
            // pointInterval: 24 * 60 * 60 * 10000,
          },
          tooltip: {
            xDateFormat: '<span style="color: #000; font-weight: bold;">%H:%M</span> %b %d',
            shared: true,
            headerFormat: '{point.key}<br>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.3f}</b> ({point.percentage:.3f}%)<br/>',
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

        //  ---------------------------------
        $scope.reload = function () {
          if (!$scope.ngZone || !$scope.ngZone.id) {
            $scope.traffic = {
              series: [{
                name: 'Queries',
                showInLegend: false,
                data: []
              }]
            };
            return;
          }
          $scope._loading = true;
          var _xAxisPointStart = null;
          var _xAxisPointInterval = null;
          var series = [{
            name: 'Queries',
            showInLegend: false,
            data: []
          }];

          Stats.dns_stats_usage_zone(angular.merge({
              zone: $scope.ngZone.zone //'gerzhan.ru'//TODO: uncomment $scope.ngZone.zone
            }, generateFilterParams($scope.filters), {})).$promise
            .then(function (data) {
              var interval = data.metadata.interval_sec || 1800;
              _xAxisPointStart = parseInt(data.metadata.start_timestamp);
              _xAxisPointInterval = parseInt(data.metadata.interval_sec) * 1000;
              success_ = failure_ = 0;
              if (data.data && data.data.length > 0) {
                data.data.forEach(function (item, idx, items) {

                  success_ += item.queries;
                  // series[0].data.push(item).queries);//TODO: delete / interval);
                });
                series[0].data = data.data;
                if (success_ === 0) {
                  series[0].data.length = 0;
                }
              }
              return $q.when(series);
            })
            .then(function setNewData(data) {
              // model better to update once
              $scope.traffic = {
                pointStart: _xAxisPointStart,
                // pointInterval: _xAxisPointInterval,
                series: series
              };
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngZone', function () {
          if (!$scope.ngZone) {
            return;
          }
          $scope.reload();
        });
      }
    };
  }
})();
