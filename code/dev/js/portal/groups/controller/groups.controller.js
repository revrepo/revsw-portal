(function () {
  'use strict';

  angular
    .module('revapm.Portal.Groups')
    .controller('GroupsCrudController', GroupsCrudController);

  /*@ngInject*/
  function GroupsCrudController($scope, $q, CRUDController, Users, $rootScope,
    User, $injector, $state, $stateParams, Companies,
    DomainsConfig, $anchorScroll, $config, Groups, Apps, DNSZones, ApiKeys) {

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
          account_id: $scope.auth.isRevadmin() || $scope.auth.isReseller() ? '' : $scope.auth.getUser().account_id,
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
            mobile_analytics: {
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
            dns_analytics: {
              access: true,
              list: [],
              allow_list: true
            },
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
            billing_plan: true,
            account_profile: true
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
      Groups.get({ id: id }).$promise.then(function (data) {               
        $scope.model = data;
      });

      Groups.users({ id: id }).$promise.then(function (data) {
        $scope.users = data;
      });
    };

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };

    // Init everyting on `viewContentLoading` event because it starts slightly before the DOM renders.
    $rootScope.$on('$viewContentLoading', function (state) {      
      angular.extend($scope.filter,{
        predicate: 'updated_at',
        reverse: true
      });
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
            $scope.companies = accs;
            $scope.groups.forEach(function (group) {
              accs.forEach(function (account) {
                if (group.account_id === account.id) {
                  group.accountName = account.companyName;
                }
              });
            });
          });
          $scope.groups.forEach(function (group) {
            Groups.users({id: group.id}).$promise.then(function (users) {
              group.users = users;
            });
          });
        });
    });

    $scope.$on('$stateChangeSuccess', function () {
      if ($state.is('index.accountSettings.accountresources')) {
        $scope.filter.limit = $config.MIN_LIMIT_RECORDS_IN_TABLE;
        var data = {
          filters: {
            account_id: !User.getSelectedAccount() ? null : User.getSelectedAccount().acc_id
          }
        };
        $scope.list(data)
          .then(function (res) {
            $scope.records = res;        
            $scope.records.forEach(function (group) {
              Groups.users({id: group.id}).$promise.then(function (users) {
                group.users = users;
              });
            });
            Companies.query().$promise.then(function (accs) {
              $scope.companies = accs;
              $scope.records.forEach(function (group) {
                accs.forEach(function (account) {
                  if (group.account_id === account.id) {
                    group.accountName = account.companyName;
                  }
                });
              });
            });
          });
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

    $scope.createGroup = function (model) {
      if (!model) {
        return;
      }
      var _model = $scope.prepModel(model);
      $scope.create(_model)
        .then(function (data) {
          initModel(true);
          $scope.clearModel();
          $scope.alertService.success(data);
        })
        .catch(function (err) {
          $scope.alertService.danger(err);          
        });
    };

    $scope.updateGroup = function (model) {
      if (!model) {
        return;
      }

      var _model = $scope.prepModel(model);

      $scope.update(_model)
        .then(function (data) {
          $scope.alertService.success(data);
          User.reloadUser();
        })
        .catch(function (err) {
          $scope.alertService.danger(err);
        });
    };

    $scope.disableSubmit = function (model) {
      return !model.account_id ||
        model.account_id === '' ||
        !model.name ||
        model.name === '';
    };

    $scope.prepModel = function (model) {
      var _model = _.clone(model, true);
      delete _model.apps_list;
      delete _model.domains_list;
      delete _model.dns_zones_list;
      delete _model.security_analytics_list;
      delete _model.web_analytics_list;
      delete _model.accounts_list;
      delete _model.cache_purge_list;
      delete _model.dns_analytics_list;
      delete _model.apps_analytics_list;

      var modelLists = [
        'mobile_apps',
        'domains',
        'web_analytics',
        'security_analytics',
        'dns_zones',
        'accounts',
        'cache_purge',
        'dns_analytics',
        'mobile_analytics'
      ];

      modelLists.forEach(function (list) {
        if (_model.permissions[list].list && ((_model.permissions[list].list.length > 0) === false)) {
          delete _model.permissions[list].list;
        }
      });

      return _model;
    };

    $scope.getUsers = function () {
      if ($scope.users && $scope.users.count > 0) {
        var returnString = '';
        $scope.users.users.forEach(function (user) {
          returnString += user.email || user.key_name;
          if ($scope.users.users.indexOf(user) !== $scope.users.users.length - 1) {
            returnString += ', ';
          }
        });

        return returnString.toString();
      } else {
        return 'None';
      }
    };
  }
})();
