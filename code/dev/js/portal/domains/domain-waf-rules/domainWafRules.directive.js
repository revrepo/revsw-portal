(function () {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainWafRules', domainWafRules)
    .run(function ($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-waf-rules/domain-waf-rules.tpl.html', true);
    });
  /**
   * @name  domainWafRules
   * @description
   * @return {Object}
   */
  function domainWafRules() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        domainWAFRules: '=ngModel',
        wafRulesList: '=wafRulesList'
      },
      templateUrl: 'parts/domains/domain-waf-rules/domain-waf-rules.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainWafRules_Controller($scope, WAF_Rules, AlertService, $uibModal) {
        'ngInject';
        var $ctrl = this;
        var isFirstOrder = true;
        this.orderRecords = [];

        /**
         * @name initList
         * @description Method Init data in list on WAF Rules
         */
        this.initList = function (isReOrder) {
          $ctrl.orderRecords = angular.copy($ctrl.wafRulesList);
          // Aplay infrormation about using WAF Rule in domain config
          _.map($ctrl.orderRecords, function (item) {
            item.isChecked = !!(_.find($ctrl.domainWAFRules, function (itemRule) {
              return itemRule === item.id;
            }));
            return item;
          });
          if (!!isReOrder) {
            isFirstOrder = isReOrder;
          }
          if (isFirstOrder) {
            // NOTE: need order records only once - when first load directive (show in screen)
            $ctrl.orderRecords = _.sortBy($ctrl.orderRecords, function (item) {
              return ($ctrl.domainWAFRules.indexOf(item.id) < 0);
            });
            isFirstOrder = false;
          }
        };
        /**
         * @name  onUpWAFRule
         * @description
         *
         * @param  {Object} element - WAF Rule Object
         * @return {Boolean|Integer}
         */
        this.onUpWAFRule = function (element) {
          var array = $ctrl.orderRecords;
          var index = array.indexOf(element);
          // Item non-existent?
          if (index === -1) {
            return false;
          }
          // If there is a previous element in sections
          if (array[index - 1]) {
            // Swap elements
            array.splice(index - 1, 2, array[index], array[index - 1]);
          } else {
            // Do nothing
            return 0;
          }
        };
        /**
         * @name  onDownWAFRule
         * @description
         *
         * @param  {Object} element - WAF Rule Object
         * @return {Boolean|Integer}
         */
        this.onDownWAFRule = function (element) {
          var array = $ctrl.orderRecords;
          var index = array.indexOf(element);
          // Item non-existent?
          if (index === -1) {
            return false;
          }
          // If there is a next element in sections
          if (array[index + 1]) {
            // Swap elements
            array.splice(index, 2, array[index + 1], array[index]);
          } else {
            // Do nothing
            return 0;
          }
        };
        /**
         * @name onViewWAFRule
         * @description method show WAF Rule information
         *
         */
        this.onViewWAFRule = function (e, item) {
          var resolve;
          if ($ctrl.loading) {
            return false;
          }
          $ctrl.loading = true;
          WAF_Rules.get({
              id: item.id
            }).$promise
            .then(function (data) {
              resolve = {
                model: data
              };

              var modalInstance = $uibModal.open({
                animation: false,
                templateUrl: 'parts/domains/modals/viewWAFRuleInfo.tpl.html',
                controller: 'ConfirmModalInstanceCtrl',
                size: 'md',
                resolve: resolve || {}
              });
            })
            .catch(AlertService.error)
            .finally(function () {
              $ctrl.loading = false;
            });
        };

        // NOTE: watch change collection in paret scope
        $scope.$watch(function () {
          return $ctrl.wafRulesList;
        }, function (newVal, oldVal) {
          if (!!newVal) {
            $ctrl.initList(true);
          }
        }, true);

        // NOTE: changes in working list of WAF Rules
        $scope.$watch(function () {
          return $ctrl.orderRecords;
        }, function (newVal, oldVal) {
          if (newVal !== oldVal) {
            // NOTE: update current information about selected WAF Rules
            $ctrl.domainWAFRules = _.filter($ctrl.orderRecords, function (item) {
                return item.isChecked;
              })
              .map(function (item) {
                return item.id;
              });
          }
        }, true);
      }
    };
  }
})();
