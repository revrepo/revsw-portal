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
    StatsWAF,
    model) {
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
        // NOTE: validation exists WAR rules in time period
        .then(function() {
          var _filters_field_list = ['from_timestamp', 'to_timestamp', 'report_type'];

          function generateFilterParams(filters) {
            var params = {
              from_timestamp: moment().subtract(1, 'days').valueOf(),
              to_timestamp: Date.now()
            };
            _.forEach(filters, function(val, key) {
              if (_.indexOf(_filters_field_list, key) !== -1) {
                if (val !== '-' && val !== '') {
                  params[key] = val;
                }
              } else {
                if (key === 'time_period') {
                  var days = val.split(':');
                  params.from_timestamp = !!days[0] ? moment(days[0]).valueOf() : moment().subtract(1, 'days').valueOf();
                  params.to_timestamp = !!days[1] ? moment(days[1]).valueOf() : moment().valueOf();
                  delete params.time_period;
                }
              }
            });
            return params;
          }
          var deferred = $q.defer();
          // NOTE: use StatsWAF.topReport for detect empty data for auto-generation
          var params = angular.merge({
            domainId: $scope.model.domain.id,
            report_type: 'rule_id'
          }, generateFilterParams({
            'time_period': $scope.model.time_period
          }));
          StatsWAF
            .topReport(params)
            .$promise
            .then(function name(data) {
              if (!data || !data.data || data.data.length === 0) {
                // TODO: delete the alternative warning
                // AlertService.danger('We don’t have any WAF security events detected for the domain for the requested period of time,' +
                //   ' and as the result we cannot proceed with auto-generation of WAF rules.' +
                //   ' Please check whether WAF is enabled for the domain and that the domain is receiving real end user traffic.');
                $scope.confirm('parts/waf_rules/dialog/modal-war-rule-auto-generate-missing-data-warning.tpl.html', {
                    text: 'We don’t have any WAF security events detected for the domain for the requested period of time,' +
                      ' and as the result we cannot proceed with auto-generation of WAF rules.' +
                      ' Please check whether WAF is enabled for the domain and that the domain is receiving real end user traffic.'
                  })
                  .then(function(data) {
                    deferred.reject(false);
                  })
                  .catch(deferred.reject);
              } else {
                deferred.resolve(true);
              }
            })
            .catch(deferred.reject);
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
