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
      { key: 'Both', value: 'both' },
      { key: 'Up', value: 'up' },
      { key: 'Down', value: 'down' }
    ];
  }
})();
