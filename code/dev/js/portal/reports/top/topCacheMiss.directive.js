(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('topCacheMiss', topCacheMissDirective);

  /*@ngInject*/
  function topCacheMissDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/top/top-cache-miss.html',
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
        $scope.popoverHelpHTML = $sce.trustAsHtml('The report shows the most popular objects which were pulled from the origin ' +
          '(and not from the edge cache). ' +
          'These might be legitimately dynamic requests which should not be cached, or static objects which might be cached to ' +
          'improve website performance and end user experience. The information is very helpful while fine-tuning edge ' +
          'caching rules for the domain.');

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
          params.cache_code = 'MISS';
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
