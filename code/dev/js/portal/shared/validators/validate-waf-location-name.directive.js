(function (angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateWafLocationName', validateWafLocationName);
  /**
   * @name  validateWafLocationName
   * @description validation WAF Location Name
   *
   * @return {Boolean}
   */
  function validateWafLocationName($config) {
    'ngInject';
    var _name = 'waf-location-name';
    var WAF_LOCATION_NAME = $config.PATTERNS.WAF_LOCATION_NAME;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.domainWafLocationName = function (value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && (WAF_LOCATION_NAME.test(value) === false)) {
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
