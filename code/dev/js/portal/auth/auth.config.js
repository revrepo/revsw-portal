(function(window, angular) {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .config(configure);

  /*@ngInject*/
  function configure($httpProvider) {
    // alternatively, register the interceptor via an anonymous factory
    // @see https://docs.angularjs.org/api/ng/service/$http
    // NOTE: Only API requests will be contain header 'Authorization'
    var API_URL = window.API_URL;
    $httpProvider.interceptors.push(function($q, $location) {
      /*@ngInject*/
      return {
        'request': function(config) {
          // NOTE: delete header 'Authorization' with JWT for caching
          if (config.method === 'GET' && (config.url.indexOf(API_URL) !== 0)) {
            delete config.headers.Authorization;
          }
          return config;
        }
      };
    });
  }
})(window, angular);
