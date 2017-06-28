(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainAclRulesList', domainAclRulesList)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-acl-rules/domain-acl-rules-list.tpl.html', true);
    });
  /**
   * @name  domainAclRulesList
   * @description
   * @return {Object}
   */
  function domainAclRulesList() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        aclRulesList: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-acl-rules/domain-acl-rules-list.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainAclRulesListController($scope, AlertService) {
        'ngInject';
        var $ctrl = this;
        var defaultCondition = {
          'country_code': '',
          'header_name': '',
          'header_value': '',
          'host_name': '',
          'subnet_mask': ''
        };
        /**
         * @name onAddNewRule
         */
        this.onAddNewRule = function(e) {
          e.preventDefault();
          $ctrl.aclRulesList.unshift(angular.copy(defaultCondition));
          AlertService.success('A new default ACL condition has been added to the top of the list. Please configure the block before saving the configuration.');
        };

        /**
         * @name  onRemoveACLRule
         * @description
         *
         * Deleting ACL Rule from list
         *
         * @return
         */
        $ctrl.onRemoveACLRule = function(e, index) {
          if ($ctrl.aclRulesList.length <= 1) {
            AlertService.success('Last ACL condition can`t be deleted');
            return;
          }
          $scope.confirm('parts/domains/domain-acl-rules/modal/confirm-modal-delete-acl-rule.tpl.html', {
              url: $ctrl.aclRulesList[index]
            })
            .then(function() {
              $ctrl.aclRulesList.splice(index, 1);
              AlertService.success('ACL condition was deleted');
            });
        };

      }
    };
  }
})();
