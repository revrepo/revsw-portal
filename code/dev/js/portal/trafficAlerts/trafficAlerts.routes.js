(function () {
  'use strict';

  angular
    .module('revapm.Portal.TrafficAlerts')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.accountSettings.trafficAlerts', {
        url: '/trafficAlerts',
        views: {
          main: {
            controller: 'TrafficAlertsController',
            templateUrl: 'parts/trafficAlerts/list.html'
          }
        }
      })
      .state('index.accountSettings.trafficAlerts.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/trafficAlerts/new.html'
          }
        }
      })
      .state('index.accountSettings.trafficAlerts.edit', {
        url: '/edit/:id',
        views: {
          page: {
            controller: 'TrafficAlertsController',
            templateUrl: 'parts/trafficAlerts/edit.html'
          }
        }
      });
  }
})();
