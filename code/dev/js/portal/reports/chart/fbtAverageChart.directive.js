(function () {
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
        ngDomain: '='
      },
      /*@ngInject*/
      controller: function ($scope, Stats, Util) {

        $scope.delay = '1';
        $scope.os = '';
        $scope.country = '';
        $scope.device = '';
        $scope._loading = false;

        $scope.chartOptions = {
          yAxis: {
            title: {
              text: 'Time, ms'
            },
            labels: {
              formatter: function() {
                return this.value;
              }
            }
          },
          tooltip: {
            formatter: function() {
              return '<strong>'+ this.x +'</strong><br/>'+
              this.series.name + ': <strong>' + this.y.toFixed(1) + '</strong>';
            }
          }
        };

        $scope.reloadTrafficStats = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          var opts = {
              domainId: $scope.ngDomain.id,
              from_timestamp: moment().subtract( $scope.delay, 'days').valueOf(),
              to_timestamp: Date.now(),
            };
          if ( $scope.country !== '' ) {
            opts.country = $scope.country;
          }
          if ( $scope.device !== '' ) {
            opts.device = $scope.device;
          }
          if ( $scope.os !== '' ) {
            opts.os = $scope.os;
          }
          Stats.fbt_average( opts )
            .$promise
            .then(function (data) {
              var series = [{
                name: 'Average FBT',
                data: []
              }];
              if (data.data && data.data.length > 0) {
                var labels = [];
                // $scope.delay = data.metadata.interval_sec || 1800;
                angular.forEach(data.data, function (data) {
                  labels.push(moment(data.time).format('MMM Do YY h:mm'));
                  series[0].data.push( data.avg_fbt );
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
