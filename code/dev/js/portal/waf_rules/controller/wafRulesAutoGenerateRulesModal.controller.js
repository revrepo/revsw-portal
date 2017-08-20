(function() {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .controller('wafRulesAutoGenerateRulesModalController', wafRulesAutoGenerateRulesModalController);

  /*@ngInject*/
  function wafRulesAutoGenerateRulesModalController($q,
    $config,
    $timeout,
    $scope,
    $rootScope,
    DomainsConfig,
    DNSZoneRecords,
    $uibModal,
    $uibModalInstance,
    AlertService,
    model) {
    $scope.newFilterState = {};

    var defaultTimeToWaitNewNSONECallInMillissecons = $config.DNS_WAIT_NEW_CALL_MILLISSECONDS;

    $scope.totalAddedRecords = 0;
    $scope.model = model;
    $scope._loading = false;
    $scope.domain = null;
    // NOTE: method check data for run
    $scope.ok = function() {
      if (!$scope.model.domain || !$scope.model.domain.id) {
        return;
      }
      // NOTE: check domain information
      DomainsConfig.get({
          id: $scope.model.domain.id
        }).$promise
        .catch(function(err) {
          AlertService.danger(err);
        })
        .then(function(domainConfig) {
          var deferred = $q.defer();
          // NOTE: Verify that the domain name has the WAF feature enabled
          if (!!domainConfig.rev_component_bp && domainConfig.rev_component_bp.enable_waf === true) {
            deferred.resolve(domainConfig);
          } else {
            $scope.confirm('parts/waf_rules/dialog/modal-war-rule-auto-generate-warning.tpl.html', {
                text: 'The domain does not have WAF feature enabled for it. Are you sure you want to proceed (the result is not guaranteed)?'
              })
              .then(function(data) {
                if (data === true) {
                  deferred.resolve(domainConfig);
                  return;
                }
                deferred.reject(false);
              });
          }
          return deferred.promise;
        })
        .then(function(domainConfig) {
          var deferred = $q.defer();
          var learningModeEnabledList = [];
          // NOTE: Verify that the domain has Learning mode enabled
          if (!!domainConfig.rev_component_bp && !!domainConfig.rev_component_bp.waf) {
            learningModeEnabledList = _.filter(domainConfig.rev_component_bp.waf, function(item) {
              return (item.enable_learning_mode === true);
            });
          }
          if (learningModeEnabledList.length > 0) {
            deferred.resolve(true);
          } else {
            $scope.confirm('parts/waf_rules/dialog/modal-war-rule-auto-generate-warning.tpl.html', {
                text: 'The domain’s WAF configuration does not have Learning Mode enabled. Are you sure you want to proceed (the result is not guaranteed)?'
              })
              .then(function(data) {
                if (data === true) {
                  deferred.resolve(true);
                  return;
                }
                deferred.reject(false);
              });
          }
          return deferred.promise;
        })
        .then(function(data) {
          if (data === true) {
            $uibModalInstance.close(true);
          }
        });
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.confirm = function(template, resolve) {
      if (angular.isObject(template)) {
        resolve = template;
        template = '';
      }
      if (angular.isObject(resolve)) {
        resolve = {
          model: resolve
        };
      }
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: template || 'parts/waf_rules/dialog/modal-waf-rule-auto-generate-job.tpl.html',
        controller: 'ConfirmModalInstanceCtrl',
        size: 'md',
        resolve: resolve || {}
      });

      return modalInstance.result;
    };

  }
})();
