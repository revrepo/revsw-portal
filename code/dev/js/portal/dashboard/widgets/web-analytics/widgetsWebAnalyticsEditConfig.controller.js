(function() {
  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .controller('widgetsWebAnalyticsEditConfigController', widgetsWebAnalyticsEditConfigController);

  function widgetsWebAnalyticsEditConfigController($scope, $q, Stats, Countries, User, AlertService) {
    'ngInject';
    // NOTE:  Default values for config
    var _defaultConfig = {
      filters: {
        country: '-',
        os: '-',
        device: '-',
        count_last_day: '1',
        delay: '1'
      },
      info: {
        country: 'All countries',
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
    }, true);

    $scope.onDomainSelected = function() {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.reload();

    };
    /**
     * @name  reload
     * @description Reload data
     * @return
     */
    $scope.reload = function() {
      angular.extend($scope.config, {
        domain: angular.copy($scope.domain)
      });
      $scope.reloadCountry($scope.domain.id);
      $scope.reloadOS($scope.domain.id);
      $scope.reloadDevice($scope.domain.id);
      $scope.reloadStatusCode($scope.domain.id);
    };

    $scope.flCountry = {};
    /**
     * @name  reloadCountry
     * @description Reload data flCountry
     * @param  {String|Number} domainId
     * @return {[type]}          [description]
     */
    $scope.reloadCountry = function(domainId) {
      $scope.flCountry = Countries.query();
    };

    /**
     * @name  flOs
     * @description list OS for select in configuration
     * @type {Object}
     */
    $scope.flOs = {
      labels: [],
      data: []
    };

    /**
     * @name  reloadOS
     * @description Reload list of OS
     * @param {string|number} domainId
     * @return
     */
    $scope.reloadOS = function(domainId) {
      Stats.os({
        domainId: domainId
      }).$promise.then(function(data) {
        $scope.flOs.labels.length = 0;
        $scope.flOs.data.length = 0;
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(item) {
            $scope.flOs.labels.push(item.key);
            $scope.flOs.data.push(item.count);
          });
        }
      });
    };

    /**
     * @name flDdevice
     * @description List devices for selected domain
     * @type {Object}
     */
    $scope.flDevice = {
      labels: [],
      data: []
    };

    /**
     * @name reloadDevice
     * @description Reload list of devices for domain
     * @param   {string|number}  domainId
     */
    $scope.reloadDevice = function(domainId) {

      Stats.device({
        domainId: domainId
      }).$promise.then(function(data) {
        $scope.flDevice.labels.length = 0;
        $scope.flDevice.data.length = 0;
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(item) {
            $scope.flDevice.labels.push(item.key);
            $scope.flDevice.data.push(item.count);
          });
        }
      });
    };

    $scope.statusCode = {
      labels: [],
      data: []
    };
    /**
     * List of devices
     *
     * @param {string|number} domainId
     */
    $scope.reloadStatusCode = function(domainId) {
      return Stats.statusCode({
        domainId: domainId
      }).$promise.then(function(data) {
        $scope.statusCode.labels.length = 0;
        $scope.statusCode.data.length = 0;
        if (data.data && data.data.length > 0) {
          angular.forEach(data.data, function(item) {
            $scope.statusCode.labels.push(item.key);
            $scope.statusCode.data.push(item.count);
          });
          $scope.config.statusCode = $scope.statusCode.labels;
        }
      });
    };

    //==================
    // Load user domains
    User.getUserDomains(true);
  }


})();
