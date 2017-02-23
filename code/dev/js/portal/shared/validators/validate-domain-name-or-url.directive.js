(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateDomainNameOrUrl', validateDomainNameOrUrl);
  /**
   * @name  validateDomainNameOrUrl
   * @description
   *
   * @return {Boolean}
   */
  function validateDomainNameOrUrl($config) {
    'ngInject';
    var _name = 'domain-name-or-url';
    var DOMAIN = $config.PATTERNS.DOMAIN;
    var URL = $config.PATTERNS.URL;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.domainNameOrUrl = function(value) {
        ngModel.$setValidity(_name, true);
        if (value !== undefined && angular.isArray(value)) {
          angular.forEach(ngModel.$modelValue, function(item) {
            if ((DOMAIN.test(item) === false) && (URL.test(item) === false)) {
              ngModel.$setValidity(_name, false);
            }
          });
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
