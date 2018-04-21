(function () {
  'use strict';

  angular
    .module('revapm.Portal.Companies')
    .controller('AccountResourcesController', AccountResourcesController);

  function AccountResourcesController($scope, $q, $state, User, $stateParams, Companies) {
    'ngInject';
    $scope.params = $stateParams;
    $scope.user = User.getUser();
    $scope.auth = User;
    $scope.isReadOnly = User.isReadOnly;
    $scope._error = false;
    $scope.account = User.getSelectedAccount();
    $state.isReload = false;
    $scope.childAccs = null;

    var selAccount = User.getSelectedAccount();
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
      $scope._loading = true;
      User.selectAccount(acc);
      $scope.onClickRefresh();
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

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.getListTitle = function () {
      if (User.getSelectedAccount().acc_name.trim() !== 'All Accounts') {
        return 'For Account "' + User.getSelectedAccount().acc_name.trim() + '"';
      } else {
        return '';
      }
    };
  }

})();
