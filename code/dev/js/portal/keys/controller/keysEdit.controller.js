(function() {
  'use strict';

  angular
    .module('revapm.Portal.Keys')
    .controller('KeysEditController', KeysEditController);

  // @ngInject
  function KeysEditController($scope, $rootScope, $injector, $stateParams, $location, CRUDController, ApiKeys, Companies, $config, DomainsConfig, Groups) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;

    Companies
      .query()
      .$promise
      .then(function(data) {
        $scope.companies = data;
      })
      .catch(function(err) {
        if (err.status === 403) {
          // Fetch id
          var user = $scope.auth.getUser();
          $scope.companies = [{
            id: user.companyId[0]
          }];
        }
      });

    DomainsConfig.query()
      .$promise
      .then(function(data) {
        $scope.domains = data;
      })
      .catch(function(err) {
        $scope.domains = [];
      });


    /**
     * Loading flag
     *
     * @type {boolean}
     * @private
     */
    $scope._loading = false;

    /**
     * Selected account id
     *
     * @type {null|string}
     */
    $scope.selected = null;

    /**
     * Current key object
     *
     * @type {null}
     */
    $scope.key = null;

    /**
     * List of domains related to selected account
     *
     * @type {Array}
     */
    $scope.selectedDomains = [];

    /**
     * Select domains that relates to key's account
     *
     * @param {string} accountId
     */
    $scope.selectDomains = function(accountId) {
      $scope.selectedDomains = [];
      if (!accountId) {
        return;
      }
      angular.forEach($scope.domains, function(domain) {
        if (domain.account_id === accountId) {
          $scope.selectedDomains.push(domain);
        }
      });
    };

    /**
     * Load key details
     *
     * @param {string|number} id
     */
    $scope.loadKeyDetails = function(id) {
      if (!id) {
        return;
      }
      $scope._loading = true;
      $scope.key = null;
      ApiKeys
        .get({
          id: id
        })
        .$promise
        .then(function(key) {
          $scope.key = key;
          $scope.model = _.clone(key, true);
          if (!$scope.model.permissions) {
            $scope.model.permissions = {
              read_only: false,
              enforce_2fa: false,
              portal_login: true,
              API_access: true,
              dashboards: true,
              mobile_apps: {
                access: true,
                list: [],
                allow_list: true
              },
              domains: {
                access: true,
                list: [],
                allow_list: true
              },
              ssl_names: true,
              ssl_certs: true,
              waf_rules: true,
              cache_purge: {
                access: true,
                list: [],
                allow_list: true
              },
              web_analytics: {
                access: true,
                list: [],
                allow_list: true
              },
              security_analytics: {
                access: true,
                list: [],
                allow_list: true
              },
              dns_zones: {
                access: true,
                list: [],
                allow_list: true
              },
              dns_analytics: true,
              groups: true,
              users: true,
              API_keys: true,
              logshipping_jobs: true,
              activity_log: true,
              accounts: {
                access: true,
                list: [],
                allow_list: true
              },
              traffic_alerts: true,
              notification_lists: true,
              usage_reports: true,
              billing_statements: true,
              billing_plan: true
            };
          }
          if ($scope.key.group_id) {
            Groups.get({id: $scope.key.group_id}).$promise.then(function (group) {
              $scope.readOnly = true;
              $scope.groupPermissions = group.permissions;
            });
          }
        })
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };

    /**
     * On selected account
     *
     * @param {Object} model
     */
    $scope.onModelSelect = function(model) {
      $scope.selected = model;
    };

    /**
     * Function will remove all data that should not be sent to server
     *
     * @param {Object} data
     * @returns {Object}
     */
    function clearUpdateData(data) {
      var fields = ['key_name', 'account_id', 'domains', 'allowed_ops', 'read_only_status', 'active','managed_account_ids','permissions','group_id'];
      return _.pick(_.clone(data), fields);
    }

    /**
     * Click on update button
     */
    $scope.update = function() {
      if (!$scope.key || !$scope.key.id) {
        return;
      }
      $scope._loading = true;
      $scope.key.permissions = $scope.model.permissions;
      $scope.key.group_id = $scope.model.group;
      $scope.key.group_id = $scope.key.group_id === 'null' ? null : $scope.key.group_id;
      if ($scope.readOnly) {
        delete $scope.key.permissions;
      }
      ApiKeys
        .update({
          id: $scope.key.id
        }, clearUpdateData($scope.key))
        .$promise
        .then(function(data) {
          $rootScope.$broadcast('update:searchData');
          $scope.alertService.success(data);
          $scope.$parent.list();
        })
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };


    $scope.goToList = function() {
      $location.path('/keys');
    };

    $scope.$watch('key.account_id', function(account_id) {
      $scope.selectDomains(account_id);
    });

    $scope.switchKeyVisibility = function(item) {
      item.showKey = !item.showKey;
    };

    $scope.copyCallback = function(err) {
      if (err) {
        $scope.alertService.danger('Copying failed, please try manual.', 2000);
      } else {
        $scope.alertService.success('The API key has been copied to the clipboard.', 2000);
      }
    };

    $scope.setGroups = function () {
      // Fetch and set groups
      Groups.query().$promise.then(function (data) {
        $scope.groups = data || [];
        // select the current group
        if ($scope.key) {
          $scope.model.group = $scope.key.group_id || 'null';
        }
      });
    };
  }
})();
