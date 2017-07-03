(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateDomainsList', validateDomainsList);
  /**
   * @name  validateDomainsList
   * @description
   *
   * @return {Boolean}
   */
  function validateDomainsList($config) {
    'ngInject';
    var _name = 'domains-list';
    var DOMAIN = $config.PATTERNS.DOMAIN;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.domainsList = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && angular.isArray(value)) {
          angular.forEach(ngModel.$modelValue, function(item) {
            if (DOMAIN.test(item) === false) {
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
