(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFRules')
    .controller('wafRulesCustomListController', wafRulesCustomListController);

  /*@ngInject*/
  function wafRulesCustomListController($scope, $timeout,
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
      var data = null;
      if ($state.is($scope.state)) {
        $scope.list(data);
      }
    });

    $scope.initList = function () {
      var data = {
        filters: {
          rule_type: 'customer'
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
            $scope.list();
          })
          .catch($scope.alertService.danger);
      });
    };
  }
})();
