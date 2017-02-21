(function() {
  'use strict';

  angular
    .module('revapm.Portal.AzureSubscriptions')
    .controller('AzureSubscriptionsListController', AzureSubscriptions);


  function AzureSubscriptions($scope, $rootScope, $q, CRUDController, AzureSubscriptions, $injector, $stateParams, $state, $uibModal) {
    'ngInject';
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });

    //Set state (ui.router)
    $scope.setState('index.azureMarketplace.subscriptions');

    $scope.setResource(AzureSubscriptions);
    $scope.subscriptionStatusList = [
      { id: 'Registered', statusName: 'Registered' },
      { id: 'Suspended', statusName: 'Suspended' },
      { id: 'Deleted', statusName: 'Deleted' },
      { id: 'Unregistered', statusName: 'Unregistered' }, { id: 'Warned', statusName: 'Warned' }
    ];
    /**
     * Should open dialog for change status
     */
    var modalInstance = null;
    $scope.editCurrentSubscriptionState = null;
    $scope.openChangeStatusDialog = function(item) {
      if($scope.isReadOnly() === true){
        return;
      }
      $scope.alertService.clear();
      $scope.editCurrentSubscriptionState = item.subscription_state;
      modalInstance = $uibModal.open({
        animation: true,
        scope: $scope,
        templateUrl: 'parts/azure-subscriptions/dialog/change-status.tpl.html',
        size: 'md'
      });

      /**
       * Handle close modal window for change state
       */
      modalInstance.result.then(function(data) {
        if (data) {
          var newState = data;
          AzureSubscriptions.updateState({
              subscription_id: item.subscription_id,
              subscription_state: newState
            }).$promise
            .then(function(result) {
              item.subscription_state = newState;
            })
            .catch($scope.alertService.danger);
        }
      });
    };
    /**
     * Close dialog with new state
     */
    $scope.ok = function(newState) {
      modalInstance.close(newState);
    };
    /**
     * Close dialog
     */
    $scope.cancel = function() {
      modalInstance.dismiss('cancel');
    };

    $scope.onSelectSubscriptionState = function(data) {
      $scope.editCurrentSubscriptionState = data;
    };
    // Fetch list of subscription
    $scope.list();

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };
    /**
     * @name  onViewSubscription
     * @description
     *
     *   View JSON object in modal window
     *
     * @param  {Event} event
     * @param  {Object} model
     * @return
     */
    $scope.onViewSubscription = function(event,model) {
      $scope.confirm('viewModal.html', model)
      .then(function() {
      });
    };
  }
})();
