(function() {
  'use strict';

  angular
    .module('revapm.Portal.Companies')
    .controller('CompaniesCrudController', CompaniesCrudController);

  /*@ngInject*/
  function CompaniesCrudController($scope, CRUDController, Companies, $injector, $stateParams, $config, $state, $anchorScroll) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    // Set resource to work with data
    $scope.setResource(Companies);
    //Set state (ui.router)
    $scope.setState('index.accountSettings.companies');

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
          });
      }
    });

    $scope.filterKeys = ['companyName', 'comment', 'createdBy', 'updated_at'];

    $scope.getCompany = function(id) {
      $scope.get(id)
        .catch(function(err) {
          $scope.alertService.danger('Could not load company details');
        });
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.deleteCompany = function(model) {
      $scope
        .confirm('confirmModal.html', model)
        .then(function() {
          return $scope
            .delete(model);
        })
        .catch($scope.alertService.danger);
    };

    $scope.createCompany = function(model) {
      if (!model) {
        return;
      }
      $scope
        .create(model)
        .then(function() {
          $scope.alertService.success('Company created', 5000);
          $scope.auth.reloadUser();
        })
        .catch($scope.alertService.danger);
    };

    $scope.updateCompany = function(model) {
      $scope.update(model)
        .then(function() {
          $scope.alertService.success('Company updated', 5000);
        })
        .catch($scope.alertService.danger);
    };
  }

})();
