(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('ngAnimateDisabled', function($animate) {
      'ngInject';
      return {
        restrict: 'A',
        link: function(scope, elt, attrs, $select) {
          $animate.enabled(elt, false);
        }
      };
    });
})(angular);
