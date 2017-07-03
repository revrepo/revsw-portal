(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('mobileTopObjectsFilters', mobileTopObjectsFilters);

  /*@ngInject*/
  function mobileTopObjectsFilters() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/filters/mobile-top-objects-filters.html',
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
                delay: '24',
                count: '10'
            };
          }
          $scope.ngFilters.count = $scope.ngFilters.count;
          $scope.ngFilters.from_timestamp = moment().subtract( $scope.ngFilters.delay, 'hours' ).valueOf();
          $scope.ngFilters.to_timestamp = Date.now();
          $scope.onFilter();
        };
      }
    };
  }
})();
