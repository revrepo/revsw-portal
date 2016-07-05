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
        var info_ = null,
          CODES_NUM = 5,
          codeStats = [],
          bigTotal = 0,
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
                  .label( codeStats.reduce( function( prev, item ) {
                      return prev +
                        'Code <span style="font-weight: bold; color: #3c65ac;">' + item.code +
                        '</span>: <span style="font-weight: bold">' + item.requests +
                        '</span> Requests or <span style="font-weight: bold">' + item.percent.toFixed( 2 ) +
                        '</span> %<br>';
                      }, '' ),
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
          $scope.traffic = {
            labels: [],
            series: []
          };

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
          codeStats = [];
          bigTotal = 0;

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

              codeStats.sort( function( lhs, rhs) {
                return rhs.requests - lhs.requests;
              });
              if ( codeStats.length > CODES_NUM ) {
                var total = 0;
                for ( var i = CODES_NUM - 1, len = codeStats.length; i < len; ++i ) {
                  total += codeStats[i].requests;
                }
                codeStats.length = CODES_NUM - 1;
                codeStats.push({
                  code: 'Others',
                  requests: total
                });
              }
              bigTotal /= 100;
              codeStats.forEach( function( item ) {
                item.percent = item.requests / bigTotal;
              });

              // console.log( $scope.traffic );
              // console.log( series );
              // console.log( labels );
              $scope.traffic = {
                labels: labels,
                series: series
              };
              // console.log( $scope.traffic );

            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        // $scope.$watch('ngDomain', function() {
        //   $scope.reload();
        // });
        $scope.$watch('statusCodes', function() {
          $scope.reload();
        });
      }
    };
  }
})();
