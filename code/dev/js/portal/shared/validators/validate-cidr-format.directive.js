(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateCidrFormat', validateCidrFormat);
  /**
   * @name  validateCidrFormat
   * @description
   *
   * @return {Boolean}
   */
  function validateCidrFormat($config) {
    'ngInject';
    var _name = 'cidr-format';
    var CIDR = $config.PATTERNS.CIDR;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.cidrFormat = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && (CIDR.test(value) === false)) {
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
