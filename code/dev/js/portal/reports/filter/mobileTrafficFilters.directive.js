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
        $scope.delay ='1';
        $scope.update = function () {
          var delay = $scope.delay;

          $scope.ngFilters.from_timestamp = moment().subtract( delay, 'days' ).valueOf();
          $scope.ngFilters.to_timestamp = Date.now();
          $scope.onFilter();
        };
      }
    };
  }
})();
