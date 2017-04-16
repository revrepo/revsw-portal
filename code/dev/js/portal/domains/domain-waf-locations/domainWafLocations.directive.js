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
      controller: function domainWafLocationsController($uibModal, $scope, $q, $config, AlertService, WAF_Rules) {
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
          .catch(AlertService.danger);
        /**
         * @name  onAddNew
         * @description add new Item of WAF Location
         * Property "waf" must exists and has type of Array
         * @param  {Object} newWAFLocation
         * @return
         */
        this.onAddNewWAFLocation = function (isAsk) {
          if (!_.isArray($ctrl.waf)) {
            $ctrl.waf = [];
          }
          if ($ctrl.loading) {
            return false;
          }
          var modalInstance = {
            result: $q.when($config.WAF_LOCATION_DEFAULT.location)
          };

          var resolve = {
            model: function () {
              return {};
            },
            exists_names: function () {
              return _.map($ctrl.waf, function (itemWaf) {
                return itemWaf.location;
              });
            }
          };
          var newLocationName_ = '';
          if (!!isAsk || isAsk === true) {
            modalInstance = $uibModal.open({
              animation: false,
              templateUrl: 'parts/domains/modals/confirmAddNewLocation.tpl.html',
              controller: /*ngInject*/ function ($scope, $uibModalInstance, model, exists_names) {
                $scope.model = model;
                $scope.exists_names = exists_names || [];
                $scope.newLocationName = '';
                $scope.ok = function (newLocationName) {
                  $uibModalInstance.close(newLocationName);
                };
                $scope.cancel = function () {
                  $uibModalInstance.dismiss('cancel');
                };
              },
              resolve: resolve
            });
          } else {
            resolve.model.newLocationName = $config.WAF_LOCATION_DEFAULT.location;
          }
          $ctrl.loading = true;
          modalInstance.result.then(function (dataNewLocationName) {
              var newWAFLocation = angular.copy($config.WAF_LOCATION_DEFAULT);
              var newLocationName_ = _.trim(dataNewLocationName);
              angular.merge(newWAFLocation, {
                '$$wafLocationBlockState': {
                  'isCollapsed': false
                }
              }, {
                location: newLocationName_
              });
              $ctrl.waf.push(newWAFLocation);

              AlertService.success('A new default location block has been added to the bottom of the list. Please configure the block before saving the configuration.');
            })
            .finally(function () {
              $ctrl.loading = false;
            });
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
          e.preventDefault();
          e.stopPropagation();
          if ($ctrl.loading) {
            return false;
          }
          var resolve = {
            model: function () {
              return angular.copy(item);
            },
            exists_names: function () {
              return _.map($ctrl.waf, function (itemWaf) {
                return itemWaf.location;
              });
            }
          };

          var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'parts/domains/modals/confirmDuplicateLocation.tpl.html',
            controller: /*ngInject*/ function ($scope, $uibModalInstance, model, exists_names) {
              $scope.model = model;
              $scope.exists_names = exists_names || [];
              $scope.newLocationName = '';
              $scope.ok = function (newLocationName) {
                $uibModalInstance.close(newLocationName);
              };
              $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
              };
            },
            resolve: resolve
          });

          $ctrl.loading = !true;
          modalInstance.result.then(function (dataNewLocationName) {
              if (dataNewLocationName) {
                var newLocationName_ = _.trim(dataNewLocationName);
                var duplicateWAFLocation = {
                  'location': newLocationName_,
                  'enable_waf': item.enable_waf || true,
                  'enable_learning_mode': item.enable_learning_mode || true,
                  'enable_sql_injection_lib': item.enable_sql_injection_lib || true,
                  'enable_xss_injection_lib': item.enable_xss_injection_lib || true,
                  'waf_rules': item.waf_rules || [],
                  'waf_actions': item.waf_actions || [],
                  '$$wafLocationBlockState': {
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
