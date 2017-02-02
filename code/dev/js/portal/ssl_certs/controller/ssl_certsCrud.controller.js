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
          $scope.alertService.danger(err);
        }
      }
    };
    //Set state (ui.router)
    $scope.setState('index.webApp.ssl_certs');

    $scope.setResource(SSL_certs);

    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;
    $scope.sslCert_update_help_info = 'Use the button to send the modified configuration to the staging environment ' +
      'which can be used to test the new configuration before sending it to the global network (and making it ' +
      'available for all your end users). Please see “Web -> Staging Env.” section for details about the staging ' +
      'environment and how to use it.';
    $scope.sslCert_publish_help_info = 'Once you have tested the updated configuration in the staging environment ' +
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
    $scope.$on('$stateChangeSuccess', function(state) {
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
      }
    });

    $scope.filterKeys = ['cert_name', 'companyName', 'expires_at', 'domains', 'updated_at'];

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
     * @name prepareSSLCertToUpdate
     * @description
     *
     * @param  {[type]} model_current [description]
     * @return {[type]}               [description]
     */
    $scope.prepareSSLCertToUpdate = function(model_current) {
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
        .then(function() {
          // NOTE: auto set Dirty attribute for fields (validation exists data)
          var _fields = ['cert_name', 'public_ssl_cert'];
          angular.forEach(_fields, setDirty);

          function setDirty(field) {
            if (!!$scope.editForm[field]) {
              $scope.editForm[field].$setDirty();
            }
          }
        })
        .catch(function(err) {
          $scope.alertService.danger('Could not load SSL certificate details');
        });

    };
    /**
     * @name  deleteSSLCert
     * @description
     *
     * @param  {Object} model
     * @return
     */
    $scope.deleteSSLCert = function(model) {
      // NOTE: not delete if RO user
      if($scope.isReadOnly() === true){
        return;
      }
      $scope.confirm('confirmModal.html', model).then(function() {
        var certName = model.cert_name;
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
     * @name  createSSLCert
     * @description
     *
     * Create new SSL certificate
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.createSSLCert = function(model, isStay) {
      model.cert_type = 'private'; // TODO:
      $scope
        .create(model, isStay)
        .then(function(data) {
          $scope.alertService.success(data);
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
    $scope.publishSSLCert = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmPublishModal.html', model).then(function() {
        model = $scope.prepareSSLCertToUpdate(model);
        $scope.update({
            id: modelId,
            options: 'publish'
          }, model)
          .then($scope.alertService.success)
          .catch($scope.alertService.danger);
      });
    };
    /**
     * @name  validateSSL_cert
     * @description
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.validateSSLCert = function(model) {
      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      model = $scope.prepareSSLCertToUpdate(model);
      $scope.update({
          id: modelId,
          options: 'verify_only'
        }, model)
        .then($scope.alertService.success)
        .catch($scope.alertService.danger);
    };
    /**
     * @name  updateSSL_cert
     * @description
     *
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.updateSSLCert = function(model) {

      if (!model) {
        return;
      }
      if (!model.id) {
        model.id = $stateParams.id;
      }
      var modelId = model.id;
      $scope.confirm('confirmUpdateModal.html', model).then(function() {
        model = $scope.prepareSSLCertToUpdate(model);
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
