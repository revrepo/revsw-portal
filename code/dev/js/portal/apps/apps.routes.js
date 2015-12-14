(function () {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.apps.android', {
        url: '/android',
        data: {platform: 'Android', list: true},
        views: {
          main: {
            controller: 'AppsController',
            templateUrl: 'parts/apps/list.html'
          }
        }
      })
      .state('index.apps.ios', {
        url: '/ios',
        data: {platform: 'iOS', list: true},
        views: {
          main: {
            controller: 'AppsController',
            templateUrl: 'parts/apps/list.html'
          }
        }
      })
      .state('index.apps.wm', {
        url: '/wm',
        data: {platform: 'Windows Mobile', list: true},
        views: {
          main: {
            templateUrl: 'parts/apps/list.html',
            controller: 'AppsController'
          }
        }
      })
      .state('index.apps.ios.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/apps/new.html',
            controller: 'AppsController'
          }
        }
      })
      .state('index.apps.ios.configure', {
        url: '/configure/:id',
        views: {
          page: {
            templateUrl: 'parts/apps/configure.html',
            controller: 'AppsController'
          }
        }
      })
      .state('index.apps.ios.edit', {
        url: '/edit/:id',
        views: {
          page: {
            templateUrl: 'parts/apps/edit.html',
            controller: 'AppEditController'
          }
        }
      })
      .state('index.apps.ios.versions', {
        url: '/versions/:id/',
        views: {
          page: {
            templateUrl: 'parts/apps/versions.html',
            controller: 'AppVersionsController'
          }
        }
      })
      .state('index.apps.android.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/apps/new.html',
            controller: 'AppsController'
          }
        }
      })
      .state('index.apps.android.configure', {
        url: '/configure/:id',
        views: {
          page: {
            templateUrl: 'parts/apps/configure.html',
            controller: 'AppsController'
          }
        }
      })
      .state('index.apps.android.edit', {
        url: '/edit/:id',
        views: {
          page: {
            templateUrl: 'parts/apps/edit.html',
            controller: 'AppEditController'
          }
        }
      })
      .state('index.apps.android.versions', {
        url: '/versions/:id/',
        views: {
          page: {
            templateUrl: 'parts/apps/versions.html',
            controller: 'AppVersionsController'
          }
        }
      })
      .state('index.apps.wm.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/apps/new.html',
            controller: 'AppsController'
          }
        }
      })
      .state('index.apps.wm.configure', {
        url: '/configure/:id',
        views: {
          page: {
            templateUrl: 'parts/apps/configure.html',
            controller: 'AppsController'
          }
        }
      })
      .state('index.apps.wm.edit', {
        url: '/edit/:id',
        views: {
          page: {
            templateUrl: 'parts/apps/edit.html',
            controller: 'AppEditController'
          }
        }
      })
      .state('index.apps.wm.versions', {
        url: '/versions/:id/',
        views: {
          page: {
            templateUrl: 'parts/apps/versions.html',
            controller: 'AppVersionsController'
          }
        }
      });
  }
})();

