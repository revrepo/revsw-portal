(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .config(ResourceConfig);

  /*@ngInject*/
  function ResourceConfig($httpProvider) {
    $httpProvider.interceptors.push('revAPIHttpInterceptor');
    $httpProvider.interceptors.push('timeoutHttpIntercept');
  }
})(angular);
