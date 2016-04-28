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
    Apps) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    /**
     * @name  sourceTypes
     * @description
     *
     * @type {Array}
     */
    $scope.sourceTypes = {
      'domain': 'Domain',
      'app': 'Application'
    };

    /**
     * @name  destinationTypes
     * @description
     *
     * @type {Array}
     */
    $scope.destinationTypes = {
      'Syslog': 'Syslog',
      's3': 'S3',
      'ftp': 'FTP',
      'sftp': 'SFTP',
      'logstash': 'Logstash',
      'elasticsearch': 'Elasticsearch'
    };
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
    $scope.operationalModeType = {
      'active': 'Active',
      'pause': 'Pause',
      'stop': 'Stop'
    };
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
    $scope.generalJobStatusies = [{
      'actived': 'Actived'
    }, {
      'stopped': 'Stopped'
    }, {
      'paused_with_log_piling': 'Paused With Log_piling'
    }, {
      'Paused_by_revadmin': 'Paused by Rev Admin'
    }];




    $scope.isAdvancedMode = $stateParams.isAdvanced || false;
    $scope.jsoneditor = {
      options: {
        mode: 'code',
        modes: ['code', 'view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
        error: function(err) {
          alert(err.toString());
        }
      }
    };
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

    function setMappingInformation() {
      // TODO: finish the mapping
      return $q.all([Apps.query().$promise, DomainsConfig.query().$promise]).then(function(res) {
        angular.forEach($scope.records, function(item) {
          // map Source Name
          item.sourceTypeName =  $scope.sourceTypes[item.source_type];
          item.operationalModeName =  $scope.operationalModeType[item.operational_mode];
          if(item.source_type ==='app'){
              var _app = _.find(res[0],{id:item.source_id}) || {};
              item.sourceName = _app.app_name || '';
          }
          if(item.source_type ==='domain'){
              var _domain = _.find(res[1],{id:item.source_id}) || {};
              item.sourceName = _domain.domain_name || '';
          }
        });
      });
    }
    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function(state) {
      if ($state.is($scope.state)) {
        $scope.list()
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
    $scope.prepareJobToUpdate = function(model_current) {
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
      } else if (!angular.isArray($scope.auth.getUser().companyId)) {
        $scope.model.account_id = $scope.auth.getUser().companyId;
      } else if ($scope.auth.getUser().companyId.length === 1) {
        $scope.model.account_id = $scope.auth.getUser().companyId[0];
      } else {
        $scope.fetchCompanies($scope.auth.getUser().companyId);
      }
    };

    $scope.setAccountId();

    $scope.getJob = function(id) {
      $scope.get(id)
        .then(function findAllSources() {
          return $q.all([Apps.query().$promise, DomainsConfig.query().$promise]).then(function(res) {
            //console.log(res)
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
        .catch(function(err) {
          $scope.alertService.danger('Could not load job details');
        });
    };
    /**
     * @name  deleteJob
     * @description
     *
     * @param  {Object} model
     * @return
     */
    $scope.deleteJob = function(model) {
      $scope.confirm('confirmModal.html', model).then(function() {
        var certName = model.cert_name;
        $scope
          .delete(model)
          .then(function(data) {
            $scope.alertService.success('Job ' + certName + ' deleted.');
            $scope.list()
              .then(setAccountName);
          })
          .catch(function(err) {
            $scope.alertService.danger(err);
          });
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
        .then(function() {
          $scope.alertService.success('Jod created', 5000);
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
          .then(function() {
            $scope.alertService.success('Job updated', 5000);
          })
          .catch(function(err) {
            $scope.alertService.danger(err.data.message || 'Oops something ment wrong', 5000);
          });
      });
    };

    $scope.storeToStorage = function(model) {
      $localStorage.selectedDomain = model;
    };
    // TODO: change rule
    $scope.disableSubmit = function(model, isEdit) {
      if (!isEdit) {
        return $scope._loading ||
          !model.job_name ||
          !model.account_id;
        // TODO: add all requerid fields
      } else {
        return $scope._loading ||
          !model.job_name ||
          !model.account_id ||
          !model.operational_mode ||
          !model.source_type ||
          (!model.source_id&& !$scope.selectedAppSourceId && !$scope.selectedDomainSourceId) ||
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

    $scope.onAccountSelect = function(account) {
      // TODO: set default value after change account for selectedDomainId and selectedAppId
      var save = $scope.model.source_type;
      $scope.model.source_type = '';
      // $scope.model.source_id = $scope.model.source_id;
      // NOTE: hardcode
      $timeout(function() {
        $scope.model.source_type = save;
      }, 200);
    };

    // NOTE: action for List of Jobs
    $scope.onChangeLogShippingState = function(item, state) {
      // TODO: Create new template for Confirm Modal Window
      // if (!model) {
      //   return;
      // }
      // if (!model.id) {
      //   model.id = $stateParams.id;
      // }
      // var modelId = model.id;
      // $scope.confirm('confirmUpdateModal.html', model).then(function() {
      //   model = $scope.prepareJobToUpdate(model);
      //   $scope.update({
      //       id: modelId
      //     }, model)
      //     .then(function() {
      //       $scope.alertService.success('Job updated', 5000);
      //     })
      //     .catch(function(err) {
      //       $scope.alertService.danger(err.data.message || 'Oops something ment wrong', 5000);
      //     });
      // });
    };

  }
})();
