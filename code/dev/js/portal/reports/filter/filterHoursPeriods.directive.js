(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('filterHoursPeriods', filterHoursPeriods);

  /*@ngInject*/
  function filterHoursPeriods() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'parts/reports/filters/filter-hours-periods.tpl.html',
      scope: {
        ngFilters: '=',
        ngDisabled: '=',
        isLoading: '=',
        onFilter: '&',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '='
      },
      link: function link(scope, elem, attr, ngModel) {},
      controller: filterHoursPeriodsCtrl
    };

    return directive;
  }

  filterHoursPeriodsCtrl.$inject = [
    '$scope'
  ];

  function filterHoursPeriodsCtrl(
    $scope
  ) {
    if (!$scope.ngFilters) {
      // NOTE: set defaults values for empty filter
      $scope.ngFilters = {
        delay: '24',

      };
    } else {
      // NOTE: set default value for not exisit properties
      if (!$scope.ngFilters.delay) {
        $scope.ngFilters.delay = '24';
      }
    }
    $scope.updateFilters = updateFilters;

    // filterGeneratorService.subscribeOnFilterChangeEvent($scope, callbackOnGlobalFilterChange);

    //////////////////

    /**
     * @name callbackOnGlobalFilterChange
     * @desc triggers when global filter changes
     * @kind function
     * @params {Object} Event object
     * @params {Object} Data passed with event
     */
    function callbackOnGlobalFilterChange($event, eventDataObject) {
      //$scope.updateFilters();
      if (!$scope.ngFilters) {
        $scope.ngFilters = {};
      }

      _.forIn(eventDataObject.data, function (value, key) {
        $scope.ngFilters[key] = value;
      });

      //clear all empty fields in the filter object
      _.forIn($scope.ngFilters, function (value, key) {
        if (!eventDataObject.data[key]) {
          delete $scope.ngFilters[key];
        }
      });


      $scope.onFilter();
    }

    /**
     * @name updateFilters
     * @desc update filters
     * @kind function
     */
    function updateFilters() {
      if (!$scope.ngFilters) {
        $scope.ngFilters = {};
      }
      $scope.ngFilters.from_timestamp = moment().subtract($scope.ngFilters.delay || '24', 'hours').valueOf();
      $scope.ngFilters.to_timestamp = Date.now();
      $scope.onFilter();
    }
  }
})();
