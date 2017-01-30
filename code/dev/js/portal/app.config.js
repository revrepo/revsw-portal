(function() {
  'use strict';

  angular
    .module('revapm.Portal')
    .config(configure)
    .config(configureSatellizer)
    .run(setHighchartsOptions);

  /*@ngInject*/
  function configure(cfpLoadingBarProvider) {
    // All configuration except routing should be placed here
    cfpLoadingBarProvider.includeBar = false;
  }

  /*@ngInject*/
  function configureSatellizer($authProvider, $config) {
    $authProvider.loginUrl = $config.API_URL + '/authenticate';
    // Google
    $authProvider.google({
      clientId: $config.OAUTH.GOOGLE_CLIENT_ID,
      url: $config.API_URL + '/authenticate/google'
    });
    // GitHub
    $authProvider.github({
      clientId: $config.OAUTH.GITHUB_CLIENT_ID,
      url: $config.API_URL + '/authenticate/github',
      // popupOptions: { width: 1020, height: 618 }
    });
  }

  function setHighchartsOptions() {
    // NOTE: @see http://api.highcharts.com/highcharts/global.timezoneOffset
    Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });
  }
})();
