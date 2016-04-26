(function() {
  'use strict';

  angular
    .module('revapm.Portal.SSL_certs')
    .controller('SSL_certsCrudController', SSL_certsCrudController);

  /*@ngInject*/
  function SSL_certsCrudController($scope, $timeout,
    $localStorage,
    CRUDController,
    SSL_certs,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
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
    $scope.setState('index.webApp.ssl_certs');

    $scope.setResource(SSL_certs);

    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function(state) {
      if ($state.is($scope.state)) {
        $scope.list()
          .then(function() {
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
          })
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

    $scope.filterKeys = ['cert_name', 'companyName', 'updated_at']; // TODO: add anothe filter's fields

    $scope.locations = [];
    $scope.companies = [];
    $scope.model = {};
    // TODO: Change to real types
    $scope.certs_types = [{
      id: 'shared',
      typeName: 'Shared RevAPM Certificate'
    }, {
      id: 'private',
      typeName: 'Private With Customer-Provided Key'
    }, {
      id: 'private-revapm',
      typeName: 'Private With RevAPM-Provided Key'
    }];

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
     * @name prepareSSL_certToUpdate
     * @description
     *
     * @param  {[type]} model_current [description]
     * @return {[type]}               [description]
     */
    $scope.prepareSSL_certToUpdate = function(model_current) {
      var model;
      if (model_current.toJSON === undefined) {
        model = _.clone(model_current, true);
      } else {
        model = _.clone(model_current.toJSON(), true);
      }
      delete model.id;
      delete model.created_by;
      delete model.created_at;
      delete model.updated_at;
      delete model.expires_at;
      delete model.domains;
      delete model.last_published_ssl_config_version;

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

    $scope.getSSL_cert = function(id) {
      $scope.get(id)
        .catch(function(err) {
          $scope.alertService.danger('Could not load SSL certificate details');
        });

    };

    $scope.deleteDomain = function(model) {
      $scope.confirm('confirmModal.html', model).then(function() {
        var certName = model.domain_name;
        $scope
          .delete(model)
          .then(function(data) {
            $scope.alertService.success('SSL certificate ' + certName + ' deleted.');
            $scope.list();
          })
          .catch(function(err) {
            $scope.alertService.danger(err);
          });
      });
    };
    /**
     * @name  createSSL_cert
     * @description
     *
     * Create new SSL certificate
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.createSSL_cert = function(model) {
      model.cert_type = 'private'; // TODO:
      $scope
        .create(model)
        .then(function() {
          $scope.alertService.success('SSL certificate created', 5000);
          $scope.setAccountId();
        })
        .catch($scope.alertService.danger);
    };
    /**
     * @name  publishSSL_cert
     * @description
     *
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.publishSSL_cert = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmPublishModal.html', model).then(function() {
        model = $scope.prepareSSL_certToUpdate(model);
        $scope.update({
            id: modelId,
            options: 'publish'
          }, model)
          .then(function(data) {
            $scope.alertService.success('SSL certificate published', 5000);
          })
          .catch(function(err) {
            $scope.alertService.danger(err);
          });
      });
    };
    /**
     * @name  validateSSL_cert
     * @description
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.validateSSL_cert = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      model = $scope.prepareSSL_certToUpdate(model);
      $scope.update({
          id: modelId,
          options: 'verify_only'
        }, model)
        .then(function(data) {
          $scope.alertService.success('The SSL certificate is correct', 5000);
        })
        .catch(function(err) {
          $scope.alertService.danger(err.data.message || 'Oops something ment wrong', 5000);
        });
    };
    /**
     * @name  updateSSL_cert
     * @description
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.updateSSL_cert = function(model) {

      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', model).then(function() {
        model = $scope.prepareSSL_certToUpdate(model);
        $scope.update({
            id: modelId
          }, model)
          .then(function() {
            $scope.alertService.success('SSL certificate updated', 5000);
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
          !model.cert_name ||
          (!model.account_id && !$scope.model.account_id)||
          !model.public_ssl_cert ||
          !model.private_ssl_key;
      } else {
        return $scope._loading ||
          (!model.account_id && !$scope.model.account_id) ||
          !model.public_ssl_cert ||
          !model.private_ssl_key;
      }
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
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
    $scope.onAddNewCachingRule = function() {
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
        $$cachingRuleState: {
          isCollapsed: true
        }
      };
      $scope.model.rev_component_bp.caching_rules.push(_newCachingRule);
      $scope.alertService.success('A new default caching rule has been added to the end of the list. Please configure the rule before saving the configuration.');
    };
    /**
     * @name  onRemoveCachingRule
     * @description
     *
     * Deleting Caching
     *
     * @return
     */
    $scope.onRemoveCachingRule = function(index) {
      $scope.confirm('confirmModalDeleteCachingRule.html', {
          url: $scope.model.rev_component_bp.caching_rules[index].url
        })
        .then(function() {
          $scope.model.rev_component_bp.caching_rules.splice(index, 1);
          $scope.alertService.success('Caching Rule was deleted.');
        });
    };
    /**
     * @name  onUpCachingRule
     * @description
     *
     * @param  {Object} element - Caching Rule Object
     * @return {Boolean|Integer}
     */
    $scope.onUpCachingRule = function(element) {
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
    $scope.onDownCachingRule = function(element) {
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
    $scope.onCollapsAllCachingRule = function() {
      var _rules = $scope.model.rev_component_bp.caching_rules;
      angular.forEach(_rules, function(item) {
        item.$$cachingRuleState.isCollapsed = true;

      });
    };
    /**
     * @name  onExpandAllCachingRule
     * @description
     *
     * @return
     */
    $scope.onExpandAllCachingRule = function() {
      var _rules = $scope.model.rev_component_bp.caching_rules;
      angular.forEach(_rules, function(item) {
        item.$$cachingRuleState.isCollapsed = false;
      });
    };

    $scope.onChangeModeView = function() {
      $scope.isAdvancedMode = !$scope.isAdvancedMode;
    };
    /**
     * @description
     *
     * Watch by changing 'isAdvancedMode'
     * Make synce data
     *
     * @param  {Boollean} newVal
     * @param  {Boolean} oldVal
     * @return
     */
    $scope.$watch('isAdvancedMode', function(newVal, oldVal) {
      if (newVal !== oldVal && newVal === true) {
        var newModel = $scope.prepareSSL_certToUpdate($scope.model);
        $scope.modelAdvance = angular.copy(newModel);
      }
      if (newVal !== oldVal && newVal === false) {
        _.merge($scope.model, $scope.modelAdvance);
      }
    });
  }
})();
