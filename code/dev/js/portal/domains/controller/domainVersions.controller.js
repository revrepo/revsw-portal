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

    DomainsConfig
      .versions({id: $stateParams.id})
      .$promise
      .then(function (data) {
        if (angular.isArray(data)) {
          $scope.obj.data = data[0];
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
