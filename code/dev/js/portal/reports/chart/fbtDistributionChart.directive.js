(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('fbtDistributionChart', fbtDistributionChartDirective);

  /*@ngInject*/
  function fbtDistributionChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/fbt-distribution.html',
      scope: {
        ngDomain: '='
      },
      /*@ngInject*/
      controller: function ($scope, Stats, Util) {

        $scope.delay = '6';
        $scope._ims = 300;
        $scope._loading = false;
        $scope.chartOptions = {
          yAxis: {
            title: {
              text: 'Requests'
            },
            labels: {
              formatter: function() {
                return this.value;
              }
            }
          },
          tooltip: {
            formatter: function() {
              return '<strong>'+ this.x + '÷' + ( this.x + $scope._ims ) +
                '</strong> ms<br/>' + 'Count: <strong>' + this.y + '</strong>';
            }
          }
        };

        $scope.reloadTrafficStats = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          Stats.fbt_distribution({
              domainId: $scope.ngDomain.id,
              from_timestamp: moment().subtract( $scope.delay, 'hours').valueOf(),
              to_timestamp: Date.now()
            })
            .$promise
            .then(function (data) {
              var series = [{
                name: 'FBT Distribution',
                data: []
              }];
              if (data.data && data.data.length > 0) {
                var labels = [];
                $scope._ims = data.metadata.interval_ms || 300;
                angular.forEach(data.data, function (data) {
                  labels.push( data.key / 1000 );
                  series[0].data.push( data.requests );
                });
                $scope.traffic = {
                  labels: labels,
                  series: series
                };
              } else {
                $scope.traffic = {
                  labels: [],
                  series: series
                };
              }
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function () {
          if (!$scope.ngDomain) {
            return;
          }
          $scope.reloadTrafficStats();
        });
      }
    };
  }
})();
