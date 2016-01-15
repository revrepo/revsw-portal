(function () {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileTopsController', MobileTopsController);

  /*@ngInject*/
  function MobileTopsController($scope, $q, User, AlertService, Stats, Countries, Util) {

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

    $scope.gbtChartOpts = {
      tooltip: {
        formatter: function() {
          return '<b>'+ this.point.name +': </b>'+
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Util.humanFileSize(this.y, 2) + ')';
        }
      },
    };
    $scope.hitsChartOpts = {
      tooltip: {
        formatter: function() {
          return '<b>'+ this.point.name +': </b>'+
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Highcharts.numberFormat(this.y, 0, ".", "'") + ' hits)';
        }
      },
    };
    $scope.usersChartOpts = {
      tooltip: {
        formatter: function() {
          return '<b>'+ this.point.name +': </b>'+
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Highcharts.numberFormat(this.y, 0, ".", "'") + ' users)';
        }
      },
    };

    //  ---------------------------------
    $scope.reloadOne = function ( type, name, count, filters ) {

      $scope[name + '_' + type] = [];
      filters.report_type = name;
      filters.count = count;
      return Stats['sdk_top_' + type]( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function (item) {
              newData.push({
                name: item.key,
                y: ( type === 'gbt' ? item.received_bytes : item.count )
              });
            });
            $scope[name + '_' + type] = newData;
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
          $scope.reloadOne( 'hits', 'country', 20, filters ),
          $scope.reloadOne( 'users', 'country', 20, filters ),
          $scope.reloadOne( 'gbt', 'country', 20, filters ),
          $scope.reloadOne( 'hits', 'os', 10, filters ),
          $scope.reloadOne( 'users', 'os', 10, filters ),
          $scope.reloadOne( 'gbt', 'os', 10, filters ),
          $scope.reloadOne( 'hits', 'device', 20, filters ),
          $scope.reloadOne( 'users', 'device', 20, filters ),
          $scope.reloadOne( 'gbt', 'device', 20, filters ),
          $scope.reloadOne( 'hits', 'operator', 20, filters ),
          $scope.reloadOne( 'users', 'operator', 20, filters ),
          $scope.reloadOne( 'gbt', 'operator', 20, filters ),
          $scope.reloadOne( 'hits', 'network', 2, filters ),
          $scope.reloadOne( 'users', 'network', 2, filters ),
          $scope.reloadOne( 'gbt', 'network', 2, filters )
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
