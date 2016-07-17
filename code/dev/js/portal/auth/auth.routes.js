(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {

    $stateProvider
      .state('login', {
        url: '/login',
        views: {
          layout: {
            controller: 'LoginController',
            templateUrl: 'parts/auth/login.html'
          }
        }
      })
      .state('restore', {
        url: '/password/reset/:token',
        views: {
          layout: {
            controller: 'PasswordRestoreController',
            templateUrl: 'parts/auth/page-reset-password.html',
            controllerAs: '$ctrl'
          }
        }
      });
  }
})();
