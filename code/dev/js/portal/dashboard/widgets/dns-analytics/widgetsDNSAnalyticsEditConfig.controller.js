(function() {
  angular.module('revapm.Portal.Dashboard.Widgets.DNSAnalytics')
    .controller('widgetsDNSAnalyticsEditConfigController', widgetsDNSAnalyticsEditConfigController);

  function widgetsDNSAnalyticsEditConfigController($scope, $q, Stats, Countries, User, AlertService, $config) {
    'ngInject';
    // NOTE:  Default values for config
    var _defaultConfig = {
      filters: {
        period: '1h'
      },
      info: {
        period: 'Last 1 Hour'
      }
    };
    var DNS_PERIODS = {
      '1H': 'Last 1 Hour',
      '24H': 'Last 24 Hours',
      '30D': 'Last 30 Days'
    };

    _.defaultsDeep($scope.config, _defaultConfig);

    $scope.zone = $scope.config.zone;

    $scope.$watch('config.filters', function(newVal, oldVal) {
      if (!!newVal && !!newVal.period) {
        if (newVal.period === '-') {
          angular.extend($scope.config.info, {
            'period': newVal.period
          });
        } else {
          angular.extend($scope.config.info, {
            'period': DNS_PERIODS[newVal.period.toUpperCase()] || newVal.period
          });
        }
      }
    }, true);

    $scope.onDNSZoneSelected = function() {
      if (!$scope.zone || !$scope.zone.id) {
        return;
      }
      $scope.reload();

    };
    /**
     * @name  reload
     * @description Reload data for filters
     *
     * @return
     */
    $scope.reload = function() {
      angular.extend($scope.config, {
        zone: angular.copy($scope.zone)
      });
    };

  }

})();
