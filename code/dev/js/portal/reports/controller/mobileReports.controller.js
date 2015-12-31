(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('MobileReportsController', MobileReportsController);

  /*@ngInject*/
  function MobileReportsController($scope, User, AlertService, Stats, Countries, $q) {

    // $scope.countries = Countries.query();
    // $scope.oses = [];
    // $scope.devices = [];

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
        AlertService.danger('Oops something wrong');
      })
      .finally(function () {
        $scope._loading = false;
      });

    $scope.reload = function () {
      if ( !$scope.apps.length === 0 ) {
        return;
      }
      // $scope.oses = [];
      // $scope.devices = [];
      // var promises = [
      //   Stats.os({domainId: $scope.domain.id}).$promise,
      //   Stats.device({domainId: $scope.domain.id}).$promise
      // ];
      // $q
      //   .all(promises)
      //   .then(function (data) {
      //     if (!data || !data[0] || !data[1] || !data[0].data || !data[1].data) {
      //       return;
      //     }
      //     var oses = [],
      //       devices = [];
      //     data[0].data.map(function (os) {
      //       oses.push(os.key);
      //     });
      //     data[1].data.map(function (device) {
      //       devices.push(device.key);
      //     });

      //     $scope.oses = oses;
      //     $scope.devices = devices;
      //   });
    };

    $scope.onAppSelected = function () {
      // console.log( $scope.application );
      $scope.reload();
    };
  }
})();
