(function () {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .directive('appSelect', appSelectDirective);

  /*@ngInject*/
  function appSelectDirective(User, $localStorage, AlertService) {

    return {
      restrict: 'AE',
      templateUrl: 'parts/apps/app-select.html',
      scope: {
        ngModel: '=',
        onSelect: '&'
      },
      /*@ngInject*/
      controller: function ($scope) {
        $scope.apps = [];
        $scope._loading = true;
        $scope._disabled = false;
        $scope.onAppSelect = function ( app ) {
          $scope.ngModel = app;
          $localStorage.selectedApplication = app;
        };

        var u = User.getUser();
        var account = u.companyId[0] || null;

        if ( !$scope.ngModel && $localStorage.selectedApplication !== undefined ) {
          $scope.onAppSelect( $localStorage.selectedApplication );
        }

        //  ---------------------------------
        // Load user applications
        User.getUserApps()
          .then(function ( data ) {
            // console.log( data );
            if ( account ) {
              data.unshift({
                app_id: "",
                app_name: "All Applications"
              });
            } else if ( u.role !== 'revadmin' ) {
              $scope._disabled = true;
              data = [];
            }
            $scope.apps = data;
          })
          .catch(function () {
            AlertService.danger('Oops! Something went wrong');
          })
          .finally(function () {
            $scope._loading = false;
          });

        //  ---------------------------------
        $scope.$watch('ngModel', function () {
          if ( $scope.onSelect ) {
            $scope.onSelect();
          }
        });

      }
    };
  }
})();
