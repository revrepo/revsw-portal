(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('WAF_Rules', WAF_RulesResource);

  /*@ngInject*/
  function WAF_RulesResource(Resource, $config) {

    return Resource($config.API_URL + '/waf_rules/:id', {
      id: '@id'
    }, {
      status: {
        url: $config.API_URL + '/waf_rules/:id/config_status',
        method: 'GET',
        isArray: false
      }
    });
  }
})();