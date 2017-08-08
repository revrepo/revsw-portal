(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .directive('wafFilterTopObjects', filterTopObjects);

  /*@ngInject*/
  function filterTopObjects() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/waf-analytics/filters/waf-filter-top-objects.tpl.html',
      scope: {
        ngFilters: '=',
        onFilter: '&',
        flCountry: '=',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function ($scope,StatsWAF, $localStorage) {

        $scope.filters = !$scope.flStoreName ? _.assign({
          from_timestamp: moment().subtract(24, 'hours').valueOf(),
          to_timestamp: Date.now()
        }, {}) : $localStorage[$scope.flStoreName];

        if (!$scope.ngFilters) {
          // NOTE: set defaults values for empty filter
          $scope.ngFilters = {
            delay: '24',
            count: '20'
          };
        } else {
          // NOTE: set default value for not exisit properties
          if (!$scope.ngFilters.delay) {
            $scope.ngFilters.delay = '24';
          }
          if (!$scope.ngFilters.count) {
            $scope.ngFilters.count = '20';
          }
        }

        $scope.updateFilters = function () {

          $scope.ngFilters.from_timestamp = moment(Date.now()).subtract(7*parseInt($scope.ngFilters.delay), 'hours').valueOf();
          $scope.ngFilters.to_timestamp = Date.now();

          $scope.onFilter();
        };

        // NOTE: watch fitlers and save to localstorage
        $scope.$watch('filters', function () {
          if ($scope.flStoreName) {
            $localStorage[$scope.flStoreName] = $scope.filters;
          }
        }, true);
      }
    };
  }
})();
