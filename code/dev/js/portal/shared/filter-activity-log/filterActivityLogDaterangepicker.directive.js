(function() {
  'use strict';
  angular
    .module('revapm.Portal.Shared')
    .directive('filterActivityLogDaterangepicker', filterActivityLogDaterangepicker);


  function filterActivityLogDaterangepicker() {
    'ngInject';
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        ranges: '=',
        datePicker: '=ngModel'
      },
      templateUrl: 'parts/shared/filter-activity-log/filter-activity-log-daterangepicker.tpl.html',
      link: {
        post: link
      }
    };

    /**
     * @name link
     * @desc link function for directive
     * @kind function
     */
    function link(scope, elem, attr) {
      var FILTER_EVENT_TIMEOUT = 2000,
        DATE_PICKER_SELECTOR = '.date-picker',
        LAST_DAY = 'Last 1 Day',
        LAST_WEEK = 'Last 7 Days ',
        LAST_MONTH = 'Last 30 Days';
      //datepicker ranges
      var ranges = scope.ranges;
      //ui handlers
      scope.handlers = {
        overlayClickHandler: overlayClickHandler,
        daterangepickerBlur: daterangepickerBlur
      };

      init();
      /*
       * @name init
       * @desc logic init
       * @kind function
       */
      function init() {}
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
       * @name daterangepickerBlur
       * @desc blur handler for the date picker. Shows overlay
       * @kind function
       * @param {Object} - datePicker object
       */
      function daterangepickerBlur(datePicker) {
        updateOverlayValue(datePicker);
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
       * @name updateOverlayValue
       * @desc updates overlay value to match the date rangepicker value
       * @kind function
       * @param {Object} - datePicker object
       */
      function updateOverlayValue(datePicker) {
        var key = _.findKey(ranges, function(obj) {
          //range date
          var objStartDate = obj[0].toDate().getTime(),
            objEndDate = obj[1].toDate().getTime(),
            // selected date
            selStartDate = scope.datePicker.date.startDate.toDate().getTime(),
            selEndDate = scope.datePicker.date.endDate.toDate().getTime();
          return (objStartDate === selStartDate) && (objEndDate === selEndDate);
        });
        if (!key) {
          key = datePicker.val();
        }
        if (scope.datePicker.overlay.val !== '') {
          // detect value set
        }
        scope.datePicker.overlay.val = key;
        scope.datePicker.overlay.show = true;
      }
    }
    return directive;
  }
})();
