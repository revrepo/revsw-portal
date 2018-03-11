(function () {
  'use strict';

  angular
    .module('revapm.Portal.Groups')
    .controller('GroupsCrudController', GroupsCrudController);

  /*@ngInject*/
  function GroupsCrudController($scope, $q, CRUDController, Users, $rootScope,
    User, $injector, $state, $stateParams, Companies,
    DomainsConfig, $anchorScroll, $config, Invitation, Groups) {

    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    if ($scope.auth.isUser()) {
      $state.go('index.accountSettings.profile');
      return;
    }
    // NOTE: init load dependencies for Add New User Page
    if ($state.current.name === 'index.accountSettings.groups.new') {
      dependencies();
    }
    //Set state (ui.router)
    $scope.setState('index.accountSettings.groups');
    $scope.setResource(Groups);

    $scope.groups = [];

    if (!$scope.model) {
      initModel();
    }

    function initModel(reinit) {
      if (!$scope.model || reinit) {
        $scope.model = {};
        angular.merge($scope.model, {
          name: '',
          comment: ''
        });
      }
    }

    $scope.clearForm = function () {
      $scope.clearModel();
      $scope.initNew(true); // send true to reinit the model
    };

    $scope.initNew = function (reinit) {
      initModel(reinit);
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        dependencies().then(function (data) {
          $scope.setDefaultAccountId();
        });
      } else {
        $scope.setDefaultAccountId();
      }
    };

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };

    // Init everyting on `viewContentLoading` event because it starts slightly before the DOM renders.
    $rootScope.$on('$viewContentLoading', function (state) {
      var data = null;
      // NOTE: set filter params for specific state
      if ($state.is('index.accountSettings.accountresources')) {
        $scope.filter.limit = $config.MIN_LIMIT_RECORDS_IN_TABLE;
        data = {
          filters: {
            account_id: !User.getSelectedAccount() ? null : User.getSelectedAccount().acc_id
          }
        };
      }
      $scope.list(data)
        .then(function (res) {
          // set our groups
          $scope.groups = res;
          // get companies and set the company names
          Companies.query().$promise.then(function (accs) {
            $scope.groups.forEach(function (group) {
              accs.forEach(function (account) {
                if (group.account_id === account.id) {
                  group.accountName = account.companyName;
                }
              });
            });
          });

          // get users and count each group's user to dispaly in table
          Users.query().$promise.then(function (resultUsers) {
            $scope.groups.forEach(function (group) {
              resultUsers.forEach(function (usr) {
                group.userCount = group.userCount || 0;
                if (group.id === usr.group_id) {
                  group.userCount++;
                }
              });
            });
          });
        });
    });

    /**
     * @name  deleteGroup
     * @description
     *
     *   Delete group after confirm
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.deleteGroup = function (model) {
      if ($scope.isReadOnly() === true) {
        return;
      }
      $scope.confirm('confirmModal.html', model)
        .then(function () {
          $scope
            .delete(model)
            .then($scope.alertService.success)
            .catch($scope.alertService.danger);
        });
    };
  }
})();
