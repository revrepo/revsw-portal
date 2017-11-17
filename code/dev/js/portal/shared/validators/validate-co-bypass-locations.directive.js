(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateCoBypassLocations', validateCoBypassLocations);
  /**
   * @name  validateCoBypassLocations
   * @description
   *
   * @return {Boolean}
   */
  function validateCoBypassLocations($config) {
    'ngInject';
    var _name = 'co-bypass-locations';
    var CO_BYPASS_LOCATION = $config.PATTERNS.CO_BYPASS_LOCATION;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.coBypassLocations = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && angular.isArray(value)) {
          angular.forEach(ngModel.$modelValue, function(item) {
            if (CO_BYPASS_LOCATION.test(item) === false) {
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
