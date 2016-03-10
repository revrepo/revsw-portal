/* filter-generator.directive.js */

/** 
 * 
 * @module 'revapm.Portal.Shared'
 * @desc filter generator directive
 * @example <filter-generator></filter-generator>
 */
(function(angular, moment, _) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('filterGenerator', filterGenerator);

  filterGenerator.$inject = [
    'filterGeneratorService'
  ];

  function filterGenerator(
    filterGeneratorService
  ) {
    var directive = {
      require: 'ngModel',
      restrict: 'E',
      scope: {},
      templateUrl: 'parts/shared/filter-generator/filter-generator.html',
      link: link
    };

    return directive;

    /**
     * @name link
     * @desc link function for directive
     * @kind function
     */
    function link(scope, elem, attr, ngModel) {
      var FILTER_EVENT_TIMEOUT = 2000;

      ngModel = [{
        name: 'OS',
        vals: [{
          count: 62,
          key: 'Windows 7'
        }, {
          count: 63,
          key: 'Windows 8'
        }]
      }, {
        name: 'Devices',
        vals: [{
          count: 1,
          key: 'IOS'
        }, {
          count: 2,
          key: 'Android'
        }, {
          count: 3,
          key: 'Windows Phone'
        }]
      }];

      //datepicker ranges
      var ranges = {},
        filtersAddMenu = angular.copy(ngModel),
        filterChangeTimeout;

      ranges['Last one day'] = [moment(), moment()];

      //date picker params
      scope.datePicker = {
        options: {
          timePicker: true,
          timePickerIncrement: 30,
          ranges: ranges
        },
        date: {
          startDate: moment(),
          endDate: moment()
        }
      };

      //selected filters by user
      scope.filters = [];

      //ui actions
      scope.actions = {
        showMenu: showMenu,
        addFilter: addFilter,
        removeShownFilter: removeShownFilter,
        hideMenu: hideMenu,
        filterChange: filterChange
      };

      //add menu filter data
      scope.addFilterMenu = {
        show: false,
        filters: getFiltersToAdd
      };

      /*
       * @name addFilter
       * @desc add filter to the filters list
       * @kind function
       * @param {Object} filter object
       */
      function addFilter(filter) {
        toggleFilterShownState(filter);
        scope.filters.push(filter);
        hideMenu();
      }

      /*
       * @name showMenu
       * @desc shows add new filter menu
       * @kind function
       */
      function showMenu() {
        scope.addFilterMenu.show = true;
      }

      /*
       * @name hideMenu
       * @desc hides menu
       * @kind function
       */
      function hideMenu() {
        scope.addFilterMenu.show = false;
      }

      /*
       * @name getFiltersToAdd
       * @desc returns filters to add for the submenu
       * @kind function
       * @returs {Array} array of filters to add
       */
      function getFiltersToAdd() {
        return _.filter(filtersAddMenu, function(filter) {
          return !filter.isShown;
        });
      }

      /*
       * @name toggleFilterShownState
       * @desc toggle filter show state
       * @kind function
       * @param {Object} filter object
       */
      function toggleFilterShownState(filter) {
        filter.isShown = !filter.isShown;
      }

      /*
       * @name removeShownFilter
       * @desc removes shown filter by index
       * @kind function
       * @param {Object} filter object
       * @param {Number} index of filter in array
       */
      function removeShownFilter(filter, $index) {
        filter.selected = '';
        toggleFilterShownState(filter);
        scope.filters.splice($index, 1);
      }

      /*
       * @name filterChange
       * @desc filter change handler
       * @kind function
       * @param {Object} filter object
       */
      function filterChange() {
        startFilterChangeEventTimeout();
      }

      /*
       * @name startFilterChangeEventTimeout
       * @desc starts timeout to send fitler change event
       * @kind function
       */
      function startFilterChangeEventTimeout() {
        if (filterChangeTimeout) {
          clearTimeout(filterChangeTimeout);
        }

        filterChangeTimeout = setTimeout(function() {
          sendFilterChangeEvent();
          scope.$apply();
        }, FILTER_EVENT_TIMEOUT);
      }

      /*
       * @name sendFilterChangeEvent
       * @desc sends filter change event in the rootScope
       * @kind function
       */
      function sendFilterChangeEvent() {
        filterGeneratorService.broadcastFilterChangeEvent('hello world');
      }
    }
  }
})(angular, moment, _);
