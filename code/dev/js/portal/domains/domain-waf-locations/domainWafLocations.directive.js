//waf-actions-list.tpl.html

(function () {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainWafLocations', domainWafLocations);


  function domainWafLocations() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        waf: '=ngModel',
        accountId: '@'
      },
      templateUrl: 'parts/domains/domain-waf-locations/domain-waf-locations.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainWafLocationsController($uibModal, $scope, $config, AlertService, WAF_Rules) {
        'ngInject';
        var $ctrl = this;
        $ctrl.wafRulesList = [];
        // NOTE: when we send account_id - we get all WAF rules for this account and can add WAF Rule with type 'builtin'
        var filters = {
          rule_type: 'builtin',
          account_id: $ctrl.accountId
        };
        // NOTE: Get list actuals WAF Rules
        WAF_Rules.query({
            filters: filters
          }).$promise
          .then(function (data) {
            $ctrl.wafRulesList = data;
          })
          .catch(AlertService.error);
        /**
         * @name  onAddNew
         * @description add new Item of WAF Location
         * Property "waf" must exists and has type of Array
         * @param  {Object} newWAFLocation
         * @return
         */
        this.onAddNewWAFLocation = function () {
          if (!_.isArray($ctrl.waf)) {
            $ctrl.waf = [];
          }
          var newWAFLocation = angular.copy($config.WAF_LOCATION_DEFAULT);
          angular.merge(newWAFLocation, {
            '$$wafLocationBlockState': {
              'isCollapsed': false
            }
          });
          $ctrl.waf.push(newWAFLocation);
          AlertService.success('A new default location block has been added to the bottom of the list. Please configure the block before saving the configuration.');
        };
        /**
         * @name  onDelete
         * @description delete one item from array property 'waf'
         * @param  {Integer} index
         * @return
         */
        this.onDeleteWAFLocation = function (e, index) {
          e.preventDefault();
          e.stopPropagation();
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'parts/domains/modals/confirmDeleteWAFLocation.tpl.html',
            controller: /*ngInject*/ function ($scope, $uibModalInstance, model) {
              $scope.model = model;
              $scope.ok = function () {
                $uibModalInstance.close('ok');
              };
              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
            },
            resolve: {
              model: function () {
                return $ctrl.waf[index];
              }
            }
          });

          modalInstance.result
            .then(function () {
              $ctrl.waf.splice(index, 1);
            });
        };

        /**
         * @name  onCollapsAllWAFLocations
         * @description
         *
         * @return
         */
        this.onCollapsAllWAFLocations = function () {
          var _rules = $ctrl.waf;
          angular.forEach(_rules, function (item) {
            item.$$wafLocationBlockState.isCollapsed = true;
          });
        };

        /**
         * @name  onExpandAllWAFLocations
         * @description
         *
         * @return
         */
        this.onExpandAllWAFLocations = function () {
          var _rules = $ctrl.waf;
          angular.forEach(_rules, function (item) {
            item.$$wafLocationBlockState.isCollapsed = false;
          });
        };

        /**
         * @name onDuplicateWAFLocation
         * @description method  Duplicate WAF Location
         * Ask new Location Name
         */
        this.onDuplicateWAFLocation = function (e, item) {
          if ($ctrl.loading) {
            return false;
          }
          $ctrl.loading = true;
          var resolve = {
            model: angular.copy(item)
          };
          var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'parts/domains/modals/confirmDuplicateLocation.tpl.html',
            controller: 'ConfirmModalInstanceCtrl',
            size: 'md',
            resolve: resolve || {}
          });
          modalInstance.result.then(function (data) {
              if (data) {
                var duplicateWAFLocation = {
                  'location': resolve.model.newLocationName,
                  'enable_waf': item.enable_waf || true,
                  'enable_learning_mode': item.enable_learning_mode || true,
                  'enable_sql_injection_lib': item.enable_sql_injection_lib || true,
                  'enable_xss_injection_lib': item.enable_xss_injection_lib || true,
                  'waf_rules': item.waf_rules || [],
                  'waf_actions': item.waf_actions || [],
                  '$$wafLocationBlockState': item.$$wafLocationBlockState || {
                    'isCollapsed': false
                  }
                };
                $ctrl.waf.push(_.clone(duplicateWAFLocation));
                AlertService.success('The location block has duplicated to the bottom of the list. Please configure the block before saving the configuration.');
              }
            })
            .finally(function () {
              $ctrl.loading = false;
            });
        };
        /**
         * @name onUpWAFLocation
         * @description method Up Location in list
         */
        this.onUpWAFLocation = function (e, element) {
          e.preventDefault();
          e.stopPropagation();
          var array = $ctrl.waf;
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
         * @name onDownWAFLocation
         * @description method Down Location in list
         */
        this.onDownWAFLocation = function (e, element) {
          e.preventDefault();
          e.stopPropagation();
          var array = $ctrl.waf;
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
         * @name init
         * @description method check exists WAF block and create it
         */
        this.init = function () {
          if (!!!$ctrl.waf) {
            $ctrl.waf = [];
            $ctrl.onAddNewWAFLocation();
          }
        };
        // NOTE: auto init
        this.init();
      }
    };
  }
})();
