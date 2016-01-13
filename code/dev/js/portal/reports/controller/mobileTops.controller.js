(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileTopsController', MobileTopsController);

  /*@ngInject*/
  function MobileTopsController($scope, $q, User, AlertService, Stats, Countries) {

    $scope._loading = true;
    $scope.apps = [];
    $scope.application = '';
    var u = User.getUser();
    $scope.account = u.companyId[0] || null;

    $scope.country_hits = [];
    $scope.country_users = [];
    $scope.country_gbt = [];
    $scope.os_hits = [];
    $scope.os_users = [];
    $scope.os_gbt = [];
    $scope.device_hits = [];
    $scope.device_users = [];
    $scope.device_gbt = [];
    $scope.operator_hits = [];
    $scope.operator_users = [];
    $scope.operator_gbt = [];
    $scope.network_hits = [];
    $scope.network_users = [];
    $scope.network_gbt = [];

    $scope.span = '24';

    var lock = 8;

    //  ---------------------------------
    $scope.countryHits = function ( filters ) {

      $scope.country_hits = [];
      filters.report_type = 'country';
      filters.count = 20;
      return Stats.sdk_top_hits( filters )
        .$promise
        .then(function (data) {

          console.log( 'countryHits data ', data );

          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.country_hits = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.countryUsers = function ( filters ) {

      $scope.country_users = [];
      filters.report_type = 'country';
      filters.count = 20;
      return Stats.sdk_top_users( filters )
        .$promise
        .then(function (data) {

          console.log( 'countryUsers data ', data );

          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.country_users = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.countryGBT = function ( filters ) {

      $scope.country_gbt = [];
      filters.report_type = 'country';
      filters.count = 20;
      Stats.sdk_top_gbt( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.country_gbt = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.osHits = function ( filters ) {

      $scope.os_hits = [];
      filters.report_type = 'os';
      filters.count = 10;
      Stats.sdk_top_hits( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.os_hits = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.osUsers = function ( filters ) {

      $scope.os_users = [];
      filters.report_type = 'os';
      filters.count = 10;
      Stats.sdk_top_users( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.os_users = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.osGBT = function ( filters ) {

      $scope.os_gbt = [];
      filters.report_type = 'os';
      filters.count = 10;
      Stats.sdk_top_gbt( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.os_gbt = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.deviceHits = function ( filters ) {

      $scope.device_hits = [];
      filters.report_type = 'device';
      filters.count = 20;
      Stats.sdk_top_hits( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.device_hits = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.deviceUsers = function ( filters ) {

      $scope.device_users = [];
      filters.report_type = 'device';
      filters.count = 20;
      Stats.sdk_top_users( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.device_users = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.deviceGBT = function ( filters ) {

      $scope.device_gbt = [];
      filters.report_type = 'device';
      filters.count = 20;
      Stats.sdk_top_gbt( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.device_gbt = newData;
          }
        });
    };


    //  ---------------------------------
    $scope.operatorHits = function ( filters ) {

      $scope.operator_hits = [];
      filters.report_type = 'operator';
      filters.count = 20;
      Stats.sdk_top_hits( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.operator_hits = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.operatorUsers = function ( filters ) {

      $scope.operator_users = [];
      filters.report_type = 'operator';
      filters.count = 20;
      Stats.sdk_top_users( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.operator_users = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.operatorGBT = function ( filters ) {

      $scope.operator_gbt = [];
      filters.report_type = 'operator';
      filters.count = 20;
      Stats.sdk_top_gbt( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.operator_gbt = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.networkHits = function ( filters ) {

      $scope.network_hits = [];
      filters.report_type = 'network';
      filters.count = 2;
      Stats.sdk_top_hits( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.network_hits = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.networkUsers = function ( filters ) {

      $scope.network_users = [];
      filters.report_type = 'network';
      filters.count = 2;
      Stats.sdk_top_users( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.network_users = newData;
          }
        });
    };

    //  ---------------------------------
    $scope.networkGBT = function ( filters ) {

      $scope.network_gbt = [];
      filters.report_type = 'network';
      filters.count = 2;
      Stats.sdk_top_gbt( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: item.count
              });
            });
            $scope.network_gbt = newData;
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
          $scope.countryHits( filters ),
          $scope.countryUsers( filters ),
          $scope.countryGBT( filters ),
          $scope.osHits( filters ),
          $scope.osUsers( filters ),
          $scope.osGBT( filters ),
          $scope.deviceHits( filters ),
          $scope.deviceUsers( filters ),
          $scope.deviceGBT( filters ),
          $scope.operatorHits( filters ),
          $scope.operatorUsers( filters ),
          $scope.operatorGBT( filters ),
          $scope.networkHits( filters ),
          $scope.networkUsers( filters ),
          $scope.networkGBT( filters )
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
