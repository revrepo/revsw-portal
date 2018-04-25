(function () {
  'use strict';

  angular
    .module('revapm.Portal.Users')
    .controller('UsersCrudController', UsersCrudController);

  /*@ngInject*/
  function UsersCrudController($scope, $q, CRUDController, Users,
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
    if ($state.current.name === 'index.accountSettings.users.new') {
      dependencies();
    }
    //Set state (ui.router)
    $scope.setState('index.accountSettings.users');
    $scope.setResource(Users);

    $scope.USER_FIRST_NAME = $config.PATTERNS.USER_FIRST_NAME;
    $scope.USER_LAST_NAME = $config.PATTERNS.USER_LAST_NAME;
    $scope.STREET_ADDRESS = $config.PATTERNS.STREET_ADDRESS;
    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;
    $scope.resendDisabled = true;

    $scope.roles = ['admin'];
    // Adding additional user roles for RevAdmin
    if ($scope.auth.isRevadmin() || $scope.auth.isReseller()) {
      $scope.roles.push('reseller');
    }

    // $scope.filterKeys = ['firstname', 'lastname', 'email', 'role', 'updated_at', 'last_login_at'];

    $scope.companies = [];
    $scope.vm = {
      managedAccountIds: []
    };
    $scope.domains = [];
    $scope.groups = [];
    $scope.fullGroupList = [];

    if (!$scope.model) {
      initModel();
    }

    function initModel(reinit) {
      if (!$scope.model || reinit) {
        $scope.model = {};
        angular.merge($scope.model, {
          managed_account_ids: [],
          theme: 'light',
          access_control_list: {
            dashBoard: true,
            reports: false,
            configure: false,
            test: false,
            readOnly: false
          },
          email: '',
          firstname: '',
          lastname: '',
          role: null,
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

    /**
     * @name  dependencies
     * @description
     *  Release controller data dependencies
     * @return {Promise}
     */
    function dependencies() {
      return $q.all([
        Companies.query().$promise,
        DomainsConfig.query().$promise
      ])
        .then(function (dataRefs) {
          $scope.companies = _.sortBy(dataRefs[0], 'companyName');
          $scope.domains = _.sortBy(dataRefs[1], 'domain_name');
          return dataRefs;
        });
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

    $scope.getUser = function (id) {
      $scope._loading = true;
      $scope.get(id)
        .then(dependencies)
        .then(function () {
          $scope.resendDisabled = ((Date.parse($scope.model.invitation_sent_at) + $config.INVITATION_COOLDOWN_MS) < Date.now()) === false;

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
            };
          }          
          return $scope.model;
        })
        .catch($scope.alertService.danger)
        .finally(function () {
          $scope._loading = false;
        });
    };
    /**
     * @name  deleteUser
     * @description
     *
     *   Delete user after confirm
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.deleteUser = function (model) {
      if ($scope.isReadOnly() === true) {
        return;
      }
      model.id = model.user_id; // NOTE: extend model for CRUD Controller operation
      $scope.confirm('confirmModal.html', model)
        .then(function () {
          $scope
            .delete(model)
            .then($scope.alertService.success)
            .catch($scope.alertService.danger);
        });
    };
    /**
     * @name prepareUserDataForUpdate
     * @param {Object}
     */
    $scope.prepareUserDataForUpdate = function (model_current) {
      var model;
      if (model_current.toJSON === undefined) {
        model = _.clone(model_current, true);
      } else {
        model = _.clone(model_current.toJSON(), true);
      }

      if (User.isAdmin()) {
        model.role = 'admin';
        model.account_id = User.getUser().account_id;
      }

      delete model.managed_account_ids;

      delete model.apps_list;
      delete model.domains_list;
      delete model.dns_zones_list;
      delete model.security_analytics_list;
      delete model.web_analytics_list;
      delete model.accounts_list;
      delete model.cache_purge_list;
      delete model.dns_analytics_list;
      delete model.apps_analytics_list;

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
        if (model.permissions[list].list && ((model.permissions[list].list.length > 0) === false)) {
          delete model.permissions[list].list;
        }
      });

      $scope.modalFlag = model.permissions.read_only;
      $scope.denyUsersFlag = !model.permissions.users;
      $scope.denyLoginFlag = !model.permissions.portal_login;
      if ($scope.readOnly) {
        delete model.permissions;
      }
      
      if (model.group_id === 'null') {
        model.group_id = null;
      }

      return model;
    };

    $scope.updateUser = function (model) {
      if (!model) {
        return;
      }
      // copy user id
      model.id = model.user_id;
      model.group_id = model.group;
      model = $scope.prepareUserDataForUpdate(model);
      if ($scope.modalFlag && model.user_id === $scope.auth.getUser().user_id) {
        // user is setting himself for readonly mode
        $scope.confirm('confirmReadOnlyModal.html', model).then(function () {
          $scope
            .update(model)
            .then(function (data) {
              // NOTE: update current user info
              if (model.user_id === User.getUser().user_id) {
                User.reloadUser();
              }
              $scope.setGroup();
              $scope.alertService.success(data);
            })
            .catch($scope.alertService.danger);
        });
      } else {
        if ($scope.denyUsersFlag && model.user_id === $scope.auth.getUser().user_id) {
          // user is setting himself for deny users mode
          $scope.confirm('confirmUserDenyAccessModal.html', model).then(function () {
            $scope
              .update(model)
              .then(function (data) {
                // NOTE: update current user info
                if (model.user_id === User.getUser().user_id) {
                  User.reloadUser();
                }
                $scope.setGroup();
                $scope.alertService.success(data);
              })
              .catch($scope.alertService.danger);
          });
        } else if ($scope.denyLoginFlag && model.user_id === $scope.auth.getUser().user_id) {
          // user is setting himself for deny login mode
          $scope.confirm('confirmUserDenyLoginModal.html', model).then(function () {
            $scope
              .update(model)
              .then(function (data) {
                // NOTE: update current user info
                if (model.user_id === User.getUser().user_id) {
                  User.reloadUser();
                }
                $scope.setGroup();
                $scope.alertService.success(data);
              })
              .catch($scope.alertService.danger);
          });
        } else {
          $scope
          .update(model)
          .then(function (data) {
            // NOTE: update current user info
            if (model.user_id === User.getUser().user_id) {
              User.reloadUser();
            }
            $scope.setGroup();
            $scope.alertService.success(data);
          })
          .catch($scope.alertService.danger);
        }       
      }
    };

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };
    /**
     * @name  createUser
     * @description
     *
     * @param  {Object} model [description]
     * @return
     */
    $scope.createUser = function (model, isStay) {
      if (!model) {
        return;
      }
      model.access_control_list.dashBoard = true;
      model.self_registered = false; // this is not a self registered user.
      var _model = $scope.prepareUserDataForUpdate(model);
      if (_model.group && _model.group !== 'null') {
        _model.group_id = _model.group;
      }
      delete _model.group;
      $scope.create(_model, isStay)
        .then(function (data) {
          initModel(true);
          if (angular.isArray($scope.model.domain)) {
            $scope.model.domain.length = 0;
          }
          $scope.clearModel();
          initModel(true);
          $scope.alertService.success(data);
        })
        .catch($scope.alertService.danger);
    };

    $scope.disableSubmit = function (model, isEdit) {
      if ((User.isRevadmin() || User.isReseller()) && !model.account_id) {
        return true;
      }

      if (User.isRevadmin() || User.isReseller()) {
        return $scope._loading ||
          !model.email ||
          !model.firstname ||
          !model.lastname ||
          !model.role;
      }

      if (isEdit) {
        return $scope._loading ||
          !model.email ||
          !model.firstname ||
          !model.lastname;
      } else {
        return $scope._loading ||
          !model.email ||
          !model.firstname ||
          !model.lastname;
      }
    };

    // Fetch list of users
    $scope.$on('$stateChangeSuccess', function (state) {
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
      $scope
        .list(data)
        .then(dependencies)
        .then(function setCompaniesName() {
          if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
            // NOTE: set companies(account) name (must be aplay method "dependencies" first)
            var list = $scope.companies;
            _.forEach($scope.records, function (item) {
              var company = _.filter(list, function (listItem) {
                return listItem.id === item.account_id;
              });
              
              item.companyName = company[0] ? company[0].companyName : company.companyName;
            });
            $q.when(list);
          } else {
            return $q.when();
          }
        })
        .then(function () {
          if ($scope.elementIndexForAnchorScroll && !$state.is('index.accountSettings.accountresources')) {
            setTimeout(function () {
              $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
              $scope.$digest();
            }, 500);
          }
        });
    });

    // NOTE: mixin lodash for find objects
    _.mixin({
      'findByValues': function (collection, property, values) {
        return _.filter(collection, function (item) {
          return _.contains(values, item[property]);
        });
      }
    });
    /**
     * @name  getAccountsDomainNameList
     * @description method get array of domains
     *
     * @param  {[type]} account_id [description]
     * @return {Array}            [description]
     */
    $scope.getAccountsDomainNameList = function () {
      var domains = [];
      var account_id = $scope.model.account_id;
      if (angular.isArray(account_id)) {
        angular.forEach(account_id, function (account_id) {
          angular.forEach(_.findByValues($scope.domains, 'account_id', account_id)
            .map(function (item) {
              return item;
            }),
            function (item) {
              domains.push(item);
            });
        });
        angular.forEach($scope.model.managed_account_ids, function (account_id) {
          angular.forEach(_.findByValues($scope.domains, 'account_id', account_id)
            .map(function (item) {
              return item;
            }),
            function (item) {
              domains.push(item);
            });
        });
      }
      $scope.domainPlaceholder = (domains.length > 0) ? 'Select domains...' : 'Domains list is empty...';
      return _.sortBy(_.uniq(domains), 'domain_name');
    };

    $scope.getCompaniesManageList = function () {
      var companies = [];
      var account_id = $scope.model.account_id;
      return _.sortBy(_.filter($scope.companies, function (item) {
        if (!!account_id && account_id.indexOf(item.id) > -1) {
          return false;
        }
        if (!!$scope.model.managed_account_ids && $scope.model.managed_account_ids.indexOf(item.id) > -1) {
          return false;
        }
        return true;
      }), 'companyName');
    };

    $scope.storeToStorage = function (model) {
      $localStorage.selectedUser = model;
    };

    $scope.$watch('vm.managedAccountIds', function (newVal, oldVal) {
      if (newVal !== undefined && oldVal !== undefined && newVal !== oldVal) {
        $scope.model.managed_account_ids = _.map($scope.vm.managedAccountIds, function (item) {
          return item.id;
        });
      }
    });

    $scope.onOneAccountSelect = function (model) {
      $scope.model.account_id = model;
      $scope.model.group = 'null';
    };

    $scope.userInvitationDone = function (model) {
      return model.invitation_token === null;
    };

    $scope.resendInvite = function (model, el) {
      $scope._loading = true;
      $scope.resendDisabled = true;
      Invitation.resendInvitation({ id: model.user_id }).$promise.then(function (res) {
        $scope._loading = false;
        if (res.statusCode === 200) {
          $scope.alertService.success('Successfully resent the invitation token');
        } else {
          $scope.resendDisabled = false;
        }
      })
        .catch(function (err) {
          $scope.resendDisabled = false;
          $scope._loading = false;
          $scope.alertService.danger(err);
        });
    };

    $scope.setGroups = function () {
      // Fetch and set groups
      var filter = {
        operation: 'user_management'
      };
      Groups.query({filters: JSON.stringify(filter)}).$promise.then(function (data) {
        $scope.groups = data || [];
        $scope.fullGroupList = data || [];
        // select the current group
        $scope.model.group = $scope.model.group_id || 'null';
        if ($scope.model.account_id) {
          $scope.groups = _.filter($scope.fullGroupList, function (group) {
            return group.account_id === $scope.model.account_id;
          });
        }
        $scope.setGroup();
      });
    };

    /*
    * Sets a group by ID and refreshes permissions / readonly mode for permissions (when inherited from group)
    */
    $scope.setGroup = function () {
      var filterQuery = {
          operation: 'user_management'
      };
      if ($scope.model.group_id && $scope.model.group_id !== 'null') {
        Groups.getByUserManagement({ id: $scope.model.group_id , filters: JSON.stringify(filterQuery)}).$promise.then(function (group) {
          if (group) {
            $scope.groupPermissions = group.permissions;
            $scope.readOnly = true;
          }
        });
      } else if ($scope.model.user_id) {
        $scope.getEditUser($scope.model.user_id).then(function (data) {
          $scope.model.permissions = data.permissions;
          delete $scope.groupPermissions;
          $scope.readOnly = false;
        });
      }
    };

    $scope.getEditUser = function (id) {      
      return Users.get({ id: id }).$promise.then(function (data) {
        return data;
      });
    };

    $scope.setPermissions = function (group_id) {
      var filterQuery = {
        operation: 'user_management'
      };
      if (group_id && group_id !== 'null') {
        $scope.groups.forEach(function (group) {
          if (group.id === group_id) {
            Groups.getByUserManagement({id: group_id, filters: JSON.stringify(filterQuery)}).$promise.then(function (fullGroup) {
                $scope.groupPermissions = fullGroup.permissions;
                $scope.readOnly = true;
            });
          }
        });
      } else if ($scope.model.user_id) {
        $scope.getEditUser($scope.model.user_id).then(function (data) {
          $scope.model.permissions = data.permissions;
          delete $scope.groupPermissions;
          $scope.readOnly = false;
        });
      }
    };

    $scope.showAccountField = function (model) {
      if (!model) {
        return;
      }
      if (model.role === 'reseller' && User.getUser().role === 'reseller') {
        $scope.model.account_id = User.getUser().account_id;
        return false;        
      } else if (model.role === 'admin' && User.getUser().role === 'reseller'){
        return true;
      } else if (User.getUser().role === 'revadmin') {
        return true;
      }
    };

    $scope.$watch('model.account_id', function () {
      $scope.groups = _.filter($scope.fullGroupList, function (group) {
        return group.account_id === $scope.model.account_id;
      });
    });

    $scope.$watch('model.group', function (newVal, oldVal) {
      if (newVal === undefined) {
        $scope.model.group = 'null';
      }
      if (newVal === 'null') {
        $scope.setPermissions('null');
      }
    });
  }
})();
