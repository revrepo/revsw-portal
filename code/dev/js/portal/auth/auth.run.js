(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .run(AuthRun);

  /*@ngInject*/
  function AuthRun($rootScope, $state, $location, DashboardSrv, User, Companies, $localStorage) {
    // NOTE: save last url for User
    $rootScope.$on('$stateChangeSuccess',
      function(event,stateTo,stateFrom){
        if(User.isAuthed() === true && stateTo.name !== 'login'){
          $localStorage.lastUrl = stateTo.url;
        }
    });

    $rootScope.$on('unauthorized', function() {
      // console.log('No logged in');
      $state.go('login');
    });

    $rootScope.$on('not.connected', function() {
      if ($state.current.name !== 'login') {
        $state.go('login');
      }
    });
    /**
     * @name  defaultLoginWorkFlow
     * @description
     *
     *  Default action
     *
     * @return
     */
    function defaultLoginWorkFlow() {
      var lastUrl_ = $localStorage.lastUrl;
      if(!!lastUrl_ && lastUrl_.length > 0){
        $location.url(lastUrl_);
      }else{
        DashboardSrv.getAll()
          .then(function(dashboards) {
            if (dashboards && dashboards.length) {
              $location.path('dashboard/' + dashboards[0].id);
            } else {
              $state.go('index.reports.proxy');
            }
          });
      }
    }

    $rootScope.$on('user.fill_company_profile', function(e) {
      // Event when user first time fill Company Profile
      defaultLoginWorkFlow();
    });

    $rootScope.$on('user.signin', function(e, data) {
      // NOTE: event - user signin. Can add additional rules
      // Get User Account Profile only if Azure SSO signin
      if (!!data.isAzureSSO && data.isAzureSSO === true) {
        var accountId = data.companyId[0];
        Companies.get({ id: accountId }, function(data) {
          // NOTE: validation fill account profile
          if (!!data.address1 && data.address1 !== '') {
            defaultLoginWorkFlow();
          } else {
            // user have no contact information
            $localStorage.isNeedContactInfo = true;
            $state.go('index.billing.company');
          }
        }, function(err) {
          // console.log('Error get account information', err);
        });
      } else {
        defaultLoginWorkFlow();
      }
    });
  }
})();
