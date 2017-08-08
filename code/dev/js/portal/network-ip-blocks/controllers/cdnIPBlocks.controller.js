(function() {
  'use strict';

  angular
    .module('revapm.Portal.networkIPBlocks')
    .controller('cdnIPBlocksController', cdnIPBlocksController);

  function cdnIPBlocksController($rootScope,Locations) {
    'ngInject';
    var $ctrl = this;
    $ctrl.isFaild = false;
    $ctrl._loading = true;
    $ctrl.edgeBlocksList = [];
    $ctrl.logShippingBlocksList = [];
    $ctrl.API_URL = $rootScope.vendorConfig.apiUrl; // NOTE: link to API documentation
    Locations.networkIPBlocks()
      .$promise
      .then(function(data) {
        $ctrl.edgeBlocksList = data.edge_blocks || [];
        $ctrl.logShippingBlocksList = data.log_shipping_blocks || [];
      })
      .catch(function(err){
        $ctrl.isFaild = true;
      })
      .finally(function() {
        $ctrl._loading = false;
      });
  }
})();
