(function() {
  'use strict';

  angular.module('revapm.Portal.Notifications')
    .directive('accountNotificationLists', accountNotificationLists);

  function accountNotificationLists() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        notificationLists: '=?ngModel',
        accountId: '@',
        accountUsersList: '='
      },
      templateUrl: 'parts/notifications/account-notification-lists/account-notification-lists.tpl.html',
      controllerAs: '$ctrl',
      controller: function accountNotificationListsController($uibModal, $scope, $q, $config, AlertService, NotificationLists) {
        'ngInject';
        var $ctrl = this;
        $ctrl.alertService = AlertService;
        $ctrl._loading = false;
        /**
         * @name  onAddNew
         * @description add new Notification List
         *
         * @param  {Object} newNotificationList
         * @return
         */
        this.onAddNewNotificationList = function(isAsk) {
          if (!$ctrl.accountId) {
            return;
          }
          if (!_.isArray($ctrl.notificationLists)) {
            $ctrl.notificationLists = [];
          }
          if ($ctrl.loading) {
            return false;
          }
          var modalInstance = {
            result: $q.when($config.NOTIFICATION_LIST_DEFAULT.list_name)
          };

          var resolve = {
            model: function() {
              return {};
            },
            exists_names: function() {
              return _.map($ctrl.notificationLists, function(item) {
                return item.list_name;
              });
            }
          };
          var newNotificationListName_ = '';

          if (!!isAsk || isAsk === true) {
            modalInstance = $uibModal.open({
              animation: false,
              templateUrl: 'parts/notifications/modals/confirm-add-new-notification-list.tpl.html',
              controller: /*ngInject*/ function($scope, $uibModalInstance, model, exists_names) {
                $scope.model = model;
                $scope.newLocationName = '';
                $scope.exists_names = exists_names || [];
                $scope.users_list = [];
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
            resolve.model.newLocationName = $config.NOTIFICATION_LIST_DEFAULT.list_name;
          }
          $ctrl.loading = true;
          modalInstance.result.then(function(newName) {
              var newNotificationList = angular.copy($config.NOTIFICATION_LIST_DEFAULT);
              var newNotificationListName_ = _.trim(newName);
              var params = {
                list_name: newNotificationListName_,
                account_id: $ctrl.accountId
              };
              NotificationLists.save(params).$promise
                .then(function(resultAdd) {
                  angular.merge(newNotificationList, {
                    '$$blockState': {
                      'isCollapsed': false
                    }
                  }, {
                    list_name: newNotificationListName_
                  }, {
                    id: resultAdd.object_id
                  });
                  $ctrl.notificationLists.unshift(newNotificationList);

                  $ctrl.alertService.success('An empty notification list has been added to the top of existing notification lists.' +
                    ' Now you are welcome to configure the new list by adding desired notification destinations.');
                })
                .catch($ctrl.alertService.danger)
                .finally(function() {
                  $ctrl.loading = false;
                });
            })
            .finally(function() {
              $ctrl.loading = false;
            });
        };
        /**
         * @name  onEditNameNotificationList
         * @description update Name for Notification List
         *
         * @param  {number} index
         * @return
         */
        this.onEditNameNotificationList = function(index) {
          if (index === null || index === undefined) {
            return;
          }

          if ($ctrl.loading) {
            return false;
          }

          var resolve = {
            model: function() {
              return $ctrl.notificationLists[index];
            },
            exists_names: function() {
              return _.map($ctrl.notificationLists, function(item) {
                return item.list_name;
              });
            }
          };

          var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'parts/notifications/modals/edit-name-notification-list.tpl.html',
            controller: /*ngInject*/ function($scope, $uibModalInstance, model, exists_names) {
              $scope.model = model;
              $scope.newLocationName = '';
              $scope.exists_names = exists_names || [];
              $scope.users_list = [];
              $scope.ok = function(newLocationName) {
                $uibModalInstance.close(newLocationName);
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            resolve: resolve
          });
          $ctrl.loading = true;
          modalInstance.result.then(function(newName) {
              $ctrl.notificationLists[index].list_name = _.trim(newName);
            })
            .finally(function() {
              $ctrl.loading = false;
            });
        };

        /**
         * @name  onDelete
         * @description delete one item from array
         * @param  {Integer} index
         * @return
         */
        this.onDeleteNotificationList = function(index) {
          if (index === null || index === undefined) {
            return;
          }
          var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'parts/notifications/modals/confirm-delete-notification-list.tpl.html',
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
                return $ctrl.notificationLists[index];
              }
            }
          });

          modalInstance.result
            .then(function() {
              // TODO: API call
              $ctrl._loading = true;
              NotificationLists.delete({
                  id: $ctrl.notificationLists[index].id
                }).$promise
                .then(function(data) {
                  $ctrl.notificationLists.splice(index, 1);
                  $ctrl.alertService.success(data);
                })
                .catch($ctrl.alertService.danger)
                .finally(function() {
                  $ctrl._loading = false;
                });

            });
        };

        /**
         * @name  onCollapsAllNotificationLists
         * @description
         *
         * @return
         */
        this.onCollapsAllNotificationLists = function() {
          var _rules = $ctrl.notificationLists;
          angular.forEach(_rules, function(item) {
            item.$$blockState.isCollapsed = true;
          });
        };

        /**
         * @name  onExpandAllNotificationLists
         * @description
         *
         * @return
         */
        this.onExpandAllNotificationLists = function() {
          var _rules = $ctrl.notificationLists;
          angular.forEach(_rules, function(item) {
            item.$$blockState.isCollapsed = false;
          });
        };

        /**
         * @name init
         * @description method check exists Notification List
         */
        this.init = function() {
          if (!!!$ctrl.notificationLists) {
            $ctrl.notificationLists = [];
          }
        };
        // NOTE: auto init
        this.init();
      }
    };
  }
})();
