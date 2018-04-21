(function () {
  'use strict';

  angular
    .module('revapm.Portal.Companies')
    .controller('CompaniesCrudController', CompaniesCrudController);

  /*@ngInject*/
  function CompaniesCrudController($scope, CRUDController, Companies, User,
    BillingPlans, Vendors, $injector, $stateParams,
    $config, $state, $anchorScroll, $uibModal, $localStorage) {
    var STORAGE_NAME_LIST_FILTER_ = 'accounts_list_filter';
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    // Set resource to work with data
    $scope.setResource(Companies);
    //Set state (ui.router)
    $scope.setState('index.accountSettings.companies');

    $scope.setStorageNameForFilterSettings(STORAGE_NAME_LIST_FILTER_);

    $scope.COMPANY_NAME = $config.PATTERNS.COMPANY_NAME;
    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;

    $scope.storeToStorage = function (model) {
      $localStorage.selectedCompany = model;
    };

    if ($state.is('index.accountSettings.accountresources')) {
      // child accounts
      $scope.filter.limit = $config.MIN_LIMIT_RECORDS_IN_TABLE;
      $localStorage[STORAGE_NAME_LIST_FILTER_].limit = $scope.filter.limit;
      var data = {
        filters: {
          parent_account_id: !User.getSelectedAccount() ? null : User.getSelectedAccount().acc_id
        }
      };
      if (!data.filters.parent_account_id) {
        delete data.filters;
      }
      $scope.list(data)
        .then(function (res) {
          $scope.records = res;           
        });
    } else {
      $scope.filter.limit = $config.DEFAULT_LIMIT_RECORDS_IN_TABLE;
      $localStorage[STORAGE_NAME_LIST_FILTER_].limit = $scope.filter.limit;
    }

    $scope.companies = [];
    
    // Fetch list of users
    $scope.$on('$stateChangeSuccess', function (state) {   
      $scope.model = $localStorage.selectedCompany;
      if ($state.is($scope.state)) {
        //NOTE: use last stored filter data
        if($localStorage[STORAGE_NAME_LIST_FILTER_]){
          angular.extend($scope.filter,$localStorage[STORAGE_NAME_LIST_FILTER_]);
          delete $scope.filter.filter; // NOTE: not use data last search
        } else {
        angular.extend($scope.filter,{
            predicate: 'updated_at',
            reverse: true
          });
        }
        $scope.list()
          .then(function () {            
            if ($scope.elementIndexForAnchorScroll !== undefined) {
              setTimeout(function () {
                $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
                $scope.$digest();
              }, 500);
            }
            return BillingPlans.query().$promise;

          })
          .then(function (res) {
            $scope.records = $scope.records.map(function (r) {
              var idx = _.findIndex(res, {
                id: r.billing_plan
              });
              if (idx >= 0) {
                r.subscription_name = res[idx].name;
                return r;
              }
              r.subscription_name = 'Manual';
              return r;
            });
          });
      }

      $scope.list().then(function (res) {
        $scope.listOfAccs = [];
        $scope.companies = res;
        $scope.parentCompanies = _.filter($scope.companies, function (acc) {
          return !acc.parent_account_id;
        });

        var emptyParent = {
          companyName: '--- No Parent Account Selected ---',
          id: null
        };
        $scope.parentCompanies.splice(0, 0, emptyParent);

        $scope.companies.forEach(function (comp) {
          if (comp.parent_account_id && comp.parent_account_id !== '') {
            if ($localStorage.userMainAccount && (comp.parent_account_id === $localStorage.userMainAccount.id)) {
              comp.parentAccount = $localStorage.userMainAccount;
              comp.parentAccountName = $localStorage.userMainAccount.companyName;
            } else {
              Companies.get({ id: comp.parent_account_id }).$promise.then(function (parentAcc) {
                comp.parentAccount = parentAcc;
                comp.parentAccountName = parentAcc.companyName;
              });
            }            
          }
        });
      });

      // only revadmin
      if ($scope.auth.isRevadmin()) {
        Vendors.query().$promise.then(function (response) {
          $scope.vendorProfiles = response;
        });
      }
    });

    $scope.filterKeys = ['companyName', 'comment', 'createdBy', 'updated_at', 'subscription_name', 'subscription_state', 'created_at', 'parentAccountName'];
    /**
     * @name  getCompany
     * @description
     *
     *      Get Account by id
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    $scope.getCompany = function (id) {
      $scope.get(id)
        .catch($scope.alertService.danger);
    };

    $scope.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };
    /**
     * @name  deleteCompany
     * @description
     *
     * @param  {Object} model [description]
     * @return
     */
    $scope.deleteCompany = function (model) {
      if ($scope.isReadOnly() === true) {
        return;
      }
      $scope
        .confirm('confirmModal.html', model)
        .then(function () {
          return $scope
            .delete(model)
            .then($scope.alertService.success)
            .catch($scope.alertService.danger);
        });
    };
    /**
     * @name  createCompany
     * @description
     *
     * @param  {Object} model [description]
     * @return
     */
    $scope.createCompany = function (model) {
      if (!model) {
        return;
      }
      $scope
        .create(model)
        .then(function (data) {
          $scope.clearModel();
          $scope.alertService.success(data);
          $scope.auth.reloadUser();
        })
        .catch($scope.alertService.danger);
    };

    $scope.updateCompany = function (model) {
      $scope.update(model)
        .then($scope.alertService.success)
        .catch($scope.alertService.danger);
    };

    $scope.onGoToUsageReport = function (model) {
      // NOTE: make data format for using into state 'index.billing.usage'
      model.acc_id = model.id;
      model.acc_name = model.companyName;
      model.plan_id = model.billing_plan;
      model.billing_plan = model.billing_plan;
      User.selectAccount(model);
      $state.go('index.billing.usage');
    };

    $scope.onGoToBillingPlans = function (model) {
      // NOTE: make data format for using into state 'index.billing.plans'
      model.acc_id = model.id;
      model.acc_name = model.companyName;
      model.plan_id = model.billing_plan;
      model.billing_plan = model.billing_plan;
      User.selectAccount(model);
      $state.go('index.billing.plans');
    };

    $scope.onGoToBillingStatement = function (model) {
      // NOTE: make data format for using into state 'index.billing.statements'
      model.acc_id = model.id;
      model.acc_name = model.companyName;
      model.plan_id = model.billing_plan;
      model.billing_plan = model.billing_plan;
      User.selectAccount(model);
      $state.go('index.billing.statements');
    };

    $scope.onVendorUpdate = function (account) {

      var modalInstance = $uibModal.open({
        templateUrl: 'parts/companies/change-vendor.html',
        controller: 'ChangeAccountVendorModalController',
        size: 'md',
        resolve: {
          model: {
            vendorProfiles: $scope.vendorProfiles,
            currentVendor: account.vendor_profile
          }
        }
      });

      modalInstance.result.then(function (result) {
        Vendors.updateAccountVendor({
          account_id: account.id,
          vendor: result
        }).$promise
          .then(function (respnse) {
            account.vendor_profile = result;
            $scope.alertService.success(respnse.message);
          })
          .catch($scope.alertService.danger);
      });
    };

    $scope.clearForm = function () {
      $scope.clearModel();
    };
  }
})();
