(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('imageEngineAnalyticsController', imageEngineAnalyticsController);

  /*@ngInject*/
  function imageEngineAnalyticsController($scope, User, AlertService, Stats, StatsImageEngine, Countries, $q) {

    $scope._loading = true;
    // Domain that selected
    $scope.domain = null;
    $scope.domains = [];

    $scope.country = {};
    $scope.os = [];
    $scope.device = [];
    $scope.browser = [];
    $scope.filters = {};
    $scope.dataImageEngineFotmatChanges = [];
    $scope.dataImageEngineResolutionChanges = [];
    $scope.dataImageEngineBytesSaved = [0];
    // NOTE: options for chart "Bytes Saved"
    $scope.dataImageEngineBytesSavedChartOptions = {
      yAxis: {
        min: 0,
        max: 100,
        title: {
          text: ''
        }
      },
      series: [{
        name: ' ',
        data: [0],
        dataLabels: {
          format: '<div style="text-align:center"><span style="font-size:25px;color:' +
            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f} %</span><br/>' +
            '<span style="font-size:12px;color:silver">Traffic Saved</span></div>'
        },
        tooltip: {
          valueSuffix: null //' revolutions/min'
        }
      }]

    };

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
        from_timestamp: moment().subtract(1, 'days').valueOf(),
        to_timestamp: Date.now()
      };
      _.forEach(filters, function (val, key) {
        if (_.indexOf(_filters_field_list, key) !== -1) {
          if (val !== '-' && val !== '') {
            params[key] = val;
          }
        } else {
          if (key === 'count_last_day') {
            params.from_timestamp = moment().subtract(val, 'days').valueOf();
            params.to_timestamp = Date.now();
            delete params.count_last_day;
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
      $scope.reloadDataBytesSaved(); //
      //  reload all lists
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
     * @name  reloadDataBytesSaved
     * @description method call for update data Bytes Saved
     */
    $scope.reloadDataBytesSaved = function () {
      // NOTE: lock UI before finish all requests
      $scope._loadingBytesSaved = true;
      $scope.loadDataBytesSaved(generateFilterParams($scope.filtersBytesSaved))
        .finally(function () {
          $scope._loadingBytesSaved = false;
        });
    };
    /**
     * @name loadDataBytesSaved
     * @description method reload data for ImageEngine Butes Send
     * @param {Object} filters
     *
     * @return {Promise}
     */
    $scope.loadDataBytesSaved = function (filters) {
      $scope.dataImageEngineBytesSaved[0] = 0;
      return StatsImageEngine.imageEngineSavedBytes(filters)
        .$promise
        .then(function (data) {
          var traffic_total_ = 0;
          var traffic_origin_ = 0;
          data.data.map(function (item) {
            traffic_total_ += item.sent_bytes;
            traffic_origin_ += item.original_bytes;
          });

          $scope.dataImageEngineBytesSaved[0] = 0;
          if (traffic_origin_ > 0) {
            // NOTE: calculate value for display Bytes Saved
            var result_ = 100 - ((traffic_total_ / traffic_origin_) * 100);
            if (result_>0){
              // NOTE: display only a positive value
              $scope.dataImageEngineBytesSaved[0] = result_ ;
            }
          }
        })
        .catch(function () {
          $scope.dataImageEngineBytesSaved[0] = 0;
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
