(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('requestStatusChart', requestStatusChartDirective);

  /*@ngInject*/
  function requestStatusChartDirective() {

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
        isAutoReload: '@?'
      },
      /*@ngInject*/
      controller: function($scope, Stats, $q, Util, EventsSerieDataService, $sce, $config) {

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

        $scope.heading = 'Success/Failure Request Status';
        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('The CDN can detect whether a response was successfully delivered to a requesting end user. ' +
          'The line chart shows the rate of successfully and unsuccessfully delivered objects. ' +
          'Some level of failed deliveries is normal and can be the result of browsers dropping requests when end users are leaving a page ' +
          'without waiting for all embedded objects to load.');

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
            name: 'Successful',
            data: []
          }, {
            name: 'Failed',
            data: []
          }]
        };

        //  ---------------------------------
        var info_ = null,
          success_ = 0,
          failure_ = 0,
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
                var rel_success = 0,
                  rel_failure = 0;
                if ((failure_ + success_) !== 0) {
                  rel_success = Math.round(success_ * 1000 / (failure_ + success_)) / 10;
                  rel_failure = Math.round(failure_ * 1000 / (failure_ + success_)) / 10;
                }
                var _text = 'Successful <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(success_) +
                  '</span> Requests, <span style="font-weight: bold; color: #3c65ac;">' + rel_success +
                  '</span>%<br> Failed <span style="font-weight: bold; color: darkred;">' + Util.formatNumber(failure_) +
                  '</span> Requests, <span style="font-weight: bold; color: darkred;">' + rel_failure +
                  '</span>%';
                if($scope.hasFailedToLoadData === true) {
                  _text = '<strong style="color: red;"> Failed to retrieve the data - please try again later </strong>';
                }
                info_ = this /*chart*/ .renderer
                  .label( _text,
                    x /* x */ , 3 /* y */ , '', 0, 0, true /*html*/ )
                  .css({
                    color: '#444'
                  })
                  .attr({
                    fill: 'rgba(240, 240, 240, 0.6)',
                    stroke: $scope.hasFailedToLoadData ? 'red' : '#3c65ac', // NOTE: border color
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

        //  ---------------------------------
        $scope.reload = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            $scope.traffic = {
              series: [{
                name: 'Successful',
                data: []
              }, {
                name: 'Failed',
                data: []
              }]
            };
            return;
          }
          $scope._loading = true;
          $scope.hasFailedToLoadData = false;
          var _xAxisPointStart = null;
          var _xAxisPointInterval = null;
          var series = [{
            name: 'Successful',
            data: []
          }, {
            name: 'Failed',
            data: []
          }];
          $q.all([

              Stats.traffic(angular.merge({
                domainId: $scope.ngDomain.id
              }, generateFilterParams($scope.filters), {
                request_status: 'OK'
              })).$promise,

              Stats.traffic(angular.merge({
                domainId: $scope.ngDomain.id
              }, generateFilterParams($scope.filters), {
                request_status: 'ERROR'
              })).$promise

            ])
            .then(function(data) {
              var interval = data[0].metadata.interval_sec || 1800;
              _xAxisPointStart = parseInt(data[0].metadata.start_timestamp);
              _xAxisPointInterval = parseInt(data[0].metadata.interval_sec) * 1000;
              success_ = failure_ = 0;
              if (data[0].data && data[0].data.length > 0) {
                data[0].data.forEach(function(item, idx, items) {

                  success_ += item.requests;
                  series[0].data.push(item.requests / interval);
                });
                if (success_ === 0) {
                  series[0].data.length = 0;
                }
              }
              if (data[1].data && data[1].data.length > 0) {
                data[1].data.forEach(function(item) {
                  failure_ += item.requests;
                  series[1].data.push(item.requests / interval);
                });
                if (failure_ === 0) {
                  series[1].data.length = 0;
                }
              }
              return $q.when(series);
            })
            .then(function(series) {
              // NOTE: add events data
              var filterParams = generateFilterParams($scope.filters);
              var options = {
                from_timestamp: filterParams.from_timestamp,
                to_timestamp: filterParams.to_timestamp,
                domain_id: $scope.ngDomain.id,
              };
              return EventsSerieDataService.extendSeriesEventsDataForDomainId(series, options);
            })
            .then(function setNewData(data) {
              // model better to update once
              $scope.traffic = {
                pointStart: _xAxisPointStart,
                pointInterval: _xAxisPointInterval,
                series: series
              };
            })
            .catch(function(err) {
              $scope.traffic = {
                pointStart: _xAxisPointStart,
                pointInterval: _xAxisPointInterval,
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
      }
    };
  }
})();
