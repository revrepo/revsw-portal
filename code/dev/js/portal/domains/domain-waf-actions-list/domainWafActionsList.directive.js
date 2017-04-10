(function() {
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
      controller: function domainWafActionsListController($scope, $uibModal, $config) {
        'ngInject';
        var $ctrl = this;
        this.wafActions = $config.WAF_ACTIONS;
        /**
         * @name  onAddNew
         * @description
         * @param  {Object} newWAFAction
         * @return
         */
        this.onAddNew = function(newWAFAction) {
          if (!_.isArray($ctrl.waf_actions)) {
            $ctrl.waf_actions = [];
          }
          $ctrl.waf_actions.push(_.clone(newWAFAction));
        };
        /**
         * @name  onDelete
         * @description
         * @param  {Integer} index
         * @return
         */
        this.onDelete = function(index) {
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'parts/domains/modals/confirmDeleteWAFAction.tpl.html',
            controller: /*ngInject*/ function($scope, $uibModalInstance, model) {
              $scope.model = model;
              $scope.ok = function() {
                $uibModalInstance.close('ok');
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            // size: size,
            resolve: {
              model: function() {
                return $ctrl.waf_actions[index];
              }
            }
          });

          modalInstance.result
            .then(function() {
              $ctrl.waf_actions.splice(index, 1);
            });

        };
      }
    };
  }
})();
