(function () {
  'use strict';

  angular
    .module('revapm.Portal.DNSZones')
    .controller('DNSZonesCrudController', DNSZonesCrudController);

  /*@ngInject*/
  function DNSZonesCrudController($scope, $timeout,
    $localStorage,
    CRUDController,
    DNSZones,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll,
    User) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    //Set state (ui.router)
    $scope.setState('index.dnsServices.dns_zones');

    $scope.setResource(DNSZones);

    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;
    $scope.dnsZone_update_help_info = 'Use the button to send the modified configuration to the server ';

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
    $scope.$on('$stateChangeSuccess', function (state, stateTo, stateParam) {
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
      }
      if ($state.is($scope.state) || $state.is('index.accountSettings.accountresources')) {
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
          // $scope.initEdit($stateParams.id);
        } else {
          $scope.params = stateParam;
          $scope.setDefaultAccountId();
        }
      }
    });

    // $scope.filterKeys = ['zone', 'companyName', 'records_count', 'updated_by', 'updated_at'];

    $scope.companies = [];
    $scope.model = {};

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
     * @name prepareDNSZoneToUpdate
     * @description
     *
     * @param  {[type]} model_current [description]
     * @return {[type]}               [description]
     */
    $scope.prepareDNSZoneToUpdate = function (model_current) {
      var model;
      if (model_current.toJSON === undefined) {
        model = _.clone(model_current, true);
      } else {
        model = _.clone(model_current.toJSON(), true);
      }
      delete model.id;
      delete model.dns_servers;
      delete model.created_by;
      delete model.created_at;
      delete model.updated_at;
      delete model.expires_at;
      delete model.zone;
      delete model.records;
      delete model.account_id;
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

    $scope.getDNSZone = function (id) {
      $scope.get(id)
        .catch(function (err) {
          $scope.alertService.danger('Could not load DNS Zone details');
        });
    };
    /**
     * @name  deleteDNSZone
     * @description
     *
     * @param  {Object} model
     * @return
     */
    $scope.deleteDNSZone = function (model) {
      // NOTE: not delete if RO user
      if ($scope.isReadOnly() === true) {
        return;
      }
      $scope.confirm('confirmModal.html', model).then(function () {
        var zone = model.zone;
        $scope
          .delete(model)
          .then(function (data) {
            $scope.alertService.success(data);
            $scope.list()
              .then(setAccountName);
          })
          .catch($scope.alertService.danger);
      });
    };
    /**
     * @name  createDNSZone
     * @description
     *
     * Create new DNS zone
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.createDNSZone = function (model, isStay) {

      $scope
        .create(model, isStay)
        .then(function (data) {
          $scope.alertService.success(data);
          $scope.setAccountId();
        })
        .catch($scope.alertService.danger);
    };
    /**
     * @name  updateDNSZone
     * @description
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.updateDNSZone = function (model) {

      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', model).then(function () {
        model = $scope.prepareDNSZoneToUpdate(model);
        $scope.update({
          id: modelId
        }, model)
          .then($scope.alertService.success)
          .catch($scope.alertService.danger);
      });
    };

    $scope.disableSubmit = function (model, isEdit) {
      if (!isEdit) {
        return $scope._loading ||
          !model.zone ||
          (!model.account_id && !$scope.model.account_id);
      } else {
        return $scope._loading ||
          !model.zone ||
          (!model.account_id && !$scope.model.account_id);
      }
    };

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };
    /**
     * @name storeToStorage
     * @description method save the DNS zone in storage (before go to DNS Analytics)
     */
    $scope.storeToStorage = function (zone) {
      User.selectDNSZone({ id: zone.id, zone: zone.zone, account_id: zone.account_id });
    };

    $scope.clearForm = function () {
      $scope.clearModel();
    };

  }
})();
