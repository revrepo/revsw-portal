(function() {
  'use strict';
  // @see https://docs.angularjs.org/error/ngModel/numfmt?p0=5
  angular
    .module('revapm.Portal.Shared')
    .directive('stringToNumber', function() {
      'ngInject';
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          ngModel.$parsers.push(function(value) {
            return '' + value;
          });
          ngModel.$formatters.push(function(value) {
            return parseFloat(value);
          });
        }
      };
    });
})();
