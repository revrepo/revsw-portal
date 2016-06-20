(function() {
  'use strict';
  angular
    .module('revapm.Portal.stagingEnvironment')
    .controller('StagingEnvironmentController', StagingEnvironmentController);

  function StagingEnvironmentController(StagingServers) {
    'ngInject';
    var $ctrl = this;
    $ctrl._loading = true;
    $ctrl.stagingServers = [];
    StagingServers.query()
      .$promise
      .then(function(data) {
        $ctrl.stagingServers = data;
      }).finally(function() {
        $ctrl._loading = false;
      });
  }
})();
