(function () {
  'use strict';

  angular
    .module('revapm.Portal.Dashboard')
    .controller('DashdoardController', DashdoardController);

  function DashdoardController($scope, $rootScope, $state, $window, $interval, $timeout, $config, $localStorage, DashboardSrv, $stateParams, AlertService,
    $location, $anchorScroll, User) {
    'ngInject';
    var vm = this;

    if (!User.hasAccessTo('dashboards')) {
      if (User.hasAccessTo('web_analytics')) {
        $state.go('index.reports.proxy');
        return;
      }
      var viableStates = [
        'mobile_apps',
        'mobile_analytics',
        'domains',
        'security_analytics',
        'dns_zones',
        'users',
        'groups',
        'API_keys',
        'logshipping_jobs',
        'usage_reports'
      ];
      for (var i = 0; i < viableStates.length; i++) {
        var possibleState = viableStates[i];
        if (User.hasAccessTo(possibleState)) {                  
          var goToState = User.permNameToState(possibleState);
          $state.go(goToState || 'index.accountSettings.profile');
          return;
        }
      }
    }


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

    function checkStepPerm(step, perm) {
      if (step.element && step.permission && step.permission === perm) {
        $rootScope.IntroOptions.steps.splice($rootScope.IntroOptions.steps.indexOf(step), 1);
      }
    }

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
    // NOTE: auto start Intor.js in dashboard page(state)
    var timeout_ = null;
    if (!!timeout_) {
      $timeout.cancel(timeout_);
    }

    if ($config.INTRO_IS_ACTIVE) {
      var userPermissions = User.getPermissions();
      var restrictedPerms = [];
      if (userPermissions) {
        for (var prop in userPermissions) {
          // dont trigger this for readonly or 2fa enforcement
          if (prop !== 'read_only' && prop !== 'enforce_2fa' && prop !== 'API_access') {
            if (userPermissions[prop].access === false || userPermissions[prop] === false) {
              restrictedPerms.push(prop);
              $rootScope.IntroOptions.steps[0].intro = $config.INTRO_RESTRICTED_ACCESS_TEXT.join('');
            }
          }
        }

        for (var j = 0; j < restrictedPerms.length; j++) {
          var perm = restrictedPerms[j];
          for (var k = 0; k < $rootScope.IntroOptions.steps.length; k++) {
            checkStepPerm($rootScope.IntroOptions.steps[k], perm);
          }
        }
        
      }
      var intro = $localStorage.intro || { isShowMainIntro: false, isSkipIntro: false };
      var testEnv;
      if ($localStorage.testEnv !== undefined) {
        if ($localStorage.testEnv === '1' || $localStorage.testEnv === 1) {
          testEnv = true;
        } else {
          testEnv = false;
        }
      }
      if (((intro.isShowMainIntro === false || intro.isShowMainIntro === 'false') && intro.isSkipIntro === false) || testEnv) {
        // NOTE: close menu items for start intro navigation
        ['index.apps', 'index.reports', 'index.webApp', 'index.accountSettings'].forEach(function (menuState) {
          $rootScope.menuExpandedNodes[menuState] = false;
        });

        timeout_ = $timeout(function () {
          $scope.introOpen();
          $localStorage.intro = intro;
        }, 2000);
      }
    }
    // NOTE: user skip intor on this session work
    vm.onIntroSkipEvent = function () {
      intro.isSkipIntro = true; // NOTE: store information about Intor was shows.
      intro.isShowMainIntro = true;
      $localStorage.intro = intro;
    };

    /**
     * @name  onBeforeChangeEvent
     * @description
     *
     * @param  {[type]} targetElement
     * @return {[type]}
     */
    vm.onBeforeChangeEvent = function (targetElement) {
      
      var step = targetElement.id;
      switch (step) {
        case 'side-menu-sub-item__webApp-domains':
        case 'side-menu-sub-item__webApp-ssl_certs':
        case 'side-menu-sub-item__webApp-cache':
        case 'side-menu-sub-item__webApp-ssl_names':
        case 'side-menu-sub-item__webApp-staging-environment':
        case 'side-menu-sub-item__webApp-domains':
          // NOTE: close menu items
          ['index.apps', 'index.reports', 'index.accountSettings'].forEach(function (menuState) {
            $rootScope.menuExpandedNodes[menuState] = false;
          });
          // NOTE: open menu item
          ['index.webApp'].forEach(function (menuState) {
            $rootScope.menuExpandedNodes[menuState] = true;
          });
          break;
        default:
          ['index.webApp'].forEach(function (menuState) {
            $rootScope.menuExpandedNodes[menuState] = false;
          });
      }
    };

  }
})();
