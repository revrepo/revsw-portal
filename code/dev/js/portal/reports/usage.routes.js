(function () {
  'use strict';

  angular
    .module('revapm.Portal.Usage')
    .config(UsageRoutes);

  /*@ngInject*/
  function UsageRoutes($stateProvider) {
    $stateProvider
      .state('index.usage.web', {
        url: '/usage/web',
        views: {
          main: {
            controller: 'UsageWebController',
            templateUrl: 'parts/reports/usage-web.html'
          }
        }
      });
  }
})();
