(function () {
  angular.module('revapm.Portal.Dashboard.Widgets.AppsAnalytics')
    .controller('widgetsAppsAnalyticsEditConfigController', widgetsAppsAnalyticsEditConfigController);

  function widgetsAppsAnalyticsEditConfigController($scope, $q, Stats, Countries, User, AlertService) {
    'ngInject';
    // NOTE:  Default values for config
    var _defaultConfig = {
      filters: {
        country: '-',
        os: '-',
        device: '-',
        network: '-',
        operator: '-',
        count_last_day: '1',
        delay: '1'
      },
      info: {
        country: 'All countries',
        os: 'All OS',
        device: 'All devices',
        network: 'All networks',
        operator: 'All operators'        
      }
    };
    $scope.flNetworks = ['Cellular', 'WiFi'];
    $scope.flOses = [];
    $scope.flDevices = [];
    $scope.flCountries = [];
    $scope.flOperators = [];

    _.defaultsDeep($scope.config, _defaultConfig);
    var u = User.getUser();
    $scope.accountId = u.account_id || null;
    $scope.application = $scope.config.application;

    $scope.$watch('config.filters', function (newVal, oldVal) {
      if (!!newVal && !!newVal.country) {
        if (newVal.country === '-') {
          angular.extend($scope.config.info, {
            'country': newVal.country
          });
        } else {
          angular.extend($scope.config.info, {
            'country': $scope.flCountries[newVal.country.toUpperCase()] || newVal.country.toUpperCase()
          });
        }
      }
    }, true);

    $scope.onApplicationSelected = function () {
      if (!$scope.application && !$scope.accountId) {
        return;
      }
      $scope.reload();
    };

    /**
     * @name  reload
     * @description Reload data
     * @return
     */
    $scope.reload = function () {
      angular.extend($scope.config, {
        application: angular.copy($scope.application),
        account_id: angular.copy($scope.accountId),
        app_id: (($scope.application && $scope.application.app_id) || null)
      });

      Stats.sdk_dirs({
          account_id: $scope.accountId,
          app_id: (($scope.application && $scope.application.app_id) || null),
          from_timestamp: moment().subtract(7, 'days').valueOf(),
          to_timestamp: Date.now()
        })
        .$promise
        .then(function (data) {
          if (data.data) {
            $scope.flOses = data.data.oses;
            $scope.flDevices = data.data.devices;
            $scope.flCountries = data.data.countries;
            $scope.flOperators = data.data.operators;
          }
        });
    };
    //=======================
    // Load user applications
    User.getUserApps(true);
  }
})();
