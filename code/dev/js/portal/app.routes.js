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
    // NOTE: open by default the first configured dashboard or go to Web Analytics -> Proxy Traffic page
    $urlRouterProvider.otherwise(/*ngInject*/function($injector, $location){
      var $state = $injector.get('$state');
      var DashboardSrv =  $injector.get('DashboardSrv');
      DashboardSrv.getAll()
          .then(function(dashboards) {
            if (dashboards && dashboards.length) {
              $location.path('dashboard/' + dashboards[0].id);
            } else {
              $state.go('index.reports.proxy');
            }
          });
      return true;
    });

    $stateProvider
    // Base 3 layout
      .state('index', {
        url: '',
        views: {
          layout: {
            templateUrl: 'parts/layout.html',
            controller: /*ngInject*/ function($scope, $rootScope, $state, $window, $timeout, $config, $localStorage, User) {
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

              function checkStepPerm(step, perm) {
                if (step.element && step.permission && step.permission === perm) {
                  $rootScope.IntroOptions.steps.splice($rootScope.IntroOptions.steps.indexOf(step), 1);
                }
              }

              // NOTE: auto start Intor.js in dashboard page(state)
              var timeout_ = null;
              if (!!timeout_) {
                $timeout.cancel(timeout_);
              }
              
              if ($config.INTRO_IS_ACTIVE) {
                activateIntro();
              }

              function activateIntro() {
                var userPermissions = User.getPermissions();

                var timeOut = 30000;              
                var pollPerm = function () {                  
                  userPermissions = User.getPermissions();
                  if (!userPermissions) {                    
                    timeOut -= 1000;
                    if (timeOut > 0) {
                      setTimeout(pollPerm, 1000);
                    }
                  } else {
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
              $scope.onIntroSkipEvent = function () {
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
              $scope.onBeforeChangeEvent = function (targetElement) {
                var step = targetElement.id;
                switch (step) {
                  case 'side-menu-sub-item__update-password':
                  case 'side-menu-sub-item__security-settings':
                    $rootScope.menuExpandedNodes['index.accountSettings'] = true;
                    ['index.apps', 'index.reports', 'index.webApp', 'index.help'].forEach(function (menuState) {
                      $rootScope.menuExpandedNodes[menuState] = false;
                    });


                    break;
                  case 'side-menu-sub-item__API-documentation':
                  case 'side-menu-sub-item__know-base':
                  case 'side-menu-sub-item__open-ticket':
                  case 'side-menu-sub-item__network-status':
                    $rootScope.menuExpandedNodes['index.help'] = true;
                    
                    ['index.apps', 'index.reports', 'index.webApp', 'index.accountSettings'].forEach(function (menuState) {
                      $rootScope.menuExpandedNodes[menuState] = false;
                    });
                    break;
                  case 'side-menu-sub-item__webApp-domains':
                  case 'side-menu-sub-item__webApp-ssl_certs':
                  case 'side-menu-sub-item__webApp-cache':
                  case 'side-menu-sub-item__webApp-ssl_names':
                  case 'side-menu-sub-item__webApp-staging-environment':
                  case 'side-menu-sub-item__webApp-domains':
                    // NOTE: open menu item
                    ['index.webApp'].forEach(function (menuState) {
                      $rootScope.menuExpandedNodes[menuState] = true;
                    });
                    // NOTE: close menu items
                    ['index.apps', 'index.reports', 'index.accountSettings', 'index.help'].forEach(function (menuState) {
                      $rootScope.menuExpandedNodes[menuState] = false;
                    });

                    break;
                  default:
                    ['index.webApp'].forEach(function (menuState) {
                      $rootScope.menuExpandedNodes[menuState] = false;
                    });
                }

                
              };
                };        
                pollPerm();        
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
            templateUrl: 'parts/help/contactus.html',
            controller: /*ngInject*/ function($scope, Locations, $uibModal) {
              Locations.billingZones().$promise
                .then(function(data) {
                  $scope.billingZonesGroup = _.chain(data).sortBy('billing_zone').groupBy('billing_zone').value();
                });
              /**
               * @name onGetBillingZonesDetails
               * @description show modal window with Billing Zones
               *
               * @return
               */
              $scope.onGetBillingZonesDetails = function(e) {
                e.preventDefault();
                var model = {
                  billingZones: $scope.billingZonesGroup
                };
                var modalInstance = $uibModal.open({
                  animation: false,
                  templateUrl: 'parts/reports/modal/modal-billing-zones-details.tpl.html',
                  controller: 'ConfirmModalInstanceCtrl',
                  size: 'md',
                  resolve: {
                    model: model
                  } || {}
                });
              };
            }
          }
        }
      })
      // Security Analytics
      .state('index.security', {
        url: '/security',
        views: {
          page: {
             templateUrl: 'parts/layout/page.html'
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
