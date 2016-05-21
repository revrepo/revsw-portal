(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateCachingRuleHeaderName', validateCachingRuleHeaderName);
  /**
   * @name  validateCachingRuleHeaderName
   * @description
   *
   * @return {Boolean}
   */
  function validateCachingRuleHeaderName($config) {
    'ngInject';
    var _name = 'caching-rule-header-name';
    var HEADER_VALUE = $config.PATTERNS.HEADER_VALUE;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.cachingRuleHeaderName = function(value) {
        ngModel.$setValidity(_name, true);
        if (value !== undefined && !angular.isArray(value)) {
          if (HEADER_VALUE.test(value) === false) {
            ngModel.$setValidity(_name, false);
          }
        }
        // NOTE: only set value for attribute "$valid"
        return true;
      };
    }

    return {
      require: 'ngModel',
      link: link
    };
  }
})(angular);
