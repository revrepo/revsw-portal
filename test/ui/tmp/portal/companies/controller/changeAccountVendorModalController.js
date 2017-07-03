(function () {
  'use strict';

  angular
    .module('revapm.Portal.Companies')
    .controller('ChangeAccountVendorModalController', ChangeAccountVendorModalController);

  /*@ngInject*/
  function ChangeAccountVendorModalController($scope, $uibModalInstance, model) {
    $scope.model = model;
    $scope.model.newVendor = model.currentVendor || '';

    $scope.close = function() {
      $uibModalInstance.dismiss();
    };

    $scope.change = function() {
      $uibModalInstance.close($scope.model.newVendor);
    };
  }
})();
