(function() {
  'use strict';

  angular
    .module('revapm.Portal.stagingEnvironment')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.webApp.staging-environment', {
        url: '/staging-environment',
        views: {
          main: {
            templateUrl: 'parts/staging-environment/staging-environment.tpl.html',
            controller:  'StagingEnvironmentController',
            controllerAs: '$ctrl'
          }
        }
      });
  }
})();
