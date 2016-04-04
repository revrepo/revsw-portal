(function() {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .controller('DomainsCrudController', DomainsCrudController);

  /*@ngInject*/
  function DomainsCrudController($scope,
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
    DomainsCachingRuleDefault) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    //Set state (ui.router)
    $scope.setState('index.webApp.domains');

    $scope.setResource(DomainsConfig);

    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function(state) {
      if ($state.is($scope.state)) {
        $scope.list()
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

    $scope.filterKeys = ['domain_name', 'cname', 'updated_at'];

    $scope.locations = [];
    $scope.companies = [];
    $scope.model = {};

    // fetch list of locations
    $scope.fetchLocations = function() {
      $http
        .get($config.API_URL + '/locations/firstmile')
        .then(function(data) {
          if (data.status === $config.STATUS.OK) {
            $scope.locations = data.data;
          }
        });
    };

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

    $scope.prepareSimpleDomainUpdate = function(model_current) {
      var model = _.clone(model_current.toJSON(), true);
      if (model.rev_component_bp) {
        delete model.rev_component_bp.cache_opt_choice;
        delete model.rev_component_bp.certificate_urls;
        delete model.rev_component_bp.ssl_certificates;
        if (model.rev_component_bp.caching_rules) {
          angular.forEach(model.rev_component_bp.caching_rules, function(item) {
            delete item.$cachingRuleState;
          });
        }
      }
      if (model.domain_name) {
        delete model.domain_name;
      }
      delete model.cname;
      delete model.origin_protocol;
      delete model.id;
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
    $scope.fetchLocations();

    $scope.getDomain = function(id) {
      $scope.get(id)
        .then(validateDomainProperties)
        .catch(function(err) {
          $scope.alertService.danger('Could not load domain details');
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
        var _domain_default_property = {
          proxy_timeout: 30,
          domain_aliases: [],
          origin_secure_protocol: 'use_end_user_protocol',
          rev_component_co: {
            enable_rum: false
          }
        };
        // NOTE: set default properties
        _.defaultsDeep($scope.model, _domain_default_property);

        angular.forEach($scope.model.rev_component_bp.caching_rules, function(item) {
          // NOTE: add parameter for collapsed item
          angular.extend(item, {
            $cachingRuleState: {
              isCollapsed: true
            }
          });
        });
      }
    };

    $scope.deleteDomain = function(model) {
      $scope.confirm('confirmModal.html', model).then(function() {
        var domainName = model.domain_name;
        $scope
          .delete(model)
          .then(function(data) {
            $scope.alertService.success('Domain ' + domainName + ' deleted.');
            $scope.list();
          })
          .catch(function(err) {
            $scope.alertService.danger(err);
          });
      });
    };

    $scope.createDomain = function(model) {
      $scope
        .create(model)
        .then(function() {
          $scope.alertService.success('Domain created', 5000);
          $scope.setAccountId();
        })
        .catch($scope.alertService.danger);
    };

    $scope.publishDomain = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmPublishModal.html', model).then(function() {
        model = $scope.prepareSimpleDomainUpdate(model);
        $scope.update({
            id: modelId,
            options: 'publish'
          }, model)
          .then(function(data) {
            $scope.alertService.success('Domain configuration published', 5000);
          })
          .catch(function(err) {
            $scope.alertService.danger(err);
          });
      });
    };

    $scope.validateDomain = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      model = $scope.prepareSimpleDomainUpdate(model);
      $scope.update({
          id: modelId,
          options: 'verify_only'
        }, model)
        .then(function(data) {
          $scope.alertService.success('The domain configuration is correct', 5000);
        })
        .catch(function(err) {
          $scope.alertService.danger(err.data.message || 'Oops something ment wrong', 5000);
        });
    };

    $scope.updateDomain = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', model).then(function() {
        model = $scope.prepareSimpleDomainUpdate(model);
        $scope.update({
            id: modelId
          }, model)
          .then(function() {
            $scope.alertService.success('Domain updated', 5000);
          })
          .catch(function(err) {
            $scope.alertService.danger(err.data.message || 'Oops something ment wrong', 5000);
          });
      });
    };

    $scope.storeToStorage = function(model) {
      $localStorage.selectedDomain = model;
    };


    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

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
        $cachingRuleState: {
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
        item.$cachingRuleState.isCollapsed = true;

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
        item.$cachingRuleState.isCollapsed = false;
      });
    };
  }
})();
