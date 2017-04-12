// TODO: NOT FINISHED
(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFRules')
    .controller('WAFRulesCrudController', WAFRulesCrudController);

  /*@ngInject*/
  function WAFRulesCrudController($scope, $timeout,
    $localStorage,
    CRUDController,
    WAF_Rules,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll,
    User,
    $uibModal) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    //Set state (ui.router)
    $scope.setState('index.webApp.waf_rules');

    $scope.setResource(WAF_Rules);

    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;

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
        });
      } else {
        return $q.when();
      }
    }

    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function (state) {
      var data = null;
      // NOTE: set filter params for specific state
      if ($state.is($scope.state)) {
        $scope.initList();
      } else {
        $scope.clearModel();
      }
    });
    /**
     * @name initList
     * @description method init call data
     */
    $scope.initList = function () {
      var data = {
        filters: {
          rule_type: 'customer'
        }
      };
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
    };

    $scope.initNew = function () {
      if ($scope.auth.isRevadmin() !== true) {
        $scope.model.rule_type = 'customer';
        $scope.model.visibility = 'public';
      }
      $scope.setAccountId();
    };

    $scope.filterKeys = ['rule_name', 'companyName', 'expires_at', 'domains', 'updated_at'];

    $scope.locations = [];
    $scope.companies = [];
    $scope.model = {};

    $scope.rule_types = [{
      id: 'builtin',
      typeName: 'NUUBIT WAF Rule'
    }, {
      id: 'customer',
      typeName: 'Customer WAF Rule'
    }];

    $scope.visibility_types = [{
      id: 'public',
      typeName: 'Public WAF Rule'
    }, {
      id: 'hidden',
      typeName: 'Hidden WAF Rule'
    }];

    $scope.fetchCompanies = function (companyIds) {
      var promises = [];
      companyIds.forEach(function (id) {
        promises.push(Companies.get({
          id: id
        }).$promise);
      });
      $q.all(promises).then(function (data) {
        $scope.companies = data;
      });
    };
    /**
     * @name prepareWARRuleToUpdate
     * @description
     *
     * @param  {[type]} model_current [description]
     * @return {[type]}               [description]
     */
    $scope.prepareWARRuleToUpdate = function (model_current) {
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
      delete model.updated_by;
      delete model.expires_at;
      delete model.domains;
      delete model.operation;
      delete model.newRuleName;

      return model;
    };

    $scope.setAccountId = function () {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        Companies.query(function (list) {
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

    $scope.getWAFRule = function (id) {
      $scope.get(id)
        .then(function () {
          // NOTE: auto set Dirty attribute for fields (validation exists data)
          var _fields = ['rule_name', 'rule_type'];
          angular.forEach(_fields, setDirty);

          function setDirty(field) {
            if (!!$scope.editForm[field]) {
              $scope.editForm[field].$setDirty();
            }
          }
        })
        .catch(function (err) {
          $scope.alertService.danger('Could not load WAF Rule details');
        });
    };
    /**
     * @name  deleteWAFRule
     * @description
     *
     * @param  {Object} model
     * @return
     */
    $scope.deleteWAFRule = function (model) {
      // NOTE: not delete if RO user
      if ($scope.isReadOnly() === true) {
        return false;
      }
      $scope.confirm('confirmModal.html', model).then(function () {
        var ruleName = model.rule_name;
        $scope
          .delete(model)
          .then(function (data) {
            $scope.alertService.success(data);
            $scope.initList();
          })
          .catch($scope.alertService.danger);
      });
    };
    /**
     * @name  createWAFRule
     * @description
     *
     * Create new WAF Rule
     *
     * @param  {Object} model
     * @return {Boolean} isStay
     */
    $scope.createWAFRule = function (model, isStay) {
      if ($scope._loading) {
        return false;
      }
      $scope._loading = true;
      var createModel = $scope.prepareWARRuleToUpdate(model);
      $scope
        .create(createModel, isStay)
        .then(function (data) {
          $scope.alertService.success(data);
          $scope.setAccountId();
          if (isStay === true) {
            $scope.clearModel();
            $scope.initNew();
          }
        })
        .catch($scope.alertService.danger);
    };
    /**
     * @name  publishWAFRule
     * @description
     *
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.publishWAFRule = function (model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmPublishModal.html', model).then(function () {
        model = $scope.prepareWARRuleToUpdate(model);
        $scope.update({
            id: modelId,
            options: 'publish'
          }, model)
          .then($scope.alertService.success)
          .catch($scope.alertService.danger);
      });
    };
    /**
     * @name  validateWAFRule
     * @description
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.validateWAFRule = function (model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      model = $scope.prepareWARRuleToUpdate(model);
      $scope.update({
          id: modelId,
          options: 'verify_only'
        }, model)
        .then($scope.alertService.success)
        .catch($scope.alertService.danger);
    };
    /**
     * @name  updateWAFRule
     * @description
     *
     * @param  {[type]} model Data for update
     * @return {[type]}       [description]
     */
    $scope.updateWAFRule = function (model) {

      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', model).then(function () {
        model = $scope.prepareWARRuleToUpdate(model);
        $scope.update({
            id: modelId
          }, model)
          .then($scope.alertService.success)
          .catch($scope.alertService.danger);
      });
    };


    /**
     * @name disableSubmit
     * @description check model
     */
    $scope.disableSubmit = function (model, isEdit) {
      if (!isEdit) {
        return $scope._loading ||
          !model.rule_name ||
          (!model.account_id && !$scope.model.account_id) ||
          !model.rule_type ||
          !model.visibility;
      } else {
        return $scope._loading ||
          (!model.account_id && !$scope.model.account_id) ||
          !model.rule_type ||
          !model.visibility;
      }
    };

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };

    /**
     * @name openViewDialogRule
     * @description method for display WAR Rule Body
     */
    $scope.openViewDialogRule = function (e, item) {
      if ($scope._loading) {
        return false;
      }
      $scope._loading = true;
      $scope.alertService.clear();
      $scope.get(item.id)
        .then(function (data) {
          $scope.model = data;
          $scope.confirm('parts/waf_rules/dialog/view-waf-rule.tpl.html', $scope.model);
        })
        .catch($scope.alertService.danger)
        .finally(function () {
          $scope._loading = false;
        });
    };
    /**
     * @name onDuplicateWAFRule
     * @description method for create duplicate WAR Rule
     */
    $scope.onDuplicateWAFRule = function (e, item) {
      if ($scope._loading || $scope.isReadOnly()) { // NOTE: not duplicate if RO user
        return false;
      }
      $scope._loading = true;
      $scope.alertService.clear();
      $scope.get(item.id)
        .then(function (data) {
          $scope.model = data;
          $scope.model.newRuleName = '';
          return $scope.confirm('confirmDuplicateModal.html', $scope.model)
            .then(function (data) {
              var newWafRule = {
                account_id: $scope.model.account_id,
                rule_name: $scope.model.newRuleName,
                rule_body: $scope.model.rule_body,
                rule_type: $scope.model.rule_type,
                visibility: $scope.model.visibility,
                comment: $scope.model.comment
              };
              var isStay = true;
              return $scope
                .create(newWafRule, isStay)
                .then(function (data) {
                  // TODO: show custom message ???
                  $scope.alertService.success(data);
                  $scope.setAccountId();
                  $scope.initList();
                })
                .catch($scope.alertService.danger);
            }, function (err) {
              if (err !== 'cancel') {
                return err;
              }
            });
        })
        .catch($scope.alertService.danger)
        .finally(function () {
          $scope._loading = false;
        });
    };
  }
})();
