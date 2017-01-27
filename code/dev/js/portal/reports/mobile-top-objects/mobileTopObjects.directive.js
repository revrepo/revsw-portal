(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('mobileTopObjects', mobileTopObjectsDirective);

  /*@ngInject*/
  function mobileTopObjectsDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-base-top-objects.html',
      scope: {
        ngAccount: '=',
        ngApp: '=',
        flOses: '=',
        flDevices: '=',
        flCountries: '=',
        flOperators: '=',
        flNetworks: '=',
        flDisabled: '=',
        reportType: '@',
        heading: '@',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function ($scope, Stats, $localStorage) {
        $scope._loading = false;
        $scope.items = [];

        $scope.filters = (!$scope.flStoreName || !$localStorage[$scope.flStoreName])? _.assign({
          delay: '24',
          count: '10',
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now(),
          os: null,
          device: null,
          country: null,
          operator: null,
          network: null
        }, {}) : $localStorage[$scope.flStoreName];

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          $scope.items = [];
          var params = angular.merge({
            account_id : $scope.ngAccount,
            app_id :( $scope.ngApp || null ),
          }, $scope.filters);
          if ( $scope.reportType ) {
            params.report_type = $scope.reportType;
          }
          delete params.delay;
          return Stats.sdk_top_objects(params)
            .$promise
            .then( function( data ) {
              $scope.items = data.data;
            })
            .finally( function() {
              $scope._loading = false;
            } );
        };

        //  ---------------------------------
        $scope.$watch( 'ngApp', function() {
          if ( $scope.ngAccount || $scope.ngApp ) {
            $scope.reload();
          }
        });
        // NOTE: watch fitlers and save to localstorage
        $scope.$watch('filters', function () {
          if ($scope.flStoreName) {
            $localStorage[$scope.flStoreName] = $scope.filters;
          }
        }, true);

      }
    };
  }
})();
