(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Users', UsersResource);

  /*@ngInject*/
  function UsersResource(Resource, $config) {

    return Resource($config.API_URL + '/users/:id', {id: '@user_id', token: '@token'}, {
      myself: {
        url: $config.API_URL + '/users/myself',
        method: 'GET'
      },
      signup: {
        url: $config.API_URL + '/signup',
        method: 'POST'
      },
      verify: {
        url: $config.API_URL + '/signup/verify/:token',
        method: 'GET'
      }
    });
  };
})();
