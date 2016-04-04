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
  function RequestsChartCtrl(
    $scope,
    Stats,
    Util
  ) {

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

    $scope.delay = 1800;
    $scope._loading = false;
    $scope.reloadTrafficStats = reloadTrafficStats;

    $scope.filters = {
      from_timestamp: moment().subtract(1, 'days').valueOf(),
      to_timestamp: Date.now()
    };

    if ($scope.filtersSets) {
      _.extend($scope.filters, $scope.filtersSets);
    }
    /**
     * @funcCustomInfoGenerator
     * @description
     *
     * @see example http://jsfiddle.net/c57L3cj2/3/
     *
     * @param  {Object}
     * @return
     */
    function funcCustomInfoGenerator(e) {
      var chart = this;
      var x = 150,
        y = 100;
      var text = chart.renderer.text(
        'Max',
        x, y
      ).attr({
        zIndex: 5
      }).add();

      var box = text.getBBox();

      chart.renderer.rect(box.x - 5, box.y - 5, box.width + 10, box.height + 10, 5)
        .attr({
          fill: '#FFFFEF',
          stroke: 'red',
          'stroke-width': 1,
          zIndex: 4
        })
        .add();
    }

    $scope.chartOptions = {
      // NOTE: use this block for add more information to char
      // chart: {
      //   events: {
      //     redraw: funcCustomInfoGenerator
      //   }
      // },
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
            $scope.delay = data.metadata.interval_sec || 1800;
            var labels = [],
              offset = $scope.delay * 1000;
            angular.forEach(data.data, function(data) {
              labels.push(moment(data.time + offset /*to show the _end_ of interval instead of begin*/ ).format('MMM Do YY h:mm'));
              series[0].data.push(Util.toBps(data.received_bytes, $scope.delay, true));
              series[1].data.push(Util.toBps(data.sent_bytes, $scope.delay, true));
            });
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
