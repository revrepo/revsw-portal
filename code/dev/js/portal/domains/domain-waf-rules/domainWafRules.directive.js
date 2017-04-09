// TODO: Rebuitl ALL CODE - NOT FINISHED
(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainWafRules', domainWafRules)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-waf-rules/domain-waf-rules.tpl.html', true);
    });
  /**
   * @name  domainWafRules
   * @description
   * @return {Object}
   */
  function domainWafRules_() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        wafRules: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-waf-rules/domain-waf-rules.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainWafRules_Controller($scope) {
        'ngInject';
        var $ctrl = this;

      }
    };
  }
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
        wafList: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-waf-rules/domain-waf-rules.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainWafController($scope, AlertService) {
        'ngInject';
        var $ctrl = this;
        /**
         * @name  onAddNewBackendBlock
         * @description
         *    Add new block in Backends array
         * @return
         */
        this.onAddNewBackendBlock = function() {
          var newBlock = {
            name: '',
            host: '',
            port: 80,
            dynamic: true,
            vcl: ''
          };
          $ctrl.wafList.unshift(newBlock);
          AlertService.success('A new default bakend block has been added to the top of the list. Please configure the block before saving the configuration.');
        };
        /**
         * @name  onRemoveBackendBlock
         * @description
         *   Delete item from Backends array
         *
         * @param  {Integer} index
         * @return
         */
        this.onRemoveBackendBlock = function(index) {
          $scope.confirm('parts/domains/domain-custom-vcl-backends/modal/confirmModalDeleteBackenBlock.tpl.html', {
              name: $ctrl.wafList[index].name
            })
            .then(function() {
              $ctrl.wafList.splice(index, 1);
              AlertService.success('Backend Block was deleted');
            });
        };

        /**
         * @name  onCollapsAllBackendsBlock
         * @description
         *
         * @return
         */
        this.onCollapsAllBackendsBlock = function() {
          var _rules = $ctrl.wafList;
          angular.forEach(_rules, function(item) {
            item.$$backendBlockState.isCollapsed = true;
          });
        };
        /**
         * @name  onExpandAllBackendsBlock
         * @description
         *
         * @return
         */
        this.onExpandAllBackendsBlock = function() {
          var _rules = $ctrl.wafList;
          angular.forEach(_rules, function(item) {
            item.$$backendBlockState.isCollapsed = false;
          });
        };
        /**
         * @name  prepareDate
         * @description
         *   Prepare custom Backends data for view
         * @return
         */
        this.prepareDate = function() {
          if (!angular.isArray($ctrl.wafList)) {
            $ctrl.wafList = [];
          }
          angular.forEach($ctrl.wafList, function(item) {
            // NOTE: add parameter for collapsed item in custom_vcl.backends
            angular.extend(item, {
              $$backendBlockState: {
                isCollapsed: true
              }
            });
          });
        };
        //
        this.prepareDate();
        /**
         * @name  onUpBackendBlock
         * @description
         *
         * @param  {Object} element - Backend Block Object
         * @return {Boolean|Integer}
         */
        this.onUpBackendBlock = function(element) {
          var array = $ctrl.wafList;
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
         * @name  onDownBackendBlock
         * @description
         *
         * @param  {Object} element - Backend Block Object
         * @return {Boolean|Integer}
         */
        this.onDownBackendBlock = function(element) {
          var array = $ctrl.wafList;
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

      }
    };
  }
})();
