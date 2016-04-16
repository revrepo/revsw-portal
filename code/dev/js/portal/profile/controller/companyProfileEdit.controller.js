(function() {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('CompanyProfileEditController', CompanyProfileEditController);

  /*@ngInject*/
  function CompanyProfileEditController($scope, User, BillingPlans, Companies, Countries, CRUDController, $injector, $stateParams, AlertService) {
    $scope.countries = Countries.query();
    $scope.billing_plans = [{
      id: null,
      name: 'Manual'
    }];
    BillingPlans.query().$promise
      .then(function(bp) {
        angular.forEach(bp, function(item) {
          $scope.billing_plans.push(item);
        });
      });
    $scope.zipRegex = '[0-9]{1,10}';
    $scope.phoneRegex = '[0-9, \\s, \\+, \\-, \\(, \\)]{1,20}';
    $scope.user = User.getUser();
    $scope._disabled = ($scope.user.access_control_list.readOnly) ? $scope.user.access_control_list.readOnly : false;
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    $scope.setResource(Companies);
    $scope.getCompany = function(id) {
      $scope.get(id)
        .then(function() {
          if (!$scope.model.subscription_id) {
            $scope.billing_plans.selected = $scope.billing_plans[0];
          }else{
            $scope.billing_plans.shift();
          }
        })
        .catch(function(err) {
          $scope.alertService.danger('Could not load company details');
        });
    };

    $scope.initEditCompany = function() {
      if ($stateParams.id) {
        $scope.getCompany($stateParams.id);
      } else {
        $scope.getCompany($scope.user.companyId);
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
            .then(function() {
              AlertService.success('Successfully updated company profile');
            })
            .catch(function(err) {
              AlertService.danger('Oops! Something went wrong');
            })
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

      $scope.confirm('confirmCreateBillingProfileModal.html', company)
        .then(function() {
          $scope._loading = true;
          Companies.createBillingProfile({
              id: company.id
            }, company).$promise
            .then(function(account) {
              $scope.model.billing_id = account.billing_id;
              AlertService.success('Successfully created billing profile');
            })
            .catch(function(err) {
              AlertService.danger('Oops! Something went wrong');
            })
            .finally(function() {
              $scope._loading = false;
            });
        });
    };

    $scope.deleteCompanyProfile = function(company) {
      $scope.confirm('confirmDeleteModal.html', company)
        .then(function() {
          $scope._loading = true;
          $scope.delete(company)
            .then(function() {
              AlertService.success('Successfully deleted company profile');
            })
            .catch(function(err) {
              AlertService.danger('Oops! Something went wrong');
            })
            .finally(function() {
              $scope._loading = false;
            });
        });
    };




  }
})();
