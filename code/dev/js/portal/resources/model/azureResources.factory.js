(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('AzureResources', AzureResourcesResource);

  /*@ngInject*/
  function AzureResourcesResource(Resource, $config) {
    var API_URL =  $config.API_URL;
    API_URL = API_URL.replace('/v1','');
    return Resource(API_URL +'/resources' , {
      subscription_id: '@subscription_id'
    } );
  }
})();
