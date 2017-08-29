(function() {
  angular.module('revapm.Portal.Dashboard.Widgets.SecurityAnalytics')
    .controller('widgetsWAFAnalyticsEditConfigController', widgetsWAFAnalyticsEditConfigController);

  function widgetsWAFAnalyticsEditConfigController($scope, $q, Stats, Countries, User, AlertService, $config) {
    'ngInject';
    // NOTE:  Default values for config
    var _defaultConfig = {
      filters: {
        country: '-',
        count_last_day: '1',
        delay: '1',
        rule_id: '',
        zone: '-'
      },
      info: {
        country: 'All countries',
        zone: 'All Zones'
      }
    };

    _.defaultsDeep($scope.config, _defaultConfig);

    $scope.domain = $scope.config.domain;

    $scope.$watch('config.filters', function(newVal, oldVal) {
      if (!!newVal && !!newVal.country) {
        if (newVal.country === '-') {
          angular.extend($scope.config.info, {
            'country': newVal.country
          });
        } else {
          angular.extend($scope.config.info, {
            'country': $scope.flCountry[newVal.country.toUpperCase()] || newVal.country.toUpperCase()
          });
        }
      }
      if (!!newVal && !!newVal.zone) {
        if (newVal.zone === '-') {
          angular.extend($scope.config.info, {
            'zone': newVal.zone
          });
        } else {
          angular.extend($scope.config.info, {
            'zone': $config.WAF_REQUEST_ZONES[newVal.zone.toUpperCase()] || newVal.zone
          });
        }
      }
    }, true);

    $scope.onDomainSelected = function() {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.reload();

    };
    /**
     * @name  reload
     * @description Reload data for filters
     * by default will back data for last hour
     *
     * @return
     */
    $scope.reload = function() {
      angular.extend($scope.config, {
        domain: angular.copy($scope.domain)
      });
      $scope.reloadCountry();
    };
    /**
     * List of WAF Zones
     */
    $scope.flZones = $config.WAF_REQUEST_ZONES;

    $scope.flCountry = {};
    /**
     * @name  reloadCountry
     * @description Reload data flCountry
     *
     * @return {[type]}          [description]
     */
    $scope.reloadCountry = function() {
      $scope.flCountry = Countries.query();
    };
    //==================
    // Load user domains
    User.getUserDomains(true);
  }

})();
