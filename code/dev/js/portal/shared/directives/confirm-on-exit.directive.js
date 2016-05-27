/**
 * @name confirmOnExit
 *
 * @description
 * Prompts user while he navigating away from the current route (or, as long as this directive
 * is not destroyed) if any unsaved form changes present.
 *
 */

 (function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('confirmOnExit', function ($state) {
      return {
        link: function($scope, elem, attrs) {

          window.onbeforeunload = function() {
            if ($scope.createForm.$dirty) {
              return 'You have unsaved changes!';
            }
          };

          var $stateChangeStartUnbind =  $scope.$on('$stateChangeStart', function(event, next, current) {
            if ($scope.createForm.$dirty) {

              event.preventDefault();

              swal({
                title: 'You have unsaved changes!',
                text: 'Are you sure want to leave the page?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Stay On This Page',
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Leave This Page',
                closeOnConfirm: true
              }, function (isConfirm) {
                  if (isConfirm) {
                    $scope.createForm.$setPristine();
                    $state.go(next);
                  }
              });

            }

          });

          $scope.$on('$destroy', function(){
            window.onbeforeunload = null;
            $stateChangeStartUnbind();
          });

        }
      };
    });
})(angular);
