(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .directive('wafTopAttackerIps', wafTopAttackerIpsDirective);

  /*@ngInject*/
  function wafTopAttackerIpsDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/waf-analytics/directives/waf-top-attacker-ips.tpl.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function ($scope, StatsWAF, $localStorage) {
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
            domainId: $scope.ngDomain.id,
            report_type: 'ip'
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

        $scope.$watchGroup(['ngDomain', 'filters'], function () {
          $scope.loadDetails();
        });
        // NOTE: watch fitlers and save to localstorage
        $scope.$watch('filters', function () {
          if ($scope.flStoreName) {
            $localStorage[$scope.flStoreName] = $scope.filters;
          }
        }, true);

        /**
        * @name getIpToolTip
        * @description get the tooltip for IP info
        */
        $scope.getIpToolTip = function (item) {
          return 'Country: ' + item.country + ' <br />' +
            'Region, City: ' + item.city + ' <br />' +
            'ISP/Organization: ' + item.isp;
        };

        $scope.showIPinfo = function () {
          $scope.showIpToolTip = true;
        };
        $scope.hideIPinfo = function () {
          $scope.showIpToolTip = false;
        };
      }


    };
  }
})();
