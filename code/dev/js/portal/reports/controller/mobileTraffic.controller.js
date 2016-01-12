(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileTrafficController', MobileTrafficController);

  /*@ngInject*/
  function MobileTrafficController($scope, User, AlertService, Stats, Countries, $q) {

    $scope._loading = true;
    $scope.apps = [];
    $scope.application = null;
    var u = User.getUser();
    $scope.account = u.companyId[0] || null;

    User.getUserApps(true)
      .then(function ( data ) {
        // console.log( data );
        $scope.apps = data;
        // $scope.account = data[0].account_id;
      })
      .catch(function () {
        AlertService.danger('Oops! Some shit just happened');
      })
      .finally(function () {
        $scope._loading = false;
      });

    $scope.reload = function () {
      if ( !$scope.apps.length === 0 ) {
        return;
      }
    };

    $scope.onAppSelected = function () {
      // console.log( $scope.application );
      $scope.reload();
    };
  }
})();
