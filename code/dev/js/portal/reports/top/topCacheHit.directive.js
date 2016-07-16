(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('topCacheHit', topCacheHitDirective);

  /*@ngInject*/
  function topCacheHitDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/top/top-cache-hit.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '='
      },
      /*@ngInject*/
      controller: function ($scope, Stats) {
        $scope._loading = false;
        $scope.filters = {
          from_timestamp: moment().subtract(24, 'hours').valueOf(),
          to_timestamp: Date.now(),
          cache_code: 'HIT'
        };

        $scope.items = [];
        $scope.loadDetails = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          var params = angular.merge({
            domainId: $scope.ngDomain.id
          }, $scope.filters);

          Stats
            .topObjects(params)
            .$promise
            .then(function (res) {
              $scope.items = res.data;
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function () {
          $scope.loadDetails();
        });
      }
    };
  }
})();
