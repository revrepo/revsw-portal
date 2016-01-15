(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileDistributionsController', MobileDistributionsController);

  /*@ngInject*/
  function MobileDistributionsController($scope, $q, User, AlertService, Stats, Countries) {

    $scope._loading = true;
    $scope.apps = [];
    $scope.application = '';
    var u = User.getUser();
    $scope.account = u.companyId[0] || null;

    $scope.destination_hits = [];
    $scope.destination_gbt = [];
    $scope.transport_hits = [];
    $scope.transport_gbt = [];
    $scope.status_hits = [];
    $scope.status_gbt = [];
    $scope.cache_hits = [];
    $scope.cache_gbt = [];

    $scope.span = '24';

    var lock = 8;

    //  ---------------------------------
    $scope.destinationReload = function ( filters ) {

      $scope.destination_hits = [];
      $scope.destination_gbt = [];
      filters.report_type = 'destination';
      return Stats.sdk_distributions( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var hits = [];
            var gbt = [];
            angular.forEach(data.data, function (item) {
              hits.push({
                name: item.key,
                y: item.count
              });
              gbt.push({
                name: item.key,
                y: item.received_bytes
              });
            });
            $scope.destination_hits = hits;
            $scope.destination_gbt = gbt;
          }
        });
    };

    //  ---------------------------------
    $scope.transportReload = function ( filters ) {

      $scope.transport_hits = [];
      $scope.transport_gbt = [];
      filters.report_type = 'transport';
      return Stats.sdk_distributions( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var hits = [];
            var gbt = [];
            angular.forEach(data.data, function (item) {
              hits.push({
                name: item.key,
                y: item.count
              });
              gbt.push({
                name: item.key,
                y: item.received_bytes
              });
            });
            $scope.transport_hits = hits;
            $scope.transport_gbt = gbt;
          }
        });
    };

    //  ---------------------------------
    $scope.statusReload = function ( filters ) {

      $scope.status_hits = [];
      $scope.status_gbt = [];
      filters.report_type = 'status';
      return Stats.sdk_distributions( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var hits = [];
            var gbt = [];
            angular.forEach(data.data, function (item) {
              hits.push({
                name: item.key,
                y: item.count
              });
              gbt.push({
                name: item.key,
                y: item.received_bytes
              });
            });
            $scope.status_hits = hits;
            $scope.status_gbt = gbt;
          }
        });
    };

    //  ---------------------------------
    $scope.cacheReload = function ( filters ) {

      $scope.cache_hits = [];
      $scope.cache_gbt = [];
      filters.report_type = 'cache';
      return Stats.sdk_distributions( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var hits = [];
            var gbt = [];
            angular.forEach(data.data, function (item) {
              hits.push({
                name: item.key,
                y: item.count
              });
              gbt.push({
                name: item.key,
                y: item.received_bytes
              });
            });
            $scope.cache_hits = hits;
            $scope.cache_gbt = gbt;
          }
        });
    };


    //  ---------------------------------
    $scope.reload = function() {

      var filters = {
        account_id: $scope.account,
        app_id: ( $scope.application || null ),
        from_timestamp: moment().subtract( $scope.span, 'hours' ).valueOf(),
        to_timestamp: Date.now()
      };

      $scope._loading = true;
      $q.all([
          $scope.destinationReload( filters ),
          $scope.transportReload( filters ),
          $scope.statusReload( filters ),
          $scope.cacheReload( filters )
        ])
        .finally(function () {
          $scope._loading = false;
        });

    };

    //  ---------------------------------
    $scope.onAppSelected = function () {

      // console.log( 'onAppSelected: ', $scope.application );
      if ( !$scope._loading && ( $scope.account || $scope.application ) ) {
        // console.log( 'reload' );
        $scope.reload();
      }
    };

    $scope.$watch( 'application', function() {
      // console.log( 'watch', $scope.application );
      $scope.onAppSelected();
    });

    //  ---------------------------------
    User.getUserApps(true)
      .then(function ( data ) {

        // console.log( 'apps: ', data );
        if ( $scope.account ) {
          data.unshift({
            app_id: "",
            app_name: "All Applications"
          });
        }
        $scope.apps = data;
        if ( data.length ) {
          $scope.application = data[0].app_id;
        }
      })
      .catch(function () {
        AlertService.danger('Oops! Some shit just happened');
      })
      .finally(function () {
        $scope._loading = false;
        $scope.onAppSelected();
      });

  }
})();
