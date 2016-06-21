(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('StagingServers', StagingServersResource);

  /*@ngInject*/
  function StagingServersResource(Resource, $config) {
    return Resource($config.API_URL + '/staging_servers', {}, {
       query: {
        isArray: true
      }
    });
  }
})();
