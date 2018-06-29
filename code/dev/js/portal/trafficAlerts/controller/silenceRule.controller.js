(function () {
  'use strict';

  angular
    .module('revapm.Portal.TrafficAlerts')
    .controller('SilenceRuleController', SilenceRuleController);

  /*@ngInject*/
  function SilenceRuleController($scope, $uibModalInstance, model) {
    $scope.model = model;
    $scope.silence_time = $scope.silence_time || '2hours';

    $scope.close = function() {
      $uibModalInstance.dismiss();
    };

    $scope.change = function() {
      $uibModalInstance.close($scope.silence_time);
    };
  }
})();
