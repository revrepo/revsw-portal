(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('proxyTrafficChart', proxyTrafficChartDirective);

  /*@ngInject*/
  function proxyTrafficChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/proxy-traffic.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, Util, EventsSerieDataService, $q) {
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
            name: 'Total',
            data: []
          }]
        };

        //  ---------------------------------
        var info_ = null,
          rps_avg_ = 0,
          rps_max_ = 0,
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
                  .label('RPS Avg <span style="font-weight: bold; color: #3c65ac;">' + (Math.round(rps_avg_ * 1000) / 1000) +
                    '</span> Max <span style="font-weight: bold; color: #3c65ac;">' + (Math.round(rps_max_ * 1000) / 1000) +
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
            pointInterval: 24 * 60 * 60 * 1000,
          }
        };

        $scope.$watch('ngDomain', function() {
          if (!$scope.ngDomain) {
            return;
          }
          $scope.reloadTrafficStats();
        });
        //  ---------------------------------
        $scope.reloadTrafficStats = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          var _xAxisPointStart = null;
          var _xAxisPointInterval = null;
          var series = [{
            name: 'Total',
            data: [],
            tooltip: {
              headerFormat: '',
              pointFormatter: defaultPointFormatter
            }
          }];

          Stats.traffic(angular.merge({
              domainId: $scope.ngDomain.id
            }, generateFilterParams($scope.filters)))
            .$promise
            .then(function(data) {
              _xAxisPointStart = parseInt(data.metadata.start_timestamp);
              _xAxisPointInterval = parseInt(data.metadata.interval_sec) * 1000;
              rps_avg_ = rps_max_ = hits_total_ = 0;
              if (data.data && data.data.length > 0) {
                var interval = data.metadata.interval_sec || 1800;

                data.data.forEach(function(item, idx, items) {
                  var rps = item.requests / interval;
                  rps_avg_ += rps;
                  if (rps > rps_max_) {
                    rps_max_ = rps;
                  }
                  hits_total_ += item.requests;
                  series[0].data.push(rps);
                });
                rps_avg_ /= data.data.length;
                if (rps_avg_ === 0) {
                  series[0].data.length = 0;
                }
                return $q.when(series);
              } else {
                return $q.when(series);
              }
            })
            .then(function(data) {
              addEventsData(data);
              return data;
            })
            .then(function setNewData(data) {
              // model better to update once
              $scope.traffic = {
                pointStart: _xAxisPointStart,
                pointInterval: _xAxisPointInterval,
                series: series
              };
            })
            .finally(function() {
              $scope._loading = false;
            });
        };
        /**
         * @name  defaultPointFormatter
         * @description
         *   Point Formatter for
         * @return {String}
         */
        function defaultPointFormatter() {
          var val = moment(this.x).format('[<span style="color: #000; font-weight: bold;">]HH:mm[</span><br>]MMM D');
          return val + '<br/>' +
            this.series.name + ': ' + Util.convertTraffic(this.y);
        }
        /**
         * @name  addEventsData
         * @description
         *   Add to series new serie with Events
         * @param {Array} series
         */
        function addEventsData(series) {
          var filterParams = generateFilterParams($scope.filters);
          var options = {
            from_timestamp: filterParams.from_timestamp,
            to_timestamp: filterParams.to_timestamp,
            account_id: $scope.ngDomain.account_id,
            domain_id: $scope.ngDomain.id,
            domain_name: $scope.ngDomain.domain_name
          };
          return EventsSerieDataService.getEventsSerieDataForDomain(options)
            .then(function(data) {
              // NOTE: add new series data "Events"
              series.push(data);
            });
        }
      }
    };
  }
})();
