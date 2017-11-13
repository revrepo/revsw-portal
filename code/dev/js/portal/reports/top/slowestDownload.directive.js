(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('slowestDownload', slowestDownloadDirective);

  /*@ngInject*/
  function slowestDownloadDirective() {
    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/top/slowest-download.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        flStoreName: '@'
      },
      /*@ngInject*/
      controller: function($scope, Stats, Util, $localStorage, $config, $sce, $timeout, $filter) {
        $scope._loading = false;
        $scope.options = {
          predicate: '',
          reverse: false
        };
        $scope.filters = !$scope.flStoreName ? _.assign({
          delay: '24',
          count: '20'
        }, {}) : $localStorage[$scope.flStoreName];

        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('This page shows objects with highest average download time');

        $scope.items = [];
        $scope.itemsShow = [];

        $scope.loadDetails = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          var params = angular.merge({
            domainId: $scope.ngDomain.id
          }, $scope.filters, {
            from_timestamp: moment().subtract($scope.filters.delay || 24, 'hours').valueOf(),
            to_timestamp: moment().valueOf()
          });
          delete params.delay;
          Stats
            .slowestDownloadObjects(params)
            .$promise
            .then(function (res) {
              $scope.items = res.data.map( function( item ) {
                item.size_avg_text = Util.humanFileSize(item.size_avg, 1);
                return item;
              });
              return $scope.items;
            })
            .finally(function () {
              $scope.updateList();
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

        $scope.updateList = function() {
          if($scope._delayTimeout) {
            $timeout.cancel($scope._delayTimeout);
            $scope._delayTimeout = null;
          }
          $scope._delayTimeout = $timeout($scope._applyOptions, 300);
        };

        $scope._applyOptions = function() {
          $scope.itemsShow = $filter('orderBy')($scope.items, $scope.options.predicate, $scope.options.reverse);
        };

        $scope.order = function order(predicate) {
          $scope.options.reverse = ($scope.options.predicate === predicate) ? !$scope.options.reverse : false;
          $scope.options.predicate = predicate;
        };
        /**
         * Will watch options to be able to apply it
         */
        $scope.$watch('options', function() {
          $scope.updateList();
        }, true);
      }
    };
  }
})();
