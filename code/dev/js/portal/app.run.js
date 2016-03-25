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

    $rootScope.collapseMenu = function($event){
      if($event.currentTarget.className.indexOf('current') === -1) {
        return;
      }

      if($event.currentTarget.className.indexOf('active-side-menu-item') > 0){
        $event.currentTarget.className = $event.currentTarget.className.replace('active-side-menu-item', '');
      } else {
        $event.currentTarget.className += ' current active-side-menu-item';
      }
    };
  }
})();
