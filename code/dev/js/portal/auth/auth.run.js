(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .run(AuthRun);

  /*@ngInject*/
  function AuthRun($rootScope, $state, $location, DashboardSrv, User) {

    $rootScope.$on('unauthorized', function() {
      console.log('No logged in');
      $state.go('login');
    });

    $rootScope.$on('not.connected', function() {
      if ($state.current.name !== 'login') {
        $state.go('login');
      }
    });

    $rootScope.$on('user.signin', function() {
      // NOTE: event - user signin. Can add additional rules
      DashboardSrv.getAll()
        .then(function(dashboards) {
          if (dashboards && dashboards.length) {
            $location.path('dashboard/' + dashboards[0].id);
          } else {
            $state.go('index.reports.proxy');
          }
        });

    });
  }
})();
