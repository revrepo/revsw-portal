(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileTrafficController', MobileTrafficController);

  /*@ngInject*/
  function MobileTrafficController($scope, User, AlertService, Stats) {

    $scope._loading = true;
    $scope.application = null;
    var u = User.getUser();
    $scope.account = u.account_id || null;

    $scope.oses = [];
    $scope.devices = [];
    $scope.countries = [];
    $scope.operators = [];
    $scope.networks = ['Cellular','WiFi'];

    $scope.reloadDirs = function() {
      $scope.oses = [];
      $scope.devices = [];
      $scope.countries = [];
      $scope.operators = [];

      if ( !$scope.account &&
          ( !$scope.application || !$scope.application.app_id ) ) {
        return;
      }

      $scope._loading = true;
      Stats.sdk_dirs({
          account_id: $scope.account,
          app_id: ( ( $scope.application && $scope.application.app_id ) || null ),
          from_timestamp: moment().subtract( 7, 'days' ).valueOf(),
          to_timestamp: Date.now()
        })
        .$promise
        .then( function( data ) {
          // console.log( data );
          if ( data.data ) {
            $scope.oses = data.data.oses;
            $scope.devices = data.data.devices;
            $scope.countries = data.data.countries;
            $scope.operators = data.data.operators;
          }
        })
        .catch( function( err ) {
          AlertService.danger('Oops! Something went wrong');
          // console.log( err );
        })
        .finally( function() {
          $scope._loading = false;
        });
    };
  }
})();
