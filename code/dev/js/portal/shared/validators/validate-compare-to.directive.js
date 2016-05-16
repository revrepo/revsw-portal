(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateCompareTo', validateCompareTo);

  function validateCompareTo() {

    function link(scope, element, attributes, ngModel) {

      ngModel.$validators.compareTo = function(modelValue) {
        return modelValue === scope.otherModelValue;
      };

      scope.$watch('otherModelValue', function() {
        ngModel.$validate();
      });
    }

    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=validateCompareTo'
      },
      link: link
    };
  }

})(angular);
