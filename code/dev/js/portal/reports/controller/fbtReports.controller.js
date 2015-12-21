(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('FBTReportsController', FBTReportsController);

  /*@ngInject*/
  function FBTReportsController($scope, User, AlertService, Stats, Countries, $q) {

    $scope._loading = true;
    // Domain that selected
    $scope.domain = null;
    $scope.domains = [];

    $scope.countries = Countries.query();
    // $scope.os = [];
    // $scope.devices = [];

    $scope.reload = function () {
    };

    // Load user domains
    User.getUserDomains(true)
      .then(function (domains) {
        $scope.domains = domains;
      })
      .catch(function () {
        AlertService.danger('Oops something wrong');
      })
      .finally(function () {
        $scope._loading = false;
      });

    $scope.onDomainSelected = function () {
      $scope.reload();
    };
  }
})();
