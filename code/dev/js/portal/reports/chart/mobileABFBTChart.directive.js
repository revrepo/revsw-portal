(function() {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .directive('mobileAbFbtChart', mobileAbFbtChartDirective);

  /*@ngInject*/
  function mobileAbFbtChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-base-traffic.html',
      scope: {
        ngAccount: '=',
        ngApp: '=',
        flOses: '=',
        flDevices: '=',
        flCountries: '=',
        flOperators: '=',
        flDisabled: '=',
        flNetworks: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, Util, $config, $sce) {

        $scope.heading = 'First Byte Time Graph';
        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('This graph shows a visual comparison of First Byte Time (FBT) metric for requests served ' +
          'directly from the origin and requests served via the CDN. Lower FBT value results in better end user experience.');

        $scope.span = '1';
        $scope._loading = false;

        //  ---------------------------------
        var info_ = null,
          rev_avg_ = 0,
          origin_avg_ = 0,
          rev_median_ = 0,
          origin_median_ = 0,
          imp_avg_ = 0,
          imp_median_ = 0,
          tickInterval_ = 4;

        $scope.chartOptions = {
          chart: {
            type: 'column',
            events: {
              redraw: function() {
                if (info_) {
                  info_.destroy();
                  info_ = null;
                }
                info_ = this /*chart*/ .renderer
                  .label('Origin Avg <span style="font-weight: bold; color: #3c65ac;">' + origin_avg_ +
                    '</span> Median <span style="font-weight: bold; color: #3c65ac;">' + origin_median_ +
                    '</span> ms<br>CDN Avg <span style="font-weight: bold; color: black;">' + rev_avg_ +
                    '</span> Median <span style="font-weight: bold; color: black;">' + rev_median_ +
                    '</span> ms<br>Improvement Avg <span style="font-weight: bold; color: darkred;">' + imp_avg_ +
                    '</span> Median <span style="font-weight: bold; color: darkred;">' + imp_median_ +
                    '</span>%',
                    this.xAxis[0].toPixels(0), 0, '', 0, 0, true /*html*/ )
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
              text: 'FBT ms'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber(this.value, 1);
              }
            }
          },
          xAxis: {
            title: {
              text: 'Date'
            },
            crosshair: {
              width: 1,
              color: '#000000'
            },
            tickInterval: tickInterval_
          },
          tooltip: {
            xDateFormat: '<span style="color: #000; font-weight: bold;">%H:%M</span> %b %d',
            shared: true,
            headerFormat: '{point.key}<br/>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.3f}</b><br/>'
          }
        };

        $scope.hits = {
          labels: [],
          series: [{
            name: 'Origin, Avg',
            data: [],
            color: '#3c65ac',
            marker: {
              radius: 4,
              symbol: 'circle'
            }
          }, {
            name: 'Origin, Min',
            data: [],
            color: '#7cb5ec',
            marker: {
              radius: 2,
              symbol: 'circle'
            },
            visible: false
          }, {
            name: 'Origin, Max',
            data: [],
            color: '#7cb5ec',
            marker: {
              radius: 2,
              symbol: 'circle'
            },
            visible: false
          }, {
            name: 'CDN Avg',
            data: [],
            color: '#000000',
            marker: {
              radius: 4,
              symbol: 'diamond'
            }
          }, {
            name: 'CDN, Min',
            data: [],
            color: '#808080',
            marker: {
              radius: 2,
              symbol: 'diamond'
            },
            visible: false
          }, {
            name: 'CDN/Max',
            data: [],
            color: '#808080',
            marker: {
              radius: 2,
              symbol: 'diamond'
            },
            visible: false
          }]
        };

        //  ---------------------------------
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now(),
          os: null,
          device: null,
          country: null,
          operator: null,
          network: null
        };

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ($scope.ngApp || null);
          return Stats.sdk_ab_fbt($scope.filters)
            .$promise
            .then(function(data) {

              if (data.data && data.data.length > 0) {
                var labels = [];
                var hits = {
                  rev_edge: {
                    min: [],
                    max: [],
                    avg: []
                  },
                  origin: {
                    min: [],
                    max: [],
                    avg: []
                  },
                };
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                var labels_filled = false;

                data.data.forEach(function(dest) {
                  dest.items.forEach(function(item, idx, items) {
                    if (!labels_filled) {
                      var val = moment(item.key + offset);
                      var label = val.format('[<span style="color: #000; font-weight: bold;">]HH:mm[</span>] MMM D');

                      labels.push(label);
                    }
                    hits[dest.key].max.push(item.fbt_max);
                    hits[dest.key].min.push(item.fbt_min);
                    hits[dest.key].avg.push(item.fbt_average);
                  });
                  labels_filled = true;
                });
                $scope.hits.labels = labels;
                $scope.hits.series[0].data = hits.origin.avg;
                $scope.hits.series[1].data = hits.origin.min;
                $scope.hits.series[2].data = hits.origin.max;
                $scope.hits.series[3].data = hits.rev_edge.avg;
                $scope.hits.series[4].data = hits.rev_edge.min;
                $scope.hits.series[5].data = hits.rev_edge.max;

                //  origin avg
                var avg_t = hits.origin.avg.filter(function(item) {
                  return item != null;
                });
                origin_avg_ = avg_t.reduce(function(prev, curr) {
                  return prev + curr;
                }, 0);
                origin_avg_ /= avg_t.length;

                //  origin median
                avg_t.sort(function(lhs, rhs) {
                  return lhs - rhs;
                });
                var idx0 = avg_t.length - 1,
                  idx1 = Math.ceil(idx0 / 2);
                idx0 = Math.floor(idx0 / 2);
                origin_median_ = (idx0 === idx1) ? avg_t[idx0] : (avg_t[idx0] + avg_t[idx1]) / 2;

                //  rev_edge avg
                avg_t = hits.rev_edge.avg.filter(function(item) {
                  return item != null;
                });
                rev_avg_ = avg_t.reduce(function(prev, curr) {
                  return prev + curr;
                }, 0);
                rev_avg_ /= avg_t.length;

                //  rev_edge median
                avg_t.sort(function(lhs, rhs) {
                  return lhs - rhs;
                });
                idx0 = avg_t.length - 1;
                idx1 = Math.ceil(idx0 / 2);
                idx0 = Math.floor(idx0 / 2);
                rev_median_ = (idx0 === idx1) ? avg_t[idx0] : (avg_t[idx0] + avg_t[idx1]) / 2;

                //  rounds
                imp_avg_ = Math.round((origin_avg_ - rev_avg_) / origin_avg_ * 1000) / 10;
                rev_avg_ = Math.round(rev_avg_ * 100) / 100;
                origin_avg_ = Math.round(origin_avg_ * 100) / 100;

                imp_median_ = Math.round((origin_median_ - rev_median_) / origin_median_ * 1000) / 10;
                origin_median_ = Math.round(origin_median_ * 100) / 100;
                rev_median_ = Math.round(rev_median_ * 100) / 100;
              } else {
                $scope.hits.labels = [];
                $scope.hits.series[0].data = [];
                $scope.hits.series[1].data = [];
                $scope.hits.series[2].data = [];
                $scope.hits.series[3].data = [];
                $scope.hits.series[4].data = [];
                $scope.hits.series[5].data = [];
                rev_avg_ = 0;
                origin_avg_ = 0;
                rev_median_ = 0;
                origin_median_ = 0;
                imp_avg_ = 0;
                imp_median_ = 0;
                tickInterval_ = 4;
              }
            })
            .catch(function() {
              $scope.hits.labels = [];
              $scope.hits.series[0].data = [];
              $scope.hits.series[1].data = [];
              $scope.hits.series[2].data = [];
              $scope.hits.series[3].data = [];
              $scope.hits.series[4].data = [];
              $scope.hits.series[5].data = [];
              rev_avg_ = 0;
              origin_avg_ = 0;
              rev_median_ = 0;
              origin_median_ = 0;
              imp_avg_ = 0;
              imp_median_ = 0;
              tickInterval_ = 4;
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        //  ---------------------------------
        $scope.$watch('ngApp', function() {
          if ($scope.ngAccount || $scope.ngApp) {
            $scope.reload();
          }
        });
      }
    };
  }
})();
