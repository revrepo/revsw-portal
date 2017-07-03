(function() {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .controller('DNSZoneCheckIntegrationPageController', DNSZoneCheckIntegrationPageController);

  /*@ngInject*/
  function DNSZoneCheckIntegrationPageController($scope,
    $timeout,
    $localStorage,
    CRUDController,
    DNSZones,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    //Set state (ui.router)
    $scope.setState('index.dnsServices.dns_zones.checkintegration');

    $scope.setResource(DNSZones);

    $scope.getDNSZone = function(id) {
      $scope.get(id)
        .catch(function(err) {
          $scope.alertService.danger('Could not load DNS Zone details');
        });
    };

    $scope.onClickRefresh = function() {
      // TODO: Broadcast
      $scope.getDNSZone($stateParams.id);
    };

  }

})();
