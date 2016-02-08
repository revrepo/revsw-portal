( function() {
  'use strict';

  angular
    .module( 'revapm.Portal.Mobile' )
    .directive( 'mobileAbFbtChart', mobileAbFbtChartDirective );

  /*@ngInject*/
  function mobileAbFbtChartDirective() {

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

        $scope.heading = 'First Byte Time Graph';
        $scope.span = '1';
        $scope._loading = false;

        //  ---------------------------------
        $scope.chartOptions = {
          yAxis: {
            // type: 'logarithmic',
            // minorTickInterval: 2,
            title: {
              text: 'FBT ms'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber( this.value, 1 );
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
                this.series.name + ': <strong>' + Util.formatNumber( this.y, 1 ) + '</strong>';
            }
          }
        };

        $scope.hits = {
          labels: [],
          series: [{
            name: 'Origin, Avg',
            data: [],
            color: '#3c65ac',
            marker: { radius: 4, symbol: 'circle' }
          }, {
            name: 'Origin, Min',
            data: [],
            color: '#7cb5ec',
            marker: { radius: 2, symbol: 'circle' },
            visible: false
          }, {
            name: 'Origin, Max',
            data: [],
            color: '#7cb5ec',
            marker: { radius: 2, symbol: 'circle' },
            visible: false
          }, {
            name: 'RevAPM, Avg',
            data: [],
            color: '#000000',
            marker: { radius: 4, symbol: 'diamond' }
          }, {
            name: 'RevAPM, Min',
            data: [],
            color: '#808080',
            marker: { radius: 2, symbol: 'diamond' },
            visible: false
          }, {
            name: 'RevAPM, Max',
            data: [],
            color: '#808080',
            marker: { radius: 2, symbol: 'diamond' },
            visible: false
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
          $scope.hits.series[2].data = [];
          $scope.hits.series[3].data = [];
          $scope.hits.series[4].data = [];
          $scope.hits.series[5].data = [];

          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ( $scope.ngApp || null );
          return Stats.sdk_ab_fbt( $scope.filters )
            .$promise
            .then( function( data ) {

              if ( data.data && data.data.length > 0 ) {
                var labels = [];
                var hits = {
                  rev_edge: {
                    min: [],
                    max: [],
                    avg: []
                  },
                  origin: {
                    min: [],
                    max: [],
                    avg: []
                  },
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
                    hits[dest.key].max.push( item.fbt_max );
                    hits[dest.key].min.push( item.fbt_min );
                    hits[dest.key].avg.push( item.fbt_average );
                  });
                  labels_filled = true;
                } );
                $scope.hits.labels = labels;
                $scope.hits.series[0].data = hits.origin.avg;
                $scope.hits.series[1].data = hits.origin.min;
                $scope.hits.series[2].data = hits.origin.max;
                $scope.hits.series[3].data = hits.rev_edge.avg;
                $scope.hits.series[4].data = hits.rev_edge.min;
                $scope.hits.series[5].data = hits.rev_edge.max;
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

