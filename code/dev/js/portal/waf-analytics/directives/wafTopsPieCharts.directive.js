(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .directive('wafTopsPieCharts', wafTopsPieChartsDirective);

  /*@ngInject*/
  function wafTopsPieChartsDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/waf-analytics/directives/waf-tops-pie-charts.tpl.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function ($q, $scope, StatsWAF, $localStorage) {
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

          var params = angular.merge({}, {
            domainId: $scope.ngDomain.id,
            count: 20
          }, $scope.filters);

          $q.all([
              StatsWAF.topReport(angular.merge({}, params, {
                report_type: 'country'
              })).$promise,
              StatsWAF.topReport(angular.merge({}, params, {
                report_type: 'rule_id'
              })).$promise,
              StatsWAF.topReport(angular.merge({}, params, {
                report_type: 'zone'
              })).$promise
            ])
            .then(function (dataTops) {
              $scope.topCountries = [];
              $scope.topRulesIds = [];
              $scope.topTargetZones = [];
              // NOTE: prepare countries  data
              if (dataTops[0].data && dataTops[0].data.length > 0) {
                _.forEach(dataTops[0].data, function (item) {
                  var key = item.key.toUpperCase();
                  $scope.topCountries.push({
                    name: ($scope.flCountry[key] || item.key),
                    y: item.count
                  });
                });
              }
              if (dataTops[1].data && dataTops[1].data.length > 0) {
                _.forEach(dataTops[1].data, function (item) {
                  $scope.topRulesIds.push({
                    name: item.key,
                    y: item.count
                  });
                });
              }
              if (dataTops[2].data && dataTops[2].data.length > 0) {
                _.forEach(dataTops[2].data, function (item) {
                  $scope.topTargetZones.push({
                    name: item.key,
                    y: item.count
                  });
                });
              }
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        $scope.$watchGroup(['ngDomain', 'filters'], function () {
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
