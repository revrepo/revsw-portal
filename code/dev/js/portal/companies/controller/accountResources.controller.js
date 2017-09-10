(function () {
  'use strict';

  angular
    .module('revapm.Portal.Companies')
    .controller('AccountResourcesController', AccountResourcesController);

  function AccountResourcesController($scope, $q, $state, User, $stateParams) {
    'ngInject';
    $scope.params = $stateParams;
    $scope.user = User.getUser();
    $scope.isReadOnly = User.isReadOnly;
    $scope._error = false;
    $scope.account = User.getSelectedAccount();
    $state.isReload = false;

    var selAccount = User.getSelectedAccount();
    if (selAccount && selAccount.acc_id !== '' /*do not restore 'All accounts'*/) {
      $scope.account = selAccount;
    }
    //  ---------------------------------
    $scope.onUpdate = function () {
      if ($scope.accounts.length === 0 || !$scope.account) {
        $scope._loading = false;
        return;
      }
      $scope._loading = true;
      // $state.reload();
    };

    User.getUserAccounts()
      .then(function (accs) {
        $scope.accounts = accs;
        if (accs.length === 1) {
          $scope.account = accs[0];
        }
        $scope.onUpdate();
      })
      .catch($scope.alertService.danger)
      .finally(function () {
        $scope._loading = false;
      });
    // change account
    $scope.onAccountSelect = function (acc) {
      $scope.account = acc;
      //  do not store 'All accounts'
      if (acc.acc_id !== '') {
        User.selectAccount(acc);
      }
      $state.reload();
    };
    /**
     * @name onClickRefresh
     * @description update data on page
     */
    $scope.onClickRefresh = function () {
      $state.isReload = true;
      $state.reload();
    };

    /**
     * @name onClickBack
     * @description go back to previous page
     */
    $scope.onClickBack = function () {
      window.history.back();
    };
  }

})();
