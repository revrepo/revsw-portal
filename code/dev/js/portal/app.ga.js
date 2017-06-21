(function() {
  'use strict';

  angular
    .module('revapm.Portal')
    .run(runGoogleAnalytics)
    .service('Analytics', Analytics);


  function Analytics() {
    'ngInject';
    this.recordPageview = function(url) {
      ga('set', 'page', url);
      ga('send', 'pageview');
    };
  }

  function runGoogleAnalytics($rootScope, $location, Analytics) {
    'ngInject';
    $rootScope.$on('$stateChangeSuccess', function() {
      Analytics.recordPageview($location.url());
    });
  }
})();
