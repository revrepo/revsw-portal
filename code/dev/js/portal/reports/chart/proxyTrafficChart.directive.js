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
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, Util) {
        var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os'];

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
          hits_total_ = 0;

        $scope.chartOptions = {
          chart: {
            events: {
              redraw: function() {
                if ( info_ ) {
                  info_.destroy();
                  info_ = null;
                }
                info_ = this/*chart*/.renderer
                  .label( 'RPS Avg <span style="font-weight: bold; color: #3c65ac;">' + ( Math.round( rps_avg_ * 1000 ) / 1000 ) +
                      '</span> Max <span style="font-weight: bold; color: #3c65ac;">' + ( Math.round( rps_max_ * 1000 ) / 1000 ) +
                      '</span><br>Hits Total <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber( hits_total_ ) +
                      '</span>',
                      this.xAxis[0].toPixels( 0 ), 3, '', 0, 0, true/*html*/ )
                  .css({ color: '#444' })
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
                return Util.formatNumber( this.value );
              }
            }
          },
          tooltip: {
            formatter: function() {
              return '<strong>' + this.x + '</strong><br/>' +
                this.series.name + ': <strong>' + Util.formatNumber( this.y, 3 ) + '</strong>';
            }
          }
        };

        //  ---------------------------------
        $scope.reloadTrafficStats = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          $scope.traffic = {
            labels: [],
            series: [{
              name: 'Total',
              data: []
            }]
          };
          Stats.traffic(angular.merge({
              domainId: $scope.ngDomain.id
            }, generateFilterParams($scope.filters)))
            .$promise
            .then(function(data) {
              if (data.data && data.data.length > 0) {
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                var series = [{
                  name: 'Total',
                  data: []
                }];
                var labels = [];
                data.data.forEach( function(item) {
                  labels.push(moment(item.time + offset /*to show the _end_ of interval instead of begin*/ ).format('MMM Do YY h:mm'));
                  var rps = item.requests / interval;
                  rps_avg_ += rps;
                  if ( rps > rps_max_ ) {
                    rps_max_ = rps;
                  }
                  hits_total_ += item.requests;
                  series[0].data.push( rps );
                });
                rps_avg_ /= data.data.length;
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
