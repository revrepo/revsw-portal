(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('mobileTopObjectsTime', mobileTopObjectsTimeDirective);

  /*@ngInject*/
  function mobileTopObjectsTimeDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-top-objects-time.html',
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
      controller: function ($scope, Stats, Util, $localStorage, $config, $sce) {
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

        var listMobileTopObjectsTimeHelpHTML = {
          'full': $sce.trustAsHtml('TODO text popover full'),
          'first_byte': $sce.trustAsHtml('TODO text popover first_byte')
        };
        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = listMobileTopObjectsTimeHelpHTML[$scope.reportType];

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          var params = angular.merge({
            account_id : $scope.ngAccount,
            app_id :( $scope.ngApp || null )
          }, $scope.filters);
          if ( $scope.reportType ) {
            params.report_type = $scope.reportType;
          }
          delete params.delay;
          $scope.items = [];
          return Stats.sdk_top_objects_time(params)
            .$promise
            .then( function( data ) {
              for ( var i = 0, len = data.data.length; i < len; ++i ) {
                data.data[i].val = Util.formatNumber( data.data[i].val, 0 );
              }
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
