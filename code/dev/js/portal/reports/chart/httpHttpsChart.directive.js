(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('httpHttpsChart', httpHttpsChartDirective);

  /*@ngInject*/
  function httpHttpsChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/http-https.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, $q, Util) {
        var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os'];
        $scope._loading = false;
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now()
        };

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

        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }

        $scope.traffic = {
          labels: [],
          series: [{
            name: 'HTTP',
            data: []
          }, {
            name: 'HTTPS',
            data: []
          }]
        };

        //  ---------------------------------
        var info_ = null,
          https_ = 0,
          http_ = 0;

        $scope.chartOptions = {
          chart: {
            events: {
              redraw: function() {
                if ( info_ ) {
                  info_.destroy();
                  info_ = null;
                }
                info_ = this/*chart*/.renderer
                  .label( 'HTTPS <span style="font-weight: bold; color: #3c65ac;">' +  Util.formatNumber( https_ ) +
                      '</span> Requests, <span style="font-weight: bold; color: #3c65ac;">' + ( Math.round( https_ * 1000 / ( http_ + https_ ) ) / 10 ) +
                      '</span>%<br> HTTP <span style="font-weight: bold; color: black;">' + Util.formatNumber( http_ ) +
                      '</span> Requests, <span style="font-weight: bold; color: black;">' + ( Math.round( http_ * 1000 / ( http_ + https_ ) ) / 10 ) +
                      '</span>%',
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
        $scope.reload = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          $scope.traffic = {
            labels: [],
            series: [{
              name: 'HTTP',
              data: []
            }, {
              name: 'HTTPS',
              data: []
            }]
          };
          $q.all([

              Stats.traffic(angular.merge({
                domainId: $scope.ngDomain.id
              }, generateFilterParams($scope.filters), {
                protocol: 'HTTP'
              })).$promise,

              Stats.traffic(angular.merge({
                domainId: $scope.ngDomain.id
              }, generateFilterParams($scope.filters), {
                protocol: 'HTTPS'
              })).$promise

            ])
            .then(function(data) {
              var interval = data[0].metadata.interval_sec || 1800;
              var offset = interval * 1000;
              var labels = [];
              var series = [{
                name: 'HTTP',
                data: []
              }, {
                name: 'HTTPS',
                data: []
              }];
              if (data[0].data && data[0].data.length > 0) {
                data[0].data.forEach( function(item) {
                  http_ += item.requests;
                  labels.push(moment(item.time + offset /*to show the _end_ of interval instead of begin*/ ).format('MMM Do YY h:mm'));
                  series[0].data.push( item.requests / interval );
                });
              }
              if (data[1].data && data[1].data.length > 0) {
                data[1].data.forEach( function(item) {
                  https_ += item.requests;
                  series[1].data.push( item.requests / interval );
                });
              }
              // model better to update once
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
          if (!$scope.ngDomain) {
            return;
          }
          $scope.reload();
        });
      }
    };
  }
})();
