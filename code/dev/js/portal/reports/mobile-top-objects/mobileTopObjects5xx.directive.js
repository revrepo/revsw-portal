(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('mobileTopObjects5xx', mobileTopObjects5xxDirective);

  /*@ngInject*/
  function mobileTopObjects5xxDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-top-objects-5xx.html',
      scope: {
        ngAccount: '=',
        ngApp: '=',
        flOses: '=',
        flDevices: '=',
        flCountries: '=',
        flOperators: '=',
        flNetworks: '=',
        flDisabled: '=',
        heading: '@',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function ($scope, Stats, $localStorage, $config, $sce) {

        $scope._loading = false;
        var http_codes = {
          '500': 'Internal Server Error',
          '501': 'Not Implemented',
          '502': 'Bad Gateway',
          '503': 'Service Unavailable',
          '504': 'Gateway Timeout',
          '505': 'HTTP Version Not Supported',
          '506': 'Variant Also Negotiates',
          '507': 'Insufficient Storage',
          '508': 'Loop Detected',
          '510': 'Not Extended',
          '511': 'Network Authentication Required'
        };

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

        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('The report shows a list of objects with the highest level of backend 5xx HTTP responses '+
            '(normally a result of internal application or API errors)');
        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;
          $scope.items = [];
          var params = angular.merge({
            account_id : $scope.ngAccount,
            app_id :( $scope.ngApp || null )
          }, $scope.filters);
          delete params.delay;
          return Stats.sdk_top_objects_5xx(params)
            .$promise
            .then( function( data ) {
              var items = [];
              for ( var i = 0, len = data.data.length; i < len; ++i ) {
                var item = data.data[i];
                items.push({
                  key: item.key + ( http_codes[item.key] ? ' (' + http_codes[item.key] + ')' : '' ),
                  count: item.count,
                  items: item.items
                });
              }
              $scope.items = items;
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
