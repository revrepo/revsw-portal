(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileTrafficController', MobileTrafficController);

  /*@ngInject*/
  function MobileTrafficController($scope, User, AlertService, Stats, Countries, $q, $localStorage) {

    $scope._loading = true;
    $scope.apps = [];
    $scope.application = $localStorage.selectedApplicationID === undefined ? '' : $localStorage.selectedApplicationID;
    var u = User.getUser();
    $scope.account = u.companyId[0] || null;

    User.getUserApps(true)
      .then(function ( data ) {
        // console.log( data );
        if ( $scope.account ) {
          data.unshift({
            app_id: "",
            app_name: "All Applications"
          });
        }
        $scope.apps = data;
        if ( data.length ) {
          if($localStorage.selectedApplicationID === undefined ) {
            $scope.application = data[0].app_id;
          }
        } else {
          $scope.application = '';
        }
      })
      .catch(function () {
        AlertService.danger('Oops! Some shit just happened');
      })
      .finally(function () {
        $scope._loading = false;
      });

    $scope.$watch( 'application', function() {
      $localStorage.selectedApplicationID = $scope.application;
    });

  }
})();
