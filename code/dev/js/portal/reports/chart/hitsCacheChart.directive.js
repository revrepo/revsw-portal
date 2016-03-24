(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('hitsCacheChart', histCacheChartDirective);

  /*@ngInject*/
  function histCacheChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/hits-cache.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, $q, Util) {
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
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now()
        };

        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }
        $scope.delay = 1800;

        $scope.traffic = {
          labels: [],
          series: [{
            name: 'Cache Hit',
            data: []
          }, {
            name: 'Cache Miss',
            data: []
          }]
        };

        $scope.loadHit = function() {
          return Stats.traffic(angular.merge({
            domainId: $scope.ngDomain.id
          }, generateFilterParams($scope.filters), {
            cache_code: 'HIT'
          })).$promise;
        };

        $scope.loadMiss = function() {
          return Stats.traffic(angular.merge({
            domainId: $scope.ngDomain.id
          },generateFilterParams($scope.filters), {
            cache_code: 'MISS'
          })).$promise;
        };

        $scope.reload = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          $scope.traffic = {
            labels: [],
            series: [{
              name: 'Cache Hit',
              data: []
            }, {
              name: 'Cache Miss',
              data: []
            }]
          };
          $q.all([
              $scope.loadHit(),
              $scope.loadMiss()
            ])
            .then(function(data) {
              $scope.delay = data[0].metadata.interval_sec || 1800;
              var offset = $scope.delay * 1000;
              var labels = [];
              var series = [{
                name: 'Cache Hit',
                data: []
              }, {
                name: 'Cache Miss',
                data: []
              }];

              if (data[0].data && data[0].data.length > 0) {
                angular.forEach(data[0].data, function(data) {
                  labels.push(moment(data.time + offset /*to show the _end_ of interval instead of begin*/ ).format('MMM Do YY h:mm'));
                  series[0].data.push(Util.toRPS(data.requests, $scope.delay, true));
                });
              }
              if (data[1].data && data[1].data.length > 0) {
                angular.forEach(data[1].data, function(data) {
                  series[1].data.push(Util.toRPS(data.requests, $scope.delay, true));
                });
              }
              $scope.traffic = {
                labels: labels,
                series: series
              };
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function() {
          if (!$scope.ngDomain) {
            return;
          }
          $scope.reload();
        });
      }
    };
  }
})();
