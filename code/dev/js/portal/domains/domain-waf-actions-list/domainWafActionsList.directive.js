(function () {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainWafActionsList', domainWafActionsList);

  function domainWafActionsList() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        waf_actions: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-waf-actions-list/domain-waf-actions-list.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainWafActionsListController($scope, $uibModal, $config, AlertService) {
        'ngInject';
        var $ctrl = this;
        this.wafActions = $config.WAF_ACTIONS;
        /**
         * @name  onAddNew
         * @description
         *  Add new default Action
         * @param  {Event} e
         * @return
         */
        this.onAddNew = function (e) {
          $ctrl.loading = true;
          e.preventDefault();
          if (!_.isArray($ctrl.waf_actions)) {
            $ctrl.waf_actions = [];
          }
          var newWAFAction = $config.WAF_ACTIONS_DEFAULT;
          $ctrl.waf_actions.push(_.clone(newWAFAction));
          AlertService.success('New WAF Action has been successfully added');
          $ctrl.loading = false;
        };
        /**
         * @name  onDelete
         * @description
         * @param  {Integer} index
         * @return
         */
        this.onDelete = function (index) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'parts/domains/modals/confirmDeleteWAFAction.tpl.html',
            controller: /*ngInject*/ function ($scope, $uibModalInstance, model) {
              $scope.model = model;
              $scope.ok = function () {
                $uibModalInstance.close('ok');
              };
              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
            },
            // size: size,
            resolve: {
              model: function () {
                return $ctrl.waf_actions[index];
              }
            }
          });

          modalInstance.result
            .then(function () {
              $ctrl.waf_actions.splice(index, 1);
            });

        };
      }
    };
  }
})();
