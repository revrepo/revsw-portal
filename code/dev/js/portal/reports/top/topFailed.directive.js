(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('topFailed', topFailedDirective);

  /*@ngInject*/
  function topFailedDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/top/top-failed.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function ($scope, Stats, $localStorage) {
        $scope._loading = false;
        $scope.filters = !$scope.flStoreName ? _.assign({
          from_timestamp: moment().subtract(24, 'hours').valueOf(),
          to_timestamp: Date.now()
        }, {}) : $localStorage[$scope.flStoreName];

        $scope.items = [];
        $scope.loadDetails = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          var params = angular.merge({
            domainId: $scope.ngDomain.id
          }, $scope.filters);
          delete params.delay;
          params.request_status = 'ERROR';
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
