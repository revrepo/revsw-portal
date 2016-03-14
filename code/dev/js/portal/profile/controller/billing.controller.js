(function () {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('BillingController', BillingController);

  /*@ngInject*/
  function BillingController($scope, User, Companies, BillingPlans, CRUDController, $injector, $stateParams, AlertService) {

    $injector.invoke(CRUDController, this, {$scope: $scope, $stateParams: $stateParams});

    $scope.accounts = [];
    $scope.account = null;

    $scope.initBillingInfo = function () {
      User.getUserAccounts()
        .then(function ( accs ) {
          $scope._loading = true;
          $scope.accounts = accs;
          if ( accs.length === 1 ) {
            $scope.account = accs[0];
          }
          $scope.user = User.getUser();
          $scope.setResource(BillingPlans);
          return $scope.list();
        })
        .catch(function ( err ) {
          AlertService.danger('Oops! Something went wrong');
        })
        .finally(function () {
          $scope._loading = false;
        });

    };

    $scope.isSelectedPlan = function (id) {
      return ($scope.account.plan_id === id);
    };

    $scope.onAccountSelect = function ( acc ) {
      User.selectAccount( acc );
      $scope.account = acc;
    };

    $scope.chooseBillingPlan = function (plan, account) {
      $scope.confirm('confirmModal.html', plan)
        .then(function () {
          $scope._loading = true;
          Companies
            .update({
              id: account.acc_id,
              billing_plan: plan.id,
              companyName: account.acc_name})
            .$promise
            .then(function () {
              User.getUserAccounts(true)
                .then(function (accs) {
                  AlertService.success('Successfully changed billing plan');
                  accs.forEach(function (acc) {
                    if(acc.id === account.ac_id){
                      $scope.onAccountSelect(acc);
                    }
                  })
                });
            })
            .catch(function (err) {
              AlertService.danger('Oops! Something went wrong');
            })
            .finally(function () {
              $scope._loading = false;
            });
        });
    }


  }
})();

