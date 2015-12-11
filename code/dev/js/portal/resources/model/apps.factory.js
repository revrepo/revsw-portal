(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Apps', AppsResource);

  /*@ngInject*/
  function AppsResource(Resource, $config) {
    return Resource($config.API_URL + '/apps/:id', {id: '@id'},{
      status: {
        url: $config.API_URL + '/apps/:id/config_status',
        method: 'GET',
        isArray: false
      }
    });
  }
})();
