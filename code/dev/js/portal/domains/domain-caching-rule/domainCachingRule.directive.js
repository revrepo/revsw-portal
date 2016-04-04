(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainCachingRule', domainCachingRule)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-caching-rule/domain-caching-rule.tpl.html', true);
    });
  /**
   * @name  domainCachingRule
   * @description
   * @param  {Object} DomainsCachingRuleDefault
   * @return {Object}
   */
  function domainCachingRule(DomainsCachingRuleDefault) {
    var _defaultCachingRule = DomainsCachingRuleDefault;
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
        _.defaultsDeep(this.caching_rule, _defaultCachingRule);
      }
    };
  }
})();
