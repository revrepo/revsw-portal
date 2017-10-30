(function () {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainBotProtectionList', domainBotProtectionList);

  function domainBotProtectionList() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        botProtection: '=ngModel',
        _isEditLocked: '=isEditLocked',
        accountId: '@'
      },
      templateUrl: 'parts/domains/domain-bot-protection-list/domain-bot-protection-list.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainBotProtectionListController($uibModal, $scope, $q, $config, AlertService) {
        'ngInject';
        var $ctrl = this;
        $ctrl.botProtectionRulesList = [];
        $ctrl.modeTypes = $config.BOT_PROTECTION_MODE_TYPES;

        /**
         * @name  onAddNew
         * @description add new Item of Location
         * Property "botProtection" must exists and has type of Array
         *
         * @param  {Object} isAsk - if true then show window dialog
         * @return
         */
        this.onAddNewBotProtection = function (isAsk) {
          if($scope._isEditLocked === true){
            return;
          }
          if (!_.isArray($ctrl.botProtection)) {
            $ctrl.botProtection = [];
          }
          if ($ctrl.loading) {
            return false;
          }
          var modalInstance = {
            result: $q.when($config.BOT_PROTECTION_DEFAULT.location)
          };

          var resolve = {
            model: function () {
              return {};
            },
            exists_names: function () {
              return _.map($ctrl.botProtection, function (item) {
                return item.location;
              });
            }
          };
          var newLocationName_ = '';
          if (!!isAsk || isAsk === true) {
            modalInstance = $uibModal.open({
              animation: false,
              templateUrl: 'parts/domains/domain-bot-protection-list/modals/confirmAddNewBotProtectionLocation.tpl.html',
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
            resolve.model.newLocationName = $config.BOT_PROTECTION_DEFAULT.location;
          }
          $ctrl.loading = true;
          modalInstance.result.then(function (dataNewLocationName) {
              var newBotProtection = angular.copy($config.BOT_PROTECTION_DEFAULT);
              var newLocationName_ = _.trim(dataNewLocationName);
              angular.merge(newBotProtection, {
                '$$botProtectionLocationBlockState': {
                  'isCollapsed': false
                }
              }, {
                location: newLocationName_
              });
              $ctrl.botProtection.push(newBotProtection);
              AlertService.success('A new default location block has been added to the bottom of the list. Please configure the block before saving the configuration.');
            })
            .finally(function () {
              $ctrl.loading = false;
            });
        };

        /**
         * @name  onDelete
         * @description delete one item from array property 'botProtection'
         * @param  {Integer} index
         * @return
         */
        this.onDeleteBotProtection = function (e, index) {
          e.preventDefault();
          e.stopPropagation();
          if($scope._isEditLocked === true){
            return;
          }
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'parts/domains/domain-bot-protection-list/modals/confirmDeleteBotProtectionLocation.tpl.html',
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
                return $ctrl.botProtection[index];
              }
            }
          });

          modalInstance.result
            .then(function () {
              $ctrl.botProtection.splice(index, 1);
            });
        };

        /**
         * @name  onCollapsAllBotProtections
         * @description
         *
         * @return
         */
        this.onCollapsAllBotProtections = function () {
          var _list = $ctrl.botProtection;
          angular.forEach(_list, function (item) {
            item.$$botProtectionLocationBlockState.isCollapsed = true;
          });
        };

        /**
         * @name  onExpandAllBotProtections
         * @description
         *
         * @return
         */
        this.onExpandAllBotProtections = function () {
          var _list = $ctrl.botProtection;
          angular.forEach(_list, function (item) {
            item.$$botProtectionLocationBlockState.isCollapsed = false;
          });
        };

        /**
         * @name onDuplicateBotProtection
         * @description method  Duplicate Bot Protection Location
         * Ask new Location Name
         */
        this.onDuplicateBotProtection = function (e, item) {
          e.preventDefault();
          e.stopPropagation();
          if($scope._isEditLocked === true){
            return;
          }
          if ($ctrl.loading) {
            return false;
          }
          var resolve = {
            model: function () {
              return angular.copy(item);
            },
            exists_names: function () {
              return _.map($ctrl.botProtection, function (itemBot) {
                return itemBot.location;
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
                var duplicateBotProtection = {
                  'location': newLocationName_,
                  'mode': item.mode || $config.BOT_PROTECTION_DEFAULT.mode,
                  'call_type': item.call_type || $config.BOT_PROTECTION_DEFAULT.call_type,
                  'username_cookie_name': item.username_cookie_name || $config.BOT_PROTECTION_DEFAULT.username_cookie_name,
                  'sessionid_cookie_name': item.sessionid_cookie_name || $config.BOT_PROTECTION_DEFAULT.sessionid_cookie_name,
                  'bot_protection_id': item.bot_protection_id || $config.BOT_PROTECTION_DEFAULT.bot_protection_id,
                  '$$botProtectionLocationBlockState': {
                    'isCollapsed': false
                  }
                };
                $ctrl.botProtection.push(_.clone(duplicateBotProtection));
                AlertService.success('The location block has duplicated to the bottom of the list. Please configure the block before saving the configuration.');
              }
            })
            .finally(function () {
              $ctrl.loading = false;
            });
        };
        /**
         * @name onUpBotProtection
         * @description method Up Location in list
         */
        this.onUpBotProtection = function (e, element) {
          e.preventDefault();
          e.stopPropagation();
          if($scope._isEditLocked === true){
            return;
          }
          var array = $ctrl.botProtection;
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
         * @name onDownBotProtection
         * @description method Down Location in list
         */
        this.onDownBotProtection = function (e, element) {
          e.preventDefault();
          e.stopPropagation();
          if($scope._isEditLocked === true){
            return;
          }
          var array = $ctrl.botProtection;
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
         * @description method check exists Bot Protection block and create it
         */
        this.init = function () {
          if(!!!$ctrl.botProtection) {
            $ctrl.botProtection = [];
            $ctrl.onAddNewBotProtection();
          }
        };
        // NOTE: auto init
        this.init();
      }
    };
  }
})();
