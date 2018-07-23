(function() {
  'use strict';

  angular
    .module('revapm.Portal.Notifications')
    .controller('NotificationListsController', NotificationListsController);

  /*@ngInject*/
  function NotificationListsController($scope, $q, NotificationLists, $uibModal, User, Users, AlertService) {
    $scope.auth = User;
    $scope.alertService = AlertService;

    $scope.account = null;
    $scope.accountId = null;
    $scope.accountUsersList = [];
    $scope.notificationLists = [];

    $scope.$watch('accountId', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.reload();
        $scope.updateAccountUsersList(newVal);
      }
    });
    /**
     * @name accountsListCheck
     * @description Don`t use 'All Accounts'
     *
     * @param {any} accs
     * @returns
     */
    function accountsListCheck(accs) {
      var accounts = [];
      if ($scope.auth.isRevadmin() || $scope.auth.isReseller()) {
        accounts = accs.length > 1 ? accs.slice(1) : accs;
      } else {
        accounts = accs;
      }
      return accounts;
    }
    var selAccount = User.getSelectedAccount();

    if (selAccount && selAccount.acc_id !== '' /*do not restore 'All accounts'*/ ) {
      $scope.account = selAccount;
      $scope.accountId = $scope.account.acc_id;
    } else {
      $scope.accountId = null;
    }
    /**
     * @name onResetChanges
     * @description restore data
     */
    $scope.onResetChanges = function(event) {
      // TODO: call confirm window
      $scope.reload();
    };


    $scope.onSaveAllChanges = function() {
      if (!_.isArray($scope.notificationLists)) {
        return;
      }
      var promises = [];
      $scope._loading = true;
      angular.forEach($scope.notificationLists, function(item) {
        promises.push((function(item_) {
          var params = {
            id: item_.id
          };
          var dataUpdate = {
            list_name: item_.list_name,
            destinations: item_.destinations
          };
          return NotificationLists.update({
            id: item_.id
          }, dataUpdate).$promise;
        })(item));
      });
      // TODO: !!! MAKE SYNC !!! send one by one
      $q.all(promises)
        .then(function(data) {
          // TODO: change text
          $scope.alertService.success('All data was saved');
        })
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };
    /**
     * @name reload
     * @description reload data
     */
    $scope.reload = function() {
      var accountId = null;
      if ($scope.accountId == null) {
        $scope.alertService.info('Please choose Account');
        return;
      }
      var params = {};
      if (!!$scope.account && !!$scope.account.acc_id && $scope.account.acc_id.length > 0) {
        params.account_id = $scope.account.acc_id;
      }
      $scope._loading = true;
      NotificationLists.query(params)
        .$promise
        .then(function(data) {
          $scope.notificationLists.length = 0;
          _.forEach(data, function(item) {
            angular.extend(item, {
              $$blockState: {
                isCollapsed: true
              }
            });
            $scope.notificationLists.push(item);
          });
        })
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };
    //  ---------------------------------
    $scope.onUpdate = function() {
      if ($scope.accounts.length === 0 || !$scope.account) {
        $scope._loading = false;
        return;
      }
      $scope._loading = true;
      $scope.reload();
    };

    User.getUserAccounts()
      .then(accountsListCheck)
      .then(function(accs) {
        $scope.accounts = accs;
        if (accs.length === 1) {
          $scope.account = accs[0];
          $scope.accountId = accs[0].acc_id;
        }
        $scope.onUpdate();
      })
      .catch($scope.alertService.danger)
      .finally(function() {
        $scope._loading = false;
      });

    /**
     * @name onAccountSelect
     * @description action change account
     */
    $scope.onAccountSelect = function(acc) {
      $scope.account = acc;
      //  do not store 'All accounts'
      if (acc.acc_id !== '') {
        $scope.accountId = acc.acc_id;
        User.selectAccount(acc);
      } else {
        $scope.accountId = null;
      }

    };
    /**
     * @name updateAccountUsersList
     * @description update Account Users List
     * this list used for display
     */
    $scope.updateAccountUsersList = function(accountId) {
      if (!accountId) {
        $scope.accountUsersList.length = 0;
      } else {
        Users.query({
            filters: {
              account_id: accountId
            }
          })
          .$promise
          .then(function(data) {
            angular.forEach(data, function(item) {
              var name_ = item.firstname + ' ' + item.lastname + ' (' + item.email + ')';
              $scope.accountUsersList.push({
                account_id: accountId,
                id: item.user_id,
                name: name_
              });
            });
          });
      }
    };

    $scope.updateAccountUsersList($scope.accountId);
  }
})();
