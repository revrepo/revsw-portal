( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileHttpCodesChart', mobileHttpCodesChartDirective );

  /*@ngInject*/
  function mobileHttpCodesChartDirective() {

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

        $scope.heading = 'HTTP Status Codes Graph';
        $scope.span = '1';
        $scope._loading = false;
        $scope.hits = {
          labels: [],
          series: []
        };

        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now(),
          report_type: 'status_code',
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
            series: []
          };
          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ( $scope.ngApp || null );

          return Stats.sdk_agg_flow( $scope.filters )
            .$promise
            .then( function( data ) {

              if ( data.data && data.data.length > 0 ) {
                var hits_series = [];
                var labels = [];
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                var labels_filled_up = false;

                angular.forEach( data.data, function( code ) {

                  if ( code.key === 0 ) {
                    //  pass it over
                    return;
                  }

                  var s = { name: (''+code.key), data: [], visible: false };
                  for ( var i = 0, len = code.flow.length; i < len; ++i ) {
                    var item = code.flow[i];
                    if ( !labels_filled_up ) {
                      labels.push( moment( item.time + offset /*to show the _end_ of interval instead of begin*/ ).format( 'MMM Do YY h:mm' ) );
                    }
                    var rps = Math.round( item.hits * 1000 / interval ) / 1000;
                    s.data.push( rps );
                    if ( rps > 0.01 ) {
                      s.visible = true;
                    }
                  };
                  hits_series.push( s );
                  labels_filled_up = true;
                });

                hits_series[0].visible = true;
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

