(function() {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('wafRuleGenerationJobTimePeriod', wafRuleGenerationJobTimePeriodDirective);

  /*@ngInject*/
  function wafRuleGenerationJobTimePeriodDirective() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'parts/waf_rules/directives/waf-rule-generation-job-time-period.tpl.html',
      scope: {
        timePeriod: '=',
        ngDisabled: '=?',
        isLoading: '=?',
        onChange: '&'
      },
      link: {
        post: link
      },
      controller: function($scope) {
        $scope.updateTimePeriod = updateTimePeriod;
        /**
         * @name updateTimePeriod
         * @desc make and update a time period data in specific format for API
         * @kind function
         */
        function updateTimePeriod() {
          var from_timestamp = moment($scope.datePicker.date.startDate.format('YYYY-MM-DD')).startOf('day');
          var to_timestamp = moment($scope.datePicker.date.endDate.format('YYYY-MM-DD')).endOf('day');

          if (from_timestamp.format('YYYY.MM.DD') === to_timestamp.format('YYYY.MM.DD')) {
            $scope.timePeriod = from_timestamp.format('YYYY.MM.DD');
          } else {
            $scope.timePeriod = from_timestamp.format('YYYY.MM.DD') + ':' + to_timestamp.format('YYYY.MM.DD');
          }
          $scope.onChange();
        }
      }
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
        timePickerIncrement: 1,
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
      var now_ = moment();
      var h = now_.hours();
      var m = now_.minutes();
      var s = now_.seconds();
      var ms = now_.millisecond();
      // NOTE: if endDate is today
      if (now_.diff(scope.datePicker.date.endDate, 'day') === 0) {
        // NOTE: set current time
        scope.datePicker.date.endDate.hours(h).minutes(m).seconds(s).millisecond(ms);
        if (scope.datePicker.date.endDate.diff(scope.datePicker.date.startDate, 'day') === 0) {
          // NOTE: if start day and end day is equals set start of day
          scope.datePicker.date.startDate = moment(scope.datePicker.date.startDate.format('YYYY-MM-DD')).startOf('day');
        } else {
          // NOTE: if start day is not equal end day - set current time
          scope.datePicker.date.startDate.hours(h).minutes(m).seconds(s).millisecond(ms);
        }
      } else {
        scope.datePicker.date.startDate = moment(scope.datePicker.date.startDate.format('YYYY-MM-DD')).startOf('day');
        scope.datePicker.date.endDate = moment(scope.datePicker.date.endDate.format('YYYY-MM-DD')).endOf('day');
      }
      var key = _.findKey(ranges, function(obj) {
        // fix time in DatePiker
        countDays = scope.datePicker.date.endDate.diff(scope.datePicker.date.startDate, 'day');
        //range date
        return (countDays === obj[1].diff(obj[0], 'day')) && (scope.datePicker.date.endDate.isSame(now_)) &&
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
      scope.updateTimePeriod();
    }
  }
})();
