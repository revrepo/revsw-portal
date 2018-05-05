(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('ctypeCacheChart', ctypeCacheChartDirective);

  /*@ngInject*/
  function ctypeCacheChartDirective() {

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
        hideFilters: '=',
        isAutoReload: '@?'
      },
      /*@ngInject*/
      controller: function($scope, Stats, $q, Util, filterGeneratorService, EventsSerieDataService, $sce, $config) {
        var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os', 'browser'];
        $scope.contentTypes = [];
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
              if(key === 'delay') {
                params.from_timestamp = moment().subtract(val, 'h').valueOf();
                params.to_timestamp = Date.now();
                delete params.delay;
              }
            }
          });
          return params;
        }

        function getCacheHitRatio(points) {
          var hits_ = points[0].y;
          var miss_ = points[1].y;
          if (hits_ + miss_ === 0) {
            return 0;
          }
          return parseFloat((hits_ / (hits_ + miss_)) * 100).toFixed(2);
        }

        $scope.heading = 'Cache Hit Ratio For Top 20 Object Content Types';
        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('This chart shows edge cache hit/miss ratio for top ' +
        '20 most popular content types of served objects');

        $scope._loading = false;
        $scope.hasFailedToLoadData = false;
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
            type: 'column',
            zoomType: 'x'
          },
          yAxis: {
            title: {
              text: 'Requests'
            },
            labels: {
              formatter: function() {
                return Util.formatNumber(this.value);
              }
            }
          },
          xAxis: {
            labels: {
              formatter: function() {
                if ($scope.traffic.series[0].data[this.value]) {
                  return $scope.traffic.series[0].data[this.value][0];
                }
                return '';
              }
            }
          },
          tooltip: {
            shared: true,
            formatter: function() {
              if (this.points[0] && this.points[1]) {
                return '<strong>'+this.points[0].key+'</strong><br>' +
                '<span style="color:'+this.points[0].series.color+'">' +
                 this.points[0].series.name+'</span>: <b>' +
                 this.points[0].point.y.toFixed(3)+'</b><br/>' +
                '<span style="color:'+this.points[1].series.color+'">' +
                this.points[1].series.name+'</span>: <b>' +
                this.points[1].point.y.toFixed(3)+'</b><br/>' + 
                '<span>Cache Hit Ratio</span>: <b>' + getCacheHitRatio(this.points) + '%</b><br/>';
              }
              
              return '';
            }
          },
          plotOptions: {
            areaspline: {
              marker: {
                enabled: false
              },
              // @see http://api.highcharts.com/highcharts/plotOptions.areaspline.stacking
              stacking: 'normal'
            },
            column: {
              maxPointWidth: 60
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
          $scope.hasFailedToLoadData = false;
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

              Stats.edgeCacheByCType(angular.merge({
                domainId: $scope.ngDomain.id
              }, generateFilterParams($scope.filters))).$promise

            ])
            .then(function(data) {
              if (data.length === 0 || data[0].length === 0) {
                $scope.traffic = [];
              }
              if (data[0] && data[0].length > 0) {
                data[0].forEach(function(item) {
                  $scope.contentTypes.push(item.cType);
                  series[0].data.push([item.cType, item.HIT]);
                  series[1].data.push([item.cType, item.MISS]);
                });
              }
              return $q.when(series);
            })
            .then(function setNewData(data) {
              // model better to update once
              $scope.traffic = {
                series: series
              };
            })
            .catch(function(err) {
              $scope.traffic = {
                series: series
              };
              $scope.hasFailedToLoadData = true;
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function() {
          if (!$scope.ngDomain || $scope.isAutoReload === 'false') {
            return;
          }
          $scope.reload();
        });
        // NOTE: watch to changes in external filters
        $scope.$watch('filtersSets', function(newVal, oldVall) {
          if(!$scope.ngDomain || $scope.isAutoReload === 'false' || (newVal === oldVall)) {
            return;
          }
          _.extend($scope.filters, newVal);
          $scope.reload();
        });
      }
    };
  }
})();
