(function() {
  'use strict';

  angular
    .module('revapm.Portal.SSLNames')
    .controller('SSLNamesCrudController', SSLNamesCrudController);

  /*@ngInject*/
  function SSLNamesCrudController($scope, $timeout,
    $localStorage,
    CRUDController,
    SSLNames,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $uibModal,
    $anchorScroll) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    //Set state (ui.router)
    $scope.setState('index.webApp.ssl_names');

    $scope.setResource(SSLNames);

    $scope.SSL_NAMES_VERIFICATION_METHODS = $config.SSL_NAMES_VERIFICATION_METHODS;
    $scope.REGUALR_WILDCARD_DOMAIN_FIELD = $config.PATTERNS.WILDCARD_DOMAIN_FIELD; // TODO: Update
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;


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

    $scope.filterKeys = ['cert_name', 'companyName', 'expires_at', 'domains', 'verified', 'published', 'updated_by', 'updated_at'];

    $scope.locations = [];
    $scope.companies = [];
    $scope.model = {};
    // TODO: delete after test - demo data
    $scope.model.ssl_name = 'test1.revamp.com';
    $scope.model.account_id = '5714b425fce0aa6415edd853';

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
     * @name  onVerifyDomain
     * @description
     *   email validation
     * @param  {[type]} e     [description]
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.onVerifyDomain = function(e, model) {
      function confirmVerifySSLName() {
        // console.log(model);
        var _model = {
          title: title,
          data: model,
          okBtnTitle: okBtnTitle,
          infoTemplatePath: 'parts/ssl_names/modal/validation-info-' + model.verification_method + '.tpl.html'
        };

        $scope.confirm('confirmVerifyDomainModal.html', _model)
          .then(function onSuccessCloseModalDialog(result) {
            console.log(result, model.verify, _model);
            SSLNames.verify({
                id: model.id,
                url: _model.verify.url
              }).$promise
              .then(showMessageSuccessValidationSSLNameByEmail,
                function(data) {
                  showMessageFailedValidationSSLNameByEmail(data.data);
                })
              .catch($scope.alertService.danger)
              .finally(function() {
                $scope._loading = true;
              });
            // 2. show modal window with result
            // $scope
            //   .delete(model)
            //   .then(function(data) {
            //     $scope.alertService.success(data);
            //     $scope.list()
            //       .then(setAccountName);
            //   })
            //   .catch($scope.alertService.danger);
          });
      }


      function showMessageSuccessValidationSSLNameByEmail(info) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'parts/ssl_names/modal/modal-message-verification-success.tpl.html',
          controller: 'ConfirmModalInstanceCtrl',
          size: 'md',
          resolve: {
            model: info
          }
        });
        return modalInstance.result;
      }

      function showMessageFailedValidationSSLNameByEmail(info) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'parts/ssl_names/modal/modal-message-verification-error.tpl.html',
          controller: 'ConfirmModalInstanceCtrl',
          size: 'md',
          resolve: {
            model: info
          }
        });
        return modalInstance.result;
      }



      if (e) {
        e.preventDefault();
      }
      if (!model.verified) {
        // open modal dialog
        var title = 'Confirm';
        var okBtnTitle = 'Ok';
        switch (model.verification_method) {
          case 'url':
            title = 'URL Verification';
            okBtnTitle = 'Verify HTML Tag';
            confirmVerifySSLName();
            break;
          case 'dns':
            title = 'DNS Verification';
            okBtnTitle = 'Verify TXT Record';
            confirmVerifySSLName();
            break;
          case 'email':
            title = 'Email Verification';
            $scope._loading = true;
            SSLNames.verify({
                id: model.id
              }).$promise
              .then(showMessageSuccessValidationSSLNameByEmail,
                function(data) {
                  showMessageFailedValidationSSLNameByEmail(data.data);
                })
              .catch($scope.alertService.danger)
              .finally(function() {
                $scope._loading = true;
              });

            break;
          default:

            break;
        }

      }
    };

    /**
     * @name  onCreateSSLName
     * @description
     *  Create new SSL Names
     * @param  {[type]}  model  [description]
     * @param  {Boolean} isStay [description]
     * @return {[type]}         [description]
     */
    $scope.onCreateSSLName = function(model, isStay) {
      // Check additional parameters
      // console.log(model)
      switch (model.verification_method) {
        case 'dns':
        case 'url':
          // 1. Confirm
          $scope.confirm('confirmCreateSSLNameModal.html', model)
            .then(function(data) {
              // console.log('====', data)
              // var _model = angular.copy(model);
              var _model = {
                account_id: model.account_id,
                ssl_name: model.ssl_name,
                verification_method: model.verification_method
              };
              if (!!model.verification_email) {
                _model.verification_email = model.verification_email;
              }
              $scope
                .create(_model, isStay)
                .then(function(data) {
                  $scope.alertService.success(data);

                  $scope.onVerifyDomain(null, {
                    id: data.object_id,
                    verified: false,
                    account_id: model.account_id,
                    ssl_name: model.ssl_name,
                    verification_method: model.verification_method
                  });
                })
                .catch($scope.alertService.danger);
            });
          //
          break;
        case 'email':
          verificationSSLNameByEmail(model);
          break;
        default:
          $scope.alertService.danger('Verification method unknown');
          break;
      }

      function verificationSSLNameByEmail(model) {
        // Make call
        $scope._loading = true;
        SSLNames.approvers({
            ssl_name: model.ssl_name
          })
          .$promise.then(
            function(data) {
              // var data = [{
              //   'ApproverEmail': 'hello@revamp.com'
              // }, {
              //   'ApproverEmail': 'admin@test1.revamp.com'
              // }, {
              //   'ApproverEmail': 'administrator@test1.revamp.com'
              // }, {
              //   'ApproverEmail': 'hostmaster@test1.revamp.com'
              // }, {
              //   'ApproverEmail': 'postmaster@test1.revamp.com'
              // }, {
              //   'ApproverEmail': 'webmaster@test1.revamp.com'
              // }, {
              //   'ApproverEmail': 'admin@revamp.com'
              // }, {
              //   'ApproverEmail': 'administrator@revamp.com'
              // }, {
              //   'ApproverEmail': 'hostmaster@revamp.com'
              // }, {
              //   'ApproverEmail': 'postmaster@revamp.com'
              // }, {
              //   'ApproverEmail': 'webmaster@revamp.com'
              // }];

              // console.log(data);
              var template = 'parts/ssl_names/modal/approvers-emails.tpl.html';
              var modelApprove = data;
              // TODO: delete after test
              // {
              //   approvers: _.map(data, function(item) {
              //     return {
              //       approver_email: item.ApproverEmail
              //     }
              //   })
              // }
              $scope.confirm(template, modelApprove)
                .then(function(data) {
                  // console.log(data, model)
                  var createdSSLName = {
                    'account_id': model.account_id,
                    'ssl_name': model.ssl_name,
                    'verification_method': model.verification_method,
                    'verification_email': modelApprove.verification_email
                  };
                  $scope.create(createdSSLName, model)
                    .then($scope.alertService.success)
                    .catch($scope.alertService.danger);
                });

            })
          .catch($scope.alertService.danger)
          .finally(function() {
            $scope._loading = false;
          });
      }
    };

    $scope.onClickRefresh = function() {
      $scope._loading = true;
      $scope.list()
        .then(setAccountName)
        .finally(function() {
          $scope._loading = false;
        });
    };

    /**
     * @name  deleteSSLCert
     * @description
     *
     * @param  {Object} model
     * @return
     */
    $scope.deleteSSLName = function(model) {
      $scope.confirm('confirmModal.html', model)
        .then(function() {
          var certName = model.ssl_name;
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

    ///===============================
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



    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };
  }
})();
