(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('requestStatusChart', requestStatusChartDirective);

  /*@ngInject*/
  function requestStatusChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/request-status.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, $q, Util) {

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
            name: 'Successful',
            data: []
          }, {
            name: 'Failed',
            data: []
          }]
        };

        //  ---------------------------------
        var info_ = null,
          success_ = 0,
          failure_ = 0;

        $scope.chartOptions = {
          chart: {
            events: {
              redraw: function() {
                if ( info_ ) {
                  info_.destroy();
                  info_ = null;
                }
                info_ = this/*chart*/.renderer
                  .label( 'Successful <span style="font-weight: bold; color: #3c65ac;">' +  Util.formatNumber( success_ ) +
                      '</span> Requests, <span style="font-weight: bold; color: #3c65ac;">' + ( Math.round( success_ * 1000 / ( failure_ + success_ ) ) / 10 ) +
                      '</span>%<br> Failed <span style="font-weight: bold; color: darkred;">' + Util.formatNumber( failure_ ) +
                      '</span> Requests, <span style="font-weight: bold; color: darkred;">' + ( Math.round( failure_ * 1000 / ( failure_ + success_ ) ) / 10 ) +
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
              name: 'Successful',
              data: []
            }, {
              name: 'Failed',
              data: []
            }]
          };

          $q.all([

              Stats.traffic(angular.merge({
                  domainId: $scope.ngDomain.id
                }, $scope.filters, {
                  request_status: 'OK'
                })).$promise,

              Stats.traffic(angular.merge({
                  domainId: $scope.ngDomain.id
                }, $scope.filters, {
                  request_status: 'ERROR'
                })).$promise

            ])
            .then(function(data) {
              var interval = data[0].metadata.interval_sec || 1800;
              var offset = interval * 1000;
              var labels = [];
              var series = [{
                name: 'Successful',
                data: []
              }, {
                name: 'Failed',
                data: []
              }];
              if (data[0].data && data[0].data.length > 0) {
                data[0].data.forEach( function(item) {
                  success_ += item.requests;
                  labels.push(moment(item.time + offset /*to show the _end_ of interval instead of begin*/ ).format('MMM Do YY h:mm'));
                  series[0].data.push( item.requests / interval );
                });
              }
              if (data[1].data && data[1].data.length > 0) {
                data[1].data.forEach( function(item) {
                  failure_ += item.requests;
                  series[1].data.push( item.requests / interval );
                });
              }
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
