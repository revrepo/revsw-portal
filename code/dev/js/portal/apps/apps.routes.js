(function() {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.apps.android', {
        url: '/android',
        data: {
          platform: 'Android',
          platform_code: 'Android',
          list: true
        },
        views: {
          main: {
            controller: 'AppsController',
            templateUrl: 'parts/apps/list.html'
          }
        }
      })
      .state('index.apps.ios', {
        url: '/ios',
        data: {
          platform: 'iOS',
          platform_code: 'iOS',
          list: true
        },
        views: {
          main: {
            controller: 'AppsController',
            templateUrl: 'parts/apps/list.html'
          }
        }
      })
      .state('index.apps.windows_mobile', {
        url: '/windows_mobile',
        data: {
          platform: 'Windows Mobile',
          platform_code: 'Windows_Mobile',
          list: true
        },
        views: {
          main: {
            templateUrl: 'parts/apps/list.html',
            controller: 'AppsController'
          }
        }
      })
      .state('index.apps.ios.new', {
        url: '/new',
        data: {
          platform: 'iOS',
          platform_code: 'iOS',
          list: false
        },
        views: {
          page: {
            templateUrl: 'parts/apps/new.html',
            // controller: 'AppsController'
          }
        }
      })
      .state('index.apps.ios.edit', {
        url: '/edit/:id?isAdvanced',
        data: {
          platform: 'iOS',
          platform_code: 'iOS',
          list: false
        },
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
        data: {
          platform: 'Android',
          platform_code: 'Android',
          list: false
        },
        views: {
          page: {
            templateUrl: 'parts/apps/new.html',
            // controller: 'AppsController'
          }
        }
      })
      .state('index.apps.android.edit', {
        url: '/edit/:id?isAdvanced',
        data: {
          platform: 'Android',
          platform_code: 'Android',
          list: false
        },
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
      .state('index.apps.windows_mobile.new', {
        url: '/new',
        data: {
          platform: 'Windows Mobile',
          platform_code: 'Windows_Mobile',
          list: false
        },
        views: {
          page: {
            templateUrl: 'parts/apps/new.html',
            // controller: 'AppsController'
          }
        }
      })
      .state('index.apps.windows_mobile.edit', {
        url: '/edit/:id?isAdvanced',
        data: {
          platform: 'Windows Mobile',
          platform_code: 'Windows_Mobile',
          list: false
        },
        views: {
          page: {
            templateUrl: 'parts/apps/edit.html',
            controller: 'AppEditController'
          }
        }
      })
      .state('index.apps.windows_mobile.versions', {
        url: '/versions/:id/',
        data: {
          platform: 'Windows Mobile',
          platform_code: 'Windows_Mobile',
          list: false
        },
        views: {
          page: {
            templateUrl: 'parts/apps/versions.html',
            controller: 'AppVersionsController'
          }
        }
      });
  }
})();
