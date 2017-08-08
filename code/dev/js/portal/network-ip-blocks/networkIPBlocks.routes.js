(function() {
  'use strict';

  angular
    .module('revapm.Portal.networkIPBlocks')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.accountSettings.cdn-ip-blocks', {
        url: '/cdn-ip-blocks',
        views: {
          main: {
            templateUrl: 'parts/network-ip-blocks/cdn-ip-blocks.tpl.html',
            controller: 'cdnIPBlocksController',
            controllerAs: '$ctrl'
          }
        }
      });
  }
})();
