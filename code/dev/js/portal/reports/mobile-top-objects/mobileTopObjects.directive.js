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
      controller: function ($scope, Stats, $localStorage, $config, $sce) {
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
          'default': $sce.trustAsHtml('The report shows most frequently requested URLs'),
          'not_found': $sce.trustAsHtml('The report shows most popular requests with 404 HTTP response code'),
          'cache_missed': $sce.trustAsHtml('The report shows most popular requests which resulted in edge cache misses. ' +
            'By enabling edge caching for static objects it is possible to significantly improve the experience of mobile ' +
            'application users.'),
          'failed': $sce.trustAsHtml('The report shows a list of objects with the highest level of failed data transfers. '+
            'The report should not be confused with application 5xx HTTP response errors which are reported separately.')
        };
        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        if(!$scope.reportType){
          $scope.popoverHelpHTML = listMobileTopObjectsTimeHelpHTML['default'];
        }else{
          $scope.popoverHelpHTML = listMobileTopObjectsTimeHelpHTML[$scope.reportType];
        }

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
