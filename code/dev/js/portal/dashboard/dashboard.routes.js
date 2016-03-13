/**
 * Created on 09.03.2016.
 */
(function() {
  'use strict';

  angular
    .module('revapm.Portal.Dashboard')
    .config(routesConfig)
    // .config(["dashboardProvider", function(dashboardProvider) {

    //   dashboardProvider
    //     .structure('6-6', {
    //       rows: [{
    //         columns: [{
    //           styleClass: 'col-md-6'
    //         }, {
    //           styleClass: 'col-md-6'
    //         }]
    //       }]
    //     })
    // }]);

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
              'bower_components/adf-structures-base/dist/adf-structures-base.min.js',
              'widgets/adf-widget-analytics-proxy-traffic/dist/adf-widget-analytics-proxy-traffic.min.js',
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
