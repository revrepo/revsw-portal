(function () {
  'use strict';

  angular
    .module('revapm.Portal.Dashboard')
    .controller('DashdoardController', DashdoardController);

  function DashdoardController($scope, $rootScope, $state, $window, $interval, $timeout, $config, $localStorage, DashboardSrv, $stateParams, AlertService,
    $location, $anchorScroll, User) {
    'ngInject';
    var vm = this;

    // NOTE: resize for fix wigth of charts
    var resizing;
    onResize();

    function onResize() {
      if (resizing) {
        $interval.cancel(resizing);
      }
      resizing = $interval(function () {
        var event = new Event('resize');
        window.dispatchEvent(event);
        onResize();
      }, 1000, 1);
    }


    // NOTE: One controler for 2 states
    if ($stateParams.dashboardId) {
      vm.dashboardId = $stateParams.dashboardId;
      initDashboard($stateParams.dashboardId);
    } else {
      DashboardSrv.getAll()
        .then(function () {
          var firstDashboard = DashboardSrv.dashboardsList[0];
          // if dashboardId not set find and go to first dashboard in list
          if (firstDashboard.id) {
            $state.go('index.dashboard.details', {
              dashboardId: firstDashboard.id
            });
          } else {
            // TODO: Show information how create Dashboard ?
            changeState();
          }
        });

    }
    /**
     * @name  initDashboard
     * @description
     * @param  {String} dashboardId
     * @return
     */
    function initDashboard(dashboardId) {
      vm.model = {};
      vm._isLoading = true;
      return DashboardSrv
        .get(dashboardId)
        .then(function (data) {
          angular.extend(vm.model, data);
          vm.model.getCountDashboardWidget = vm.getCountDashboardWidget;
          vm.model.addTemplateUrl = 'parts/dashboard/widgets/widget-add.html';
          vm.model.editTemplateUrl = 'parts/dashboard/modals/dashboard-edit-with-options.tpl.html';
          $scope.autoRefresh(vm.model.options); // NOTE: run auto-refresh with dashboard options
        },
        function (err) {
          AlertService.danger(err);
        })
        .finally(function () {
          vm._isLoading = false;
        });
    }


    // NOTE: watch to count dashboard in menu
    $scope.$watch(function () {
      return DashboardSrv.dashboardsList.length;
    },
      function (newVal) {
        if (vm.model) {
          vm.model.isLast = (newVal < 2);
        }
      }, true);

    $scope.$on('adfDashboardChanged', function (event, dashboardId, model) {
      DashboardSrv.set(vm.dashboardId, model);
    });

    vm.reload = function () {
      $scope.$broadcast('widgetReload');
    };

    $scope.$watch(
      function () {
        if (vm.model) {
          return vm.model.options;
        } else {
          return;
        }
      },
      function (newVal, oldVal) {
        if (!!newVal && !!oldVal && newVal.autorefresh !== oldVal.autorefresh) {
          $scope.autoRefresh(newVal);
        }
      }, true);

    $scope.$watch(
      function () {
        return (!vm.model || (!!vm.model && vm.model.refreshNow === false)) ? null : vm.model.refreshNow;
      },
      function (newVal, oldVal) {
        if (newVal !== oldVal && newVal === true) {
          $timeout(function () {
            vm.model.refreshNow = false;
          }, $config.REFRESH_NOW_TIMEOUT);

          $scope.refreshWidgets();
        }
      }, true);

    var timeReload;
    /**
     * @name  autoRefresh
     * @description
     * @param  {Object} option
     * @return
     */
    $scope.autoRefresh = function (option) {
      if (!!timeReload) {
        $interval.cancel(timeReload);
      }

      if (!!option && !!option.autorefresh && option.autorefresh !== '') {
        timeReload = $interval(
          function () {
            if ($state.current.name !== 'index.dashboard.details') {
              // NOTE: don't run auto refresh if type of the page is changed
              return;
            }
            $scope.$broadcast('widgetReload');
            $scope.autoRefresh(option);
          }, option.autorefresh * 60 * 1000, 1);
      }
    };
    /**
     * @name  refreshWidgets
     * @description Self refresh widgets
     * @return
     */
    $scope.refreshWidgets = function () {
      if (!!timeReload) {
        $interval.cancel(timeReload);
      }
      if (!!vm.model.option && vm.model.option.autorefresh !== '') {
        $scope.autoRefresh(vm.model.option);
      } else {
        $scope.$broadcast('widgetReload');
      }
    };

    /**
     * @description
     * @return
     */
    $scope.$on('destroy', function () {
      if (!!timeReload) {
        $interval.cancel(timeReload);
      }
      if (!!resizing) {
        $interval.cancel(resizing);
      }
    });

    /**
     * @name  getCountDashboardWidget
     * @description
     *
     * @param  {Array}  rows
     * @return {Integer}
     */
    vm.getCountDashboardWidget = function getCountDashboardWidget(rows) {
      var wc = 0;
      angular.forEach(rows, function (cols) {
        angular.forEach(cols.columns, function (col) {
          if (!!col.widgets && col.widgets.length > 0) {
            wc = wc + col.widgets.length;
          }
        });
      });
      return wc;
    };

  }
})();