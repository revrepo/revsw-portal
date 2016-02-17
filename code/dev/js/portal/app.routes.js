(function () {
  'use strict';

  angular
    .module('revapm.Portal')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/users');

    /**
     * Controller for top menu
     * @param {Object} $scope
     * @param {Object} $state
     */
    var menuController = function ($scope, $state) {
      $scope.$state = $state;
    };


    $stateProvider
    // Base 3 layout
      .state('index', {
        url: '',
        views: {
          layout: {
            templateUrl: 'parts/layout.html',
            /*@ngInject*/
            controller: function ($scope, $state, User) {
              $scope.userService = User;
              if (!User.isAuthed() &&
                $state.current.name != 'index.restore' &&
                $state.current.name != 'signup' &&
                $state.current.name != 'billing_plans'
              ){
                $state.go('login');
              } else if ($state.current.name == 'index') {
                $state.go('index.reports.proxy');
              }
            }
          }
        }
      })
      .state('index.apps', {
        url: '/apps',
        views: {
          menu: {
            controller: menuController,
            templateUrl: 'parts/cadmin-top-menu.html'
          },
          sideMenu: {
            templateUrl: 'parts/menu/apps-side.html'
          },
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.webApp', {
        url: '',
        views: {
          menu: {
            controller: menuController,
            templateUrl: 'parts/cadmin-top-menu.html'
          },
          sideMenu: {
            templateUrl: 'parts/menu/domains-side.html'
          },
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.accountSettings', {
        url: '',
        views: {
          menu: {
            controller: menuController,
            templateUrl: 'parts/cadmin-top-menu.html'
          },
          sideMenu: {
            templateUrl: 'parts/menu/accounts-side.html'
          },
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.reports', {
        url: '',
        views: {
          menu: {
            controller: menuController,
            templateUrl: 'parts/cadmin-top-menu.html'
          },
          sideMenu: {
            templateUrl: 'parts/menu/web-analitycs-side.html'
          },
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.mobile', {
        url: '',
        views: {
          menu: {
            controller: menuController,
            templateUrl: 'parts/cadmin-top-menu.html'
          },
          sideMenu: {
            templateUrl: 'parts/menu/mobile-analitycs-side.html'
          },
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.help', {
        url: '/help',
        views: {
          menu: {
            controller: menuController,
            templateUrl: 'parts/cadmin-top-menu.html'
          },
          sideMenu: {
            templateUrl: 'parts/menu/help-side.html'
          },
          page: {
            templateUrl: 'parts/help/contactus.html'
          }
        }
      });
  };
})();
