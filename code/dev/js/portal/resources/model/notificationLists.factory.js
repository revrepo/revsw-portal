(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('NotificationLists', NotificationListsResource);

  /*@ngInject*/
  function NotificationListsResource(Resource, $config) {

    return Resource($config.API_URL + '/notification_lists/:id', { id: '@id' }, {});
  }
})();
