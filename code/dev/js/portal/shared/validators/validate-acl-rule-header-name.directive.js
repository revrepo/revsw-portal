(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateAclRuleHeaderName', validateAclRuleHeaderName);
  /**
   * @name  validateAclRuleHeaderName
   * @description
   *
   * @return {Boolean}
   */
  function validateAclRuleHeaderName($config) {
    'ngInject';
    var _name = 'acl-rule-header-name';
    var HEADER_VALUE = $config.PATTERNS.HEADER_VALUE;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.aclRuleHeaderName = function(value) {
        ngModel.$setValidity(_name, true);
        if (value !== undefined && !angular.isArray(value) && value.length > 0) {
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
