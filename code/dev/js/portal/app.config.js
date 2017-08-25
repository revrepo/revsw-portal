(function() {
  'use strict';

  angular
    .module('revapm.Portal')
    .config(configure)
    .config(configureSatellizer)
    .config(configUibTooltipProvider)
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
      },
      lang: {
        drillUpText: '◁ Back'
      }
    });
  }

  /*@ngInject*/
  function configUibTooltipProvider($uibTooltipProvider) {
    $uibTooltipProvider.options({
      appendToBody: true
    });
  }
})();
// fix for error - TypeError: Cannot read property 'drilldown' of null
(function(H) {
  H.Axis.prototype.getDDPoints = function(x) {
    var ret = [];
    H.each(this.series, function(series) {
      var i,
        xData = series.xData,
        points = series.points;

      for (i = 0; i < xData.length; i++) {
        if (xData[i] === x && series.options.data[i] && series.options.data[i].drilldown) {
          ret.push(points ? points[i] : true);
          break;
        }
      }
    });
    return ret;
  };
}(Highcharts));
