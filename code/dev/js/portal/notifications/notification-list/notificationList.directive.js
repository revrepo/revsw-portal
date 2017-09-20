(function() {
  'use strict';

  angular.module('revapm.Portal.Notifications')
    .directive('notificationList', notificationList)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/notifications/notification-list/notification-list.tpl.html', true);
    });
  /**
   * @name  notificationList
   * @description
   * @return {Object}
   */
  function notificationList() {
    return {
      restrict: 'AE',
      replace: true,
      scope: true,
      bindToController: {
        notificationList: '=ngModel',
        onDelete: '&onDelete',
        usersList: '='
      },
      templateUrl: 'parts/notifications/notification-list/notification-list.tpl.html',
      controllerAs: '$ctrl',
      controller: function notificationListController($scope, $config, $uibModal, AlertService) {
        'ngInject';
        var $ctrl = this;
        $ctrl.alertService = AlertService;
        $ctrl.destinationsType = $config.NOTIFICATION_DESTINATIONS_TYPE;
        if (notificationList.$$blockState) {
          notificationList.$$blockState = {
            isCollapsed: true
          };
        }
        /**
         * @name isValidDestinationItem
         *
         * @param {any} dataValidation
         * @returns
         */
        function isValidDestinationItem(dataValidation) {
          if (_.isObject(dataValidation) !== true) {
            return false;
          }
          switch (dataValidation.destination_type) {
            case 'user':
              return !!dataValidation.user_id;
            case 'email':
              return !!dataValidation.email;
            default:
              return false;
          }
        }
        /**
         *  @name prepareDestinationData
         *
         * @param {any} rawData
         * @returns
         */
        function prepareDestinationData(rawData) {
          var data = null;
          if (_.isObject(rawData) !== true) {
            return data;
          }
          data = {
            destination_type: rawData.destination_type
          };
          switch (rawData.destination_type) {
            case 'user':
              data.user_id = rawData.user_id;
              break;
            case 'email':
              data.email = rawData.email;
              break;
            default:
              break;
          }
          return data;
        }
        /**
         * @name onAddNewNotificationDestination
         * @description action add to  Notification List new Destination
         */
        $ctrl.onAddNewNotificationDestination = function() {
          var resolve = {
            model: function() {
              return {
                destination_type: 'user',
                user_id: null
              };
            }
          };
          var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'parts/notifications/modals/confirm-add-new-destination-item.tpl.html',
            controller: /*ngInject*/ function($scope, $uibModalInstance, model) {
              $scope.model = model;
              $scope.users_list = $ctrl.usersList;
              $scope.ok = function(data) {
                $uibModalInstance.close(data);
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            resolve: resolve
          });
          $ctrl.loading = true;

          modalInstance.result.then(function(newData) {
              var newItem = prepareDestinationData(newData);
              if (isValidDestinationItem(newItem) !== true) {
                $ctrl.alertService.danger('Sorry! New data is not valid');
                return;
              }
              $ctrl.notificationList.destinations.push(newItem);
            })
            .finally(function() {
              $ctrl.loading = false;
            });
        };

        $ctrl.onDuplicateDestinationItem = function(item) {
          // TODO: add confirm window
          var newItem = prepareDestinationData(item);
          if (isValidDestinationItem(newItem) !== true) {
            $ctrl.alertService.danger('Sorry! New data is not valid');
            return;
          }

          $ctrl.notificationList.destinations.push(newItem);
        };
        /**
         * @name onDeleteDestinationItem
         * @description method delete Destination item from Notification List
         * delete in local memory
         */
        $ctrl.onDeleteDestinationItem = function(item, index) {
          // TODO: add confirm window ?
          $ctrl.notificationList.destinations.splice(index, 1);
        };
        /**
         * @name onEditDestinationItem
         * @description method for call a edit window
         */
        $ctrl.onEditDestinationItem = function(item, index) {
          var editItem = $ctrl.notificationList.destinations[index];
          var resolve = {
            model: function() {
              return angular.copy(editItem);
            }
          };
          var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: 'parts/notifications/modals/edit-destination-item.tpl.html',
            controller: /*ngInject*/ function($scope, $uibModalInstance, model) {
              $scope.model = model;
              $scope.users_list = $ctrl.usersList;
              $scope.destination_types = $config.NOTIFICATION_DESTINATIONS_TYPE;
              $scope.ok = function(data) {
                $uibModalInstance.close(data);
              };
              $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
              };
            },
            resolve: resolve
          });
          $ctrl.loading = true;

          modalInstance.result.then(function(editData) {
              var editItem = prepareDestinationData(editData);
              if (isValidDestinationItem(editItem) !== true) {
                // TODO: change text
                $ctrl.alertService.danger('Sorry! Edit data is not valid');
                return;
              }
              angular.extend($ctrl.notificationList.destinations[index], editItem);
            })
            .finally(function() {
              $ctrl.loading = false;
            });
        };
        /**
         * @name findUserName
         * @description find user information in a current account user list
         */
        $ctrl.findUserName = function(userId) {
          var user = _.find($ctrl.usersList, function(itemUser) {
            return (itemUser.id === userId);
          });
          if (user) {
            return user.name;
          }
          return user;
        };
      }
    };
  }
})();
