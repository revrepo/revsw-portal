(function () {
  'use strict';

  angular
    .module('revapm.Portal')
    .run(runApp);

  /*@ngInject*/
  function runApp($rootScope, $http, $location, AlertService, $state, User, Vendors) {
    $rootScope.user = User;
    $rootScope.alertService = AlertService;
    $rootScope.contactUsLink = 'https://revapm.zendesk.com/hc/en-us/requests/new';
    $rootScope.$state = $state;
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

      // if($rootScope.menuExpandedNodes.current === menuState) {
      //   // event.stopPropagation();
      //   $rootScope.menuExpandedNodes[menuState] = false;
      //   return;
      // }

      if($rootScope.menuExpandedNodes[menuState]) {
        $rootScope.menuExpandedNodes[menuState]= false;
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

    function checkVendor() {
      var vendor = '';
      var url = 'http://portal.revapm.net';//window.location.origin;
      var urlParts = url.split('.');
      vendor = urlParts[urlParts.length - 2];


      Vendors.get({
        vendor: vendor
      }).$promise.then(function(response){
        console.log(response);

        $rootScope.vendor = response.vendor;
      });
    } checkVendor();
  }
})();
