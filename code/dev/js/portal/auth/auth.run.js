(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .run(AuthRun);

  /*@ngInject*/
  function AuthRun($rootScope, $state, $location, DashboardSrv, User, Companies, $localStorage) {
    var startOpenUrl = $location.url();
    // NOTE: validation url
    function isValidReOpenUrl(url) {
      if ((url.indexOf('signup') === -1) && (url.indexOf('login') === -1) && (url.indexOf('/azure-sso') === -1) && (url.indexOf('/password/reset') === -1)) {
        return true;
      }
      return false;
    }
    // NOTE: save first open url for not auth user
    if (User.isAuthed() === false) {
      if (isValidReOpenUrl(startOpenUrl)) {
        $localStorage.lastUrl = startOpenUrl;
      }
    }
    // NOTE: save last open url for auth user
    $rootScope.$on('$stateChangeSuccess', function(event, stateTo, stateFrom) {
      var currentUrl = $location.url();
      if ((User.isAuthed() === true) && isValidReOpenUrl(currentUrl)) {
        $localStorage.lastUrl = $location.url();
      }
    });

    $rootScope.$on('unauthorized', function() {
      var currentUrl = $location.url();
      if (isValidReOpenUrl(currentUrl)) {
        $localStorage.lastUrl = currentUrl;
      }
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
      if (!!lastUrl_ && lastUrl_.length > 0 && (lastUrl_.indexOf('login') === -1)) {
        $location.url(lastUrl_);
      } else {
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
