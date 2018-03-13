(function () {
  'use strict';

  angular
    .module('revapm.Portal.Groups')
    .controller('GroupsCrudController', GroupsCrudController);

  /*@ngInject*/
  function GroupsCrudController($scope, $q, CRUDController, Users, $rootScope,
    User, $injector, $state, $stateParams, Companies,
    DomainsConfig, $anchorScroll, $config, Groups, Apps, DNSZones) {

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
          account_id: $scope.auth.isRevadmin() || $scope.auth.isReseller() ? '' : $scope.auth.getUser().companyId[0],
          comment: '',
          permissions: {
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
            cache_purge: true,
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
          }
        });
      }
    }

    $scope.clearForm = function () {
      $scope.clearModel();
      $scope.initNew(true); // send true to reinit the model
    };

    $scope.initNew = function (reinit) {
      initModel(reinit);
    };

    $scope.setGroup = function (id) {
      $scope.group_id = id;
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

      if ($state.is('index.accountSettings.groups.new') || $state.is('index.accountSettings.groups.edit')) {
        Apps.query().$promise.then(function (apps) {
          $scope.apps = apps;
        });

        DomainsConfig.query().$promise.then(function (domains) {
          $scope.domains = domains;
        });

        DNSZones.query().$promise.then(function (zones) {
          $scope.dnsZones = zones;
        });
      }

      $scope.list(data)
        .then(function (res) {
          // set our groups
          $scope.groups = res;

          // get companies and set the company names
          Companies.query().$promise.then(function (accs) {
            $scope.companies = accs;
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
                group.users = group.users || [];
                if (group.id === usr.group_id) {
                  group.users.push(usr.email);
                }
              });
            });
          });
        });
    });

    $scope.$on('$stateChangeSuccess', function (state) {
      if ($state.is('index.accountSettings.groups.edit')) {
        Groups.get({ id: $scope.group_id }).$promise.then(function (data) {
          $scope.model = data;
        });
      }
    });

    $scope.pushItemsById = function (list, pushList, collection) {
      $scope.model[pushList] = $scope.model[pushList] || [];
      $scope.model.permissions[list].list.forEach(function (val) {
        $scope[collection].forEach(function (fullVal) {
          if (fullVal.id === val) {

            $scope.model[pushList].push(fullVal);
          }
        });
      });
    };

    $scope.$watch('apps', function () {
      if ($scope.apps) {
        $scope.pushItemsById('mobile_apps', 'apps_list', 'apps');
      }
    });

    $scope.$watch('domains', function () {
      if ($scope.domains) {
        $scope.pushItemsById('domains', 'domains_list', 'domains');
        $scope.pushItemsById('web_analytics', 'web_analytics_list', 'domains');
        $scope.pushItemsById('security_analytics', 'security_analytics_list', 'domains');
      }
    });

    $scope.$watch('dnsZones', function () {
      if ($scope.dnsZones) {
        $scope.pushItemsById('dns_zones', 'dns_zones_list', 'dnsZones');
      }
    });

    $scope.$watch('companies', function () {
      if ($scope.companies) {
        $scope.pushItemsById('accounts', 'accounts_list', 'companies');
      }
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

    /**
     * @name  addItemToList
     * @description
     *
     * Add an item to a list of items (apps, domains, dns_zones...)
     *
     * @param  {[type]} item [description]
     * @return {[type]}       [description]
     */
    $scope.addItemToList = function (item, list) {
      if (item && list) {
        if (!$scope.model.permissions[list]) {
          $scope.model.permissions[list] = {
            access: true,
            list: [],
            allow_list: true
          };
        }

        if (!$scope.model.permissions[list].list || !$scope.model.permissions[list].list.length) {
          $scope.model.permissions[list].list = [];
        }

        if ($scope.model.permissions[list].list.indexOf(item.id) === -1) {
          $scope.model.permissions[list].list.push(item.id);
        }
      }
    };

    /**
     * @name  removeItemFromList
     * @description
     *
     * Remove an item from a list of items (apps, domains, dns_zones...)
     *
     * @param  {[type]} item [description]
     * @return {[type]}       [description]
     */
    $scope.removeItemFromList = function (item, list) {
      return $scope
        .model
        .permissions[list]
        .list
        .splice($scope.model.permissions[list].list.indexOf(item.id), 1);
    };

    $scope.createGroup = function (model) {
      if (!model) {
        return;
      }

      delete model.apps_list;
      delete model.domains_list;
      delete model.dns_zones_list;
      delete model.security_analytics_list;
      delete model.web_analytics_list;
      delete model.accounts_list;


      $scope.create(model)
        .then(function (data) {
          initModel(true);
          $scope.clearModel();
          $scope.alertService.success(data);
        })
        .catch($scope.alertService.danger);
    };

    $scope.updateGroup = function (model) {
      if (!model) {
        return;
      }

      delete model.apps_list;
      delete model.domains_list;
      delete model.dns_zones_list;
      delete model.security_analytics_list;
      delete model.web_analytics_list;
      delete model.accounts_list;

      $scope.update(model)
        .then(function (data) {
          initModel(true);
          $scope.clearModel();
          $scope.alertService.success(data);
          $state.go('^');
        })
        .catch($scope.alertService.danger);
    };

    $scope.getMobileAppName = function (id) {
      if (!$scope.apps) {
        return;
      }
      var appToReturn;
      $scope.apps.forEach(function (app) {
        if (app.id === id) {
          appToReturn = app;
        }
      });
      return appToReturn;
    };

    $scope.getDomain = function (id) {
      if (!$scope.domains) {
        return;
      }
      var domainToReturn;
      $scope.domains.forEach(function (domain) {
        if (domain.id === id) {
          domainToReturn = domain;
        }
      });
      return domainToReturn;
    };

    $scope.getDNSZone = function (id) {
      if (!$scope.dnsZones) {
        return;
      }
      var zoneToReturn;
      $scope.dnsZones.forEach(function (zone) {
        if (zone.id === id) {
          zoneToReturn = zone;
        }
      });
      return zoneToReturn;
    };

    $scope.getAccount = function (id) {
      if (!$scope.companies) {
        return;
      }
      var accR;
      $scope.companies.forEach(function (acc) {
        if (acc.id === id) {
          accR = acc;
        }
      });
      return accR;
    };

    $scope.toggleAllowList = function (list) {
      if (!$scope.model.permissions[list]) {
        $scope.model.permissions[list] = {
          access: true,
          list: [],
          allow_list: false
        };
      }

      if (!$scope.model.permissions[list].list || !$scope.model.permissions[list].list.length) {
        $scope.model.permissions[list].list = [];
      }

      $scope.model.permissions[list].allow_list = !$scope.model.permissions[list].allow_list;
      $scope.getAllowDenyStatus(list);
    };

    $scope.getAllowDenyStatus = function (list) {
      if ($scope.model.permissions[list]) {
        return $scope.model.permissions[list].allow_list ? 'Deny' : 'Allow';
      }
      return;
    };

    $scope.disableSubmit = function (model) {
      return !model.account_id ||
        model.account_id === '' ||
        !model.name ||
        model.name === '';
    };
  }
})();
