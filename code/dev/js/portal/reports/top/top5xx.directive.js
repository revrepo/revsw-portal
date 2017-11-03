(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('top5xx', top5xxDirective);

  /*@ngInject*/
  function top5xxDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/top/top-5xx.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function ($scope, Stats, $localStorage, $config, $sce) {
        $scope._loading = false;
        $scope.filters = !$scope.flStoreName ? _.assign({
          delay: '24',
          count: '20'
        }, {}) : $localStorage[$scope.flStoreName];

        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('TODO text for popover');

        $scope.loadDetails = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;

          var params = angular.merge({
            domainId: $scope.ngDomain.id
          }, $scope.filters, {
            // NOTE: always get new data
            from_timestamp: moment().subtract($scope.filters.delay || '24', 'hours').valueOf(),
            to_timestamp: moment().valueOf()
          });
          delete params.delay;
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

          $scope.codes = [];

          Stats
            .top5xx( params )
            .$promise
            .then(function ( res ) {

              for ( var code in res.data ) {
                $scope.codes.push({
                  name: code + ( http_codes[code] ? ' (' + http_codes[code] + ')' : '' ),
                  count: res.data[code].count,
                  requests: res.data[code].requests
                });
              }
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function () {
          $scope.loadDetails();
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
