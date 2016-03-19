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
        abstract: false,
        views: {
          page: {
            template: '<div class="container-fluid" ui-view="page"></div>'
          }
        },
        resolve: {
          loadModules: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              // 'bower_components/Sortable/Sortable.min.js',
              // 'bower_components/Sortable/ng-sortable.js',
              // 'bower_components/angular-dashboard-framework/dist/angular-dashboard-framework.min.js',
              // 'bower_components/angular-dashboard-framework/dist/angular-dashboard-framework.min.css',
              'widgets/adf-widget-analytics-proxy-traffic/dist/adf-widget-analytics-proxy-traffic.js',
            ]);
          }]
        }
      })
      .state('index.dashboard.main', {
        url: '/test',
        views: {
          page: {
            templateUrl: 'parts/dashboard/dashboard_test.tpl.html',
            // controller:
            // controller: "DashdoardsController",
            // controllerAs: "dashboard"
          }
        }
      })
      .state('index.dashboard.details', {
        url: '/:dashboardId',
        views: {
          'page': {
             templateUrl: 'parts/dashboard/dashboard.tpl.html',
            // template: '<div class="row"><div class="col-md-12" ng-if="dashboard.model"> <pre>{{vm}}</pre><pre>{{dashboard}}</pre>' +
            //   '<adf-dashboard name="{{dashboard.name}}" structure="dashboard.model.structure" adf-model="dashboard.model" />' +
            //   '</div></div>',
            controller: "DashdoardController",
            controllerAs: "dashboard"
          }
        }
      })
  }

})();
