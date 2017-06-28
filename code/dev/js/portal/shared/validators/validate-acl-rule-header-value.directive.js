(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateAclRuleHeaderValue', validateAclRuleHeaderValue);
  /**
   * @name  validateAclRuleHeaderValue
   * @description
   *
   * @return {Boolean}
   */
  function validateAclRuleHeaderValue($config) {
    'ngInject';
    var _name = 'acl-rule-header-value';
    var HEADER_VALUE = $config.PATTERNS.HEADER_VALUE;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.aclRuleHeaderValue = function(value) {
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
