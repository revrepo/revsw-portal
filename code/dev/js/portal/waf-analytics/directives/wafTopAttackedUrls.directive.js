(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .directive('wafTopAttackedUrls', wafTopAttackedUrlsDirective);

  /*@ngInject*/
  function wafTopAttackedUrlsDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/waf-analytics/directives/waf-top-attacked-urls.tpl.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function ($scope, StatsWAF, $localStorage, $config, $sce) {
        $scope._loading = false;
        $scope.filters = !$scope.flStoreName ? _.assign({
          from_timestamp: moment().subtract(24, 'hours').valueOf(),
          to_timestamp: Date.now()
        }, {}) : $localStorage[$scope.flStoreName];

        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('TODO text popover');

        $scope.items = [];
        $scope.loadDetails = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          var params = angular.merge({
            domainId: $scope.ngDomain.id,
            report_type: 'uri'
          }, $scope.filters);
          delete params.delay;
          StatsWAF
            .topObjects(params)
            .$promise
            .then(function (res) {
              $scope.items = res.data;
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        $scope.$watchGroup(['ngDomain','filters'], function () {
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
