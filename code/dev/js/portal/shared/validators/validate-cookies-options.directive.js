(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateCookiesOptions', validateCookiesOptions);
  /**
   * @name  validateCookiesOptions
   * @description
   *
   * @return {Boolean}
   */
  function validateCookiesOptions($config) {
    'ngInject';
    var _name = 'cookies-options';
    var COOKIE = $config.PATTERNS.COOKIE;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.cookiesOptions = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && angular.isArray(value)) {
          angular.forEach(ngModel.$modelValue, function(item) {
            if (COOKIE.test(item) === false) {
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
