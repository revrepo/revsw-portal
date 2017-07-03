(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateDomainNameRegularOrWildcardDomains', validateDomainNameRegularOrWildcardDomains);
  /**
   * @name  validateDomainNameRegularOrWildcardDomains
   * @description
   *
   * @return {Boolean}
   */
  function validateDomainNameRegularOrWildcardDomains($config) {
    'ngInject';
    var _name = 'domain-name-regular-or-wildcard-domains';
    var DOMAIN = $config.PATTERNS.DOMAIN;
    var WILDCARD_DOMAINS_FIELDS = $config.PATTERNS.WILDCARD_DOMAINS_FIELDS;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.domainNameRegularOrWildcardDomains = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined &&
          ((DOMAIN.test(value) === false) && (WILDCARD_DOMAINS_FIELDS.test(value) === false))) {
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
