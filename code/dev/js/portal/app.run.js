(function (angular, window, _) {
  'use strict';

  angular
    .module('revapm.Portal')
    .config(stopLocationChanges)
    .run(function(){
      // NOTE: mixin lodash for find objects
      _.mixin({
        'findByValues': function (collection, property, values) {
          return _.filter(collection, function (item) {
            return _.contains(values, item[property]);
          });
        }
      });
    })
    .run(runApp);

  /*@ngInject*/
  function stopLocationChanges($urlRouterProvider){
      // Prevent $urlRouter from automatically intercepting URL changes;
      // this allows you to configure custom behavior in between
      // location changes and route synchronization:
      $urlRouterProvider.deferIntercept();
  }
  /*@ngInject*/
  function runApp($rootScope, $http, $location, AlertService, $state, User, Vendors, $urlRouter, $config) {
    $rootScope.user = User;
    $rootScope.alertService = AlertService;
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      //User.checkEnforce2FA(event, toState, fromState);
        // Clear alerts when routes change
        AlertService.clear();
      });
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams){
        User.checkEnforce2FA(event, toState, fromState);
        User.checkPermissions();
        // Clear alerts when routes change //TODO:check comment
        setTimeout(function() {
          $('[autofocus]').focus();
        }, 0);
      });
    $rootScope.$on('$stateChangeError', console.log.bind(console));

    $rootScope.$on('tooManyRequests', function () {
      AlertService.clear();
      AlertService.danger($config.API_REQUEST_THROTTLING_MESSAGE.join(''));
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
      Vendors.get({
        vendorUrl: window.location.origin
      }).$promise.then(function(response){

        $rootScope.vendor = response.vendor;
        $rootScope.vendorConfig = response;
        $rootScope.contactUsLink = response.contactUsLink;

        window.gaAccount = response.googleAnalyticsAccount;
        window.vendorConfig = response;
        window.document.title = $rootScope.vendorConfig.companyNameShort + ' Customer Portal';

        $rootScope.IntroOptions.steps = $rootScope.IntroOptions.steps.map(function (obj) {
          obj.intro = obj.intro.replace('{{companyNameShort}}', $rootScope.vendorConfig.companyNameShort);
          return obj;
        });
      })
      .finally(function(){
        $urlRouter.sync();
        $urlRouter.listen();
      });
    } checkVendor();
  }
})(angular, window, _);
