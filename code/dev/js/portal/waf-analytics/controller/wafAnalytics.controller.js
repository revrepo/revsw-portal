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
    $scope._loading = true;
    // Domain that selected
    $scope.domain = {};
    $scope.pieOpts = {
      scaleOverride: true
    };
    $scope.countries = Countries.query();
    $scope.filtersTops = {};
    // TODO: ?? rebase to domain
    $scope.zonesList = {
      'args': 'ARGS',
      'header': 'HEADER',
      'body': 'BODY',
      'url': 'URL'
    };

    var u = User.getUser();
    $scope.account = u.companyId[0] || null;


    /**
     * @name onDomainSelected
     * @desc action
     */
    $scope.onDomainSelected = function () {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.reload();
    };
    /**
     * @name reload
     * @desc method update all data
     */
    $scope.reload = function () {
      // TODO: add call reload all data sections
      // $scope.reloadTops();
    };

    /**
     * @name reloadTops
     * @desc method reload First Section - Three Pie charts
     */
    $scope.reloadTops = function (domain) {
      // TODO: fix bug detected selected domain
      $scope.domain = domain;
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      var params = angular.merge({}, {
        domainId: $scope.domain.id,
        count: 20
      }, $scope.filtersTops);

      $q.all([
          StatsWAF.topReport(angular.merge({}, params, {
            report_type: 'country'
          })).$promise,
          StatsWAF.topReport(angular.merge({}, params, {
            report_type: 'rule_id'
          })).$promise,
          StatsWAF.topReport(angular.merge({}, params, {
            report_type: 'zone'
          })).$promise
        ])
        .then(function (dataTops) {
          $scope.topCountries = [];
          $scope.topRulesIds = [];
          $scope.topTargetZones = [];
          // NOTE: prepare countries  data
          if (dataTops[0].data && dataTops[0].data.length > 0) {
            _.forEach(dataTops[0].data, function (item) {
              var key = item.key.toUpperCase();
              $scope.topCountries.push({
                name: ($scope.countries[key] || item.key),
                y: item.count
              });
            });
          }
          if (dataTops[1].data && dataTops[1].data.length > 0) {
            _.forEach(dataTops[1].data, function (item) {
              $scope.topRulesIds.push({
                name: item.key,
                y: item.count
              });
            });
          }
          if (dataTops[2].data && dataTops[2].data.length > 0) {
            _.forEach(dataTops[2].data, function (item) {
              $scope.topTargetZones.push({
                name: item.key,
                y: item.count
              });
            });
          }
        })
        .catch(AlertService.danger);
    };


  }
})();
