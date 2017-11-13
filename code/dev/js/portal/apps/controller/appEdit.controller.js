(function() {
  'use strict';

  angular
    .module('revapm.Portal.Apps')
    .controller('AppEditController', AppEditController);

  /*@ngInject*/
  function AppEditController($scope,
    $rootScope,
    Apps,
    User,
    CRUDController,
    $injector,
    $state,
    $stateParams,
    Companies
  ) {
    //Invoking crud actions
    $injector.invoke(CRUDController,
      this, {
        $scope: $scope,
        $stateParams: $stateParams
      });

    $scope.setResource(Apps);
    $scope.$state = $state;
    // Advance mode settings
    $scope.isAdvancedMode = ($stateParams.isAdvanced === 'true') ? true : false;
    var storedAccountId;
    $scope.obj = {
      data: {},
      options: {
        mode: 'code',
        modes: ['code', 'view'],
        error: function(err) {
          alert(err.toString());
        }
      }
    };
    $scope.model = { //Data we use in API calls
      configs: [{}]
    };
    $scope.SDKVersionsInConfigs = [];


    $scope.configuration = {};
    $scope.domainsListPlaceholder = 'Add domains...';
    $scope.fieldsToShow = [];

    $scope.model.configs.domains_white_list = [];
    $scope.model.configs.domains_black_list = [];
    $scope.domainList = [];
    $scope.allUserDomains = [];

    $scope.initEdit = function(id) {
      $scope._loading = true;
      $scope.get(id)
        .then(function(data) {
          if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
            Companies.query(function(list) {
              $scope.companies = list;
            });
          }
        })
        .then(function() {
          $scope.configuration = $scope.model.configs[0];

          $scope.protocols = $scope.configuration.allowed_transport_protocols.concat(
          ['standard', 'quic', 'rmp']
          .filter(function(elem) {return $scope.configuration.allowed_transport_protocols.indexOf(elem) < 0; })
          );

          $scope.SDKVersionsInConfigs = $scope.model.configs.map(function(config) {
            return config.sdk_release_version;
          });
        })
        .then(function() {
          Apps.sdkReleases()
            .$promise
            .then(function(data) {
              $scope.availableSDKVersions = _.xor(data[$state.current.data.platform],
                $scope.SDKVersionsInConfigs);
            });
          $scope.selectedSDKVersion = $scope.SDKVersionsInConfigs[0];
          $scope.fieldsToShow = _.keys($scope.model.configs[0]);

          if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
           return User.getUserDomains(true)
              .then(function(domains) {
                $scope.allUserDomains = domains;
                var domainList = _.filter($scope.allUserDomains, {
                  account_id: $scope.model.account_id
                }).map(function(d) {
                  return d.domain_name;
                });
                $scope.domainList = _.uniq(domainList);
              });
          } else {
           return User.getUserDomains(true)
              .then(function(domains) {
                $scope.allUserDomains = domains;
                $scope.domainList = domains.map(function(d) {
                  return d.domain_name;
                });
              });
          }
        })
        .then(function(){
          if($scope.isAdvancedMode === true) {
            storedAccountId = $scope.model.account_id;
            delete $scope.model.account_id;
          }
        })
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope.$watch('selectedSDKVersion', function() {
            onSelectedSDKVersionChange();
          });
          $scope._loading = false;
        });
    };

    var onSelectedSDKVersionChange = function() {
      var idx = _.findIndex($scope.model.configs, {
        sdk_release_version: $scope.selectedSDKVersion
      });
      $scope.configuration = $scope.model.configs[idx];
      if (!$scope.configuration.allowed_transport_protocols) {
        $scope.configuration.allowed_transport_protocols = [];
      }
      if (!$scope.configuration.domains_white_list) {
        $scope.configuration.domains_white_list = [];
      }
      if (!$scope.configuration.domains_black_list) {
        $scope.configuration.domains_black_list = [];
      }

      $scope.fieldsToShow = _.keys($scope.model.configs[idx]);
    };

    $scope.protocolOrder = {
        animation: 150,
        onSort: function (evt){
          $scope.configuration.allowed_transport_protocols.sort(
//            (a,b)=>$scope.protocols.indexOf(a)-$scope.protocols.indexOf(b)
            function (a, b) { return $scope.protocols.indexOf(a)-$scope.protocols.indexOf(b); }
          );
        }
    };

    $scope.toggleProtocolSelection = function(protocol, model) {
      var idx = model
        .allowed_transport_protocols
        .indexOf(protocol);

      if (idx > -1) {
        model
          .allowed_transport_protocols
          .splice(idx, 1);
      } else {
        model
          .allowed_transport_protocols
          .push(protocol);
      }

      $scope.configuration.allowed_transport_protocols.sort(
        function (a, b) { return $scope.protocols.indexOf(a)-$scope.protocols.indexOf(b); }
      );
    };

    $scope.isVersion = function(version) {
      return (version === $scope.selectedSDKVersion);
    };

    $scope.isShown = function(name) {
      return ($scope.fieldsToShow.findIndex(name) > -1);
    };

    $scope.addNewSDKConfig = function(version, model) {
      $scope.availableSDKVersions = _.without($scope.availableSDKVersions, version);
      model.configs.push({
        sdk_release_version: version
      });
      $scope.SDKVersionsInConfigs.push(version);
      $scope.selectedSDKVersion = version;
      $scope.configuration = {
        sdk_release_version: version,
        allowed_transport_protocols: [],
        domains_white_list: [],
        domains_black_list: []
      };
    };

    /**
     * @name updateApp
     * @description method confirm and update data
     */
    $scope.updateApp = function(model, config) {
      // NOTE: not update if RO User
      if(!model || $scope.isReadOnly() === true) {
        return;
      }
      if(!model.id) {
        var modelId = $stateParams.id;
      }

      $scope.confirm('confirmUpdateModal.html', model).then(function() {
        var idx = _.findIndex(model.configs, {
          sdk_release_version: config.sdk_release_version
        });

        model.configs[idx] = config;

        $scope.update({
            id: model.id || modelId
          }, $scope.cleanModel(model))
          .then( $scope.alertService.success)
          .catch($scope.alertService.danger);
      });
    };

    $scope.verify = function(model, config) {
      if(!model) {
        return;
      }
      if(!model.id) {
        var modelId = $stateParams.id;
      }

      var idx = _.findIndex(model.configs, {
        sdk_release_version: config.sdk_release_version
      });

      model.configs[idx] = config;

      $scope._loading = true;
      $scope.update({
          id: model.id || modelId,
          options: 'verify_only'
        }, $scope.cleanModel(model))
        .then($scope.alertService.success)
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.publish = function(model, config) {
      // NOTE: not update if RO User
      if(!model || $scope.isReadOnly() === true) {
        return;
      }
      if(!model.id) {
        var modelId = $stateParams.id;
      }
      $scope.confirm('confirmPublishModal.html', model).then(function() {
        var idx = _.findIndex(model.configs, {
          sdk_release_version: config.sdk_release_version
        });

        model.configs[idx] = config;

        $scope._loading = true;
        Apps.update({
            id: model.id || modelId,
            options: 'publish'
          }, $scope.cleanModel(model))
          .$promise
          .then(function(data) {
            $rootScope.$broadcast('update:searchData');
            $scope.alertService.success(data);
          })
          .catch($scope.alertService.danger)
          .finally(function() {
            $scope._loading = false;
          });
      });
    };

    $scope.cleanModel = function(model) {
      var modelCopy = _.clone(model);
      var params = {
        id: model.id
      };
      if(!modelCopy.account_id){
        modelCopy.account_id = $scope.model.account_id || storedAccountId;
      }
      delete modelCopy.$promise;
      delete modelCopy.$resolved;
      delete modelCopy.id;
      delete modelCopy.app_platform;
      delete modelCopy.sdk_key;
      delete modelCopy.created_at;
      delete modelCopy.updated_at;
      delete modelCopy.updated_by;
      delete modelCopy.created_by;
      delete modelCopy.showKey;
      return modelCopy;
    };
    /**
     * @name  getAccountDomainNameList
     * @description
     *
     * @param  {[type]} account_id [description]
     * @return {[type]}            [description]
     */
    $scope.getAccountDomainNameList = function(account_id) {
      if (!account_id) {
        account_id = $scope.model.account_id;
      }
      return _.filter($scope.allUserDomains, {
        account_id: account_id
      }).map(function(d) {
        return d.domain_name;
      });
    };

    /**
     * @name  onAccountSelect
     * @description
     *   Clear selected domain names after change Account
     * @return {[type]} [description]
     */
    $scope.onAccountSelect = function() {
      $scope.configuration.domains_provisioned_list = [];
    };

    /**
    * Get editor instance
    */
    $scope.jsonEditorEvent = function(instance) {
      $scope.jsonEditorInstance = instance;
    };

    /**
     * Set watcher on json editor's text to catch json validation error
     */
    $scope.$watch('jsonEditorInstance.getText()', function(val) {
      // if editor text is empty just return
      if(!val) {
        $scope.jsonIsInvalid = true;
        return;
      }
      // try to parse editor text as valid json and check if at least one item exists, if yes then enable Purge button
      try {
        var json = JSON.parse(val);
        $scope.jsonIsInvalid = !json || !Object.keys(json).length;
      } catch(err) {
        // if it's not valid json or it's empty disable Purge button
        $scope.jsonIsInvalid = true;
      }
    });
    /**
     * @name onChangeModeView
     * @description change view mode
     */
    $scope.onChangeModeView = function() {
      $scope.isAdvancedMode = !$scope.isAdvancedMode;
    };
    /**
     * @description
     *
     * Watch by changing "isAdvancedMode"
     * Make synce data
     *
     * @param  {Boollean} newVal
     * @param  {Boolean} oldVal
     * @return
     */
    $scope.$watch('isAdvancedMode', function(newVal, oldVal) {
      if(newVal !== oldVal && newVal === true) {
        var newModel = $scope.cleanModel($scope.model);
        delete newModel.account_id;
        $scope.modelAdvance = newModel;
      } else if(newVal !== oldVal && newVal === false) {
        if(!!$scope.model && !$scope.model.account_id ){
          $scope.model.account_id = storedAccountId;
        }
        _.merge($scope.model, $scope.modelAdvance);
      }
    });
    // NOTE: sync data between view modes
    $scope.$watch('model', function(newVal, oldVal) {
      if(newVal !== oldVal && !!newVal && $scope.isAdvancedMode === true) {
        var newModel = $scope.cleanModel($scope.model);
        $scope.modelAdvance = newModel;
      }
    }, true);
  }
})();
