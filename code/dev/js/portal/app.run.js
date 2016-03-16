(function () {
  'use strict';

  angular
    .module('revapm.Portal')
    .run(runApp);

  /*@ngInject*/
  function runApp($rootScope, AlertService) {
    $rootScope.alertService = AlertService;
    $rootScope.$on('$stateChangeStart',
      function(event){
        // Clear alerts when routes change
        AlertService.clear();
      });
    $rootScope.$on('$stateChangeSuccess',
      function(event){
        // Clear alerts when routes change //TODO:check comment
        setTimeout(function() {
          $('[autofocus]').focus();
        }, 0);
      });
    $rootScope.$on('$stateChangeError', console.log.bind(console));
  }
})();
