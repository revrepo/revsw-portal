(function() {
  'use strict';

  angular
    .module('revapm.Portal.LogShippers')
    .controller('LogShippersCrudController', LogShippersCrudController);

  /*@ngInject*/
  function LogShippersCrudController($scope, $timeout,
    $localStorage,
    CRUDController,
    LogShippingJobs,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll,
    DomainsConfig,
    Apps,
    User) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;

    /**
     * @name  sourceTypes
     * @description
     *
     * @type {Array}
     */
    $scope.sourceTypes = $config.LOGSHIPPERS_SOURCE_TYPES;

    /**
     * @name  destinationTypes
     * @description
     *
     * @type {Array}
     */
    $scope.destinationTypes = $config.LOGSHIPPERS_DESTINATIONA_TYPES;

    /**
     * @name  operationalMode
     * @description]
     *
     * @type {Array}
     */
    $scope.operationalMode = {
      'active': 'Active',
      'pause_with_log_piling': 'Pause With Log Piling',
      'stop': 'Stop'
    };

    $scope.operationalModeType = $config.LOGSHIPPERS_OPERATIONAL_MODES;

    // TODO: Check the text in description of status
    $scope.operationalStates = {
      'active': 'Active',
      'pause': 'Pause Log Shipping And Hold Log Files',
      'stop': 'Stop'
    };

    /**
     * @name  generalJobStatusies
     * @description
     *
     * @type {Array}
     */
    $scope.generalJobStatusies = $config.LOGSHIPPERS_GENERAL_JOB_STATUSIES;

    //Set state (ui.router)
    $scope.setState('index.accountSettings.logshippers');

    $scope.setResource(LogShippingJobs);

    /**
     * @name setAccountName
     * @description
     *
     */
    function setAccountName() {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        return Companies.query(function(list) {
          _.forEach($scope.records, function(item) {
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
    /**
     * @name setMappingInformation
     * @description
     *
     */
    function setMappingInformation() {
      $scope._loading = true;
      // TODO: finish the mapping
      return $q.all([Apps.query().$promise, DomainsConfig.query().$promise])
        .then(function(res) {
          angular.forEach($scope.records, function(item) {
            // map Source Name
            item.sourceTypeName = $scope.sourceTypes[item.source_type];
            item.operationalModeName = $scope.operationalModeType[item.operational_mode];
            if (item.source_type === 'app') {
              var _app = _.find(res[0], {
                id: item.source_id
              }) || {};
              item.sourceName = _app.app_name || '';
            }
            if (item.source_type === 'domain') {
              var _domain = _.find(res[1], {
                id: item.source_id
              }) || {};
              item.sourceName = _domain.domain_name || '';
            }
          });
        })
        .finally(function() {
          $scope._loading = false;
        });
    }
    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function(state) {
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
        $scope.list(data)
          .then(setAccountName)
          .then(setMappingInformation);
        return;
      }
      if ($state.is($scope.state)) {
        $scope.list(data)
          .then(setAccountName)
          .then(setMappingInformation)
          .then(function() {
            if ($scope.elementIndexForAnchorScroll) {
              setTimeout(function() {
                $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
                $scope.$digest();
              }, 500);
            }
          });
      }
    });

    // $scope.filterKeys = ['cert_name', 'companyName', 'expires_at', 'domains', 'updated_at'];

    $scope.locations = [];
    $scope.companies = [];
    $scope.model = {};

    $scope.fetchCompanies = function(companyIds) {
      var promises = [];
      companyIds.forEach(function(id) {
        promises.push(Companies.get({
          id: id
        }).$promise);
      });
      $q.all(promises).then(function(data) {
        $scope.companies = data;
      });
    };
    /**
     * @name prepareJobToUpdate
     * @description
     *
     * @param  {Object} model_current
     * @return
     */
    $scope.prepareJobToUpdate = function(model_current, isStateChange) {
      var model;
      if (model_current.toJSON === undefined) {
        model = _.clone(model_current, true);
      } else {
        model = _.clone(model_current.toJSON(), true);
      }
      delete model.id;
      delete model.created_by;
      delete model.updated_by;
      delete model.created_at;
      delete model.updated_at;
      if (!isStateChange) {
        if (model.source_type === 'app') {
          if (_.findIndex($scope.appsList, {
              id: $scope.selectedAppSourceId,
              account_id: model.account_id
            }) < 0) {
            model.source_id = '';
          } else {
            model.source_id = $scope.selectedAppSourceId;
          }
        }
        if (model.source_type === 'domain') {
          if (_.findIndex($scope.domainsList, {
              id: $scope.selectedDomainSourceId,
              account_id: model.account_id
            }) < 0) {
            model.source_id = '';
          } else {
            model.source_id = $scope.selectedDomainSourceId;
          }
        }
      } else {
        delete model.companyName;
        delete model.sourceTypeName;
        delete model.operationalModeName;
        delete model.sourceName;
      }
      return model;
    };

    $scope.setAccountId = function() {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        Companies.query(function(list) {
          $scope.companies = list;
          if ($scope.companies.length === 1) {
            $scope.model.account_id = $scope.companies[0].id;
          }
        });
      } else {
        $scope.model.account_id = $scope.auth.getUser().account_id;
      }
    };

    $scope.setAccountId();

    $scope.getJob = function(id) {
      $scope.get(id)
        .then(function findAllSources() {
          return $q.all([Apps.query().$promise, DomainsConfig.query().$promise])
            .then(function(res) {
              $scope.appsList = res[0];
              $scope.domainsList = res[1];
              if ($scope.model.source_id !== '') {
                if ($scope.model.source_type === 'app') {
                  $scope.selectedAppSourceId = $scope.model.source_id;
                }
                if ($scope.model.source_type === 'domain') {
                  $scope.selectedDomainSourceId = $scope.model.source_id;
                }
              } else {
                // TODO: set default first App of current Account ID
                // TODO: set default first Domain  of current Domain ID
              }
            });
        })
        .catch($scope.alertService.danger);
    };
    /**
     * @name  deleteJob
     * @description
     *
     * @param  {Object} model
     * @return
     */
    $scope.deleteJob = function(model) {
      if ($scope.isReadOnly() === true) {
        return;
      }
      $scope.confirm('confirmModal.html', model).then(function() {
        var jobName = model.job_name;
        $scope
          .delete(model)
          .then(function(data) {
            $scope.alertService.success(data);
            $scope.list()
              .then(setAccountName)
              .then(setMappingInformation);
          })
          .catch($scope.alertService.danger);
      });
    };
    /**
     * @name  createLogShippingJob
     * @description
     *
     * Create new Job
     *
     * @param  {Object} model
     * @return
     */
    $scope.createLogShippingJob = function(model) {

      $scope
        .create(model)
        .then(function(data) {
          $scope.alertService.success(data);
          $scope.setAccountId();
        })
        .catch($scope.alertService.danger);
    };

    /**
     * @name  updateJob
     * @description
     *
     * @param  {Object} model
     * @return
     */
    $scope.updateJob = function(model) {

      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', model).then(function() {
        model = $scope.prepareJobToUpdate(model);
        $scope.update({
            id: modelId
          }, model)
          .then($scope.alertService.success)
          .catch($scope.alertService.danger);
      });
    };

    $scope.storeToStorage = function(model) {
      $localStorage.selectedDomain = model;
    };

    $scope.clearForm = function () {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        $scope.clearModel();
      } else {
        $scope.model.job_name = null;
      }
    };

    $scope.disableSubmit = function(model, isEdit) {
      if (!isEdit) {
        if($scope.auth.isReseller() || $scope.auth.isRevadmin()){
          return $scope._loading ||
          !model.job_name ||
          !model.account_id;
        } else {
          return $scope._loading ||
          !model.job_name;
        }
      } else {
        return $scope._loading ||
          !model.job_name ||
          !model.account_id ||
          !model.operational_mode ||
          !model.source_type ||
          (!model.source_id && !$scope.selectedAppSourceId && !$scope.selectedDomainSourceId) ||
          !model.destination_type;
      }
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.onDomainSelect = function(id) {
      // TODO: check on using
      $scope.selectedDomainSourceId = id;
    };

    $scope.onAppSelect = function(id) {
      // TODO: check on using
      $scope.selectedAppSourceId = id;
    };
    /**
     * @name  onAccountSelect
     * @description
     *
     *  Event changing value account_id
     *
     *
     * @param  {Object} account [description]
     * @return {[type]}         [description]
     */
    $scope.onAccountSelect = function(accountId) {
      var index_app = -1;
      var index_domain = -1;

      if ((index_app = _.findIndex($scope.appsList, {
          account_id: accountId
        })) < 0) {
        $scope.selectedAppSourceId = '';
      } else {
        $scope.selectedAppSourceId = $scope.appsList[index_app].id;
      }

      if ((index_domain = _.findIndex($scope.domainsList, {
          account_id: accountId
        })) < 0) {
        $scope.selectedDomainSourceId = '';
      } else {
        $scope.selectedDomainSourceId = $scope.domainsList[index_domain].id;
      }
    };
    /**
     * @name  onChangeSourceType
     * @description
     *   Event change Source Type
     *   set default Source Name for current account
     * @param  {Strien} item
     * @return
     */
    $scope.onChangeSourceType = function(item) {
      // NOTE: set default value for select Source Type
      var index_app = -1;
      var index_domain = -1;
      var accountId = $scope.model.account_id;
      if ($scope.selectedAppSourceId === '' || $scope.selectedAppSourceId === undefined) {
        if ((index_app = _.findIndex($scope.appsList, {
            account_id: accountId
          })) < 0) {
          $scope.selectedAppSourceId = '';
        } else {
          $scope.selectedAppSourceId = $scope.appsList[index_app].id;
        }
      }
      if ($scope.selectedDomainSourceId === '' || $scope.selectedDomainSourceId === undefined) {
        if ((index_domain = _.findIndex($scope.domainsList, {
            account_id: accountId
          })) < 0) {
          $scope.selectedDomainSourceId = '';
        } else {
          $scope.selectedDomainSourceId = $scope.domainsList[index_domain].id;
        }
      }

    };

    // NOTE: action for List of Jobs
    /**
     * @name  onChangeLogShippingState
     * @description
     *  Send command change state
     * @param  {Object} model
     * @param  {String} state
     * @return
     */
    $scope.onChangeLogShippingState = function(model, state) {
      if (!model || model.operational_mode === state || $scope.isReadOnly() === true) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      // NOTE: Pull actual data about job
      $scope.get(model.id)
        .then(function(data) {
          var actualData = data;
          $scope.confirm('confirmChangeLogShippingStateModal.html', actualData)
            .then(function() {
              actualData.operational_mode = state;
              actualData = $scope.prepareJobToUpdate(actualData, true);

              var params = {
                id: modelId
              };
              $scope.loading(true);
              // Send data
              $scope.resource
                .update(params, actualData)
                .$promise
                .then(function(data) {
                  angular.merge(model, actualData);
                  return data;
                })
                .then($scope.alertService.success)
                .catch($scope.alertService.danger)
                .finally(function() {
                  $scope.loading(false);
                });
            });
        });
    };
    /**
     * @name onClickRefresh
     * @description
     *   Refresh data in table
     * @return
     */
    $scope.onClickRefresh = function() {
      $scope._loading = true;
      $scope.list()
        .then(setAccountName)
        .then(setMappingInformation)
        .finally(function() {
          $scope._loading = false;
        });
    };
    /**
     * @name isJobConfigured
     * @description method check existing all required configuration properties
     *  for run/stop/pause job
     * NOTE: only for check from list !
     *
     * @param {Object} item
     */
    $scope.isJobConfigured = function(item) {
      // NOTE: source_id is required
      if (!item.source_id || item.source_id === '') {
        return false;
      }
      // NOTE: destination_host is required
      if (!item.destination_host || item.destination_host.length === 0) {
        return false;
      }
      return true;
    };
  }
})();
