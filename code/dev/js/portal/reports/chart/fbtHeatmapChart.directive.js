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
        ngDomain: '=',
        isAutoReload: '@?'
      },
      /*@ngInject*/
      controller: function( $scope, Stats, HeatmapsDrawer, Util, $config, $sce ) {

        $scope.delay = '24';
        $scope._loading = false;
        var drawer = HeatmapsDrawer.create('#canvas-svg');

        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('The heatmap shows the FBT metric for different regions of the world. ' +
          'You can click on "Show USA Map" button to show the map of the United States.');

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

              var world = [],
                usa = [];

              if (data.data && data.data.length > 0) {
                data.data.forEach( function (item) {
                  var key = item.key.toUpperCase();
                  world.push({
                    name: ( $scope.flCountry[key] || item.key ),
                    id: key,
                    value: item.fbt_avg_ms,
                    tooltip: ( 'Avg: <strong>' + Util.formatNumber( item.fbt_avg_ms ) +
                      '</strong> Min: <strong>' + Util.formatNumber( item.fbt_min_ms ) +
                      '</strong> Max: <strong>' + Util.formatNumber( item.fbt_max_ms ) +
                      '</strong> ms' )
                  });

                  if ( key === 'US' && item.regions ) {
                    usa = item.regions;
                  }
                });

                usa = usa.map( function( item ) {
                  return {
                    id: item.key,
                    name: item.key,
                    value: item.fbt_avg_ms,
                    tooltip: ( 'Avg: <strong>' + Util.formatNumber( item.fbt_avg_ms ) +
                      '</strong> Min: <strong>' + Util.formatNumber( item.fbt_min_ms ) +
                      '</strong> Max: <strong>' + Util.formatNumber( item.fbt_max_ms ) +
                      '</strong> ms' )
                  };
                });
              }
              drawer.drawCurrentMap( {
                world: world,
                usa: usa
              });
            })
            .finally( function() {
              $scope._loading = false;
            });
        };

        $scope.$watch( 'ngDomain', function() {
          if (!$scope.ngDomain || $scope.isAutoReload === 'false') {
            return;
          }
          $scope.reloadFBTStats();
        });
      }
    };
  }

} )();

