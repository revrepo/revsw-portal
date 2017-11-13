(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('imageEngineAnalyticsController', imageEngineAnalyticsController);

  /*@ngInject*/
  function imageEngineAnalyticsController($scope, User, AlertService, Stats, StatsImageEngine, Countries, $q, $config, $sce) {

    $scope._loading = true;
    // Domain that selected
    $scope.domain = null;
    $scope.domains = [];

    $scope.country = {};
    $scope.os = [];
    $scope.device = [];
    $scope.browser = [];
    // $scope.flCountry = Countries.query(); // TODO: show into country filter all contry

    $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
    $scope.popoverHelpHTML = {
      'dataImageEngineFotmatChanges': $sce.trustAsHtml('The pie chart shows the amount of image format transformations performed by ' +
        ' the Image Optimization feature'),
      'dataImageEngineResolutionChanges': $sce.trustAsHtml('The chart shows the level of on-the-fly image resolution transformations ' +
        'peformed by the Image Optimization engine')
    };

    $scope.filters = {};
    $scope.dataImageEngineFotmatChanges = [];
    $scope.dataImageEngineResolutionChanges = [];

    var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os', 'browser'];
    /**
     * @name generateFilterParams
     * @description  generate filter params
     * @param {Object} filters
     * @return {Object} params
     */
    function generateFilterParams(filters) {
      var params = {
        domainId: $scope.domain.id, // NOTE: required property
        from_timestamp: moment().subtract(24, 'hours').valueOf(),
        to_timestamp: Date.now()
      };
      _.forEach(filters, function (val, key) {
        if (_.indexOf(_filters_field_list, key) !== -1) {
          if (val !== '-' && val !== '') {
            params[key] = val;
          }
        } else {
          if (key === 'delay') {
            params.from_timestamp = moment().subtract(val, 'hours').valueOf();
            params.to_timestamp = Date.now();
            delete params.delay;
          }
        }
      });
      return params;
    }
    /**
     * @name direct_to_
     * @description Internal method for convertation data
     * @param {Array<Object>} data  [{key:string,count:number}]
     * @return {Object} {name: string, y: number}
     */
    var direct_to_ = function (data) {
      return data.map(function (item) {
        var name_ = item.key.replace(',', ' to ');
        return {
          name: name_,
          y: item.count
        };
      });
    };
    // Load user domains
    User.getUserDomains(true)
      .then(function (domains) {
        $scope.domains = domains;
      })
      .catch(function () {
        AlertService.danger('Oops something wrong');
      })
      .finally(function () {
        $scope._loading = false;
      });

    /**
     * @name reload
     * @description  reload every pie-chart
     */
    $scope.reload = function () {
      // NOTE: lock UI before finish all requests
      $scope._loading = true;
      $q.all([
          $scope.reloadDataFormatChanges(generateFilterParams($scope.filters)),
          $scope.reloadDataResolutionChanges(generateFilterParams($scope.filters))
        ])
        .finally(function () {
          $scope._loading = false;
        });
    };
    /**
     * @name onDomainSelected
     * @description method call when need reload data on the page
     *
     */
    $scope.onDomainSelected = function () {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.reload(); // NOTE: reload data

      //  reload all lists for filters
      var now = Date.now();

      Stats.topLists({
        domainId: $scope.domain.id,
        from_timestamp: (now - 86400000 /*day in ms*/ ),
        to_timestamp: now
      }).$promise.then(function (data) {
        $scope.os = data.data.os;
        $scope.browser = data.data.browser;
        $scope.device = data.data.device;
        var c = {};
        data.data.country.forEach(function (item) {
          c[item.key] = item.value;
        });
        $scope.country = c;
      });

    };

    /**
     * @name reloadDataFormatChanges
     * @description method reload data for ImageEngine Format Changes
     * @param {Object} filters - external data
     *
     * @return {Promise}
     */
    $scope.reloadDataFormatChanges = function (filters) {
      $scope.dataImageEngineFotmatChanges  = [];
      return Stats.ie_format_changes(filters)
        .$promise
        .then(function (data) {
          $scope.dataImageEngineFotmatChanges = direct_to_(data.data);
        })
        .catch(function (err) {
          $scope.dataImageEngineFotmatChanges.lenght = [];
        });
    };
    /**
     * @name reloadDataResolutionChanges
     * @description method reload data for ImageEngine Resolutions Changes
     * @param {Object} filters - external data
     *
     * @return {Promise}
     */
    $scope.reloadDataResolutionChanges = function (filters) {
      $scope.dataImageEngineResolutionChanges = [];
      return Stats.ie_resolution_changes(filters)
        .$promise
        .then(function (data) {
          $scope.dataImageEngineResolutionChanges = direct_to_(data.data);
        })
        .catch(function (err) {
          $scope.dataImageEngineResolutionChanges = [];
        });
    };
  }
})();
