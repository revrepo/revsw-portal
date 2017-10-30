(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateUrlJsonFile', validateUrlJsonFile);
  /**
   * @name  validateUrlJsonFile
   * @description
   *
   * @return {Boolean}
   */
  function validateUrlJsonFile($config) {
    'ngInject';
    var _name = 'url-json-file';
    var URL_JSON_FILE = $config.PATTERNS.URL_JSON_FILE;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.urlJsonFile = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && (URL_JSON_FILE.test(value) === false)) {
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
