( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Reports' )
    .directive( 'fbtAverageChart', fbtAverageChartDirective );

  /*@ngInject*/
  function fbtAverageChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/fbt-average.html',
      scope: {
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        ngDomain: '='
      },
      /*@ngInject*/
      controller: function( $scope, Stats, Util ) {

        $scope.delay = '1';
        $scope.os = '';
        $scope.country = '';
        $scope.device = '';
        $scope._loading = false;

        //  ---------------------------------
        var info_ = null,
          avg_ = 0,
          median_ = 0,
          max_ = 0;

        $scope.chartOptions = {
          chart: {
            type: 'column',
            events: {
              redraw: function() {
                if ( info_ ) {
                  info_.destroy();
                  info_ = null;
                }
                info_ = this/*chart*/.renderer
                  .label( 'FBT Avg <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber( avg_ / 1000, 1 ) +
                      '</span> Median <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber( median_ / 1000, 1 ) +
                      '</span> Max <span style="font-weight: bold; color: black;">' + Util.formatNumber( max_ / 1000, 1 ) +
                      '</span> ms',
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
              text: 'First Byte Time, ms'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber( Math.round( this.value / 1000 ) );
              }
            }
          },
          tooltip: {
            formatter: function() {
              return '<strong>' + this.x + '</strong><br/>' +
                this.series.name + ': <strong>' + Util.formatNumber( this.y / 1000, 2 ) + '</strong> ms';
            }
          }
        };

        //  ---------------------------------
        $scope.reloadTrafficStats = function() {
          if ( !$scope.ngDomain || !$scope.ngDomain.id ) {
            return;
          }
          $scope._loading = true;
          var opts = {
            domainId: $scope.ngDomain.id,
            from_timestamp: moment().subtract( $scope.delay, 'days' ).valueOf(),
            to_timestamp: Date.now(),
          };
          if ( $scope.country !== '' ) {
            opts.country = $scope.country;
          }
          if ( $scope.device !== '' ) {
            opts.device = $scope.device;
          }
          if ( $scope.os !== '' ) {
            opts.os = $scope.os;
          }
          Stats.fbt_average( opts )
            .$promise
            .then( function( data ) {
              var series = [ {
                name: 'Average FBT',
                data: []
              } ];
              if ( data.data && data.data.length > 0 ) {
                max_ = 0;
                var labels = [];
                var offset = ( data.metadata.interval_sec || 1800 ) * 1000;
                var cnt_ = 0;
                // console.log( data );
                data.data.forEach( function( item ) {
                  labels.push( moment( item.time + offset /*to show the _end_ of interval instead of begin*/ ).format( 'HH:mm MMM Do' ) );
                  if ( max_ < item.avg_fbt ) {
                    max_ = item.avg_fbt;
                  }
                  if ( item.requests ) {
                    avg_ += item.avg_fbt;
                    ++cnt_;
                    series[ 0 ].data.push( item.avg_fbt );
                  } else {
                    series[ 0 ].data.push( null );
                  }
                });
                avg_ /= cnt_;

                //  median
                var avg_t = data.data.filter( function( item ) {
                  return item.requests !== 0;
                }).map( function( item ) {
                  return item.avg_fbt;
                }).sort( function( lhs, rhs ) {
                  return lhs - rhs;
                });
                var idx0 = avg_t.length - 1,
                  idx1 = Math.ceil( idx0 / 2 );
                idx0 = Math.floor( idx0 / 2 );
                median_ = ( idx0 === idx1 ) ? avg_t[idx0] : ( avg_t[idx0] + avg_t[idx1] ) / 2;

                $scope.traffic = {
                  labels: labels,
                  series: series
                };
              } else {
                $scope.traffic = {
                  labels: [],
                  series: series
                };
              }
            } )
            .finally( function() {
              $scope._loading = false;
            } );
        };

        $scope.$watch( 'ngDomain', function() {
          if ( !$scope.ngDomain ) {
            return;
          }
          $scope.reloadTrafficStats();
        } );
      }
    };
  }
} )();

