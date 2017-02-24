(function() {
  'use strict';

  angular
    .module('revapm.Portal.Companies')
    .controller('CompaniesCrudController', CompaniesCrudController);

  /*@ngInject*/
  function CompaniesCrudController($scope, CRUDController, Companies, User, BillingPlans, Vendors, $injector, $stateParams, $config, $state, $anchorScroll, $uibModal) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    // Set resource to work with data
    $scope.setResource(Companies);
    //Set state (ui.router)
    $scope.setState('index.accountSettings.companies');

    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;


    // Fetch list of users
    $scope.$on('$stateChangeSuccess', function(state) {
      if ($state.is($scope.state)) {
        $scope.list()
          .then(function() {
            if ($scope.elementIndexForAnchorScroll !== undefined) {
              setTimeout(function() {
                $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
                $scope.$digest();
              }, 500);
            }
            return BillingPlans.query().$promise;

          })
          .then(function(res) {
            $scope.records = $scope.records.map(function(r) {
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

      Vendors.query().$promise.then(function(response){
        $scope.vendorProfiles = response;
      });
    });

    $scope.filterKeys = ['companyName', 'comment', 'createdBy', 'updated_at', 'subscription_name', 'subscription_state', 'created_at'];
    /**
     * @name  getCompany
     * @description
     *
     *      Get Account by id
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    $scope.getCompany = function(id) {
      $scope.get(id)
        .catch($scope.alertService.danger);
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };
    /**
     * @name  deleteCompany
     * @description
     *
     * @param  {Object} model [description]
     * @return
     */
    $scope.deleteCompany = function(model) {
      if($scope.isReadOnly() === true){
        return;
      }
      $scope
        .confirm('confirmModal.html', model)
        .then(function() {
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
    $scope.createCompany = function(model) {
      if (!model) {
        return;
      }
      $scope
        .create(model)
        .then(function(data) {
          $scope.alertService.success(data);
          $scope.auth.reloadUser();
        })
        .catch($scope.alertService.danger);
    };

    $scope.updateCompany = function(model) {
      $scope.update(model)
        .then($scope.alertService.success)
        .catch($scope.alertService.danger);
    };

    $scope.onGoToUsageReport = function(model) {
      // NOTE: make data format for using into state 'index.billing.usage'
      model.acc_id = model.id;
      model.acc_name = model.companyName;
      model.plan_id = model.billing_plan;
      model.billing_plan = model.billing_plan;
      User.selectAccount(model);
      $state.go('index.billing.usage');
    };

    $scope.onGoToBillingPlans = function(model) {
      // NOTE: make data format for using into state 'index.billing.plans'
      model.acc_id = model.id;
      model.acc_name = model.companyName;
      model.plan_id = model.billing_plan;
      model.billing_plan = model.billing_plan;
      User.selectAccount(model);
      $state.go('index.billing.plans');
    };

    $scope.onGoToBillingStatement = function(model) {
      // NOTE: make data format for using into state 'index.billing.statements'
      model.acc_id = model.id;
      model.acc_name = model.companyName;
      model.plan_id = model.billing_plan;
      model.billing_plan = model.billing_plan;
      User.selectAccount(model);
      $state.go('index.billing.statements');
    };

    $scope.onGoToAccountInformation = function(model) {
      // NOTE: make data format for using into state 'index.accountSettings.companies_information'
      model.acc_id = model.id;
      model.acc_name = model.companyName;
      model.plan_id = model.billing_plan;
      model.billing_plan = model.billing_plan;
      User.selectAccount(model);
      $state.go('index.accountSettings.accountresources');
    };

    $scope.onVendorUpdate = function(account) {

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

      modalInstance.result.then(function(result) {
        Vendors.updateAccountVendor({
          account_id: account.id,
          vendor: result
        }).$promise
          .then(function(respnse) {
            account.vendor_profile = result;
            $scope.alertService.success(respnse.message);
          })
          .catch($scope.alertService.danger);
      });
    };
  }
})();
