(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('mobileTrafficFilters', mobileTrafficFilters);

  /*@ngInject*/
  function mobileTrafficFilters() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/filters/mobile-traffic-filters.html',
      scope: {
        ngFilters: '=',
        onFilter: '&',
        flOses: '=',
        flDevices: '=',
        flCountries: '=',
        flOperators: '=',
        flNetworks: '=',
        flDisabled: '='
      },
      /*@ngInject*/
      controller: function ($scope) {

        $scope.update = function () {

          if (!$scope.ngFilters) {
            $scope.ngFilters = {
              delay: '1'
            };
          }
          $scope.ngFilters.from_timestamp = moment().subtract( $scope.ngFilters.delay, 'days' ).valueOf();
          $scope.ngFilters.to_timestamp = Date.now();
          $scope.onFilter();
        };
      }
    };
  }
})();
