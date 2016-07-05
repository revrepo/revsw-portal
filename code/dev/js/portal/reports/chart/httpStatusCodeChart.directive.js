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
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, $q, Util) {
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
          series: []
        };

        //  ---------------------------------
        var tickInterval_ = 10;
        $scope.chartOptions = {
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
          if (!$scope.ngDomain || !$scope.ngDomain.id || !$scope.statusCodes || !$scope.statusCodes.length) {
            return;
          }
          var promises = {};
          var series = [];
          var labels = [];
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
          var timeSet = false;
          $q.all(promises)
            .then(function(data) {
              labels = [];
              var interval = 1800;
              _.forEach(data, function(val, idx) {
                if (data[idx].metadata.interval_sec) {
                  interval = data[idx].metadata.interval_sec;
                }
                var offset = interval * 1000;
                var results = [];
                var total = 0;
                if (data[idx].data && data[idx].data.length > 0) {
                  data[idx].data.forEach(function(item, idx, items) {
                    if (!timeSet) {

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
                    }
                    total += item.requests / interval;
                    results.push(item.requests / interval);
                  });
                  timeSet = true;
                  if (total === 0) {
                    results.length = 0;
                  }
                }

                series.push({
                  name: idx,
                  data: results
                });
              });

              $scope.traffic = {
                labels: labels,
                series: series
              };
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function() {
          $scope.reload();
        });
        $scope.$watch('statusCodes', function() {
          $scope.reload();
        });
      }
    };
  }
})();
