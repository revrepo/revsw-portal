( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileBwChart', mobileBwChartDirective );

  /*@ngInject*/
  function mobileBwChartDirective() {

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

        $scope.heading = 'Bandwidth Usage Graph';
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
        var info_ = null,
          traffic_avg_ = 0,
          traffic_max_ = 0,
          traffic_total_ = 0,
          hits_total_ = 0;

        $scope.chartOptions = {
          chart: {
            events: {
              redraw: function() {
                if ( info_ ) {
                  info_.destroy();
                  info_ = null;
                }
                info_ = this/*chart*/.renderer
                  .label( 'Traffic Level Avg <span style="font-weight: bold; color: #3c65ac;">' + Util.convertTraffic( traffic_avg_ ) +
                      '</span> Max <span style="font-weight: bold; color: #3c65ac;">' + Util.convertTraffic( traffic_max_ ) +
                      '</span><br>Traffic Total <span style="font-weight: bold; color: #3c65ac;">' + Util.humanFileSizeInGB( traffic_total_, 3 ) +
                      '</span>',
                      this.xAxis[0].toPixels( 0 ), 0, '', 0, 0, true/*html*/ )
                  .css({ color: '#444' })
                  .attr({
                    fill: 'rgba(240, 240, 240, 0.6)',
                    stroke: '#3c65ac',
                    'stroke-width': 1,
                    padding: 6,
                    r: 2,
                    zIndex: 5
                  })
                  .add();
              }
            }
          },
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
              return '<strong>' + this.x + '</strong><br/>' +
                this.series.name + ': <strong>' + Util.convertTraffic( this.y ) + '</strong>';
            }
          }
        };

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          $scope.hits = {
            labels: [],
            series: [{
              name: 'Incoming Bandwidth',
              data: []
            }, {
              name: 'Outgoing Bandwidth',
              data: []
            }]
          };

          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ( $scope.ngApp || null );
          return Stats.sdk_flow( $scope.filters )
            .$promise
            .then( function( data ) {

              var hits_series = [ {
                name: 'Incoming Bandwidth',
                data: []
              }, {
                name: 'Outgoing Bandwidth',
                data: []
              }, ];

              if ( data.data && data.data.length > 0 ) {
                var labels = [];
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                // console.log( data );
                data.data.forEach( function( item ) {
                  labels.push( moment( item.time + offset /*to show the _end_ of interval instead of begin*/ ).format( 'MMM Do YY h:mm' ) );
                  var sent_bw = item.sent_bytes / interval;
                  hits_series[ 0 ].data.push( Math.round( item.received_bytes * 1000 / interval ) / 1000 );
                  hits_series[ 1 ].data.push( Math.round( sent_bw * 1000 ) / 1000 );
                  hits_total_ += item.received_bytes + item.sent_bytes;
                  traffic_total_ += item.sent_bytes;
                  if ( traffic_max_ < sent_bw ) {
                    traffic_max_ = sent_bw;
                  }
                  traffic_avg_ += sent_bw;
                } );
                traffic_avg_ /= data.data.length;
                if ( hits_total_ ) {
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

