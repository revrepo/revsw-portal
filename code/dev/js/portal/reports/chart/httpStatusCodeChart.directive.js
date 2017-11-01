(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('httpStatusCodeChart', httpStatusCodeChartDirective);

  /*@ngInject*/
  function httpStatusCodeChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/traffic-common.html',
      scope: {
        ngDomain: '=',
        statusCodes: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        filtersSets: '=',
        isAutoReload: '@?'
      },
      /*@ngInject*/
      controller: function($scope, Stats, $q, Util, EventsSerieDataService, $sce, $config) {
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
        $scope.heading = 'HTTP Status Code Hits';
        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('TODO text <a href="/demo">DEMO LINK </a> ');

        $scope._loading = false;
        $scope.hasFailedToLoadData = false;
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now()
        };
        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }

        $scope.traffic = {
          series: [{ name: '200', data: [] }]
        };

        //  ---------------------------------
        var info_ = null,
          CODES_NUM = 5,
          codeStats = [],
          bigTotal = 0,
          tickInterval_ = 10;

        $scope.chartOptions = {
          chart: {
            zoomType: 'x',
            events: {
              redraw: function() {
                if (info_) {
                  info_.destroy();
                  info_ = null;
                }
                if(!codeStats.length) {
                  return;
                }
                var x = this.xAxis[0].toPixels(this.xAxis[0].min) + 3;
                var _text = codeStats.reduce(function(prev, item) {
                  return prev +
                    'Code <span style="font-weight: bold; color: #3c65ac;">' + item.code +
                    '</span>: <span style="font-weight: bold">' + Util.formatNumber(item.requests) +
                    '</span> Requests or <span style="font-weight: bold">' + item.percent.toFixed(2) +
                    '</span>%<br>';
                }, '');
                // NOTE: information about error
                if($scope.hasFailedToLoadData === true) {
                  _text = '<strong style="color: red;"> Failed to retrieve the data - please try again later </strong>';
                }
                info_ = this /*chart*/ .renderer
                  .label(_text,
                    x /* x */ , 3 /*y*/ , '', 0, 0, true /*html*/ )
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
            },
          },
          yAxis: {
            title: {
              text: 'Requests Per Second'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber(this.value);
              }
            }
          },
          xAxis: {
            type: 'datetime',
            pointInterval: 24 * 60 * 60 * 10000,
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
        $scope.reload = function() {

          if (!$scope.ngDomain || !$scope.ngDomain.id || !$scope.statusCodes || !$scope.statusCodes.length) {
            $scope.traffic = {
              series: [{
                name: '200',
                data: []
              }]
            };
            return;
          }

          var promises = {};
          var series = [];
          $scope._loading = true;
          $scope.hasFailedToLoadData = false;
          var _xAxisPointStart = null;
          var _xAxisPointInterval = null;
          $scope.statusCodes.forEach(function(code) {
            if (!code) {
              return;
            }
            promises[code] = Stats.traffic(angular.merge({
              domainId: $scope.ngDomain.id
            }, generateFilterParams($scope.filters), {
              status_code: code
            })).$promise;
          });
          $scope._loading = true;
          var timeSet = !false;
          bigTotal = 0;

          $q.all(promises)
            .then(function(data) {
              if (data) {
                codeStats.length = 0;
                _.forEach(data, function(val, idx) {
                  var interval = parseInt(data[idx].metadata.interval_sec || 1800);
                  _xAxisPointStart = parseInt(data[idx].metadata.start_timestamp);
                  _xAxisPointInterval = parseInt(data[idx].metadata.interval_sec) * 1000;
                  var results = [];
                  var total = 0;
                  if (data[idx].data && data[idx].data.length > 0) {
                    data[idx].data.forEach(function(item, idx, items) {
                      total += item.requests;
                      results.push(item.requests / interval);
                    });
                    timeSet = true;
                    if (total === 0) {
                      results.length = 0;
                    } else {
                      codeStats.push({
                        code: idx,
                        requests: total
                      });
                      bigTotal += total;
                    }
                  }

                  series.push({
                    name: idx,
                    data: results
                  });
                });

                codeStats.sort(function(lhs, rhs) {
                  return rhs.requests - lhs.requests;
                });
                if (codeStats.length > CODES_NUM) {
                  var total = 0;
                  for (var i = CODES_NUM - 1, len = codeStats.length; i < len; ++i) {
                    total += codeStats[i].requests;
                  }
                  codeStats.length = CODES_NUM - 1;
                  codeStats.push({
                    code: 'Others',
                    requests: total
                  });
                }
                bigTotal /= 100;
                codeStats.forEach(function(item) {
                  item.percent = item.requests / bigTotal;
                });
                return $q.when(series);
              } else {
                return $q.when(series);
              }
            })
            .then(function(series) {
              // NOTE: add events data
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

        $scope.$watch('statusCodes', function() {
          if ($scope.isAutoReload === 'false') {
            return;
          }
          $scope.reload();
        });

        //  the code below commented out _intentionally_ to avoid redundant heavy API requests and graph re-renderings
        //  the point is that the 'ngDomain' update event always followed by the 'statusCodes' event, around 1s later
        //  (the same applied to the dashboards widgets too)
        //  so the one above watcher is enough
        //  uncomment debug logging and see it by yourself

        // $scope.$watch('ngDomain', function() {
        //   // debug
        //   console.log( 'ngDomain' );
        //   $scope.reload();
        // });
      }
    };
  }
})();
