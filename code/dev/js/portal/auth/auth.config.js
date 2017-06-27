(function () {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .config(configure);

  /*@ngInject*/
  function configure($httpProvider) {
    // alternatively, register the interceptor via an anonymous factory
    // @see https://docs.angularjs.org/api/ng/service/$http
    $httpProvider.interceptors.push(function($q,$location) {
      var location = '//portal';//
      /*@ngInject*/
      return {
        'request': function(config) {
          // NOTE: delete header 'Authorization' with JWT for caching
          if(config.method === 'GET' && (config.url.indexOf(location)>-1)){
            delete config.headers.Authorization;
          }
          return config;
        }
      };
    });
  }
})();
