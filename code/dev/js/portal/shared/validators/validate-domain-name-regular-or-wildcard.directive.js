(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateDomainNameRegularOrWildcard', validateDomainNameRegularOrWildcard);
  /**
   * @name  validateDomainNameRegularOrWildcard
   * @description
   *
   * @return {Boolean}
   */
  function validateDomainNameRegularOrWildcard($config) {
    'ngInject';
    var _name = 'domain-name-regular-or-wildcard';
    var DOMAIN = $config.PATTERNS.DOMAIN;
    var WILDCARD_DOMAIN_FIELD = $config.PATTERNS.WILDCARD_DOMAIN_FIELD;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.domainNameRegularOrWildcard = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined &&
          ((DOMAIN.test(value) === false) && (WILDCARD_DOMAIN_FIELD.test(value) === false))) {
          ngModel.$setValidity(_name, false);
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
