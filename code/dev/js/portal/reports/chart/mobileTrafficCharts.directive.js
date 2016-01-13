( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileTrafficCharts', mobileTrafficChartsDirective );

  /*@ngInject*/
  function mobileTrafficChartsDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-traffic.html',
      scope: {
        ngAccount: '=',
        ngApp: '='
      },
      /*@ngInject*/
      controller: function( $scope, Stats, Util ) {

        $scope.span = '1';
        $scope._loading = false;

        $scope.hitsChartOptions = {
          yAxis: {
            title: {
              text: 'Hits Num'
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
                this.series.name + ': <strong>' + Util.formatNumber( this.y ) + '</strong>';
            }
          }
        };

        $scope.trafficChartOptions = {
          yAxis: {
            title: {
              text: 'Traffic Volume'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber( this.value );
              }
            }
          },
          tooltip: {
            formatter: function() {
              // console.log( this.series );
              return '<strong>' + this.x + '</strong><br/>' +
                this.series.name + ': <strong>' + Util.formatNumber( this.y ) + '</strong>';
            }
          }
        };

        $scope.reloadTrafficStats = function() {

          $scope._loading = true;
          Stats.sdk_flow({
              accountId: $scope.ngAccount,
              app_id: ( $scope.ngApp || null ),
              from_timestamp: moment().subtract( $scope.span, 'days' ).valueOf(),
              to_timestamp: Date.now()
            })
            .$promise
            .then( function( data ) {

              var hits_series = [ {
                name: 'Hits',
                data: []
              } ];
              var traffic_series = [ {
                name: 'Received',
                data: []
              }, {
                name: 'Sent',
                data: []
              }, ];

              if ( data.data && data.data.length > 0 ) {
                var hits_labels = [];
                var traffic_labels = [];
                var offset = ( data.metadata.interval_sec || 1800 ) * 1000;
                // console.log( data );
                angular.forEach( data.data, function( item ) {

                  var lbl = moment( item.time + offset /*to show the _end_ of interval instead of begin*/ ).format( 'MMM Do YY h:mm' );
                  traffic_labels.push( lbl );
                  hits_labels.push( lbl );

                  hits_series[ 0 ].data.push( item.hits );
                  traffic_series[ 0 ].data.push( item.received_bytes );
                  traffic_series[ 1 ].data.push( item.sent_bytes );
                } );
                $scope.hits = {
                  labels: hits_labels,
                  series: hits_series
                };
                $scope.traffic = {
                  labels: traffic_labels,
                  series: traffic_series
                };
              } else {
                $scope.hits = {
                  labels: [],
                  series: hits_series
                };
                $scope.traffic = {
                  labels: [],
                  series: traffic_series
                };
              }
            })
            .finally( function() {
              $scope._loading = false;
            } );
        };

        $scope.$watch( 'ngApp', function() {
          if ( $scope.ngAccount || $scope.ngApp ) {
            $scope.reloadTrafficStats();
          }
        });
      }
    };
  }
} )();

