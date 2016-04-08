(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('requestsChart', requestsChartDirective);

  requestsChartDirective.$inject = [];

  /*@ngInject*/
  function requestsChartDirective() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/requests.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        filtersSets: '='
      },
      /*@ngInject*/
      controller: RequestsChartCtrl
    };

    return directive;
  }

  /*ngInject*/
  function RequestsChartCtrl( $scope, Stats, Util ) {

    var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os'];

    function generateFilterParams(filters) {
      var params = {
        from_timestamp: moment().subtract(1, 'days').valueOf(),
        to_timestamp: Date.now()
      };
      _.forEach(filters, function(val, key) {
        if (_.indexOf(_filters_field_list, key) !== -1) {
          if (val !== '-' && val !== '') {
            params[key] = val;
          }
        } else {
          if (key === 'count_last_day') {
            params.from_timestamp = moment().subtract(val, 'days').valueOf();
            params.to_timestamp = Date.now();
            delete params.count_last_day;
          }
        }
      });
      return params;
    }

    $scope._loading = false;
    $scope.reloadTrafficStats = reloadTrafficStats;

    $scope.filters = {
      from_timestamp: moment().subtract(1, 'days').valueOf(),
      to_timestamp: Date.now()
    };

    if ($scope.filtersSets) {
      _.extend($scope.filters, $scope.filtersSets);
    }

    //  ---------------------------------
    var info_ = null,
      traffic_avg_ = 0,
      traffic_max_ = 0,
      traffic_total_ = 0;

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
                  this.xAxis[0].toPixels( 0 ), 3, '', 0, 0, true/*html*/ )
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
            return Util.convertTraffic(this.value);
          }
        }
      },
      tooltip: {
        formatter: function() {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + Util.convertTraffic(this.y);
        }
      }
    };

    $scope.traffic = {
      labels: [],
      series: [{
        name: 'Incoming Bandwidth',
        data: []
      }, {
        name: 'Outgoing Bandwidth',
        data: []
      }]
    };

    $scope.$watch('ngDomain', function() {
      if (!$scope.ngDomain) {
        return;
      }
      reloadTrafficStats();
    });

    //////////////////
    /**
     * @name reloadTrafficStats
     * @desc reload traffic stats
     * @kind function
     */
    function reloadTrafficStats() {
      if (!$scope.ngDomain || !$scope.ngDomain.id) {
        return;
      }
      $scope._loading = true;
      $scope.traffic = {
        labels: [],
        series: [{
          name: 'Incoming Bandwidth',
          data: []
        }, {
          name: 'Outgoing Bandwidth',
          data: []
        }]
      };

      Stats.traffic(angular.merge({
          domainId: $scope.ngDomain.id
        }, generateFilterParams($scope.filters)))
        .$promise
        .then(function(data) {
          if (data.data && data.data.length > 0) {
            var series = [{
              name: 'Incoming Bandwidth',
              data: []
            }, {
              name: 'Outgoing Bandwidth',
              data: []
            }];
            var interval = parseInt( data.metadata.interval_sec || 1800 ),
              labels = [],
              offset = interval * 1000;
            data.data.forEach( function( item ) {
              labels.push(moment(item.time + offset /*to show the _end_ of interval instead of begin*/ ).format('MMM Do YY h:mm'));
              var sent_bw = item.sent_bytes * 8 / interval /*BITS per second*/;
              series[1].data.push( sent_bw );
              series[0].data.push( item.received_bytes / interval * 8 /*BITS per second*/ );
              traffic_total_ += item.sent_bytes;
              if ( traffic_max_ < sent_bw ) {
                traffic_max_ = sent_bw;
              }
              traffic_avg_ += sent_bw;
            });
            traffic_avg_ /= data.data.length;

            // model better to update once
            $scope.traffic = {
              labels: labels,
              series: series
            };
          }
        })
        .finally(function() {
          $scope._loading = false;
        });

    }
  }
})();
