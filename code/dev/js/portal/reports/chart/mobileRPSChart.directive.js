( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileRpsChart', mobileRpsChartDirective );

  /*@ngInject*/
  function mobileRpsChartDirective() {

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

        $scope.heading = 'Requests Per Second Graph';
        $scope.span = '1';
        $scope._loading = false;

        $scope.hits = {
          labels: [],
          series: []
        };

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
        $scope.chartOptions = {
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

          $scope._loading = true;
          $scope.hits = {
            labels: [],
            series: [{
              name: 'RPS',
              data: []
            }]
          };

          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ( $scope.ngApp || null );
          return Stats.sdk_flow( $scope.filters )
            .$promise
            .then( function( data ) {

              var hits_series = [ {
                name: 'RPS',
                data: []
              } ];

              if ( data.data && data.data.length > 0 ) {
                var labels = [];
                var hits_total = 0;
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                // console.log( data );
                angular.forEach( data.data, function( item ) {
                  labels.push( moment( item.time + offset /*to show the _end_ of interval instead of begin*/ ).format( 'MMM Do YY h:mm' ) );
                  hits_series[ 0 ].data.push( Math.round( 1000 * item.hits / interval ) / 1000 );
                  hits_total += item.hits;
                } );
                if ( hits_total ) {
                  $scope.hits = {
                    labels: labels,
                    series: hits_series
                  };
                }
              }
            })
            .finally( function() {
              $scope._loading = false;
            } );
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

