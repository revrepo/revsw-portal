( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileHttpCodesChart', mobileHttpCodesChartDirective );

  /*@ngInject*/
  function mobileHttpCodesChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-http-codes.html',
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

        $scope.span = '1';
        $scope._loading = false;
        $scope.hits = {
          labels: [],
          series: []
        };

        $scope.os = null;
        $scope.device = null;
        $scope.country = null;
        $scope.operator = null;
        $scope.network = null;

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
                this.series.name + ': <strong>' + Util.formatNumber( this.y, 2 ) + '</strong>';
            }
          }
        };

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          $scope.hits = {
            labels: [],
            series: []
            // series: [{
            //   name: 'RPS',
            //   data: []
            // }]
          };

          return Stats.sdk_agg_flow({
              account_id: $scope.ngAccount,
              app_id: ( $scope.ngApp || null ),
              from_timestamp: moment().subtract( $scope.span, 'days' ).valueOf(),
              to_timestamp: Date.now(),
              report_type: 'status_code'
            })
            .$promise
            .then( function( data ) {

              if ( data.data && data.data.length > 0 ) {
                var hits_series = [];
                var labels = [];
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                var labels_filled_up = false;

                angular.forEach( data.data, function( code ) {
                  var s = { name: (''+code.key), data: [] };
                  for ( var i = 0, len = code.flow.length; i < len; ++i ) {
                    var item = code.flow[i];
                    if ( !labels_filled_up ) {
                      labels.push( moment( item.time + offset /*to show the _end_ of interval instead of begin*/ ).format( 'MMM Do YY h:mm' ) );
                    }
                    s.data.push( Math.round( item.hits / interval ) );
                  };
                  hits_series.push( s );
                  labels_filled_up = true;
                });

                $scope.hits = {
                  labels: labels,
                  series: hits_series
                };
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

