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

        $scope.delay = '6';
        $scope._loading = false;
        $scope.fbtCountryData = {};

        $scope.reloadFBTStats = function() {
          if ( !$scope.ngDomain || !$scope.ngDomain.id ) {
            return;
          }

          HeatmapsDrawer.clearMap( '#canvas-svg' );

          $scope._loading = true;
          var opts = {
            domainId: $scope.ngDomain.id,
            from_timestamp: moment().subtract( $scope.delay, 'hours' ).valueOf(),
            to_timestamp: Date.now(),
          };
          Stats.fbt_heatmap( opts )
            .$promise
            .then( function( data ) {

              var cdata = {};
              if ( data.data && data.data.length > 0 ) {
                angular.forEach( data.data, function( item ) {
                  var name = $scope.flCountry[ item.key.toUpperCase() ] || item.key;
                  cdata[ name ] = {
                    value: item.fbt_avg_ms,
                    tooltip: ( 'Avg: <strong>' + Util.formatNumber( item.fbt_avg_ms ) +
                      '</strong> Min: <strong>' + Util.formatNumber( item.fbt_min_ms ) +
                      '</strong> Max: <strong>' + Util.formatNumber( item.fbt_max_ms ) +
                      '</strong> ms' )
                  };
                } );
              }

              // console.log( cdata );
              $scope.fbtCountryData = cdata;
              HeatmapsDrawer.drawMap( '#canvas-svg', '#tooltip-container', $scope.fbtCountryData );
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
        } );

        // Draw a empty world map
        HeatmapsDrawer.drawMap( '#canvas-svg', '#tooltip-container', {} );
      }
    };
  }
} )();

