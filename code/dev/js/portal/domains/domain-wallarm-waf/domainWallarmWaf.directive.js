(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainWallarmWaf', domainWallarmWaf);

  function domainWallarmWaf() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        wallarmConfig: '=ngModel',
        _isEditLocked: '=isEditLocked',
        accountId: '@'
      },
      templateUrl: 'parts/domains/domain-wallarm-waf/domain-wallarm-waf.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainWallarmWafController($uibModal, $scope, $q, $config, AlertService, DomainsConfig, WAF_Rules) {
        'ngInject';
        var $ctrl = this;

        var defaultRecomendedWAFRulesIds;
        $ctrl.wallarmOperationModeSelectList = $config.WALLARM_OPERATION_MODE_SELECT;
        $ctrl.wallarmModeAllowOverriderOperationModeList = $config.WALLARM_MODE_ALLOW_OVERRIDER_SELECT;
        $ctrl.wallarmProcessTimeLimitBlockList = $config.WALLARM_PROCESS_TIME_LIMIT_BLOCK_SELECT;
        // $ctrl.wallarmParserDisabledList = $config.WALLARM_PARSER_DISABLED;// NOTE: will be used later

        /**
         * @name  onAddNewWallarmLocation
         * @description add new Item of Wallarm Location
         * Property "wallarmConfig" must exists and has type of Array
         * @param  {Object} newWallarmLocation
         * @return
         */
        this.onAddNewWallarmLocation = function(isAsk) {
          if ($scope._isEditLocked === true) {
            return;
          }
          if (!_.isArray($ctrl.wallarmConfig)) {
            $ctrl.wallarmConfig = [];
          }
          if ($ctrl.loading) {
            return false;
          }
          var modalInstance = {
            result: $q.when($config.WALLARM_LOCATION_DEFAULT.location)
          };

          var resolve = {
            model: function() {
              return {};
            },
            exists_names: function() {
              return _.map($ctrl.wallarmConfig, function(itemWallarmConfig) {
                return itemWallarmConfig.location;
              });
            }
          };
          var newLocationName_ = '';
          if (!!isAsk || isAsk === true) {
            modalInstance = $uibModal.open({
              animation: false,
              templateUrl: 'parts/domains/domain-wallarm-waf/modals/confirm-add-new-wallarm-location.tpl.html',
              controller: /*ngInject*/ function($scope, $uibModalInstance, model, exists_names) {
                $scope.model = model;
                $scope.exists_names = exists_names || [];
                $scope.newLocationName = '';
                $scope.ok = function(newLocationName) {
                  $uibModalInstance.close(newLocationName);
                };
                $scope.cancel = function() {
                  $uibModalInstance.dismiss('cancel');
                };
              },
              resolve: resolve
            });
          } else {
            resolve.model.newLocationName = $config.WALLARM_LOCATION_DEFAULT.location;
          }
          $ctrl.loading = true;
          modalInstance.result.then(function(dataNewLocationName) {
              var newWallarmLocation = angular.copy($config.WALLARM_LOCATION_DEFAULT);
              var newLocationName_ = _.trim(dataNewLocationName);
              angular.merge(newWallarmLocation, {
                '$$wallarmLocationBlockState': {
                  'isCollapsed': false
                }
              }, {
                location: newLocationName_
              });
              newWallarmLocation.$$isNew = true;
              $ctrl.wallarmConfig.push(newWallarmLocation);

              AlertService.success('A new default location block has been added to the bottom of the list. Please configure the block before saving the configuration.');
            })
            .finally(function() {
              $ctrl.loading = false;
            });
        };

        /**
         * @name  onDeleteWallarmLocation
         * @description delete one item from array property 'wallarm_config'
         * @param  {Integer} index
         * @return
         */
        this.onDeleteWallarmLocation = function(e, index) {
          e.preventDefault();
          e.stopPropagation();
          if ($scope._isEditLocked === true) {
            return;
          }
          if ($ctrl.wallarmConfig.length <= 1) {
            AlertService.danger('Last Wallarm location can`t be deleted');
            return;
          }
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'parts/domains/domain-wallarm-waf/modals/confirm-delete-wallarm-location.tpl.html',
            controller: /*ngInject*/ function($scope, $uibModalInstance, model) {
              $scope.model = model;
              $scope.ok = function() {
                $uibModalInstance.close('ok');
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            resolve: {
              model: function() {
                return $ctrl.wallarmConfig[index];
              }
            }
          });

          modalInstance.result
            .then(function() {
              $ctrl.wallarmConfig.splice(index, 1);
              AlertService.success('Wallarm location was deleted');
            });
        };

        /**
         * @name  onCollapsAllWallarmLocations
         * @description
         *
         * @return
         */
        this.onCollapsAllWallarmLocations = function() {
          var _rules = $ctrl.wallarmConfig;
          angular.forEach(_rules, function(item) {
            item.$$wallarmLocationBlockState.isCollapsed = true;
          });
        };

        /**
         * @name  onExpandAllWallarmLocations
         * @description
         *
         * @return
         */
        this.onExpandAllWallarmLocations = function() {
          var _rules = $ctrl.wallarmConfig;
          angular.forEach(_rules, function(item) {

            item.$$wallarmLocationBlockState.isCollapsed = false;
          });
        };

        /**
         * @name onDuplicateWallarmLocation
         * @description method  Duplicate Wallarm Location
         * Ask new Location Name
         */
        this.onDuplicateWallarmLocation = function(e, item) {
          e.preventDefault();
          e.stopPropagation();
          if ($scope._isEditLocked === true) {
            return;
          }
          if ($ctrl.loading) {
            return false;
          }
          var resolve = {
            model: function() {
              return angular.copy(item);
            },
            exists_names: function() {
              return _.map($ctrl.wallarmConfig, function(itemWaf) {
                return itemWaf.location;
              });
            }
          };

          var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'parts/domains/domain-wallarm-waf/modals/confirm-duplicate-wallarm-location.tpl.html',
            controller: /*ngInject*/ function($scope, $uibModalInstance, model, exists_names) {
              $scope.model = model;
              $scope.exists_names = exists_names || [];
              $scope.newLocationName = '';
              $scope.ok = function(newLocationName) {
                $uibModalInstance.close(newLocationName);
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            resolve: resolve
          });

          $ctrl.loading = !true;
          modalInstance.result.then(function(dataNewLocationName) {
              if (dataNewLocationName) {
                var newLocationName_ = _.trim(dataNewLocationName);
                var duplicateWallarmLocation = angular.merge($config.WALLARM_LOCATION_DEFAULT, {
                  'location': newLocationName_,
                  '$$wallarmLocationBlockState': {
                    'isCollapsed': false
                  }
                });
                $ctrl.wallarmConfig.push(_.clone(duplicateWallarmLocation));
                AlertService.success('The Wallarm location block has duplicated to the bottom of the list. Please configure the block before saving the configuration.');
              }
            })
            .finally(function() {
              $ctrl.loading = false;
            });
        };
        /**
         * @name onUpWallarmLocation
         * @description method Up Location in list
         */
        this.onUpWallarmLocation = function(e, element) {
          e.preventDefault();
          e.stopPropagation();
          if ($scope._isEditLocked === true) {
            return;
          }
          var array = $ctrl.wallarmConfig;
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
         * @name onDownWallarmLocation
         * @description method Down Location in list
         */
        this.onDownWallarmLocation = function(e, element) {
          e.preventDefault();
          e.stopPropagation();
          if ($scope._isEditLocked === true) {
            return;
          }
          var array = $ctrl.wallarmConfig;
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
         * @description method check exists Wallarm config block and create it
         */
        this.init = function() {
          var deff = $q.defer();
          $q.all([
              // NOTE: can add additional rules
            ])
            .then(function() {
              deff.resolve();
            })
            .catch(function(err) {
              AlertService.danger(err);
              deff.reject();
            });
          return deff.promise;
        };

        $ctrl._loading = true;
        // NOTE: auto init
        this.init()
          .finally(function() {
            if (!!!$ctrl.wallarmConfig) {
              $ctrl.wallarmConfig = [];
              // $ctrl.onAddNewWallarmLocation();
            }
            if($ctrl.wallarmConfig.length ===0 ){
                $ctrl.onAddNewWallarmLocation();
            }

            $ctrl._loading = false;
          });
      }
    };
  }
})();
