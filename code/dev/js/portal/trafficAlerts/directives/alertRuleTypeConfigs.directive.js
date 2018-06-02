(function () {
    'use strict';
  
    angular
      .module('revapm.Portal.TrafficAlerts')
      .directive('alertruletypeconfigs', AlertRuleTypeConfigs);
  
    /*@ngInject*/
    function AlertRuleTypeConfigs() {
      return {
        templateUrl: 'parts/trafficAlerts/directives/alertRuleTypeConfigs.html',
        controllerUrl: './alertRuleTypeConfigs.controller.js'
      };
    }
  })();
  