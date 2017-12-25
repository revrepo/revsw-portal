(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateUniquenessInArrayWallarmLocationList', validateUniquenessInArrayWallarmLocationList);

  function validateUniquenessInArrayWallarmLocationList() {
    var _name = 'uniqueness-in-array-wallarm-location-list';

    function link(scope, element, attributes, ngModel) {

      ngModel.$validators.uniquenessInArray = function(modelValue) {
        ngModel.$setValidity(_name, true);
        var modelValue_ = !!modelValue ? modelValue.trim() : '';
        if (_.isArray(scope.arrayOfCheck) && (scope.arrayOfCheck.indexOf(modelValue_) !== -1)) {
          ngModel.$setValidity(_name, false);
        }
        return true;
      };

      scope.$watch('arrayOfCheck', function() {
        ngModel.$validate();
      });
    }

    return {
      require: 'ngModel',
      scope: {
        arrayOfCheck: '=validateUniquenessInArrayWallarmLocationList'
      },
      link: link
    };
  }

})(angular);
