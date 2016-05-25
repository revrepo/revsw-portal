(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('confirmOnExit', function () {
      return {
        link: function($scope, elem, attrs) {

          window.onbeforeunload = function(){
            if ($scope.createForm.$dirty) {
              return "The form is dirty, do you want to stay on the page?";
            }
          };
          var $stateChangeStartUnbind = $scope.$on('$stateChangeStart', function(event, next, current) {
            if ($scope.createForm.$dirty) {
              if(!confirm("The form is dirty, do you want to stay on the page?")) {
                event.preventDefault();
              }
            }
          });

          $scope.$on('$destroy', function() {
            window.onbeforeunload = null;
            $stateChangeStartUnbind();
          });

        }
      };
    });
})(angular);
