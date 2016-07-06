(function() {
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
    $anchorScroll) {
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

    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function(state, stateTo, stateParam) {
      if ($state.is($scope.state)) {
        $scope.list()
          .then(setAccountName)
          .then(function() {
            if ($scope.elementIndexForAnchorScroll) {
              setTimeout(function() {
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
          $scope.params = $stateParams;
          $scope.setDefaultAccountId();
        }
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
     * @name prepareDNSZoneToUpdate
     * @description
     *
     * @param  {[type]} model_current [description]
     * @return {[type]}               [description]
     */
    $scope.prepareDNSZoneToUpdate = function(model_current) {
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
      delete model.zone;
      delete model.records;
      delete model.account_id;
      // delete model.last_published_ssl_config_version;
      // model.zone_body ={};
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

    $scope.getDNSZone = function(id) {
      $scope.get(id)
        .catch(function(err) {
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
    $scope.deleteDNSZone = function(model) {
      $scope.confirm('confirmModal.html', model).then(function() {
        var zone = model.zone;
        $scope
          .delete(model)
          .then(function(data) {
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
    $scope.createDNSZone = function(model, isStay) {

      $scope
        .create(model, isStay)
        .then(function(data) {
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
    $scope.updateDNSZone = function(model) {

      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', model).then(function() {
        model = $scope.prepareDNSZoneToUpdate(model);
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

    // TODO: add correct rules or delete
    $scope.disableSubmit = function(model, isEdit) {
      if (!isEdit) {
        return $scope._loading ||
          !model.cert_name ||
          (!model.account_id && !$scope.model.account_id) ||
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
  }
})();
