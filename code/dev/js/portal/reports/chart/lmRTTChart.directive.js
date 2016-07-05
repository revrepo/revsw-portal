(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('lmRTTChart', lmRTTChartDirective);

  /*@ngInject*/
  function lmRTTChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/lm-rtt.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, Util) {
        var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os', 'browser'];

        function generateFilterParams(filters) {
          var params = {
            from_timestamp: moment().subtract(1, 'days').valueOf(),
            to_timestamp: Date.now()
          };
          _.forEach(filters, function(val, key) {
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
        $scope._loading = false;
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now()
        };

        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }

        $scope.traffic = {
          labels: [],
          series: [{
            name: 'Latency, ms',
            data: []
          }]
        };

        //  ---------------------------------
        var info_ = null,
          lm_rtt_avg_ = 0,
          lm_rtt_max_ = 0,
          lm_rtt_min_ = 1000000,
          hits_total_ = 0,
          tickInterval_ = 10;

        $scope.chartOptions = {
          chart: {
            events: {
              redraw: function() {
                if (info_) {
                  info_.destroy();
                  info_ = null;
                }
                info_ = this /*chart*/ .renderer
                  .label('LM RTT Avg <span style="font-weight: bold; color: #3c65ac;">' + (Math.round(lm_rtt_avg_ * 1000) / 1000) +
                    '</span> Max <span style="font-weight: bold; color: #3c65ac;">' + (Math.round(lm_rtt_max_ * 1000) / 1000) +
                    '</span> Min <span style="font-weight: bold; color: #3c65ac;">' + (Math.round(lm_rtt_min_ * 1000) / 1000) +
                    '</span><br>Hits Total <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(hits_total_) +
                    '</span>',
                    this.xAxis[0].toPixels(0), 3, '', 0, 0, true /*html*/ )
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
              text: 'Latency'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber(this.value);
              }
            }
          },
          xAxis: {
            crosshair: {
              width: 1,
              color: '#000000'
            },
            tickInterval: tickInterval_,
            labels: {
              autoRotation: false,
              useHTML: true,
              formatter: function() {
                return this.value.label;
              }
            }
          },
          tooltip: {
            formatter: function() {
              return this.key.tooltip + '<br/>' +
                this.series.name + ': <strong>' + Util.formatNumber(this.y, 3) + '</strong>';
            }
          }
        };

        //  ---------------------------------
        $scope.reload = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          Stats.lm_rtt_stats(angular.merge({
              domainId: $scope.ngDomain.id
            }, generateFilterParams($scope.filters)))
            .$promise
            .then(function(data) {

              lm_rtt_avg_ = lm_rtt_max_ = hits_total_ = 0;
              if (data.data && data.data.length > 0) {
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                var series = [{
                  name: 'Latency, ms',
                  data: []
                }];
                var labels = [];
                data.data.forEach(function(item, idx, items) {

                  var val = moment(item.time + offset);
                  var label;
                  if (idx % tickInterval_) {
                    label = '';
                  } else if (idx === 0 ||
                    (new Date(item.time + offset)).getDate() !== (new Date(items[idx - tickInterval_].time + offset)).getDate()) {
                    label = val.format('[<span style="color: #000; font-weight: bold;">]HH:mm[</span><br>]MMM D');
                  } else {
                    label = val.format('[<span style="color: #000; font-weight: bold;">]HH:mm[</span>]');
                  }

                  labels.push({
                    tooltip: val.format('[<span style="color: #000; font-weight: bold;">]HH:mm[</span>] MMMM Do YYYY'),
                    label: label
                  });

                  lm_rtt_avg_ += item.lm_rtt_avg;
                  if (item.lm_rtt_max > lm_rtt_max_) {
                    lm_rtt_max_ = item.lm_rtt_max;
                  }
                  if (item.lm_rtt_min < lm_rtt_min_) {
                    lm_rtt_min_ = item.lm_rtt_min;
                  }
                  hits_total_ += item.requests;
                  series[0].data.push(item.lm_rtt_avg);
                });
                lm_rtt_avg_ /= data.data.length;
                $scope.traffic = {
                  labels: labels,
                  series: series
                };
              }
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function() {
          if (!$scope.ngDomain) {
            return;
          }
          $scope.reloadTrafficStats();
        });
      }
    };
  }
})();
