(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateOriginServerName', validateOriginServerName);
  /**
   * @name  validateOriginServerName
   * @description
   *
   * @return {Boolean}
   */
  function validateOriginServerName($config) {
    'ngInject';
    var _name = 'origin-server-name';
    var DOMAIN = $config.PATTERNS.DOMAIN;
    var IP_ADDRESS = $config.PATTERNS.IP_ADDRESS;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.originServerName = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && (DOMAIN.test(value) === false) && IP_ADDRESS.test(value) === false) {
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
