(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('hitsCacheChart', histCacheChartDirective);

  /*@ngInject*/
  function histCacheChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/traffic-common.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        filtersSets: '=',
        hideFilters: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, $q, Util, filterGeneratorService) {
        var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os', 'browser'];

        function generateFilterParams(filters) {
          var params = {
            from_timestamp: moment().subtract(1, 'days').valueOf(),
            to_timestamp: Date.now()
          };
          _.forEach(filters, function(val, key) {
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

        $scope.heading = 'Edge Cache Efficiency Hits';
        $scope._loading = false;
        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now()
        };

        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }
        $scope.traffic = {
          series: [{
            name: 'Cache Hit',
            data: []
          }, {
            name: 'Cache Miss',
            data: []
          }]
        };

        //  ---------------------------------
        var info_ = null,
          hit_ = 0,
          miss_ = 0,
          tickInterval_ = 10;

        $scope.chartOptions = {
          chart: {
            zoomType: 'x',
            events: {
              redraw: function() {
                if (info_) {
                  info_.destroy();
                  info_ = null;
                }
                var x = this.xAxis[0].toPixels(this.xAxis[0].min) + 3;
                var rel_hit = 0,
                  rel_miss = 0;
                if ((miss_ + hit_) !== 0) {
                  rel_hit = Math.round(hit_ * 1000 / (miss_ + hit_)) / 10;
                  rel_miss = Math.round(miss_ * 1000 / (miss_ + hit_)) / 10;
                }
                info_ = this /*chart*/ .renderer
                  .label('Cache Hits <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(hit_) +
                    '</span> Requests, <span style="font-weight: bold; color: #3c65ac;">' + rel_hit +
                    '</span>%<br> Cache Miss <span style="font-weight: bold; color: darkred;">' + Util.formatNumber(miss_) +
                    '</span> Requests, <span style="font-weight: bold; color: darkred;">' + rel_miss +
                    '</span>%',
                    x /* x */ , 3 /* y */ , '', 0, 0, true /*html*/ )
                  .css({
                    color: '#444'
                  })
                  .attr({
                    fill: 'rgba(240, 240, 240, 0.6)',
                    stroke: '#3c65ac',
                    'stroke-width': 1,
                    padding: 6,
                    r: 2,
                    zIndex: 5
                  })
                  .add();
              }
            }
          },
          yAxis: {
            title: {
              text: 'Requests Per Second'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber(this.value);
              }
            }
          },
          xAxis: {
            type: 'datetime',
            pointInterval: 24 * 60 * 60 * 10000,
          },
          tooltip: {
            xDateFormat: '<span style="color: #000; font-weight: bold;">%H:%M</span> %b %d',
            shared: true,
            headerFormat: '{point.key}<br>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.3f}</b> ({point.percentage:.3f}%)<br/>',
          },
          plotOptions: {
            areaspline: {
              marker: {
                enabled: false
              },
              // @see http://api.highcharts.com/highcharts/plotOptions.areaspline.stacking
              stacking: 'normal'
            }
          },
        };

        /**
         * @name Subscribe for filters change
         * @kind call function
         * @params {Object} scope
         * @params {function} callback function
         */
        filterGeneratorService.subscribeOnFilterChangeEvent($scope, callbackOnGlobalFilterChange);

        /**
         * @name callbackOnGlobalFilterChange
         * @desc triggers when global filter changes
         * @kind function
         * @params {Object} Event object
         * @params {Object} Data passed with event
         */
        function callbackOnGlobalFilterChange($event, eventDataObject) {
          //$scope.updateFilters();
          if (!$scope.filters) {
            $scope.filters = {};
          }

          _.forIn(eventDataObject.data, function(value, key) {
            $scope.filters[key] = value;
          });

          //clear all empty fields in the filter object
          _.forIn($scope.filters, function(value, key) {
            if (!eventDataObject.data[key]) {
              delete $scope.filters[key];
            }
          });
          $scope.reload();
        }

        $scope.reload = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            $scope.traffic = {
              series: [{
                name: 'Cache Hit',
                data: []
              }, {
                name: 'Cache Miss',
                data: []
              }]
            };
            return;
          }

          $scope._loading = true;
          var series = [{
            name: 'Cache Hit',
            data: []
          }, {
            name: 'Cache Miss',
            data: []
          }];
          var _xAxisPointStart = null;
          var _xAxisPointInterval = null;
          $q.all([

              Stats.traffic(angular.merge({
                domainId: $scope.ngDomain.id
              }, generateFilterParams($scope.filters), {
                cache_code: 'HIT'
              })).$promise,

              Stats.traffic(angular.merge({
                domainId: $scope.ngDomain.id
              }, generateFilterParams($scope.filters), {
                cache_code: 'MISS'
              })).$promise

            ])
            .then(function(data) {
              var interval = parseInt(data[0].metadata.interval_sec || 1800);
              _xAxisPointStart = parseInt(data[0].metadata.start_timestamp);
              _xAxisPointInterval = parseInt(data[0].metadata.interval_sec) * 1000;
              hit_ = miss_ = 0;
              if (data[0].data && data[0].data.length > 0) {
                data[0].data.forEach(function(item, idx, items) {
                  hit_ += item.requests;
                  series[0].data.push(item.requests / interval);
                });
                if (hit_ === 0) {
                  series[0].data.length = 0;
                }
              }
              if (data[1].data && data[1].data.length > 0) {
                data[1].data.forEach(function(item) {
                  miss_ += item.requests;
                  series[1].data.push(item.requests / interval);
                });
                if (miss_ === 0) {
                  series[1].data.length = 0;
                }
              }
              return $q.when(series);
            })
            .then(function setNewData(data) {
              // model better to update once
              $scope.traffic = {
                pointStart: _xAxisPointStart,
                pointInterval: _xAxisPointInterval,
                series: series
              };
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function() {
          if (!$scope.ngDomain) {
            return;
          }
          $scope.reload();
        });
      }
    };
  }
})();
