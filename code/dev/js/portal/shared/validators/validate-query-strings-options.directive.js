(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateQueryStringsOptions', validateQueryStringsOptions);
  /**
   * @name  validateQueryStringsOptions
   * @description
   *
   * @return {Boolean}
   */
  function validateQueryStringsOptions($config) {
    'ngInject';
    var _name = 'query-strings-options';
    var QUERY_STRINGS_OPTION = $config.PATTERNS.QUERY_STRINGS_OPTION;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.queryStringsOptions = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && angular.isArray(value)) {
          angular.forEach(ngModel.$modelValue, function(item) {
            if (QUERY_STRINGS_OPTION.test(item) === false) {
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
