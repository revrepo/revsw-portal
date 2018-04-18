(function() {
  'use strict';

  angular
    .module('revapm.Portal.AzureResources')
    .controller('AzureResourcesCrudController', AzureResourcesCrudController);

  /*@ngInject*/
  function AzureResourcesCrudController($scope, $timeout,
    $localStorage,
    CRUDController,
    AzureResources,
    $injector,
    $stateParams,
    $state,
    $anchorScroll) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    //Set state (ui.router)
    $scope.setState('index.azureMarketplace.resources');

    $scope.setResource(AzureResources);

    // $scope.filterKeys = ['zone', 'companyName', 'records_count', 'updated_by', 'updated_at'];

    $scope.model = {};

    // Fetch list of records
    $scope.$on('$stateChangeSuccess', function(state, stateTo, stateParam) {
      angular.extend($scope.filter,{
        predicate: 'updated_at',
        reverse: true
      });
      if ($state.is($scope.state)) {
        $scope.list()
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
          $scope.params = stateParam;
         }
      }
    });


    /**
     * @name  onViewResource
     * @description
     *
     *    View Resource information
     *
     * @param  {Event} event
     * @param  {Object} model
     * @return
     */
    $scope.onViewResource = function(event,model) {
      $scope.confirm('viewModal.html', model)
      .then(function() {
      });
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };
  }
})();
