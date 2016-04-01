(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('proxyTrafficChart', proxyTrafficChartDirective);

  /*@ngInject*/
  function proxyTrafficChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/proxy-traffic.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, Util) {
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
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now()
        };


        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }

        $scope.traffic = {
          labels: [],
          series: [{
            name: 'Total',
            data: []
          }]
        };

        $scope.reloadTrafficStats = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          $scope.traffic = {
            labels: [],
            series: [{
              name: 'Total',
              data: []
            }]
          };
          Stats.traffic(angular.merge({
              domainId: $scope.ngDomain.id
            }, generateFilterParams($scope.filters)))
            .$promise
            .then(function(data) {
              if (data.data && data.data.length > 0) {
                $scope.delay = data.metadata.interval_sec || 1800;
                var offset = $scope.delay * 1000;
                var series = [{
                  name: 'Total',
                  data: []
                }];
                var labels = [];
                angular.forEach(data.data, function(data) {
                  labels.push(moment(data.time + offset /*to show the _end_ of interval instead of begin*/ ).format('MMM Do YY h:mm'));
                  series[0].data.push(Util.toRPS(data.requests, $scope.delay, true));
                });
                $scope.traffic = {
                  labels: labels,
                  series: series
                };
              }
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function() {
          if (!$scope.ngDomain) {
            return;
          }
          $scope.reloadTrafficStats();
        });
      }
    };
  }
})();
