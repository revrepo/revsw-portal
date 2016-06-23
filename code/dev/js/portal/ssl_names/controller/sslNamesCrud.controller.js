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

    $scope.filterKeys = ['ssl_name', 'companyName', 'expires_at', 'domains', 'verified', 'published', 'updated_by', 'updated_at'];

    $scope.locations = [];
    $scope.companies = [];
    $scope.model = {};

    /**
     * @name setAccountName
     * @description
     *   Update information about Account Name for Reseller and RevAdmin
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
      } else {
        // NOTE: clear model for create new SSL Name
        $scope.model.ssl_name = '';
        $scope.model.verification_method = null;
      }
    });

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
     *
     * @param  {[type]} e     [description]
     * @param  {[type]} model [description]
     * @return {[type]}       [description]
     */
    $scope.onVerifyDomain = function(e, model) {
      if (e) {
        e.preventDefault();
      }

      if (!!model.verified && model.verified === true) {
        return;
      }

      /**
       * @name  confirmVerifySSLName
       * @description
       *   Internal method
       * @return {[type]} [description]
       */
      function confirmVerifySSLName(params) {
        var _model = {
          title: params.title,
          data: params.model,
          okBtnTitle: params.okBtnTitle,
          infoTemplatePath: 'parts/ssl_names/modal/validation-info-' + params.model.verification_method + '.tpl.html'
        };

        return $scope.confirm('confirmVerifyDomainModal.html', _model)
          .then(function onSuccessCloseModalDialog(result) {
            SSLNames.verify({
                id: params.model.id,
                url: _model.verify.url
              }).$promise
              .then(showMessageSuccessValidationSSLNameByEmail,
                function(data) {
                  showMessageFailedValidationSSLName(data.data);
                })
              .then($scope.onClickRefresh) // NOTE: refresh list for update status
              .catch($scope.alertService.danger)
              .finally(function() {
                $scope._loading = false;
              });
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

      function showMessageFailedValidationSSLName(info) {
        if (!!info.error && !angular.isArray(info.error)) {
          info.error = [info.error];
        }
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
      // 1. GET SSL Name detaild by id
      SSLNames.get({
          id: model.id
        }).$promise
        .then(function(model) {
          // Prepare parameters and open modal dialog
          var params = {
            title: 'Confirm',
            okBtnTitle: 'Ok',
            model: model
          };
          switch (model.verification_method) {
            case 'url':
              params.title = 'URL Verification';
              params.okBtnTitle = 'Verify HTML Tag';
              confirmVerifySSLName(params);
              break;
            case 'dns':
              params.title = 'DNS Verification';
              params.okBtnTitle = 'Verify TXT Record';
              confirmVerifySSLName(params);
              break;
            case 'email':
              $scope._loading = true;
              SSLNames.verify({
                  id: model.id
                }).$promise
                .then(function successGetDetails(data) {
                    if (data.message && data.message === 'Waiting for approval') {
                      showMessageFailedValidationSSLName(data).then($scope.onClickRefresh);
                    } else {
                      showMessageSuccessValidationSSLNameByEmail(data).then($scope.onClickRefresh);
                    }
                  },
                  function errorGetDetails(data) {
                    // NOTE: server error display like standart error
                    if (data.status === 500) {
                      $scope.alertService.danger(data);
                    } else {
                      // NOTE: show error information in modal window
                      showMessageFailedValidationSSLName(data.data).then($scope.onClickRefresh);
                    }
                  })
                .catch($scope.alertService.danger)
                .finally(function() {
                  $scope._loading = false;
                });
              break;
            default:
              //
              break;
          }

        })
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
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
      switch (model.verification_method) {
        case 'dns':
        case 'url':
          // 1. Confirm creating SSL Name
          $scope.confirm('confirmCreateSSLNameModal.html', model)
            .then(function(data) {
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
                  $state.model = {};
                  // Auto start Verify
                  $scope.onVerifyDomain(null, {
                    id: data.object_id
                  });
                })
                .catch($scope.alertService.danger);
            });
          break;
        case 'email':
          verificationSSLNameByEmail(model);
          break;
        default:
          $scope.alertService.danger('Verification method unknown');
          break;
      }
      /**
       * @verificationSSLNameByEmail
       * @description
       *
       * @param  {Object} model
       * @return {[type]}
       */
      function verificationSSLNameByEmail(model) {
        $scope._loading = true;
        var modelApprove = {
          approvers: []
        };
        var createdSSLName = {};
        SSLNames.approvers({
            ssl_name: model.ssl_name
          }).$promise
          .then(
            function showApproversEmails(data) {
              modelApprove.approvers = data;
              return $scope.confirm('parts/ssl_names/modal/approvers-emails.tpl.html', modelApprove)
                .then(function() {
                  return {
                    'account_id': model.account_id,
                    'ssl_name': model.ssl_name,
                    'verification_method': model.verification_method,
                    'verification_email': modelApprove.verification_email
                  };
                });
            })
          .then(function createSSLName(createdSSLName) {
            return $scope.create(createdSSLName, true);
          })
          .then(function showMessageSuccessCreate() {
            return $scope.confirm('parts/ssl_names/modal/modal-message-succes-create.tpl.html', {
              verification_email: modelApprove.verification_email
            });
          })
          .then(function goBackToList() {
            $state.model = {};
            $state.go('.^');
          })
          .catch(function broke(data) {
            if (data !== 'cancel') {
              $scope.alertService.danger(data);
            }
          })
          .finally(function() {
            $scope._loading = false;
          });
      }
    };

    /**
     * @name onClickRefresh
     * @description
     *   Refresh data in table
     * @return {[type]} [description]
     */
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

    $scope.storeToStorage = function(model) {
      $localStorage.selectedDomain = model;
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };
  }
})();
