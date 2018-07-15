(function() {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .factory('timeoutHttpIntercept', timeoutHttpIntercept)
    .factory('revAPIHttpInterceptor', revAPIHttpInterceptor);

  /*@ngInject*/
  function revAPIHttpInterceptor($q, $config, $rootScope, $window) {

    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

    return {
      'responseError': function(rejection) {
        //@todo REMOVE THIS DIRTY FIX
        if (rejection.config.method === 'POST' && endsWith(rejection.config.url, '/2fa/enable')) {
          return $q.reject(rejection);
        }
        // handle 401
        if (rejection.status === $config.STATUS.UNAUTHORIZED) {
          $rootScope.$emit('unauthorized');
        }
        // Not connected
        if (!rejection.status) {
          $rootScope.$emit('not.connected');
        }

        // 429 (Too Many Requests)
        if (rejection.status === 429) {
          $rootScope.$emit('tooManyRequests');
        }
        return $q.reject(rejection);
      },
      'request': function(config) {
        //Added to ignore loading bar for config_status request
        if (config.url.indexOf('/config_status') >= 0) {
          config.ignoreLoadingBar = true;
        }
        return config;
      }
    };
  }

  /**
   * @name  timeoutHttpIntercept
   * @description
   *   Set configuration timeoute for different type request
   * @param  {Object} $window
   * @return {Object}
   */
  function timeoutHttpIntercept($window) {
    'ngInject';
    return {
      'request': function(config) {
        // NOTE: change default timeoute for requests
        if (config.method === 'POST' || config.method === 'PUT') {
          config.timeout = window.resourcePostPutTimeout || 60000;
        }
        return config;
      }
    };
  }
})();
