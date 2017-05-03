(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .controller('WAFAnalyticsController', WAFAnalyticsController);

  /*@ngInject*/
  function WAFAnalyticsController($q,
    $scope,
    $rootScope,
    $localStorage,
    User,
    AlertService,
    StatsWAF,
    Countries,
    $timeout,
    $state,
    $config,
    Util
  ) {

    $scope.userService = User;
    $scope._loading = false;
    // Domain that selected
    $scope.domain = null;
    $scope.pieOpts = {
      scaleOverride: true
    };
    $scope.countries = Countries.query();
    $scope.zonesList = $config.WAF_REQUEST_ZONES;
  }
})();
