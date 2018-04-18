(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Groups', GroupsResource);

  /*@ngInject*/
  function GroupsResource(Resource, $config) {

    return Resource($config.API_URL + '/groups/:id', { id: '@id' }, {
      users: {
        url: $config.API_URL + '/groups/:id/users',
        method: 'GET'
      },
      getByUserManagement: {
        url: $config.API_URL + '/groups/:id?filters=:filters',
        method: 'GET'
      }
    });
  }
})();
