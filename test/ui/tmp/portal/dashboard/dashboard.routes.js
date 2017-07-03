/**
 * Created on 09.03.2016.
 */
(function() {
  'use strict';

  angular
    .module('revapm.Portal.Dashboard')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {

    $stateProvider
      .state('index.dashboard', {
        url: '/dashboard',
        abstract: true,
        views: {
          page: {
            template: '<div class="container-fluid" ui-view="page"></div>'
          }
        }
      })
      .state('index.dashboard.main', {
        url: '',
        views: {
          page: {
            templateUrl: 'parts/dashboard/dashboard.tpl.html',
            controller: 'DashdoardController',
            controllerAs: 'dashboard'
          }
        }
      })
      .state('index.dashboard.details', {
        url: '/:dashboardId',
        views: {
          'page': {
            templateUrl: 'parts/dashboard/dashboard.tpl.html',
            controller: 'DashdoardController',
            controllerAs: 'dashboard'
          }
        }
      });
  }
})();
