(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.TrafficAlerts')
    .controller('AlertRuleTypeConfigsController', AlertRuleTypeConfigsController);

  /*@ngInject*/
  function AlertRuleTypeConfigsController($scope) {

    $scope.spikeDirections = {
      both: 'Both',
      up: 'Up',
      down: 'Down'
    };
  }
})(angular);
