(function() {
  'use strict';

  angular
    .module('revapm.Portal.DNSAnalytics')
    .directive('dnsQueriesLineChart', dnsQueriesLineChartDirective);

  /*@ngInject*/
  function dnsQueriesLineChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/dns_analytics/dns-queries-line-chart/dns-queries-line-chart.tpl.html',
      scope: {
        ngZone: '=',
        filtersSets: '=?',
        isAutoReload: '@?',
        filters: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, $q, Util, $config, $sce) {

        var _filters_field_list = ['period'];

        function generateFilterParams(filters) {
          var params = {

          };
          _.forEach(filters, function(val, key) {
            if (_.indexOf(_filters_field_list, key) !== -1) {
              if (val !== '-' && val !== '') {
                params[key] = val;
              }
            }
          });
          return params;
        }

        $scope.heading = 'DNS Queries';
        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('This line graph shows the level of DNS requests generated for the domain');

        $scope._loading = false;
        $scope.hasFailedToLoadData = false;
        $scope.filters = {
          period: '1h' // '24h', '30d'
        };
        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }
        $scope.traffic = {
          series: [{
            name: 'DNS Queries',
            showInLegend: true,
            data: []
          }]
        };

        //  ---------------------------------
        var info_ = null;
        var totalDNSZoneQueries_ = 0;


        $scope.chartOptions = {
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

        //  ---------------------------------
        $scope.reload = function() {
          if (!$scope.ngZone || !$scope.ngZone.id) {
            $scope.traffic = {
              series: [{
                name: 'DNS Queries',
                showInLegend: true,
                data: []
              }]
            };
            return;
          }


          $scope._loading = true;

          var optionsDNSZone = angular.merge({
            id: $scope.ngZone.id
          }, generateFilterParams($scope.filters));

          var _xAxisPointStart = null;
          var _xAxisPointInterval = null;
          var series = [{
            name: 'DNS Queries',
            showInLegend: true,
            data: []
          }];

          Stats.dns_stats_usage_zone(optionsDNSZone).$promise
            .then(function(data) {
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
              $scope.dnsZoneData = {
                pointStart: _xAxisPointStart,
                series: series
              };
            })
            .finally(function() {
              $scope._loading = false;
            });
        };


        $scope.$watch('ngZone', function(newVal, oldVal) {
          if (!$scope.ngZone || $scope.isAutoReload === 'false') {
            return;
          }
          $scope.reload();
        });

        $scope.$watch('filters', function(newVal, oldVal) {
          if (newVal !== false && newVal !== oldVal) {
            _.extend($scope.filters, newVal);
            $scope.reload();
          }
        }, true);
      }
    };
  }
})();
