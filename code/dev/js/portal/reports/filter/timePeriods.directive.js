(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('filterTimePeriods', filterTimePeriods);

  /*@ngInject*/
  function filterTimePeriods() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'parts/reports/filters/time-period.html',
      scope: {
        ngFilters: '=',
        onFilter: '&',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '='
      },
      link: {
        post: link
      },
      controller: FilterTimePeriodCtrl
    };

    return directive;
  }

  function link(scope, elem, attr, ngModel) {
    'ngInject';
    var FILTER_EVENT_TIMEOUT = 2000,
      DATE_PICKER_SELECTOR = '.date-picker',
      LAST_DAY = 'Last 1 Day',
      LAST_WEEK = 'Last 7 Days ',
      LAST_MONTH = 'Last 30 Days';
    var countDays = 1;
    //datepicker ranges
    var ranges = {};
    //Default valuew is Last 1 Day!
    ranges[LAST_DAY] = [moment().subtract(1, 'days'), moment()];
    ranges[LAST_WEEK] = [moment().subtract(7, 'days'), moment()];
    ranges[LAST_MONTH] = [moment().subtract(30, 'days'), moment()];

    //date picker params
    scope.datePicker = {
      overlay: {
        show: true,
        val: LAST_DAY
      },
      options: {
        timePicker: false,
        timePickerIncrement: 30,
        ranges: ranges,
        minDate: moment().subtract(1, 'months'),
        maxDate: moment(),
        dateLimit: {
          // days: 30
          months: 1
        }
      },
      date: {
        startDate: ranges[LAST_DAY][0],
        endDate: ranges[LAST_DAY][1]
      }
    };

    //ui handlers for date-range piker
    scope.handlers = {
      // filterChange: filterChange,
      overlayClickHandler: overlayClickHandler,
      daterangepickerBlur: daterangepickerBlur
    };

    /*
     * @name overlayClickHandler
     * @desc handler when user clicks on the date range picker overlay input.
     *       Hides overlay and focus on the daterangepicker
     *
     * @kind function
     */
    function overlayClickHandler() {
      var datePicker = elem.querySelectorAll(DATE_PICKER_SELECTOR)[0];
      scope.datePicker.overlay.show = false;
      datePicker.focus();
      subscribeOnDatePickerHide();
    }

    /*
     * @name subscribeOnDatePickerHide
     * @desc subscribes on the datePicker hide.
     *       Shows overlay when date picker is hidden
     *
     * @kind function
     */
    function subscribeOnDatePickerHide() {
      var datePicker = elem.querySelectorAll(DATE_PICKER_SELECTOR);

      datePicker.bind('hide.daterangepicker', function() {
        datePicker.unbind('hide.daterangepicker');
        daterangepickerBlur(datePicker);
        scope.$digest();
      });
    }

    /*
     * @name daterangepickerBlur
     * @desc blur handler for the date picker. Shows overlay
     * @kind function
     * @param {Object} - datePicker object
     */
    function daterangepickerBlur(datePicker) {
      updateOverlayValue(datePicker);
    }
    /*
     * @name updateOverlayValue
     * @desc updates overlay value to match the date rangepicker value
     * @kind function
     * @param {Object} - datePicker object
     */
    function updateOverlayValue(datePicker) {
      var key = _.findKey(ranges, function(obj) {
        countDays = scope.datePicker.date.endDate.diff(scope.datePicker.date.startDate, 'day');
        //range date
        var objStartDate = obj[0].toDate().getTime(),
          objEndDate = obj[1].toDate().getTime(),
          // selected date
          selStartDate = scope.datePicker.date.startDate.toDate().getTime(),
          selEndDate = scope.datePicker.date.endDate.toDate().getTime();
        return (countDays === obj[1].diff(obj[0], 'day')) &&
          (obj[0].diff(scope.datePicker.date.startDate, 'day') === 0 && obj[1].diff(scope.datePicker.date.endDate, 'day') === 0);
      });
      if (!key) {
        key = datePicker.val();
      }

      if (scope.datePicker.overlay.val !== '') {
        // filterChange();
      }
      scope.datePicker.overlay.val = key;
      scope.datePicker.overlay.show = true;
      scope.updateFilters();
    }
  }

  FilterTimePeriodCtrl.$inject = [
    '$scope',
    'filterGeneratorService'
  ];

  function FilterTimePeriodCtrl(
    $scope,
    filterGeneratorService
  ) {
    $scope.delay = '1';
    $scope.updateFilters = updateFilters;

    filterGeneratorService.subscribeOnFilterChangeEvent($scope, callbackOnGlobalFilterChange);

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

      _.forIn(eventDataObject.data, function(value, key) {
        $scope.ngFilters[key] = value;
      });

      //clear all empty fields in the filter object
      _.forIn($scope.ngFilters, function(value, key) {
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
      var from_timestamp = moment().add($scope.datePicker.date.startDate.diff(moment(), 'days'), 'days');
      var to_timestamp = moment().add($scope.datePicker.date.endDate.diff(moment(), 'days'), 'days');
      $scope.ngFilters.from_timestamp = from_timestamp.toDate().getTime();
      $scope.ngFilters.to_timestamp = to_timestamp.toDate().getTime();
      $scope.onFilter();
    }
  }
})();
