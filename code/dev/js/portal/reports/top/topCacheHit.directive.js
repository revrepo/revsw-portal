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
        flBrowser: '=',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function ($scope, Stats, $localStorage, $config, $sce) {
        $scope._loading = false;
        $scope.filters = !$scope.flStoreName ? _.assign({
          delay: '24',
          count: '20'
        }, {}) : $localStorage[$scope.flStoreName];

        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('TODO text for popover');

        $scope.items = [];
        $scope.loadDetails = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          var params = angular.merge({
            domainId: $scope.ngDomain.id
          }, $scope.filters, {
            // NOTE: always get new data
            from_timestamp: moment().subtract($scope.filters.delay || '24', 'hours').valueOf(),
            to_timestamp: moment().valueOf()
          });
          delete params.delay;
          params.cache_code = 'HIT';
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
