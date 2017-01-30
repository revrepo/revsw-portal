(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateDnsRecordDomainNameRegularOrWildcardDomains', validateDnsRecordDomainNameRegularOrWildcardDomains);
  /**
   * @name  validateDnsRecordDomainNameRegularOrWildcardDomains
   * @description
   *
   * @return {Boolean}
   */
  function validateDnsRecordDomainNameRegularOrWildcardDomains($config) {
    'ngInject';
    var _name = 'dns-record-domain-name-regular-or-wildcard-domains';
    var DOMAIN = $config.PATTERNS.DNS_RECORD_DOMAIN;
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
