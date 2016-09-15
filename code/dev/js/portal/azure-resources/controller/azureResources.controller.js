(function() {
  'use strict';

  angular
    .module('revapm.Portal.AzureResources')
    .controller('AzureResourcesController', AzureResourcesController);

  function AzureResourcesController($scope, $localStorage, AlertService, DTOptionsBuilder, AzureSubscriptions, AzureResources, $stateParams, $state) {
    'ngInject';
    var pageLength = 10;
    // List Subscriptions
    $scope.subscriptionsList = [];
    $scope.subresources = [];
    $scope.subscriptionId = $stateParams.subscriptionId || $localStorage.subscriptionId;

    AzureSubscriptions.query().$promise
      .then(function(data) {
        $scope.subscriptionsList = data;
      });

    $scope.initResources = function(subscriptionId) {
      if (subscriptionId) {
        $scope._loading = true;
        AzureResources.query({ subscription_id: subscriptionId }).$promise
          .then(function(data) {
            $scope.subresources = data;
          })
          .catch(function(err) {
            $scope._error = err.data;
            // AlertService.danger(err);
          })
          .finally(function() {
            $scope._loading = false;
          });
      } else {
        $scope._loading = false;
        $scope._error = {
          message: 'Not selected Subscription'
        };
      }
    };

    $scope.initResources($scope.subscriptionId);

    $scope.subscriptionResourcesDtOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(pageLength)
      .withBootstrap()
      .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>')
      .withOption('paging', ($scope.subresources.length > pageLength));

    // Change subscription
    $scope.onSubscriptionSelect = function(subId) {
      $localStorage.subscriptionId = subId;
      $scope.subscriptionId = subId;
      $state.go($state.current.name, { subscriptionId: null }, {
        reload: true,
        inherit: false,
        notify: true
      });
    };
  }
})();
