(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validatePatternCommentNoSpecialChars', validatePatternCommentNoSpecialChars);
  /**
   * @name  validatePatternCommentNoSpecialChars
   * @description
   *
   * @return {Boolean}
   */
  function validatePatternCommentNoSpecialChars($config) {
    'ngInject';
    var _name = 'pattern-no-special-chars';
    var PATTERN = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.noPatternSpecialChars = function(value) {
        ngModel.$setValidity(_name, true);
        if (value !== undefined && !angular.isArray(value)) {
          if (PATTERN.test(value) === false) {
            ngModel.$setValidity(_name, false);
          }
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
