(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateCachingRuleUrl', validateCachingRuleUrl);
  /**
   * @name  validateCachingRuleUrl
   * @description
   *
   * @return {Boolean}
   */
  function validateCachingRuleUrl($config) {
    'ngInject';
    var _name = 'caching-rule-url';
    var URL = $config.PATTERNS.URL;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.cachingRuleUrl = function(value) {
        ngModel.$setValidity(_name, true);
        if (value !== undefined && !angular.isArray(value)) {
          if (URL.test(value) === false) {
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
