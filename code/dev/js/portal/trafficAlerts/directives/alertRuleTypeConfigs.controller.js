(function () {
  'use strict';

  angular
    .module('revapm.Portal.TrafficAlerts')
    .controller('AlertRuleTypeConfigsController', AlertRuleTypeConfigsController);

  /*@ngInject*/
  function AlertRuleTypeConfigsController($scope, $q, Users, $rootScope,
    User, $injector, $state, $stateParams, Companies,
    DomainsConfig, $attrs) {

    $scope.spikeDirections = [
      'up',
      'down'
    ];

    $scope.$watch('model.rule_type', function (newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.model.rule_config = {};
      }
    });
  }
})();
