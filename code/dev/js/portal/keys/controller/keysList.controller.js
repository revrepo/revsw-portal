(function () {
  'use strict';

  angular
    .module('revapm.Portal.Keys')
    .controller('KeysListController', KeysListController);

  /*@ngInject*/
  function KeysListController($scope, $rootScope, $q, CRUDController, ApiKeys, $injector, $stateParams, Companies, DomainsConfig, $state, $uibModal, clipboard,
    User, $config) {

    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    if ($scope.auth.isUser()) {
      $state.go('index.accountSettings.profile');
      return;
    }
    //Set state (ui.router)
    $scope.setState('index.accountSettings.keys');

    $scope.setResource(ApiKeys);

    /**
     * @name setAccountName
     * @description
     *
     */
    function setAccountName() {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        return Companies.query(function (list) {
          _.forEach($scope.records, function (item) {
            var index = _.findIndex(list, {
              id: item.account_id
            });
            if (index >= 0) {
              item.companyName = list[index].companyName;
            }
          });
        });
      } else {
        return $q.when();
      }
    }

    Companies
      .query()
      .$promise
      .then(function (data) {
        $scope.companies = data;
      })
      .catch(function (err) {
        if (err.status === 403) {
          // Fetch id
          var user = $scope.auth.getUser();
          $scope.companies = [{
            id: user.account_id
          }];
        }
      });

    $scope.domains = DomainsConfig.query();

    /**
     * Delete API key from system
     *
     * @param {Object} model
     */
    $scope.deleteKey = function (model) {
      if ($scope.isReadOnly() === true) {
        return;
      }
      $scope.confirm('confirmModal.html', model).then(function () {
        $scope
          .delete(model)
          .then(function (data) {
            $scope.alertService.success(data);
            $rootScope.$broadcast('update:searchData');
          })
          .catch($scope.alertService.danger);
      });
    };

    /**
     * Call API for create a new key in system
     *
     * @param {Object} account
     * @returns {Promise}
     */
    $scope.createKey = function (account) {
      if (!account || !account.id) {
        return;
      }
      $scope._loading = true;
      $scope.alertService.clear();
      return ApiKeys
        .create({
          account_id: account.id
        })
        .$promise
        .then(function (data) {
          $rootScope.$broadcast('update:searchData');
          $scope.alertService.success(data);
          $scope.list()
            .then(setAccountName);
          return data;
        })
        .catch($scope.alertService.danger)
        .finally(function () {
          $scope._loading = false;
        });
    };

    /**
     * Should open dialog for selecting company account
     */
    $scope.openCreateDialog = function () {
      $scope.alertService.clear();
      if ($scope.companies && $scope.companies.length === 1) {
        // select only one and create
        return $scope.createKey($scope.companies[0]);
      }
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'parts/keys/dialog/create.html',
        controller: 'KeysCreateController',
        size: 'md',
        resolve: {
          companies: function () {
            return $scope.companies;
          }
        }
      });

      /**
       * Handle ok button on create
       */
      modalInstance.result.then($scope.createKey);
    };

    /**
     * Function will remove all data that should not be sent to server
     *
     * @param {Object} data
     * @returns {Object}
     */
    function clearUpdateData(data) {
      var fields = ['key_name', 'account_id', 'read_only_status', 'active'];
      return _.pick(_.clone(data), fields);
    }

    /**
     * Toggle active state for given key
     *
     * @param {Object} key
     * @param {string} property
     * @returns {Promise}
     */
    $scope.toggleProperty = function (key, property) {
      if (!key || !key.id || key.loading) {
        return;
      }
      key[property] = !key[property];
      key.loading = true;
      return ApiKeys
        .update({
          id: key.id
        }, clearUpdateData(key))
        .$promise
        .then(function (data) {
          return data;
        })
        .catch($scope.alertService.danger)
        .finally(function () {
          key.loading = false;
        });
    };

    // Fetch list of users
    $scope.$on('$stateChangeSuccess', function (state, stateTo, stateParam) {
      angular.extend($scope.filter,{
        predicate: 'updated_at',
        reverse: true
      });
      var data = null;
      // NOTE: set filter params for specific state
      if ($state.is('index.accountSettings.accountresources')) {
        $scope.filter.limit = $config.MIN_LIMIT_RECORDS_IN_TABLE;
        var filters = {
          account_id: !User.getSelectedAccount() ? null : User.getSelectedAccount().acc_id
        };
        data = {
          filters: filters
        };
        $scope.list(data).then(setAccountName);
        return;
      }
      if ($state.is($scope.state)) {
        $scope.list(data)
          .then(setAccountName)
          .then(function () {
            // TODO: add archor into template
            if ($scope.elementIndexForAnchorScroll) {
              setTimeout(function () {
                $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
                $scope.$digest();
              }, 500);
            }
          });
      }
    });

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.switchKeyVisibility = function (item) {
      item.showKey = !item.showKey;
    };

    $scope.copyCallback = function (err) {
      if (err) {
        $scope.alertService.danger('Copying failed, please try manual approach', 2000);
      } else {
        $scope.alertService.success('The API key has been copied to the clipboard', 2000);
      }
    };
  }
})();
