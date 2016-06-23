(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('SSLNames', SSLNamesResource);

  /*@ngInject*/
  function SSLNamesResource(Resource, $config) {

    return Resource($config.API_URL + '/ssl_names/:id/:action', {
      id: '@id'
    }, {
      approvers: {
        url: $config.API_URL + '/ssl_names/approvers',
        method: 'GET',
        isArray: true
      },
      verify: {
        url: $config.API_URL + '/ssl_names/:id/verify',
        method: 'GET'
      },
    });
  }
})();
