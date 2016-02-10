( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileAbSpeedChart', mobileAbSpeedChartDirective );

  /*@ngInject*/
  function mobileAbSpeedChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-base-traffic.html',
      scope: {
        ngAccount: '=',
        ngApp: '=',
        flOses: '=',
        flDevices: '=',
        flCountries: '=',
        flOperators: '=',
        flNetworks: '='
      },
      /*@ngInject*/
      controller: function( $scope, Stats, Util ) {

        $scope.heading = 'Average Request Speed Graph';
        $scope.span = '1';
        $scope._loading = false;

        //  ---------------------------------
        $scope.chartOptions = {
          yAxis: {
            title: {
              text: 'Speed Kb/s'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber( this.value / 1024, 0 );
              }
            }
          },
          xAxis: {
            crosshair: {
              width: 1,
              color: '#000000'
            }
          },
          tooltip: {
            formatter: function() {
              return '<strong>' + this.x + '</strong><br/>' +
                this.series.name + ': <strong>' + Util.convertTraffic( this.y ) + '</strong>';
            }
          }
        };

        $scope.hits = {
          labels: [],
          series: [{
            name: 'Origin',
            data: [],
            color: Highcharts.getOptions().colors[0],
            marker: { radius: 4, symbol: 'circle' }
          }, {
            name: 'RevAPM',
            data: [],
            color: Highcharts.getOptions().colors[1],
            marker: { radius: 4, symbol: 'diamond' }
          }]
        };

        //  ---------------------------------
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now(),
          os: null,
          device: null,
          country: null,
          operator: null,
          network: null
        };

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          $scope.hits.labels = [];
          $scope.hits.series[0].data = [];
          $scope.hits.series[1].data = [];

          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ( $scope.ngApp || null );
          return Stats.sdk_ab_speed( $scope.filters )
            .$promise
            .then( function( data ) {

              if ( data.data && data.data.length > 0 ) {
                var labels = [];
                var hits = {
                  rev_edge: [],
                  origin: [],
                };
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                var labels_filled = false;
                // console.log( data );
                angular.forEach( data.data, function( dest ) {
                  angular.forEach( dest.items, function( item ) {
                    if ( !labels_filled ) {
                      labels.push( moment( item.key + offset /*to show the _end_ of interval instead of begin*/ ).format( 'MMM Do YY h:mm' ) );
                    }
                    hits[dest.key].push( ( item.count ? ( item.received_bytes * 1000 / item.time_spent_ms ) : null ) );
                  });
                  labels_filled = true;
                } );
                $scope.hits.labels = labels;
                $scope.hits.series[0].data = hits.origin;
                $scope.hits.series[1].data = hits.rev_edge;
              }
            })
            .finally( function() {
              $scope._loading = false;
            });
        };

        //  ---------------------------------
        $scope.$watch( 'ngApp', function() {
          if ( $scope.ngAccount || $scope.ngApp ) {
            $scope.reload();
          }
        });
      }
    };
  }
} )();

