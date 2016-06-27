(function() {
  'use strict';

  angular
    .module('revapm.Portal')
    .config(routesConfig);

  /*@ngInject*/
  function resizeBinding($scope, $window){
    var w = angular.element($window);
    $scope.previous_width = $window.innerWidth;
    w.bind('resize', function () {
      if ($window.innerWidth <= 980 && $scope.previous_width > 980){
         $scope.$apply(function(){
           $scope.isHide = true;
         })
         $scope.previous_width = $window.innerWidth;
      }
      else if ($window.innerWidth > 980 && $scope.previous_width <= 980) {
        $scope.$apply(function(){
          $scope.isHide = false;
        })
        $scope.previous_width = $window.innerWidth;
      }
    });
    $scope.isHide = $window.innerWidth <= 980 ? true : false;

  }
  function routesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/users');

    $stateProvider
    // Base 3 layout
      .state('index', {
        url: '',
        views: {
          layout: {
            templateUrl: 'parts/layout.html',
            /*@ngInject*/
            controller: function($scope, $state, $window, User) {
              resizeBinding($scope, $window);
              $scope.toggle = function() {
                 $scope.isHide = $scope.isHide === false ? true: false;
              }
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
          isUserActive: function(User, $location) {
            //if its password reset disable reloadUser
            if(($location.path() || '').indexOf('password/reset') >= 0){
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
      });
  }
})();
