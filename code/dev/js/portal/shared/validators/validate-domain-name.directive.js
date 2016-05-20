(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateDomainName', validateDomainName);
  /**
   * @name  validateDomainName
   * @description
   *
   * @return {Boolean}
   */
  function validateDomainName($config) {
    'ngInject';
    var _name = 'domain-name';
    var DOMAIN = $config.PATTERNS.DOMAIN;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.domainName = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && (DOMAIN.test(value) === false)) {
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
