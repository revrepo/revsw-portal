(function() {
  'use strict';

  angular
    .module('revapm.Portal.Users')
    .controller('UsersCrudController', UsersCrudController);

  /*@ngInject*/
  function UsersCrudController($scope, $q, CRUDController, Users,
    User, $injector, $state, $stateParams, Companies,
    DomainsConfig, $anchorScroll, $config, Invitation) {

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

    $scope.roles = ['user', 'admin'];
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
          role: null
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
        .then(function(dataRefs) {
          $scope.companies = _.sortBy(dataRefs[0],'companyName');
          $scope.domains = _.sortBy(dataRefs[1], 'domain_name');
          updateListManageAccounts();
          return dataRefs;
        });
    }

    $scope.clearForm = function() {
      $scope.clearModel();
      $scope.initNew(true); // send true to reinit the model
    };

    $scope.initNew = function(reinit) {
      initModel(reinit);
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        dependencies().then(function(data) {
          $scope.setDefaultAccountId();
        });
      } else {
        $scope.setDefaultAccountId();
      }
    };

    /**
     * @name  applyValidationDomainNames
     * @description
     *
     * @return {Array}
     */
    function applyValidationDomainNames() {
      var domains = [];
      if (angular.isArray($scope.model.companyId)) {
        angular.forEach($scope.model.companyId, function(account_id) {
          angular.forEach(_.findByValues($scope.domains, 'account_id', account_id)
            .map(function(item) {
              return item.domain_name;
            }),
            function(item) {
              domains.push(item);
            });
        });
        angular.forEach($scope.model.managed_account_ids, function(account_id) {
          angular.forEach(_.findByValues($scope.domains, 'account_id', account_id)
            .map(function(item) {
              return item.domain_name;
            }),
            function(item) {
              domains.push(item);
            });
        });
      }

      if ($scope.domains.length !== 0) {
        $scope.model.domain = _.uniq(_.intersection(domains, $scope.model.domain));
        return _.uniq(_.intersection(domains, $scope.model.domain));
      }

      return $scope.model.domain;
    }
    /**
     * @name updateListManageAccounts
     *
     * @param {Object} options
     */
    function updateListManageAccounts(options) {
      var companyId;
      if (!!options && !!options.companyId) {
        companyId = options.companyId[0];
      }
      applyValidationDomainNames();
      if (!companyId || companyId.length <= 1) {
        return;
      }
      $scope.model.managed_account_ids = _.filter($scope.model.managed_account_ids, function(item) {
        return (item !== companyId);
      });

    }


    $scope.getUser = function(id) {
      $scope._loading = true;
      $scope.get(id)
        .then(dependencies)
        .then(function() {
          $scope.model.managed_account_ids = angular.copy($scope.model.companyId);
          $scope.model.managed_account_ids.shift();
          $scope.vm.managedAccountIds = _.filter($scope.companies, function(item) {
            return (($scope.model.companyId.indexOf(item.id) > -1) || ($scope.model.managed_account_ids.indexOf(item.id) > -1));
          });
          $scope.model.companyId.length = 1;
          $scope.resendDisabled = ((Date.parse($scope.model.invitation_sent_at) + $config.INVITATION_COOLDOWN_MS) < Date.now()) === false;
          return $scope.model;
        })
        .catch($scope.alertService.danger)
        .finally(function() {
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
    $scope.deleteUser = function(model) {
      if ($scope.isReadOnly() === true) {
        return;
      }
      model.id = model.user_id; // NOTE: extend model for CRUD Controller operation
      $scope.confirm('confirmModal.html', model)
        .then(function() {
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
    $scope.prepareUserDataForUpdate = function(model_current) {
      var model;
      if (model_current.toJSON === undefined) {
        model = _.clone(model_current, true);
      } else {
        model = _.clone(model_current.toJSON(), true);
      }
      if (model.role === 'reseller') {
        model.companyId = _.uniq(_(model.companyId).concat(model.managed_account_ids).value());
      }
      delete model.managed_account_ids;
      return model;
    };

    $scope.updateUser = function(model) {
      if (!model) {
        return;
      }
      // copy user id
      model.id = model.user_id;
      model = $scope.prepareUserDataForUpdate(model);
      $scope
        .update(model)
        .then(function(data) {
          // NOTE: update current user info
          if (model.user_id === User.getUser().user_id) {
            User.reloadUser();
          }
          $scope.alertService.success(data);
        })
        .catch($scope.alertService.danger);
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };
    /**
     * @name  createUser
     * @description
     *
     * @param  {Object} model [description]
     * @return
     */
    $scope.createUser = function(model, isStay) {
      if (!model) {
        return;
      }
      model.access_control_list.dashBoard = true;
      model.self_registered = false; // this is not a self registered user.
      var _model = $scope.prepareUserDataForUpdate(model);
      if (!_model.companyId || !angular.isArray(_model.companyId)) {
        _model.companyId = [model.account_id] || [$scope.model.account_id];
      }

      delete _model.account_id;
      $scope.create(_model, isStay)
        .then(function(data) {
          initModel(true);
          if (angular.isArray($scope.model.companyId)) {
            $scope.model.companyId.length = 0;
          }
          if (angular.isArray($scope.model.domain)) {
            $scope.model.domain.length = 0;
          }
          $scope.clearModel();
          initModel(true);
          $scope.alertService.success(data);
        })
        .catch($scope.alertService.danger);
    };

    $scope.disableSubmit = function(model, isEdit) {
      if ((User.isRevadmin() || User.isReseller()) && !model.companyId || (model.companyId && model.companyId.length === 0)) {
        return true;
      }

      if (isEdit) {
        return $scope._loading ||
          !model.email ||
          !model.access_control_list ||
          !model.firstname ||
          !model.lastname ||
          !model.role;
      } else {
        return $scope._loading ||
          !model.email ||
          !model.access_control_list ||
          !model.firstname ||
          !model.lastname ||
          !model.role;
      }
    };

    // Fetch list of users
    $scope.$on('$stateChangeSuccess', function(state) {
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
            _.forEach($scope.records, function(item) {
              if (item.companyId.length === 1) {
                var index = _.findIndex(list, {
                  id: item.companyId[0]
                });
                if (index >= 0) {
                  item.companyName = list[index].companyName;
                }
              } else {
                if (item.companyId.length > 1) {
                  item.companyName = '';
                  angular.forEach(item.companyId, function(account_id, key) {
                    var index = _.findIndex(list, {
                      id: account_id
                    });
                    if (index >= 0) {
                      if (key !== item.companyId.length && key !== 0) {
                        item.companyName = item.companyName + ', ';
                      }
                      item.companyName = item.companyName + list[index].companyName;
                    }
                  });
                }
              }
            });
            $q.when(list);
          } else {
            return $q.when();
          }
        })
        .then(function() {
          if ($scope.elementIndexForAnchorScroll && !$state.is('index.accountSettings.accountresources')) {
            setTimeout(function() {
              $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
              $scope.$digest();
            }, 500);
          }
        });
    });

    // NOTE: mixin lodash for find objects
    _.mixin({
      'findByValues': function(collection, property, values) {
        return _.filter(collection, function(item) {
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
    $scope.getAccountsDomainNameList = function() {
      var domains = [];
      var account_id = $scope.model.companyId || $scope.model.account_id;
      if (angular.isArray(account_id)) {
        angular.forEach(account_id, function(account_id) {
          angular.forEach(_.findByValues($scope.domains, 'account_id', account_id)
            .map(function(item) {
              return item;
            }),
            function(item) {
              domains.push(item);
            });
        });
        angular.forEach($scope.model.managed_account_ids, function(account_id) {
          angular.forEach(_.findByValues($scope.domains, 'account_id', account_id)
            .map(function(item) {
              return item;
            }),
            function(item) {
              domains.push(item);
            });
        });
      }
      $scope.domainPlaceholder = (domains.length > 0) ? 'Select domains...' : 'Domains list is empty...';
      return _.sortBy(_.uniq(domains), 'domain_name');
    };

    $scope.getCompaniesManageList = function() {
      var companies = [];
      var account_id = $scope.model.companyId || $scope.model.account_id;
      return _.sortBy(_.filter($scope.companies, function(item) {
        if(!!account_id && account_id.indexOf(item.id) > -1) {
          return false;
        }
        if (!!$scope.model.managed_account_ids && $scope.model.managed_account_ids.indexOf(item.id) > -1) {
          return false;
        }
        return true;
      }),'companyName');
    };

    $scope.storeToStorage = function(model) {
      $localStorage.selectedUser = model;
    };

    // NOTE: watch on change companyId for update available domain names
    $scope.$watch('model.companyId', function(newVal, oldVal) {
      if (newVal !== undefined && oldVal !== undefined) {
        applyValidationDomainNames(); // NOTE: clean selected domain
        updateListManageAccounts({
          companyId: newVal
        });
      }
    }, true);

    $scope.$watch('vm.managedAccountIds', function(newVal, oldVal) {
      if (newVal !== undefined && oldVal !== undefined && newVal !== oldVal) {
        applyValidationDomainNames(); // NOTE: clean selected domain
        $scope.model.managed_account_ids = _.map($scope.vm.managedAccountIds, function(item) {
          return item.id;
        });
      }
    });

    $scope.$watch('model.role', function(newVal, oldVal) {
      if (newVal !== undefined && oldVal !== undefined) {
        if (((newVal === 'reseller' && oldVal !== '') || oldVal === 'reseller') && angular.isArray($scope.model.companyId)) {
          $scope.model.companyId.length = 0;
          $scope.model.managed_account_ids.length = 0;
          $scope.vm.managedAccountIds.length = 0;
        }
      }
    });

    $scope.onOneAccountSelect = function(model) {
      if (angular.isArray($scope.model.companyId)) {
        $scope.model.companyId.length = 1;
      } else {
        $scope.model.companyId = [];
      }
      $scope.model.companyId[0] = model;
    };

    $scope.userInvitationDone = function (model) {
      return model.invitation_token === null;
    };    

    $scope.resendInvite = function (model, el) {
      $scope._loading = true;
      $scope.resendDisabled = true;
      Invitation.resendInvitation({id: model.user_id}).$promise.then(function (res) {
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

  }
})();
