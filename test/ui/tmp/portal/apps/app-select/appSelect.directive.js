(function () {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .directive('appSelect', appSelectDirective);

  /*@ngInject*/
  function appSelectDirective(User, AlertService) {

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
        $scope.onAppSelect = function (app) {
          $scope.ngModel = app;
          User.selectApplication(app);
        };

        if (!$scope.ngModel && User.getSelectedApplication()) {
          // $scope.ngModel = User.getSelectedApplication();
          $scope.onAppSelect(User.getSelectedApplication());
        }

        //  ---------------------------------
        // Load user applications
        User.getUserApps(true)
          .then(function (apps) {
            $scope.apps = apps;
            // NOTE: auto select App if exists only one
            if (!User.getSelectedApplication()) {
              // NOTE: one of items can be 'All Applications'
              var appsOnly = _.filter(apps, function (itemApp) {
                return itemApp.app_id.length > 0;
              });
              if (appsOnly.length && appsOnly.length === 1) {
                $scope.onAppSelect(apps[apps.length-1]);
              }
            }
          })
          .catch(AlertService.danger)
          .finally(function () {
            $scope._loading = false;
          });

        //  ---------------------------------
        $scope.$watch('ngModel', function () {
          if ($scope.onSelect) {
            $scope.onSelect();
          }
        });

      }
    };
  }
})();
