(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainLuaScripting', domainLuaScripting)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-lua-scripting/domain-lua-scripting.tpl.html', true);
      $templateRequest('parts/domains/domain-lua-scripting/modal/confirmModalDeleteLuaBlock.tpl.html', true);
    });
  /**
   * @name  domainLuaScripting
   * @description
   * @return {Object}
   */
  function domainLuaScripting() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        domain: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-lua-scripting/domain-lua-scripting.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainLuaScriptingController($scope, AlertService) {
        'ngInject';
        var $ctrl = this;

        this.onCollapsAllBPLuaBlock = function() {
          var _itemList = $ctrl.domain.bp_lua;
          angular.forEach(_itemList, function(item) {
            item.$$itemState.isCollapsed = true;
          });
        };

        this.onExpandAllBPLuaBlock = function() {
          var _itemList = $ctrl.domain.bp_lua;
          angular.forEach(_itemList, function(item) {
            item.$$itemState.isCollapsed = false;
          });
        };
        /**
         * @name  onUpItemBP
         * @description
         *
         * @param  {Object} element - Caching Rule Object
         * @return {Boolean|Integer}
         */
        this.onUpItemBP = function(element) {
          var array = $ctrl.domain.bp_lua;
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
         * @name  onDownItemBP
         * @description
         *
         * @param  {Object} element -
         * @return {Boolean|Integer}
         */
        this.onDownItemBP = function(element) {
          var array = $ctrl.domain.bp_lua;
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
         * @name  onAddNewItemBP
         * @description
         *
         * Add new item
         *
         * @return
         */
        this.onAddNewItemBP = function() {
          var newLuaBlockCode_ = {
            enable: true,
            location: '/',
            code: '',
            $$itemState: {
              isCollapsed: false
            }
          };
          $ctrl.domain.bp_lua.push(newLuaBlockCode_);
          AlertService.success('A new default block has been added to the end of the list. Please configure the LUA code before saving the configuration.');
        };

        /**
         * @name  onRemoveItemBP
         * @description
         *
         * Delete item
         *
         * @return
         */
        this.onRemoveItemBP = function(index) {
          $scope.confirm('parts/domains/domain-lua-scripting/modal/confirmModalDeleteLuaBlock.tpl.html', {
              location: $ctrl.domain.bp_lua[index].location
            })
            .then(function() {
              $ctrl.domain.bp_lua.splice(index, 1);
              AlertService.success('LUA Block was deleted');
            });
        };

        // =========
        this.onCollapsAllCOLuaBlock = function() {
          var _itemList = $ctrl.domain.co_lua;
          angular.forEach(_itemList, function(item) {
            item.$$itemState.isCollapsed = true;
          });
        };

        this.onExpandAllCOLuaBlock = function() {
          var _itemList = $ctrl.domain.co_lua;
          angular.forEach(_itemList, function(item) {
            item.$$itemState.isCollapsed = false;
          });
        };
        /**
         * @name  onUpItemCO
         * @description
         *
         * @param  {Object} element
         * @return {Boolean|Integer}
         */
        this.onUpItemCO = function(element) {
          var array = $ctrl.domain.co_lua;
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
         * @name  onDownItemCO
         * @description
         *
         * @param  {Object} element -
         * @return {Boolean|Integer}
         */
        this.onDownItemCO = function(element) {
          var array = $ctrl.domain.co_lua;
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
         * @name  onAddNewItemCO
         * @description
         *
         * Add new item
         *
         * @return
         */
        this.onAddNewItemCO = function() {
          var newLuaBlockCode_ = {
            enable: true,
            location: '/',
            code: '',
            $$itemState: {
              isCollapsed: false
            }
          };
          $ctrl.domain.co_lua.push(newLuaBlockCode_);
          AlertService.success('A new default block has been added to the end of the list. Please configure the LUA code before saving the configuration.');
        };

        /**
         * @name  onRemoveItemCO
         * @description
         *
         * Delete item
         *
         * @return
         */
        this.onRemoveItemCO = function(index) {
          $scope.confirm('parts/domains/domain-lua-scripting/modal/confirmModalDeleteLuaBlock.tpl.html', {
              location: $ctrl.domain.co_lua[index].location
            })
            .then(function() {
              $ctrl.domain.co_lua.splice(index, 1);
              AlertService.success('LUA Block was deleted');
            });
        };


      }
    };
  }
})();
