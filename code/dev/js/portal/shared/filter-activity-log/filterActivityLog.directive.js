(function() {
  'use strict';
  angular
    .module('revapm.Portal.Shared')
    .directive('filterActivityLog', filterActivityLog)
    .service('ActivityLogFilterInfoService', ActivityLogFilterInfoService);
  /**
   * @name  ActivityLogFilterInfoService
   * @description
   *
   * @param {Function} $localStorage [description]
   */
  function ActivityLogFilterInfoService($localStorage) {

    this.setFilterState = function(data) {
      $localStorage.activityFilterState = data;
      return $localStorage.activityFilterState;
    };

    this.getFilterState = function() {
      return $localStorage.activityFilterState;
    };

    this.setFilterData = function(data) {
      $localStorage.activityFilterData = data;
    };

    this.getCurrentFilterData = function() {
      return $localStorage.activityFilterData;
    };
  }

  function filterActivityLog() {
    return {
      require: 'ngModel',
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        onApply: '='
      },
      controllerAs: '$ctrl',
      templateUrl: 'parts/shared/filter-activity-log/filter-activity-log.tpl.html',
      controller: /*ngInject*/ function($scope, ActivityPhrase, ActivityLogFilterInfoService) {
        var $ctrl = this;
        var FILTER_EVENT_TIMEOUT = 2000,
          DATE_PICKER_SELECTOR = '.date-picker',
          LAST_DAY = 'Last 1 Day',
          LAST_WEEK = 'Last 7 Days ',
          LAST_MONTH = 'Last 30 Days';
        //datepicker ranges
        var ranges = {};
        //Default valuew is Last 1 Day!
        ranges[LAST_DAY] = [moment().subtract(1, 'days'), moment()];
        ranges[LAST_WEEK] = [moment().subtract(7, 'days'), moment()];
        ranges[LAST_MONTH] = [moment().subtract(30, 'days'), moment()];
        //date picker params
        this.datePicker = {
          overlay: {
            show: true,
            val: LAST_DAY
          },
          options: {
            timePicker: true,
            timePickerIncrement: 30,
            ranges: ranges,
            minDate: moment().subtract(6, 'months'),
            maxDate: moment(),
            dateLimit: {
              months: 6
            }
          },
          date: {
            startDate: ranges[LAST_DAY][0],
            endDate: ranges[LAST_DAY][1]
          }
        };

        this.activityTypeList = [{ id: null, name: 'All Activity Types' }];
        _.map(ActivityPhrase.ACTIVITY_TYPE, function(item, key) {
          $ctrl.activityTypeList.push({ id: key, name: item });
        });

        this.targetTypeList = [{ id: null, name: 'All Target Types' }];
        _.map(ActivityPhrase.ACTIVITY_TARGET, function(item, key) {
          $ctrl.targetTypeList.push({ id: key, name: item });
        });
        // NOTE: Each time then open page the filter set as empty
        this.newFilterState = {}; //ActivityLogFilterInfoService.getFilterState() || {};
        /**
         * @name  onCancel
         * @description
         *  Cancel filter data
         *
         * @return {[type]} [description]
         */
        this.onCancel = function() {
          $ctrl.newFilterState = {};
          ActivityLogFilterInfoService.setFilterState($ctrl.newFilterState);
          ActivityLogFilterInfoService.setFilterData({});
          this.onApply();
        };
        /**
         * @name onSetFilter
         * @description
         *
         * @param  {Object} data
         * @return
         */
        this.onSetFilter = function(data) {
          var filter_ = {};
          angular.extend(filter_, {
            user_id: $ctrl.newFilterState.user_id,
            api_key: $ctrl.newFilterState.api_key,
            target_type: $ctrl.newFilterState.target_type,
            target_id: $ctrl.newFilterState.target_id,
            activity_type: $ctrl.newFilterState.activity_type,
            from_timestamp: $ctrl.newFilterState.from_timestamp,
            to_timestamp: $ctrl.newFilterState.to_timestamp
          });
          if (!!$ctrl.newFilterState.activityTarget && !!$ctrl.newFilterState.activityTarget.id) {
            filter_.target_type = $ctrl.newFilterState.activityTarget.targetType;
            filter_.target_id = $ctrl.newFilterState.activityTarget.id;
          }
          ActivityLogFilterInfoService.setFilterData(filter_);
          ActivityLogFilterInfoService.setFilterState($ctrl.newFilterState);
          this.onApply();
        };

        //
        $scope.$watch(function() {
          return $ctrl.datePicker.date;
        }, function(newVal) {
          if (newVal !== undefined && $ctrl.newFilterState) {
            angular.extend($ctrl.newFilterState, {
              from_timestamp: $ctrl.datePicker.date.startDate.toDate().getTime(),
              to_timestamp: $ctrl.datePicker.date.endDate.toDate().getTime()
            });
          }
        }, true);

        $scope.$watch(function() {
          return $ctrl.newFilterState.whoPerformed;
        }, function(newVal) {
          $ctrl.newFilterState.user_id = null;
          $ctrl.newFilterState.api_key = null;
          if (newVal) {
            if (newVal.userType === 'user') {
              $ctrl.newFilterState.user_id = newVal.id;
            }
            if (newVal.userType === 'apikey') {
              $ctrl.newFilterState.api_key = newVal.id;
            }
          }
        }, true);

        $scope.$watch(function() {
          return $ctrl.newFilterState.activityTarget;
        }, function(newVal) {

        }, true);

      }
    };
  }
})();
