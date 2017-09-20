(function() {
  'use strict';

  angular
    .module('revapm.Portal.Notifications')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.accountSettings.notificationsList', {
        url: '/notifications/list',
        views: {
          main: {
            controller: 'NotificationListsController',
            templateUrl: 'parts/notifications/list.html'
          }
        }
      });
  }
})();
