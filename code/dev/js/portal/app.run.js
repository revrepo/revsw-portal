(function () {
  'use strict';

  angular
    .module('revapm.Portal')
    .run(runApp);

  /*@ngInject*/
  function runApp($rootScope, $http, AlertService, $state) {
    $rootScope.alertService = AlertService;
    $rootScope.contactUsLink = 'https://revapm.zendesk.com/hc/en-us/requests/new';

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

    $rootScope.goToState = function(state){
        $state.go(state);
    };

    $rootScope.menuExpanded = function(menuState){
      return $rootScope.menuExpandedNodes && $rootScope.menuExpandedNodes[menuState];
    };

    $rootScope.expandMenu = function(menuState, event){
      if($rootScope.menuExpandedNodes.current === menuState) {
        return;
      }

      if($rootScope.menuExpandedNodes[menuState]) {
        delete $rootScope.menuExpandedNodes[menuState];
      }
      else {
        $rootScope.menuExpandedNodes[menuState] = true;
      }

      event.stopPropagation();
    };
  }
})();
