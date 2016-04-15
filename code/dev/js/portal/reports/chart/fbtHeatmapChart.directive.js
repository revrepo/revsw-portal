( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Reports' )
    .directive( 'fbtHeatmapChart', fbtHeatmapChartDirective );

  /*@ngInject*/
  function fbtHeatmapChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/fbt-heatmap.html',
      scope: {
        flCountry: '=',
        ngDomain: '='
      },
      /*@ngInject*/
      controller: function( $scope, Stats, HeatmapsDrawer, Util ) {

        $scope.delay = '24';
        $scope._loading = false;

        $scope.reloadFBTStats = function() {
          if ( !$scope.ngDomain || !$scope.ngDomain.id ) {
            return;
          }

          $scope._loading = true;
          var opts = {
            domainId: $scope.ngDomain.id,
            from_timestamp: moment().subtract( $scope.delay, 'hours' ).valueOf(),
            to_timestamp: Date.now(),
          };
          Stats.fbt_heatmap( opts )
            .$promise
            .then( function( data ) {

              var fbt_data = [];
              if ( data.data && data.data.length > 0 ) {
                data.data.forEach( function( item ) {
                  fbt_data.push({
                    id: item.key.toUpperCase(),
                    name: ( $scope.flCountry[ item.key.toUpperCase() ] || item.key ),
                    value: item.fbt_avg_ms,
                    tooltip: ( 'Avg: <strong>' + Util.formatNumber( item.fbt_avg_ms ) +
                      '</strong> Min: <strong>' + Util.formatNumber( item.fbt_min_ms ) +
                      '</strong> Max: <strong>' + Util.formatNumber( item.fbt_max_ms ) +
                      '</strong> ms' )
                  });
                });
              }
              HeatmapsDrawer.drawWorldMap( '#canvas-svg', fbt_data );
            })
            .finally( function() {
              $scope._loading = false;
            });
        };

        $scope.$watch( 'ngDomain', function() {
          if ( !$scope.ngDomain ) {
            return;
          }
          $scope.reloadFBTStats();
        });
      }
    };
  }

} )();

