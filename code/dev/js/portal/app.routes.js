(function() {
  'use strict';

  angular
    .module('revapm.Portal')
    .config(routesConfig);

  function resizeBinding($scope, $window) {
    'ngInject';
    var w = angular.element($window);
    $scope.previousWidth = $window.innerWidth;
    w.bind('resize', function() {
      if ($window.innerWidth <= 980 && $scope.previousWidth > 980) {
        $scope.$apply(function() {
          $scope.isHide = true;
        });
        $scope.previousWidth = $window.innerWidth;
      } else if ($window.innerWidth > 980 && $scope.previousWidth <= 980) {
        $scope.$apply(function() {
          $scope.isHide = false;
        });
        $scope.previousWidth = $window.innerWidth;
      }
    });
    $scope.isHide = $window.innerWidth <= 980 ? true : false;
  }

  function routesConfig($stateProvider, $urlRouterProvider) {
    'ngInject';
    $urlRouterProvider.otherwise('/users');

    $stateProvider
    // Base 3 layout
      .state('index', {
        url: '',
        views: {
          layout: {
            templateUrl: 'parts/layout.html',
            controller: /*ngInject*/ function($scope, $rootScope, $state, $window, $timeout, $config, $localStorage, User) {
              // NOTE: auto start Intor.js in each (page)state
              var timeout_ = null;
              $scope.$on('$stateChangeSuccess', function(state) {
                if (userService.isAuthed()) {
                  if (!!timeout_) {
                    $timeout.cancel(timeout_);
                  }
                  if ($rootScope.isShowMainIntro === false || $rootScope.isShowMainIntro === 'false') {
                    timeout_ = $timeout(function() {
                      $scope.introOpen();
                    }, 100);
                  }
                }
              });

              resizeBinding($scope, $window);
              $scope.toggle = function() {
                $scope.isHide = $scope.isHide === false ? true : false;
              };
              $scope.userService = User;
              if (!User.isAuthed() &&
                $state.current.name !== 'index.restore' &&
                $state.current.name !== 'signup' &&
                $state.current.name !== 'billing_plans'
              ) {
                $state.go('login');
              } else if ($state.current.name === 'index') {
                $state.go('index.reports.proxy');
              }
            }
          }
        },
        resolve: {
          isUserActive: /*ngInject*/ function(User, $location) {
            //if its password reset disable reloadUser
            if (($location.path() || '').indexOf('password/reset') >= 0) {
              return;
            }
            return User.reloadUser();
          }
        }
      })
      .state('index.apps', {
        url: '/apps',
        views: {
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.webApp', {
        url: '',
        views: {
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.accountSettings', {
        url: '',
        views: {
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.billing', {
        url: '',
        views: {
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.reports', {
        url: '',
        views: {
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.mobile', {
        url: '',
        views: {
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      .state('index.help', {
        url: '/help',
        views: {
          page: {
            templateUrl: 'parts/help/contactus.html'
          }
        }
      })
      .state('index.security', {
        url: '/security',
        views: {
          page: {
            template: '<span></span>'
          }
        }
      })
      .state('index.dnsServices', {
        url: '',
        views: {
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      })
      // Azure Marketplace
      .state('index.azureMarketplace', {
        url: '/azure',
        views: {
          page: {
            templateUrl: 'parts/layout/page.html'
          }
        }
      });
  }
})();
