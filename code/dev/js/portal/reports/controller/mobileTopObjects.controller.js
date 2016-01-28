(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileTopObjectsController', MobileTopObjectsController);

  /*@ngInject*/
  function MobileTopObjectsController($scope, $q, User, AlertService, Stats, Countries, Util, $localStorage) {

    $scope._loading = true;
    $scope.apps = [];
    $scope.application = $localStorage.selectedApplicationID === undefined ? '' : $localStorage.selectedApplicationID;
    var u = User.getUser();
    $scope.account = u.companyId[0] || null;

    $scope.oses = [];
    $scope.devices = [];
    $scope.countries = [];
    $scope.operators = [];
    $scope.networks = ['Cellular','WiFi'];

    $scope.reloadDirs = function() {
      $scope._loading = true;
      $scope.oses = [];
      $scope.devices = [];
      $scope.countries = [];
      $scope.operators = [];

      Stats.sdk_dirs({
          account_id: $scope.account,
          app_id: ( $scope.application || null ),
          from_timestamp: moment().subtract( 1, 'days' ).valueOf(),
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
        .finally( function() {
          $scope._loading = false;
        });
    }

    $scope.$watch( 'application', function() {
      $localStorage.selectedApplicationID = $scope.application;
      $scope.reloadDirs();
    });


    //  ---------------------------------
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
        return $scope.reloadDirs();
      })
      .catch(function () {
        AlertService.danger('Oops something went wrong');
      })
      .finally(function () {
        $scope._loading = false;
      });

  }
})();
