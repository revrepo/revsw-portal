(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFRules')
    .directive('wafRuleStagingStatus', wafRuleStagingStatus);

  /*@ngInject*/
  function wafRuleStagingStatus(WAF_Rules, $config, $interval, $rootScope, $state) {
    return {
      template: '<i class="glyphicon" ng-class="iconStaging" uib-tooltip="{{tooltipStaging}}"></i>' +
                '&nbsp;&nbsp;&nbsp;' +
                '<i class="glyphicon" ng-class="iconGlobal" uib-tooltip="{{tooltipGlobal}}"></i>',
      scope: {
        ngId: '=' // WAF_Rule id
      },
      /*@ngInject*/
      controller: function($scope, $element) {
        var intervalPromise;
        var certId;
        var element = $element[0];

        $scope.iconStaging = 'glyphicon-refresh spin';
        $scope.tooltipStaging = 'Staging Status';
        $scope.iconGlobal = 'glyphicon-refresh spin';
        $scope.tooltipGlobal = 'Global Status';
        $scope.shouldRefresh = true;

        $scope.startRefresh = function() {
          if (!certId || !$scope.shouldRefresh ||
            $state.includes('index.webApp.waf_rules.new') ||
            $state.includes('index.webApp.waf_rules.edit')) {
            return;
          }
          intervalPromise = $interval($scope.fetchStatus, $config.WAF_RULE_STATUS_REFRESH_INTERVAL, 1);
        };

        $scope.stopRefresh = function () {
          if (angular.isDefined(intervalPromise)) {
            $interval.cancel(intervalPromise);
            intervalPromise = undefined;
            $scope.shouldRefresh = false;
          }
        };

        $scope.fetchStatus = function(id) {
          if (!id && !certId) {
            return;
          }
          if (!id && certId) {
            id = certId;
          }

          if(element.offsetWidth === 0 || element.offsetHeight === 0) {
            return $scope.startRefresh();
          }

          WAF_Rules
            .status({id: id})
            .$promise
            .then(function (data) {
              if ($config.WAF_RULE_STAGING_STATUS_ICONS[data.staging_status]) {
                $scope.iconStaging = $config.WAF_RULE_STAGING_STATUS_ICONS[data.staging_status];
              }
              $scope.tooltipStaging = 'Staging Status: ' + data.staging_status;
              if ($config.WAF_RULE_PRODUCTION_STATUS_ICONS[data.global_status]) {
                $scope.iconGlobal = $config.WAF_RULE_PRODUCTION_STATUS_ICONS[data.global_status];
              }
              $scope.tooltipGlobal = 'Global Status: ' + data.global_status;
              $scope.startRefresh();
            })
            .catch(function (err) {
              // console.log(err);
              $scope.iconStaging = 'glyphicon-remove text-danger';
              $scope.tooltipStaging = 'Staging Status: Error';
              $scope.iconGlobal = 'glyphicon-remove text-danger';
              $scope.tooltipGlobal = 'Global Status: Error';
              $scope.stopRefresh();
            });
        };

        $scope.$on('$destroy', function () {
          $scope.stopRefresh();
        });

        $rootScope.$on('$stateChangeStart', function (event) {
          $scope.stopRefresh();
        });

        $scope.$watch('ngId', function (newValue) {
          if (!newValue) {
            return;
          }
          certId = newValue;
          $scope.shouldRefresh = true;
          $scope.fetchStatus(newValue);
        });
      }
    };
  }
})();
