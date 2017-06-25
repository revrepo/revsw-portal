(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('fbtAverageChart', fbtAverageChartDirective);

  /*@ngInject*/
  function fbtAverageChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/fbt-average.html',
      scope: {
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        ngDomain: '=',
        filtersSets: '=',
        isAutoReload: '@?'
      },
      /*@ngInject*/
      controller: function($q, $scope, Stats, Util) {
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
              if (key === 'count_last_day' || key === 'delay') {
                params.from_timestamp = moment().subtract(val, 'days').valueOf();
                params.to_timestamp = Date.now();
                delete params[key];
              }
            }
          });
          return params;
        }

        $scope.delay = '1';
        $scope.os = '';
        $scope.country = '';
        $scope.device = '';
        $scope.browser = '';
        $scope._loading = false;
        $scope.hasFailedToLoadData = false;

        //  ---------------------------------
        var info_ = null,
          avg_ = 0,
          median_ = 0,
          max_ = 0,
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
                var _text = 'FBT Avg <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(avg_ / 1000, 1) +
                  '</span> Median <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(median_ / 1000, 1) +
                  '</span> Max <span style="font-weight: bold; color: black;">' + Util.formatNumber(max_ / 1000, 1) +
                  '</span> ms';
                if($scope.hasFailedToLoadData === true) {
                  _text = '<strong style="color: red;"> Failed to retrieve the data - please try again later </strong>';
                }
                info_ = this /*chart*/ .renderer
                  .label( _text ,
                    this.xAxis[0].toPixels(0), 0, '', 0, 0, true /*html*/ )
                  .css({
                    color: '#444'
                  })
                  .attr({
                    fill: 'rgba(240, 240, 240, 0.6)',
                    stroke: $scope.hasFailedToLoadData ? 'red' : '#3c65ac', // NOTE: border color
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
              text: 'First Byte Time, ms'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber(Math.round(this.value / 1000));
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
                this.series.name + ': <strong>' + Util.formatNumber(this.y / 1000, 2) + '</strong> ms';
            }
          }
          // subtitle: {
          //   align: 'right',
          //   text: 'displayed time is local to the computer',
          //   y: 15, x: -30/*to left from the print button*/
          //   y: 300, x: 0/*bottom*/
          // }
        };

        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now()
        };

        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }

        //  ---------------------------------
        $scope.reloadTrafficStats = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }

          $scope._loading = true;
          $scope.hasFailedToLoadData = false;
          var labels = [];
          var series = [{
            name: 'Average FBT',
            data: []
          }];
          if ($scope.delay !== '') {
            $scope.filters.count_last_day = $scope.delay;
          }
          if ($scope.country !== '') {
            $scope.filters.country = $scope.country;
          }
          if ($scope.device !== '') {
            $scope.filters.device = $scope.device;
          }
          if ($scope.os !== '') {
            $scope.filters.os = $scope.os;
          }
          if ( $scope.browser !== '' ) {
            $scope.filters.browser = $scope.browser;
          }

          Stats.fbt_average(angular.merge({
              domainId: $scope.ngDomain.id
            }, generateFilterParams($scope.filters)))
            .$promise
            .then(function(data) {
              if (data.data && data.data.length > 0) {
                avg_ = max_ = median_ = 0;
                var offset = (data.metadata.interval_sec || 1800) * 1000;
                var cnt_ = 0;
                // console.log( data );
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

                  if (max_ < item.avg_fbt) {
                    max_ = item.avg_fbt;
                  }
                  if (item.requests) {
                    avg_ += item.avg_fbt;
                    ++cnt_;
                    series[0].data.push(item.avg_fbt);
                  } else {
                    series[0].data.push(null);
                  }
                });

                if (cnt_) {
                  avg_ /= cnt_;

                  //  median
                  var avg_t = data.data.filter(function(item) {
                    return item.requests !== 0;
                  }).map(function(item) {
                    return item.avg_fbt;
                  }).sort(function(lhs, rhs) {
                    return lhs - rhs;
                  });
                  var idx0 = avg_t.length - 1,
                    idx1 = Math.ceil(idx0 / 2);
                  idx0 = Math.floor(idx0 / 2);
                  median_ = (idx0 === idx1) ? avg_t[idx0] : (avg_t[idx0] + avg_t[idx1]) / 2;
                }
                return $q.when(series);
              } else {
                return $q.when(series);
              }
            })
            .then(function setNewData(data) {
              // model better to update once
              $scope.traffic = {
                labels: labels,
                series: series
              };
            })
            .catch(function(err) {
              $scope.traffic = {
                labels: labels,
                series: series
              };
              $scope.hasFailedToLoadData = true;
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function() {
          if (!$scope.ngDomain || $scope.isAutoReload === 'false') {
            return;
          }
          $scope.reloadTrafficStats();
        });
      }
    };
  }
})();
