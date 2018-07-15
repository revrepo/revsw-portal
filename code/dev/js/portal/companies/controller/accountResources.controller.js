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
    var userAcc = User.getSelectedAccount();
    if (userAcc.companyName) {
      var acc = {
        acc_name: User.getSelectedAccount().companyName,
        acc_id: User.getSelectedAccount().id,
        vendor_profile: User.getSelectedAccount().vendor_profile
      };
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
      $scope._loading = true;
      User.selectAccount(acc);
      userAcc = acc;
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
      if (userAcc.acc_name) {
        if (userAcc.acc_name.trim() !== 'All Accounts') {
          return 'For Account "' + userAcc.acc_name.trim() + '"';
        } else {
          return '';
        }
      } else {
        if (userAcc.companyName) {
          $scope.account = acc;
          return 'For Account "' + acc.acc_name.trim() + '"';
        } else {
          return '';
        }
      }
    };
  }

})();
