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
              text: 'Bandwidth'
            },
            labels: {
              formatter: function() {
                return Util.convertTraffic( this.value );
              }
            }
          },
          tooltip: {
            formatter: function() {
              // console.log( this.series );
              return '<strong>' + this.x + '</strong><br/>' +
                this.series.name + ': <strong>' + Util.convertTraffic( this.y ) + '</strong>';
            }
          }
        };

        $scope.reloadTrafficStats = function() {

          $scope._loading = true;
          $scope.hits = {
            labels: [],
            series: [{
              name: 'Hits',
              data: []
            }]
          };
          $scope.traffic = {
            labels: [],
            series: [{
              name: 'Incoming bandwidth',
              data: []
            }, {
              name: 'Outgoing bandwidth',
              data: []
            }]
          };

          Stats.sdk_flow({
              account_id: $scope.ngAccount,
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
                name: 'Incoming bandwidth',
                data: []
              }, {
                name: 'Outgoing bandwidth',
                data: []
              }, ];

              if ( data.data && data.data.length > 0 ) {
                var labels = [];
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                // console.log( data );
                angular.forEach( data.data, function( item ) {
                  labels.push( moment( item.time + offset /*to show the _end_ of interval instead of begin*/ ).format( 'MMM Do YY h:mm' ) );
                  hits_series[ 0 ].data.push( item.hits );
                  traffic_series[ 0 ].data.push( Math.round( item.received_bytes / interval ) );
                  traffic_series[ 1 ].data.push( Math.round( item.sent_bytes / interval ) );
                } );
                $scope.hits = {
                  labels: labels,
                  series: hits_series
                };
                $scope.traffic = {
                  labels: labels,
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

