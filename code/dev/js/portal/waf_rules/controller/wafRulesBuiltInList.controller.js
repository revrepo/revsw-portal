(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFRules')
    .controller('wafRulesBiultInListController', wafRulesBiultInListController);

  /*@ngInject*/
  function wafRulesBiultInListController($scope, $timeout,
    $localStorage,
    CRUDController,
    WAF_Rules,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll,
    User,
    $uibModal) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    //Set state (ui.router)
    $scope.setState('index.webApp.waf_rules');
    $scope.setResource(WAF_Rules);
    $scope.filterKeys = ['rule_name', 'domains', 'updated_at'];
    $scope.model = {};

    $scope.$on('$stateChangeSuccess', function (state) {
      if ($state.is($scope.state)) {
        $scope.initList();
      }
    });

    $scope.initList = function () {
      var data = {
        filters: {
          rule_type: 'builtin'
        }
      };
      $scope.list(data);
    };

    /**
     * @name  deleteWAFRule
     * @description
     *
     * @param  {Object} model
     * @return
     */
    $scope.deleteWAFRule = function (model) {
      // NOTE: not delete if RO user
      if ($scope.isReadOnly() === true) {
        return;
      }
      $scope.confirm('confirmModal.html', model).then(function () {
        var certName = model.rule_name;
        $scope
          .delete(model)
          .then(function (data) {
            $scope.alertService.success(data);
            $scope.initList();
          })
          .catch($scope.alertService.danger);
      });
    };


    /**
     * @name namepath openViewDialogRule
     */
    $scope.openViewDialogRule = function (e, item) {
      $scope._loading = true;
      $scope.alertService.clear();
      $scope.get(item.id)
        .then(function (data) {
          $scope.model = data;
          $scope.confirm('parts/waf_rules/dialog/view-waf-rule.tpl.html', $scope.model);
        })
        .catch($scope.alertService.danger)
        .finally(function () {
          $scope._loading = false;
        });
    };
  }
})();
