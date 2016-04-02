(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainCachingRule', domainCachingRule);

  // TODO: create docs use API information
  var _cachingRule = {
    version: 1,
    url: {},
    edge_caching: {
      new_ttl: 3000,
      override_no_cc: false,
      query_string_list_is_keep: false,
      query_string_keep_or_remove_list: []
    },
    browser_caching: {},
    cookies: {}
  };

  function domainCachingRule() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        caching_rule: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-caching-rule/domain-caching-rule.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainCachingRuleController($scope) {
        'ngInject';
        var $ctrl = this;
        angular.merge(this.caching_rule, _cachingRule);
      }
    };
  }
})();
