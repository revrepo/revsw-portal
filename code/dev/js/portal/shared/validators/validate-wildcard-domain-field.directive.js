(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateWildcardDomainField', validateWildcardDomainField);
  /**
   * @name  validateWildcardDomainField
   * @description
   *
   * @return {Boolean}
   */
  function validateWildcardDomainField($config) {
    'ngInject';
    var _name = 'wildcard-domain-field';
    var WILDCARD_DOMAIN_FIELD = $config.PATTERNS.WILDCARD_DOMAIN_FIELD;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.wildcardDomainField = function(value) {
        ngModel.$setValidity(_name, true);
        if (value !== undefined && !angular.isArray(value) && value !=='' ) {
          if (WILDCARD_DOMAIN_FIELD.test(value) === false) {
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
