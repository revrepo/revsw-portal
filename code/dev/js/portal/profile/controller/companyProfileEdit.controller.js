(function() {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('CompanyProfileEditController', CompanyProfileEditController);

  /*@ngInject*/
  function CompanyProfileEditController($scope,
    $q,
    $timeout,
    User,
    BillingPlans,
    Apps,
    Companies,
    Countries,
    CRUDController,
    $injector,
    $state,
    $config,
    $localStorage,
    $stateParams,
    DNSZones) {
    $scope.countries = Countries.query();
    $scope.zipRegex = '[0-9]{1,10}';
    $scope.phoneRegex = '[0-9, \\s, \\+, \\-, \\(, \\)]{1,20}';

    $scope.COMPANY_NAME = $config.PATTERNS.COMPANY_NAME;
    $scope.USER_FIRST_NAME = $config.PATTERNS.USER_FIRST_NAME;
    $scope.USER_LAST_NAME = $config.PATTERNS.USER_LAST_NAME;
    $scope.STREET_ADDRESS = $config.PATTERNS.STREET_ADDRESS;
    $scope.NO_SPECIAL_CHARS = $config.PATTERNS.NO_SPECIAL_CHARS;
    $scope.COMMENT_NO_SPECIAL_CHARS = $config.PATTERNS.COMMENT_NO_SPECIAL_CHARS;

    $scope.user = User.getUser();
    $scope.user.isAdmin = User.isAdmin();
    $scope._disabled = ($scope.user.access_control_list.readOnly) ? $scope.user.access_control_list.readOnly : false;
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    $scope.setResource(Companies);
    $scope.getCompany = function(id) {
      $scope.get(id)
        .catch(function(err) {
          $scope.alertService.danger('Could not load company details');
        });
    };

    $scope.initEditCompany = function() {
      if ($stateParams.id) {
        $scope.getCompany($stateParams.id);
      } else {
        $scope.getCompany($scope.user.account_id);
      }
    };

    $scope.updateCompany = function(company) {
      // TODO: add check
      $scope.confirm('confirmUpdateModal.html', company)
        .then(function() {
          $scope._loading = true;
          $scope.update({
              id: company.id
            }, company)
            .then(function(data) {
              $scope.alertService.success('Successfully updated company profile');
            })
            .then(function() {
              if ($scope.isAskedContactInfo) {
                $scope.alertService.clear();
                $scope.$emit('user.fill_company_profile');
              }
            })
            .catch($scope.alertService.danger)
            .finally(function() {
              $scope._loading = false;
            });
        });
    };
    /**
     * @name createBillingProfile
     * @description
     *
     * Send command to create new customer in Chargify
     *
     * @param  {Object} company [description]
     * @return
     */
    $scope.createBillingProfile = function(company) {
      if($scope.isReadOnly() === true) {
        return;
      }
      $scope.confirm('confirmCreateBillingProfileModal.html', company)
        .then(function() {
          $scope._loading = true;
          // NOTE: Update information about Company(Account)
          $scope.update({
              id: company.id
            }, company)
            .then(function(data) {
              return Companies.createBillingProfile({
                id: company.id
              }, company).$promise;
            })
            .then(function(account) {
              $scope.model.billing_id = account.billing_id;
              $scope.alertService.success('Successfully created billing profile');
            })
            .catch($scope.alertService.danger)
            .finally(function() {
              $scope._loading = false;
            });
        });
    };
    /**
     * @name  deleteCompanyProfile
     * @description
     *
     *  Delete Account
     *  check
     * @param  {[type]} company [description]
     * @return {[type]}         [description]
     */
    $scope.deleteCompanyProfile = function(company) {
      $scope._loading = true;
      $q.all([
          User.getUserDomains(true),
          Apps.query().$promise,
          BillingPlans.get({
            id: company.billing_plan
          }).$promise,
          DNSZones.query().$promise
        ]).then(
          function(results) {
            var _model = {
              company: company,
              domains: results[0],
              apps: results[1],
              bp: results[2],
              dnszones: results[3],
              isCanBeDeleted: (results[0].length === 0 && results[1].length === 0 && results[3].length === 0) ? true : false
            };
            $scope.confirm('confirmDeleteModal.html', _model)
              .then(function(data) {
                $scope._loading = true;
                User.deleteAccountProfile(company.id, {
                    cancellation_message: _model.cancellation_message
                  })
                  .then(function() {
                    $scope.alertService.success('Successfully deleted account profile');
                    $timeout(function() {
                      $state.go('goodbye');
                    }, 10);
                  })
                  .catch($scope.alertService.danger)
                  .finally(function() {
                    $scope._loading = false;
                  });
              });
          }
        )
        .catch($scope.alertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };
    /**
     * @name  isCanDeleteCompanyProfile
     * @description
     *
     * Check rules for Delete Company Profile
     *    - Account is self-registered AND
     *    - Account has a valid billing plan AND
     *    - (Account is in trial mode  OR
     *    - Account is not at trial mode and has a valid payment method)
     * @return {Boolean}
     */
    $scope.isCanDeleteCompanyProfile = function() {
      var model = $scope.model;
      if (!model) {
        return false;
      }
      return (model.self_registered === true && model.billing_plan.length > 0 &&
        (model.subscription_state === 'trialing' ||
          (model.subscription_state !== 'trialing' && model.valid_payment_method_configured === true)));
    };
    $scope.isAskedContactInfo = $localStorage.isNeedContactInfo;
    /**
     * @name  welcomeInfo
     * @description
     *
     *   Welcome information for user
     *
     * @return
     */
    $scope.welcomeInfo = function() {
      var data = {};
      var isNeedContactInfo = $localStorage.isNeedContactInfo;
      if (isNeedContactInfo === true) {
        $scope.confirm('confirmWelcomeInfoModal.html', data)
          .then(function() {
            $localStorage.isNeedContactInfo = false;
          });
      }
    };

    $scope.welcomeInfo();

  }
})();
