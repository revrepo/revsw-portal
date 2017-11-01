(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('lmRttChart', lmRttChartDirective);

  /*@ngInject*/
  function lmRttChartDirective() {

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
      controller: function($scope, $q, Stats, Util, EventsSerieDataService, $sce, $config) {

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
        $scope._loading = false;
        $scope.hasFailedToLoadData = false;
        $scope.heading = 'Last Mile Round Trip Time Latency';
        $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
        $scope.popoverHelpHTML = $sce.trustAsHtml('TODO text <a href="/demo">DEMO LINK </a> ');

        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now()
        };

        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }

        $scope.traffic = {
          series: [
            { name: 'Average', data: [] },
            { name: 'Min', data: [] },
            { name: 'Max', data: [] }
          ]
        };

        //  ---------------------------------
        var info_ = null,
          lm_rtt_avg_ = 0,
          lm_rtt_max_ = 0,
          lm_rtt_min_ = 0,
          hits_total_ = 0,
          tickInterval_ = 10;

        $scope.chartOptions = {
          chart: {
            type: 'column',
            zoomType: 'x',
            events: {
              redraw: function() {
                if (info_) {
                  info_.destroy();
                  info_ = null;
                }
                var x = this.xAxis[0].toPixels(this.xAxis[0].min) + 3;
                var _text = 'LM RTT Avg <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(Math.round(lm_rtt_avg_)) +
                  '</span>ms, Max <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(Math.round(lm_rtt_max_)) +
                  '</span>ms, Min <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(Math.round(lm_rtt_min_)) +
                  '</span>ms<br>Hits Total <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(hits_total_) +
                  '</span>';
                // NOTE: information about error
                if($scope.hasFailedToLoadData === true) {
                  _text = '<strong style="color: red;"> Failed to retrieve the data - please try again later </strong>';
                }
                info_ = this /*chart*/ .renderer
                  .label(_text,
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
              text: 'Latency, ms'
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
            shared: false,
            headerFormat: '{point.key}<br>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <strong>{point.y:.0f}</strong>ms<br/>',
          },
        };

        //  ---------------------------------
        $scope.reload = function() {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            $scope.traffic = {
              series: [
                { name: 'Average', data: [] },
                { name: 'Min', data: [], visible: false },
                { name: 'Max', data: [], visible: false }
              ]
            };
            return;
          }
          $scope._loading = true;
          $scope.hasFailedToLoadData = false;
          var _xAxisPointStart = null;
          var _xAxisPointInterval = null;
          var series = [
            { name: 'Average', data: [] },
            { name: 'Min', data: [], visible: false },
            { name: 'Max', data: [], visible: false }
          ];
          Stats.lm_rtt_stats(angular.merge({
              domainId: $scope.ngDomain.id
            }, generateFilterParams($scope.filters)))
            .$promise
            .then(function(data) {

              lm_rtt_avg_ = lm_rtt_max_ = hits_total_ = 0;
              if (data.data && data.data.length > 0) {
                lm_rtt_min_ = 1000000;
                var interval = data.metadata.interval_sec || 1800;
                _xAxisPointStart = parseInt(data.metadata.start_timestamp);
                _xAxisPointInterval = parseInt(data.metadata.interval_sec) * 1000;

                data.data.forEach(function(item, idx, items) {

                  lm_rtt_avg_ += item.lm_rtt_avg_ms;
                  if (item.lm_rtt_max_ms > lm_rtt_max_) {
                    lm_rtt_max_ = item.lm_rtt_max_ms;
                  }
                  if (item.lm_rtt_min_ms < lm_rtt_min_) {
                    lm_rtt_min_ = item.lm_rtt_min_ms;
                  }
                  hits_total_ += item.requests;
                  if (item.requests) {
                    series[0].data.push(item.lm_rtt_avg_ms);
                    series[1].data.push(item.lm_rtt_min_ms);
                    series[2].data.push(item.lm_rtt_max_ms);
                  } else {
                    series[0].data.push(null);
                    series[1].data.push(null);
                    series[2].data.push(null);
                  }

                });
                lm_rtt_avg_ /= data.data.length;
                return $q.when(series);
              } else {
                return $q.when(series);
              }
            })
            // NOTE: add event data
            .then(function(series) {
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
