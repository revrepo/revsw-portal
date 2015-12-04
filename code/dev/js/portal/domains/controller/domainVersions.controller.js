(function () {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .controller('DomainVersionsController', DomainVersionsController);

  /*@ngInject*/
  function DomainVersionsController($scope, DomainsConfig, $stateParams, AlertService, $timeout) {

    $scope._loading = true;
    $scope.id = $stateParams.id;

    $scope.domain = DomainsConfig.get({id: $stateParams.id});
    $scope.versions = [];
    $scope.currentVersion = {};

    $scope.obj = {
      data: {},
      options: {
        mode: 'code',
        modes: ['code', 'view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
        error: function (err) {
          alert(err.toString());
        }
      }
    };

    $scope.onChangeVersion = function() {
      if (!$scope.currentVersion) {
        $scope.obj.data = {};
        return;
      }
      $scope._loading = true;
      DomainsConfig
        .get({id: $stateParams.id, version: $scope.currentVersion})
        .$promise
        .then(function (data) {
          $scope.obj.data = data;
        })
        .catch(function (err) {
          AlertService.danger(err);
        })
        .finally(function () {
          $scope._loading = false;
        });
    };

    DomainsConfig
      .versions({id: $stateParams.id})
      .$promise
      .then(function (data) {
        if (angular.isArray(data)) {
          $scope.versions = data;
        }
      })
      .catch(function (err) {
        AlertService.danger(err);
      })
      .finally(function () {
        $scope._loading = false;
      });

    $timeout(function () {
      $scope.obj.options.mode = 'code';
    }, 10);
  }
})();
