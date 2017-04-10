(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFRules')
    .config(routesConfig);

  /*@ngInject*/
  function routesConfig($stateProvider) {
    $stateProvider
      .state('index.webApp.waf_rules', {
        url: '/waf_rules',
        views: {
          main: {
            controller: 'WAFRulesCrudController',
            templateUrl: 'parts/waf_rules/list.html'
          }
        }
      })
      .state('index.webApp.waf_rules.new', {
        url: '/new',
        views: {
          page: {
            templateUrl: 'parts/waf_rules/new.html'
          }
        }
      })
      .state('index.webApp.waf_rules.edit', {
        url: '/edit/:id?isAdvanced',
        views: {
          page: {
            templateUrl: 'parts/waf_rules/edit.html',
            controller: 'WAFRulesCrudController' // TODO: change CRUD controller
          }
        }
      });
  }
})();
