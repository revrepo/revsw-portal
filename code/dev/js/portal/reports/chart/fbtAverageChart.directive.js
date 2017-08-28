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
      controller: function($q, $scope, Stats, Util, EventsSerieDataService) {
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
                delete params[key];
              }
            }
          });
          return params;
        }

        $scope._loading = false;
        $scope.hasFailedToLoadData = false;

        //  ---------------------------------
        var info_ = null,
          avg_ = 0,
          median_ = 0,
          max_ = 0;

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
                if ($scope.hasFailedToLoadData === true) {
                  _text = '<strong style="color: red;"> Failed to retrieve the data - please try again later </strong>';
                }
                info_ = this /*chart*/ .renderer
                  .label(_text,
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
            // title: {
            //   text: 'Date'
            // },
            crosshair: {
              width: 1,
              color: '#000000'
            },
            // tickInterval: 4,
            type: 'datetime',
            pointInterval: 24 * 60 * 60 * 1000,
          },
          tooltip: {
            xDateFormat: '<span style="color: #000; font-weight: bold;">%H:%M</span> %b %d',
            shared: true,
            headerFormat: '{point.key}<br/>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.3f}</b><br/>'
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
          to_timestamp: Date.now(),
          // NOTE: default filtee values
          count_last_day: '1',
          os: '',
          country: '',
          device: '',
          browser: '',
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
          var _xAxisPointStart = null;
          var _xAxisPointInterval = null;
          var series = [{
            name: 'Average FBT',
            data: []
          }];

          Stats.fbt_average(angular.merge({
              domainId: $scope.ngDomain.id
            }, generateFilterParams($scope.filters)))
            .$promise
            .then(function(data) {
              if (data.data && data.data.length > 0) {
                _xAxisPointStart = parseInt(data.metadata.start_timestamp);
                _xAxisPointInterval = parseInt(data.metadata.interval_sec) * 1000;
                avg_ = max_ = median_ = 0;
                var offset = (data.metadata.interval_sec || 1800) * 1000;
                var cnt_ = 0;
                // console.log( data );
                data.data.forEach(function(item, idx, items) {
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
            // NOTE: add event data
            .then(function(series) {
              var filterParams = generateFilterParams($scope.filters);
              var options = {
                from_timestamp: filterParams.from_timestamp,
                to_timestamp: filterParams.to_timestamp,
                domain_id: $scope.ngDomain.id,
              };
              return EventsSerieDataService.extendSeriesEventsDataForDomainId(series, options);
            })
            .then(function setNewData(data) {
              // model better to update once
              $scope.traffic = {
                pointStart: _xAxisPointStart,
                pointInterval: _xAxisPointInterval,
                series: series
              };
            })
            .catch(function(err) {
              $scope.traffic = {
                pointStart: _xAxisPointStart,
                pointInterval: _xAxisPointInterval,
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
