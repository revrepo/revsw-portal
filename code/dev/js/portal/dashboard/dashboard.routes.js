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
        },
        resolve: {
          loadModules: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              'bower_components/Sortable/Sortable.min.js',
              'bower_components/Sortable/ng-sortable.js',
              'bower_components/angular-dashboard-framework/dist/angular-dashboard-framework.min.js',
              'bower_components/angular-dashboard-framework/dist/angular-dashboard-framework.min.css',
              'widgets/adf-widget-analytics-proxy-traffic/dist/adf-widget-analytics-proxy-traffic.js',
            ]);
          }]
        }
      })
      .state('index.dashboard.main', {
        url: '',
        views: {
          page: {
            templateUrl: 'parts/dashboard/dashboard.tpl.html',
            controller: "DashdoardController",
            controllerAs: "dashboard"
          }
        }
      })
  }

})();
