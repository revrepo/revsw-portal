(function () {
  'use strict';

  angular
    .module('revapm.Portal')
    .run(runApp);

  /*@ngInject*/
  function runApp($rootScope, $http, $location, AlertService, $state,$loading) {
    $rootScope.alertService = AlertService;
    $rootScope.contactUsLink = 'https://revapm.zendesk.com/hc/en-us/requests/new';

    $rootScope.$on('$stateChangeStart',
      function(event){
        $loading.start("loading");
        // Clear alerts when routes change
        AlertService.clear();
      });
    $rootScope.$on('$stateChangeSuccess',
      function(event){
          $loading.finish("loading");
        // Clear alerts when routes change //TODO:check comment
        setTimeout(function() {
          $('[autofocus]').focus();
        }, 0);
      });
    $rootScope.$on('$stateChangeError', function (event) {
            $loading.finish("loading");
            console.log.bind(console)
        });

    $rootScope.goToState = function(state, dashboardID){
      if(dashboardID){
        $location.path(state + '/' + dashboardID);
      } else {
        $state.go(state);
      }
    };

    $rootScope.menuExpanded = function(menuState){
      return $rootScope.menuExpandedNodes && $rootScope.menuExpandedNodes[menuState];
    };

    $rootScope.expandMenu = function(menuState, event){
      if($rootScope.menuExpandedNodes.current === menuState) {
        event.stopPropagation();
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

    function initFooterInfo(){
      $http.get(window.API_URL + '/healthcheck').success(function(data){
        if(data){
          $rootScope.apiVersion = data.version;
        }

        $http.get('/version.txt').success(function(data){
          if(data){
            $rootScope.portalVersion = data;
          }
        });
      });
    } initFooterInfo();
  }
})();
