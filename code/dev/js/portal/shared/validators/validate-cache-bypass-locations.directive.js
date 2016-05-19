(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateCacheBypassLocations', validateCacheBypassLocations);
  /**
   * @name  validateCacheBypassLocations
   * @description
   *
   * @return {Boolean}
   */
  function validateCacheBypassLocations($config) {
    'ngInject';
    var _name = 'сache-bypass-locations';
    var CACHE_BYPASS_LOCATION = $config.PATTERNS.CACHE_BYPASS_LOCATION;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.cacheBypassLocations = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && angular.isArray(value)) {
          angular.forEach(ngModel.$modelValue, function(item) {
            if (CACHE_BYPASS_LOCATION.test(item) === false) {
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
