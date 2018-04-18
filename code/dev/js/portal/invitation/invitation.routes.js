(function () {
  'use strict';

  angular
    .module('revapm.Portal.Invitation')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider, $urlRouterProvider, $config) {
    $stateProvider
      .state('invitation', {
        abstract: false,
        url: '/invitation/:user/:token',
        views: {
          layout: {
            templateUrl: 'parts/invitation/createPassword.html',
            controller: 'InvitationCrudController'
          }
        }
      });
  }
})();
