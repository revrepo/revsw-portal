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
        flBrowser: '='
      },
      /*@ngInject*/
      controller: function ($scope, Stats, Util) {
        $scope._loading = false;
        $scope.filters = {
          from_timestamp: moment().subtract(24, 'hours').valueOf(),
          to_timestamp: Date.now()
        };

        $scope.items = [];
        $scope.loadDetails = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            return;
          }
          $scope._loading = true;
          var params = angular.merge({
            domainId: $scope.ngDomain.id
          }, $scope.filters);

          Stats
            .slowestDownloadObjects(params)
            .$promise
            .then(function (res) {
              $scope.items = res.data.map( function( item ) {
                item.size_avg = Util.humanFileSize( item.size_avg, 1 );
                return item;
              });
            })
            .finally(function () {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function () {
          $scope.loadDetails();
        });
      }
    };
  }
})();
