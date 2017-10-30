(function () {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .controller('DomainsCrudController', DomainsCrudController);
/*jshint maxstatements: 120 */
/*eslint max-statements: [1, 120] */
/*jshint maxparams: 120 */
/*eslint max-params: [1, 120] */
  /*@ngInject*/
  function DomainsCrudController($scope,
    $timeout,
    $localStorage,
    CRUDController,
    DomainsConfig,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll,
    SSL_certs,
    SSL_conf_profiles,
    User,
    $uibModal) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    $scope.isAdvancedMode = ($stateParams.isAdvanced === 'true') ? true : false;
    $state._loading = true;
    $scope._isEditLocked = false;
    $scope.jsoneditor = {
      options: {
        mode: 'code',
        modes: ['code', 'view'], // allowed modes['code', 'form', 'text', 'tree', 'view']
        error: function (err) {
          alert(err.toString());
        }
      }
    };
    //Set state (ui.router)
    $scope.setState('index.webApp.domains');

    $scope.setResource(DomainsConfig);

    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;
    $scope.DOMAIN_STATUS_REFRESH_INTERVAL_EDIT_FORM = $config.DOMAIN_STATUS_REFRESH_INTERVAL_EDIT_FORM;
    $scope.domain_update_help_info = 'Use the button to send the modified configuration to the staging environment ' +
      'which can be used to test the new configuration before sending it to the global network (and making it ' +
      'available for all your end users). Please see “Web -> Staging Env.” section for details about the staging ' +
      'environment and how to use it.';
    $scope.domain_publish_help_info = 'Once you have tested the updated configuration in the staging environment ' +
      '(using “Update” button) are you welcome to publish the configuration in the global network (and make it ' +
      'available to all your end users)';
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
          $scope._applyFilter(); // NOTE: apply current filter for new data in Account column
        });
      } else {
        return $q.when();
      }
    }

    $scope.initNew = function () {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        Companies.query(function (list) {
          $scope.companies = list;
          $scope.setDefaultAccountId();
        });
      } else {
        $scope.setDefaultAccountId();
      }
    };

    $scope.initEdit = function () {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        Companies.query(function (list) {
          $scope.companies = list;
        });
      }
    };

    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function (state, stateTo, stateParam) {
      var data = null;
      // NOTE: set filter params for specific state
      if ($state.is('index.accountSettings.accountresources')) {
        $scope.filter.limit = 5;
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
            if ($scope.elementIndexForAnchorScroll) {
              setTimeout(function () {
                $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
                $scope.$digest();
              }, 500);
            }
          });
      } else {
        if (!!stateParam.id && !stateParam.id) {
          $scope.params = $stateParams;
          $scope.initEdit($stateParams.id);
        } else {
          $scope.setDefaultAccountId();
        }
      }
    });

    $scope.filterKeys = ['domain_name', 'cname', 'companyName', 'updated_at'];

    $scope.locations = [];
    $scope.companies = [];
    $scope.model = {};

    // fetch list of locations
    $scope.fetchLocations = function () {
      $http
        .get($config.API_URL + '/locations/firstmile')
        .then(function (data) {
          if (data.status === $config.STATUS.OK) {
            $scope.locations = data.data;
          }
        })
        .catch($scope.alertService.danger);
    };

    $scope.prepareSimpleDomainUpdate = function (model_current) {
      var model;
      if (model_current.toJSON === undefined) {
        model = _.clone(model_current, true);
      } else {
        model = _.clone(model_current.toJSON(), true);
      }
      if (model.rev_component_bp) {
        delete model.rev_component_bp.cache_opt_choice;
        delete model.rev_component_bp.certificate_urls;
        delete model.rev_component_bp.ssl_certificates;
        if (model.rev_component_bp.caching_rules) {
          angular.forEach(model.rev_component_bp.caching_rules, function (item) {
            delete item.$$cachingRuleState;
          });
        }
        // NOTE: delete UI elements not for saving
        // $$backendBlockState - added in domain-custom-vcl-backends
        if (model.rev_component_bp.custom_vcl && !!model.rev_component_bp.custom_vcl.backends) {
          angular.forEach(model.rev_component_bp.custom_vcl.backends, function (item) {
            delete item.$$backendBlockState;
          });
        }
        // $$itemState - added for domain-lua-code-block
        if (model.bp_lua && angular.isArray(model.bp_lua)) {
          angular.forEach(model.bp_lua, function (item) {
            delete item.$$itemState;
          });
        }
        // $$wafLocationBlockState
        if (model.rev_component_bp.waf && angular.isArray(model.rev_component_bp.waf)) {
          angular.forEach(model.rev_component_bp.waf, function (item) {
            delete item.$$wafLocationBlockState;
          });
        }
        // $$botProtectionLocationBlockState
        if(model.rev_component_bp.bot_protection && angular.isArray(model.rev_component_bp.bot_protection)) {
          angular.forEach(model.rev_component_bp.bot_protection, function(item) {
            if(!!!item.username_cookie_name){
              item.username_cookie_name = '';
            }
            if(!!!item.sessionid_cookie_name) {
              item.sessionid_cookie_name = '';
            }
            delete item.$$botProtectionLocationBlockState;
          });
        }
      }
      if (model.domain_name) {
        delete model.domain_name;
      }
      // NOTE: clean params ssl config
      if ($scope.isCustomSSL_conf_profile) {
        model.ssl_conf_profile = '';
      } else {
        var item = _.find($scope.SSL_conf_profiles, {
          id: model.ssl_conf_profile
        });
        if (!!item) {
          model.ssl_ciphers = item.ssl_ciphers;
          model.ssl_protocols = item.ssl_protocols;
          model.ssl_prefer_server_ciphers = item.ssl_prefer_server_ciphers;
        }
      }
      // NOTE: set correct value for ssl_cert_id
      if (model.ssl_cert_id === null || model.ssl_cert_id === undefined) {
        model.ssl_cert_id = '';
      }
      delete model.cname;
      delete model.published_domain_version;
      delete model.last_published_domain_version;
      delete model.origin_protocol;
      delete model.id;
      if (model.domain_wildcard_alias === '') {
        delete model.domain_wildcard_alias;
      }
      // NOTE:  "Origin Health Monitoring" should be active if “Edge Caching” is ON(true)
      if (!!model.rev_component_bp && (!model.rev_component_bp.enable_cache || model.rev_component_bp.enable_cache === false)) {
        model.enable_origin_health_probe = false;
      }
      if ($scope.$thirdPartyLinks) {
        model['3rd_party_rewrite'] = {
          '3rd_party_root_rewrite_domains': (!!$scope.$thirdPartyLinks['3rd_party_root_rewrite_domains'] &&
            $scope.$thirdPartyLinks['3rd_party_root_rewrite_domains'].length > 0) ? $scope.$thirdPartyLinks['3rd_party_root_rewrite_domains'].join(',') : '',
          '3rd_party_runtime_domains': (!!$scope.$thirdPartyLinks['3rd_party_runtime_domains'] &&
            $scope.$thirdPartyLinks['3rd_party_runtime_domains'].length > 0) ? $scope.$thirdPartyLinks['3rd_party_runtime_domains'].join(',') : '',
          '3rd_party_urls': (!!$scope.$thirdPartyLinks['3rd_party_urls'] &&
            $scope.$thirdPartyLinks['3rd_party_urls'].length > 0) ? $scope.$thirdPartyLinks['3rd_party_urls'].join(',') : '',
          'enable_3rd_party_rewrite': $scope.$thirdPartyLinks.enable_3rd_party_rewrite || false,
          'enable_3rd_party_root_rewrite': $scope.$thirdPartyLinks.enable_3rd_party_root_rewrite || false,
          'enable_3rd_party_runtime_rewrite': $scope.$thirdPartyLinks.enable_3rd_party_runtime_rewrite || false
        };
      }
      if (!model.github_integration){
        model.github_integration = {
          enable: false,
          github_url: '',
          github_personal_api_key: ''
        };
      }
      return model;
    };


    $scope.fetchLocations();

    $scope.SSL_certs = [];
    $scope.SSL_conf_profiles = [];

    function fetchSSL_certificates() {
      $scope.SSL_certs.length = 0;
      return SSL_certs.query().$promise
        .then(function (list) {
          //TODO: add control USER ROLE for filtred data
          if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) { }
          $scope.SSL_certs = list;
        }).$promise;
    }

    function fetchSSL_conf_profiles() {
      $scope.SSL_conf_profiles.length = 0;
      return SSL_conf_profiles.query().$promise
        .then(function (list) {
          $scope.SSL_conf_profiles = list;
          if ($scope.model.ssl_conf_profile === '') {
            // set default value for ssl_conf_profile
            $scope.model.ssl_conf_profile = $scope.SSL_conf_profiles[0].id;
          } else {
            // fill values for SSL Conf Profile
            var _conf_profile = _.find($scope.SSL_conf_profiles, {
              id: $scope.model.ssl_conf_profile
            });
            if (!!_conf_profile) {
              $scope.model.ssl_protocols = _conf_profile.ssl_protocols;
              $scope.model.ssl_ciphers = _conf_profile.ssl_ciphers;
              $scope.model.ssl_prefer_server_ciphers = _conf_profile.ssl_prefer_server_ciphers;
            }
          }
        }).$promise;
    }
    /**
     * @name  getDomain
     * @description
     *
     * @param  {String} id
     * @return
     */
    $scope.getDomain = function (id) {
      $scope.get(id)
        .then(saveNoChangingValue)
        .then(validateDomainProperties)
        .then(function () {
          return Companies.query(function (list) {
            $scope.companies = list;
          });
        })
        .then(function () {
          if ($scope.model.ssl_conf_profile !== '') {
            $scope.isCustomSSL_conf_profile = false;
          } else {
            $scope.isCustomSSL_conf_profile = true;
          }
          var data_ = $scope.model['3rd_party_rewrite'];
          $scope.$thirdPartyLinks = {
            '3rd_party_root_rewrite_domains': (!!data_['3rd_party_root_rewrite_domains'] &&
              data_['3rd_party_root_rewrite_domains'].length > 0) ? data_['3rd_party_root_rewrite_domains'].split(',') : [],
            '3rd_party_runtime_domains': (!!data_['3rd_party_runtime_domains'] &&
              data_['3rd_party_runtime_domains'].length > 0) ? data_['3rd_party_runtime_domains'].split(',') : [],
            '3rd_party_urls': (!!data_['3rd_party_urls'] &&
              data_['3rd_party_urls'].length > 0) ? data_['3rd_party_urls'].split(',') : [],
            'enable_3rd_party_rewrite': data_.enable_3rd_party_rewrite || false,
            'enable_3rd_party_root_rewrite': data_.enable_3rd_party_root_rewrite || false,
            'enable_3rd_party_runtime_rewrite': data_.enable_3rd_party_runtime_rewrite || false
          };
          return $q.all([fetchSSL_certificates(), fetchSSL_conf_profiles()]);
        })
        .catch(function (err) {
          $scope.alertService.danger('Could not load domain details');
        })
        .finally(function () {
          $scope._loading = false;
        });

      /**
       * @name  validateDomainProperties
       * @description
       *
       * Rules:
       * 1. If “Origin Communication Protocol”(origin_secure_protocol) is not specified in the received JSON then set it to default value “Use End User Protocol”
       * 2. The default value for “RUM Data Collection”(rev_component_co.enable_rum) must to be “false”
       * @param  {[type]} domain [description]
       * @return {[type]}        [description]
       */
      function validateDomainProperties(domain) {
        // $scope.modelAdvance = {'loading':'Please wait few seconds...'};
        $timeout(function () {
          $scope.modelAdvance = angular.copy($scope.prepareSimpleDomainUpdate(domain));
        }, 2000);

        var _domain_default_property = {
          proxy_timeout: 20,
          domain_aliases: [],
          origin_secure_protocol: 'use_end_user_protocol',
          rev_component_co: {
            enable_rum: false,
            enable_decompression: true
          }
        };
        // NOTE: set default properties
        _.defaultsDeep($scope.model, _domain_default_property);
        delete $scope.model.domain_name;
        delete $scope.model.cname;
        delete $scope.model.id;
        angular.forEach($scope.model.rev_component_bp.caching_rules, function (item) {
          // NOTE: add parameter for collapsed item
          angular.extend(item, {
            $$cachingRuleState: {
              isCollapsed: true
            }
          });
          // NOTE: Check existing  requered fields
          if (!item.edge_caching.query_string_keep_or_remove_list) {
            item.edge_caching.query_string_keep_or_remove_list = [];
          }
        });
        angular.forEach($scope.model.bp_lua, function (item) {
          // NOTE: add parameter for collapsed item
          angular.extend(item, {
            $$itemState: {
              isCollapsed: true
            }
          });
        });
        angular.forEach($scope.model.co_lua, function (item) {
          // NOTE: add parameter for collapsed item
          angular.extend(item, {
            $$itemState: {
              isCollapsed: true
            }
          });
        });
        angular.forEach($scope.model.rev_component_bp.waf, function (item) {
          // NOTE: add parameter for collapsed item
          angular.extend(item, {
            $$wafLocationBlockState: {
              isCollapsed: true
            }
          });
        });

      }
      /**
       * @name  saveNoChangingValue
       * @description
       *
       * Save no changing params
       *
       * @param  {Object} model
       * @return {Promise}
       */
      function saveNoChangingValue(model) {
        $scope.modelInfo = {
          domain_name: model.domain_name,
          cname: model.cname,
          status_domain_id: model.id || $stateParams.id
        };
        delete model.domain_name;
        delete model.cname;
        delete model.id;
        return $q.when(model);
      }
    };
    /**
     * @name  reloadStatus
     * @description
     *
     * @return
     */
    function reloadStatus() {
      $scope.modelInfo.status_domain_id = null;
      $scope.refresh = true;
      $timeout(function () {
        $scope.modelInfo.status_domain_id = $scope.model.id || $stateParams.id;
      }, 300);

    }

    /**
     * @name deleteDomain
     * @description
     *   Delete domain after confirm
     * @param  {Object} model Information about domain
     * @return {Boolean}
     */
    $scope.deleteDomain = function (model) {
      if ($scope.isReadOnly()) {
        return false;
      }
      $scope.confirm('confirmModal.html', model)
        .then(function () {
          $scope
            .delete(model)
            .then($scope.alertService.success)
            .catch($scope.alertService.danger);
        });
    };

    $scope.createDomain = function (model, isStay) {
      var _model = angular.copy(model);
      $scope
        .create(_model, isStay)
        .then(function (data) {
          // NOTE: clean model for new domain
          model.domain_name = '';
          model.comment = '';
          model.origin_host_header = '';
          model.origin_server = '';
          model.origin_server_location_id = '';
          if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
            // NOTE: clean account_id for new Domain
            model.account_id = null;
          }
          $scope.alertService.success(data);
        })
        .catch($scope.alertService.danger);
    };
    /**
     * @name postUpdateOrPublishDomainConfig
     * @description special actions after Update and Publish
     *
     * @param {any} modelId
     * @param {any} model
     */
    function postUpdateOrPublishDomainConfig(modelId, model) {
      if (!!model.github_integration && model.github_integration.enable === true) {
        $scope._loading = true;
        $timeout(function(){
          $scope._loading = true;
          $scope.refreshPage(null, modelId);
        },1700);
      } else {
        reloadStatus();
      }
    }
    $scope.publishDomain = function (model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmPublishModal.html', {
        domain_name: $scope.modelInfo.domain_name,
        github_integration: $scope.model.github_integration
      }).then(function () {
        model = $scope.prepareSimpleDomainUpdate(model);
        $scope.update({
          id: modelId,
          options: 'publish'
        }, model)
          .then($scope.alertService.success)
          .then(function(){
            return postUpdateOrPublishDomainConfig(modelId, model);
          })
          .catch($scope.alertService.danger);
      });
    };

    $scope.validateDomain = function (model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      model = $scope.prepareSimpleDomainUpdate(model);
      // TODO: don`t return promise
      return $scope.update({
        id: modelId,
        options: 'verify_only'
      }, model)
        .then($scope.alertService.success)
        .then(reloadStatus)
        .catch($scope.alertService.danger);
    };

    $scope.updateDomain = function (model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', {
        domain_name: $scope.modelInfo.domain_name,
        github_integration: $scope.model.github_integration
      }).then(function () {
        model = $scope.prepareSimpleDomainUpdate(model);
        $scope.update({
          id: modelId
        }, model)
          .then($scope.alertService.success)
          .then(function(){
            postUpdateOrPublishDomainConfig(modelId, model);
          })
          .catch($scope.alertService.danger);
      });
    };

    $scope.storeToStorage = function (model) {
      $localStorage.selectedDomain = model;
    };

    $scope.clearForm = function () {
      $scope.clearModel();
    };

    $scope.disableSubmit = function (model, isEdit) {
      if (!isEdit) {
        return $scope._loading ||
          !model.domain_name ||
          !model.account_id ||
          !model.origin_server ||
          !model.origin_host_header ||
          !model.origin_server_location_id;
      } else {
        return $scope._loading ||
          !model.account_id ||
          !model.origin_server ||
          !model.origin_host_header ||
          !model.origin_server_location_id ||
          !model.proxy_timeout;
      }
    };

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };


    /**
     * Get editor instance
     */
    $scope.jsonEditorEvent = function (instance) {
      $scope.jsonEditorInstance = instance;
    };

    /**
     * Set watcher on json editor's text to catch json validation error
     */
    $scope.$watch('jsonEditorInstance.getText()', function (val) {
      // if editor text is empty just return
      if (!val) {
        $scope.jsonIsInvalid = true;
        return;
      }

      // try to parse editor text as valid json and check if at least one item exists, if yes then enable Purge button
      try {
        var json = JSON.parse(val);
        $scope.jsonIsInvalid = !json || !Object.keys(json).length;
      } catch (err) {
        // if it's not valid json or it's empty disable Purge button
        $scope.jsonIsInvalid = true;
      }
    });

    /**
     * @name  onAddNewCacheRule
     * @description
     *
     * Add new caching rule
     *
     * @return
     */
    $scope.onAddNewCachingRule = function (e, isChacheStatic) {
      if($scope._isEditLocked === true){
        return;
      }
      if (e) {
        e.preventDefault();
      }

      var _newCachingRule = {
        version: 1,
        url: {
          is_wildcard: true,
          value: '' // NOTE: must be empty for a new Caching Rule
        },
        edge_caching: {
          new_ttl: 0,
          override_no_cc: false,
          override_origin: false,
          query_string_list_is_keep: false,
          query_string_keep_or_remove_list: []
        },
        browser_caching: {
          force_revalidate: false,
          new_ttl: 0,
          override_edge: false
        },
        cookies: {
          ignore_all: false,
          keep_or_ignore_list: [],
          list_is_keep: false,
          override: false,
          remove_ignored_from_request: false,
          remove_ignored_from_response: false
        },
        serve_stale: {
          enable: false,
          while_fetching_ttl: 8,
          origin_sick_ttl: 15
        },
        $$cachingRuleState: {
          isCollapsed: true
        }
      };
      var _text_msg = '';
      // NOTE: Set “Cache Static Objects” parameters
      if (isChacheStatic === true) {
        _newCachingRule.url = {
          is_wildcard: false,
          value: '\\.(jpg|jpeg|png|gif|webp|js|css|woff|woff2|mp4|swf|avi|mpeg|mov)(\\?.*)?$'
        };
        angular.extend(_newCachingRule.edge_caching, {
          new_ttl: 604800,
          override_origin: true,
          override_no_cc: true
        });
        _text_msg = 'A new custom caching rule has been added to the end of the list';
      } else {
        _text_msg = 'A new default caching rule has been added to the end of the list. Please configure the rule before saving the configuration.';
      }
      $scope.model.rev_component_bp.caching_rules.push(_newCachingRule);
      $scope.alertService.success(_text_msg);
    };
    /**
     * @name  onRemoveCachingRule
     * @description
     *
     * Deleting Caching
     *
     * @return
     */
    $scope.onRemoveCachingRule = function (index) {
      if($scope._isEditLocked === true){
        return;
      }
      $scope.confirm('confirmModalDeleteCachingRule.html', {
        url: $scope.model.rev_component_bp.caching_rules[index].url
      })
        .then(function () {
          $scope.model.rev_component_bp.caching_rules.splice(index, 1);
          $scope.alertService.success('Caching Rule was deleted');
        });
    };
    /**
     * @name  onUpCachingRule
     * @description
     *
     * @param  {Object} element - Caching Rule Object
     * @return {Boolean|Integer}
     */
    $scope.onUpCachingRule = function (element) {
      if($scope._isEditLocked === true){
        return;
      }
      var array = $scope.model.rev_component_bp.caching_rules;
      var index = array.indexOf(element);
      // Item non-existent?
      if (index === -1) {
        return false;
      }
      // If there is a previous element in sections
      if (array[index - 1]) {
        // Swap elements
        array.splice(index - 1, 2, array[index], array[index - 1]);
      } else {
        // Do nothing
        return 0;
      }
    };
    /**
     * @name  onDownCachingRule
     * @description
     *
     * @param  {Object} element - Caching Rule Object
     * @return {Boolean|Integer}
     */
    $scope.onDownCachingRule = function (element) {
      if($scope._isEditLocked === true){
        return;
      }
      var array = $scope.model.rev_component_bp.caching_rules;
      var index = array.indexOf(element);
      // Item non-existent?
      if (index === -1) {
        return false;
      }
      // If there is a next element in sections
      if (array[index + 1]) {
        // Swap elements
        array.splice(index, 2, array[index + 1], array[index]);
      } else {
        // Do nothing
        return 0;
      }
    };

    /**
     * @name  onCollapsAllCachingRule
     * @description
     *
     * @return
     */
    $scope.onCollapsAllCachingRule = function () {
      var _rules = $scope.model.rev_component_bp.caching_rules;
      angular.forEach(_rules, function (item) {
        item.$$cachingRuleState.isCollapsed = true;

      });
    };
    /**
     * @name  onExpandAllCachingRule
     * @description
     *
     * @return
     */
    $scope.onExpandAllCachingRule = function () {
      var _rules = $scope.model.rev_component_bp.caching_rules;
      angular.forEach(_rules, function (item) {
        item.$$cachingRuleState.isCollapsed = false;
      });
    };

    $scope.onChangeModeView = function () {
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
    var _id_ssl_conf_profile = '';
    $scope.$watch('isAdvancedMode', function (newVal, oldVal) {
      if (newVal !== oldVal && newVal === true) {
        var newModel = $scope.prepareSimpleDomainUpdate($scope.model);
        _id_ssl_conf_profile = $scope.model.ssl_conf_profile;
        $scope.modelAdvance = angular.copy(newModel);
        if ($scope.isCustomSSL_conf_profile === true) {
          $scope.modelAdvance.ssl_conf_profile = '';
        }
      }
      if (newVal !== oldVal && newVal === false) {
        if (_id_ssl_conf_profile !== '') {
          $scope.modelAdvance.ssl_conf_profile = _id_ssl_conf_profile;
        }
        _.merge($scope.model, $scope.modelAdvance);
        if ($scope.isCustomSSL_conf_profile === false) {
          syncSSL_conf_profile($scope.model.ssl_conf_profile);
        }
        // NOTE: update ACL for render UI into directives
        if (!!$scope.model.rev_component_bp.acl && !!$scope.model.rev_component_bp.acl) {
          angular.extend($scope.model.rev_component_bp.acl, $scope.modelAdvance.rev_component_bp.acl);
        }
      }
    });

    $scope.$watch('model.ssl_conf_profile', function (newVal, oldVal) {
      if (newVal !== oldVal && !!newVal) {
        syncSSL_conf_profile(newVal);
      }
    });

    $scope.$watch('isCustomSSL_conf_profile', function (newVal, oldVal) {
      if (newVal !== oldVal && newVal !== undefined) {
        if (newVal === false) {
          syncSSL_conf_profile($scope.model.ssl_conf_profile);
        }
      }
    });

    $scope.$watch('model.rev_component_bp.enable_cache', function (newVal, oldVal) {
      if (newVal !== oldVal && newVal !== undefined) {
        if (newVal === false) {
          $scope.model.enable_origin_health_probe = false;
        }
      }
    });

    $scope.$watch('model.enable_origin_health_probe', function (newVal, oldVal) {
      if (newVal !== oldVal && newVal !== undefined) {
        if (newVal === true || newVal === 'true') {
          // NOTE: set default values for new Origin Health Probe
          var _default = {
            HTTP_REQUEST: 'GET / HTTP/1.1',
            PROBE_TIMEOUT: 1,
            PROBE_INTERVAL: 2,
            HTTP_STATUS: 200
          };
          if (!$scope.model.origin_health_probe) {
            $scope.model.origin_health_probe = {};
          }
          _.defaults($scope.model.origin_health_probe, _default);
        }
      }
    });

    $scope.$watch('model.github_integration', function(newVal, oldVal) {
      if(newVal !== oldVal && newVal !== undefined) {
        $scope.updateIsEditLocked();
        if($scope.isAdvancedMode === true) {
          $scope.modelAdvance.github_integration = newVal;
        }
      }
    },true);

    $scope.$watch('modelAdvance.github_integration', function(newVal, oldVal) {
      if(newVal !== oldVal && newVal !== undefined) {
        if(!!newVal) {
          $scope.model.github_integration = newVal;
        }
      }
    }, true);
    /**
     * @name  syncSSL_conf_profile
     * @description
     *
     *
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    function syncSSL_conf_profile(id) {
      var item = _.find($scope.SSL_conf_profiles, {
        id: id
      });
      if (!!item) {
        angular.extend($scope.model, {
          ssl_ciphers: item.ssl_ciphers,
          ssl_protocols: item.ssl_protocols,
          ssl_prefer_server_ciphers: item.ssl_prefer_server_ciphers
        });
      }
    }

    /**
     * @name copyCallback
     * @description
     *
     * @param  {[type]} err [description]
     * @return {[type]}     [description]
     */
    $scope.copyCallback = function (err) {
      if (err) {
        $scope.alertService.danger('Copying failed, please try manual approach', 2000);
      } else {
        $scope.alertService.success('The CNAME has been copied to the clipboard', 2000);
      }
    };
    /**
     * @name onEnableImageEngineChanged
     * @description method for controll change EnableImageEngine
     * @param {Event} e
     * @param {Boolean} isEnabled
     */
    $scope.onEnableImageEngineChanged = function (e, isEnabled) {
      var customVCLenabled = (!!$scope.model.rev_component_bp.custom_vcl) ? $scope.model.rev_component_bp.custom_vcl.enabled : false;
      if (isEnabled === false && customVCLenabled === true) {
        $scope.confirm('confirmChangeVCLModal.html', {
          domain_name: $scope.modelInfo.domain_name
        })
          .then(function (data) {
            // NOTE: change on UI
            $scope.model.rev_component_bp.custom_vcl.enabled = false;
          })
          .catch(function (err) {
            // NOTE: cancel change this property
            $scope.model.image_engine.enable_image_engine = true;
          });
      }
      if (isEnabled === true) {
        // NOTE: if user try activate ImageEngine we need to show a warning message
        $scope.confirm('confirmEnableImageEngineModal.html', {
          domain_name: $scope.modelInfo.domain_name
        })
          .then(function (data) {
            // NOTE: change on UI
            $scope.model.image_engine.enable_image_engine = true;
          })
          .catch(function (err) {
            // NOTE: cancel change property
            $scope.model.image_engine.enable_image_engine = false;
          });
      }
    };
    /**
     * @name refreshPage
     * @description method for refresh data on the Page (reload the state)
     */
    $scope.refreshPage = function (e, id) {
      $scope._loading = true;
      $timeout(function () {
        var isAdvanced = $scope.isAdvancedMode;
        var state = $state.$current;
        var params = {
          id: id
        };
        if (isAdvanced === true) {
          params.isAdvanced = isAdvanced;
        }
        $state.transitionTo($state.$current, params, {
          reload: true,
          inherit: false,
          notify: true
        });
      }, 200);
    };

    $scope.onManageGitHubIntegration = function(e){
      e.preventDefault();
      $scope.showGitHubIntegrationSettings();
    };
    var modalInstanceGitHubSettings;
    /**
     * @name showGitHubIntegrationSettings
     * @description method call modal window with copy GitHub Integration
     */
    $scope.showGitHubIntegrationSettings = function (){
      $scope.newGitHubIntegrationSettings = angular.copy($scope.model.github_integration || {});
      modalInstanceGitHubSettings = $uibModal.open({
        animation: false,
        templateUrl:  'gitHubIntegrationSettings.html',
        size: 'lg',
        scope: $scope, // NOTE: use same scope
        backdrop: 'static'
      });
      return modalInstanceGitHubSettings.result;
    };

    /**
     * @name onChangeManageGitHubIntegration
     * @description method confirm disable Git Hub Integration
     */
    $scope.onChangeManageGitHubIntegration = function(e){
      if($scope.model.github_integration.enable === false){
        $scope.confirm('confirmDisableGitHubIntegrationModal.html', {})
        .then(function(res){
            if(res!==true){
              $scope.model.github_integration.enable = true;
            }
          })
          .catch(function(err) {
            // NOTE: cancel change property
            $scope.model.github_integration.enable = true;
          });
      }else{
        $scope.showGitHubIntegrationSettings()
          .then(function(res) {
            if(res !== true ){
              $scope.model.github_integration.enable = !$scope.model.github_integration.enable;
            }
          })
          .catch(function(err) {
            $scope.model.github_integration.enable = !$scope.model.github_integration.enable;
          });
      }
    };
    // NOTE: actions for modal windows
    /**
     * @name onVerifyGitHubJSONConfig
     * @description method check and change data in github_integration property
     */
    $scope.onVerifyGitHubJSONConfig = function() {
      var model = angular.copy($scope.model);
      if(!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      model.github_integration = $scope.newGitHubIntegrationSettings;
      model = $scope.prepareSimpleDomainUpdate(model);

      $scope.update({
        id: modelId,
        options: 'verify_only'
      }, model)
        .then(function(data) {
          $scope.alertService.success('The GitHub integration has been successfully verified. ' +
            'To activate the integration please either Update or Publish the configuration.');
          angular.extend($scope.model.github_integration, $scope.newGitHubIntegrationSettings);
          modalInstanceGitHubSettings.close(true);
        })
        .then(reloadStatus)
        .catch($scope.alertService.danger);
    };

    $scope.cancelChanges = function() {
      modalInstanceGitHubSettings.dismiss('cancel');
    };
    /**
     * @name  updateIsEditLocked
     * @description all situations for to set isEditLocked equal "true"
     */
    $scope.updateIsEditLocked = function(){
      if($scope.isReadOnly() === true) {
        $scope._isEditLocked = true;
      } else if($scope.model.github_integration && $scope.model.github_integration.enable === true){
        $scope._isEditLocked = true;
      } else {
        $scope._isEditLocked = false;
      }
      return $scope._isEditLocked;
    };
  }

})();
