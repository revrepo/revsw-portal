(function() {
  'use strict';

  angular
    .module('revapm.Portal.AzureSubscriptions')
    .controller('AzureSubscriptionResourcesController', AzureSubscriptionResourcesController);

  function AzureSubscriptionResourcesController($scope, $localStorage, AlertService, DTOptionsBuilder, AzureSubscriptions,
    AzureResources, $stateParams, $state, $uibModal) {
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
        AzureSubscriptions.resources({ subscription_id: subscriptionId }).$promise
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
    /**
     * Confirmation dialog
     *
     * @param {String} [template]
     * @param {Object} [resolve]
     * @returns {Promise}
     */
    $scope.confirm = function(template, resolve) {
      if (angular.isObject(template)) {
        resolve = template;
        template = '';
      }
      if (angular.isObject(resolve)) {
        resolve = {
          model: resolve
        };
      }
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: template || 'parts/modal/confirmDelete.html',
        controller: 'ConfirmModalInstanceCtrl',
        size: 'md',
        resolve: resolve || {}
      });

      return modalInstance.result;
    };

    /**
     * @name  onViewResourceSubscription
     * @description
     *
     *   View JSON object in modal window
     *
     * @param  {Event} event
     * @param  {Object} model
     * @return
     */
    $scope.onViewResourceSubscription = function(event, model) {
      $scope.confirm('viewModal.html', model)
        .then(function() {});
    };
  }
})();
