(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('imageengineSolidgaugePerformanceImprovement', imageengineSolidgaugePerformanceImprovementDirective);

  function imageengineSolidgaugePerformanceImprovementDirective() {
    'ngInject';
    var directive = {
      restrict: 'AE',
      templateUrl: 'parts/reports/imageengine-analytics/imageengine-solidgauge-performance-improvement.tpl.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        filtersSets: '=',
        isAutoReload: '@?isAutoReload' // NOTE: optional property. if not equ no
      },
      /*@ngInject*/
      controller: imageengineSolidgaugePerformanceImprovementCtrl
    };

    return directive;
  }

  /*ngInject*/
  function imageengineSolidgaugePerformanceImprovementCtrl($scope, StatsImageEngine, Util, EventsSerieDataService, $q) {

    var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os', 'browser'];

    function generateFilterParams(filters) {
      var params = {
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

    $scope._loading = false;
    $scope.heading = 'Performance Improvement By ImageEngine';
    $scope.reload = reload;

    $scope.filters = {
      from_timestamp: moment().subtract(1, 'days').valueOf(),
      to_timestamp: Date.now()
    };

    if ($scope.filtersSets) {
      _.extend($scope.filters, $scope.filtersSets);
    }

    //  ---------------------------------
    var traffic_total_ = 0,
      traffic_origin_ = 0;

    $scope.chartData = [0];

    $scope.chartOptions = {
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
            ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}%</span><br/>' +
            '<span style="font-size:12px;color:silver">Traffic Saved</span></div>'
        },
        tooltip: {
          valueSuffix: null //' revolutions/min'
        }
      }]
    };

    $scope.$watch('ngDomain', function () {
      if (!$scope.ngDomain || $scope.isAutoReload === 'false') {
        return;
      }
      reload();
    });

    //////////////////
    /**
     * @name reload
     * @desc method call for update data
     * @kind function
     */
    function reload() {
      if (!$scope.ngDomain || !$scope.ngDomain.id) {
        $scope.chartData[0] = 0;
        return;
      }
      // NOTE: lock UI before finish all requests
      $scope._loading = true;
      $scope.loadData(angular.merge({
          domainId: $scope.ngDomain.id
        }, generateFilterParams($scope.filtersBytesSaved)))
        .finally(function () {
          $scope._loading = false;
        });
    };
    /**
     * @name loadData
     * @description method reload data for ImageEngine Butes Send
     * @param {Object} filters
     *
     * @return {Promise}
     */
    $scope.loadData = function (filters) {
      $scope.chartData[0] = 0;
      traffic_total_ = traffic_origin_ = 0;
      return StatsImageEngine.imageEngineSavedBytes(filters)
        .$promise
        .then(function (data) {
          data.data.map(function (item) {
            traffic_total_ += item.sent_bytes;
            traffic_origin_ += item.original_bytes;
          });

          $scope.chartData[0] = 0;
          if (traffic_origin_ > 0) {
            // NOTE: calculate value for display Bytes Saved
            var result_ = 100 - ((traffic_total_ / traffic_origin_) * 100);
            if (result_ > 0) {
              // NOTE: display only a positive value
              $scope.chartData[0] = result_;
            }
          }
        })
        .catch(function () {
          $scope.chartData[0] = 0;
        });
    };

  }
})();
