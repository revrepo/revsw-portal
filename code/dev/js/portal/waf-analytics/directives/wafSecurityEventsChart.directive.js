(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .directive('wafSecurityEventsChart', wafSecurityEventsChartDirective);

  /*@ngInject*/
  function wafSecurityEventsChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/waf-analytics/directives/waf-security-events.tpl.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flZones: '=',
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, StatsWAF, $q, Util, EventsSerieDataService) {

        var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'rule_id', 'zone'];

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

        $scope.heading = 'Security Events';
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
            name: 'Security Events',
            data: []
          }]
        };

        //  ---------------------------------
        var info_ = null,
          requests_ = 0,
          tickInterval_ = 10;

        $scope.chartOptions = {
          chart: {
            zoomType: 'x',
            events: {
              redraw: function () {
                if (info_) {
                  info_.destroy();
                  info_ = null;
                }
                var x = this.xAxis[0].toPixels(this.xAxis[0].min) + 3;
                info_ = this /*chart*/ .renderer
                  .label('Security Events <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(requests_) +
                    '</span>',
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
              text: 'Events Per Second'
            },
            labels: {
              formatter: function () {
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
            headerFormat: '<b>Events Per Second</b><br>{point.key}<br>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.3f}</b><br/>',
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
        $scope.reload = function () {
          if (!$scope.ngDomain || !$scope.ngDomain.id) {
            $scope.traffic = {
              series: [{
                name: 'Security Events',
                data: []
              }]
            };
            return;
          }
          $scope._loading = true;
          var _xAxisPointStart = null;
          var _xAxisPointInterval = null;
          var series = [{
            name: 'Security Events',
            data: []
          }];

          StatsWAF.traffic(angular.merge({
              domainId: $scope.ngDomain.id
            }, generateFilterParams($scope.filters), {}))
            .$promise
            .then(function (data) {
              var interval = data.metadata.interval_sec || 1800;
              _xAxisPointStart = parseInt(data.metadata.start_timestamp);
              _xAxisPointInterval = parseInt(data.metadata.interval_sec) * 1000;
              requests_ = 0;
              if (data.data && data.data.length > 0) {
                data.data.forEach(function (item, idx, items) {
                  requests_ += item.requests;
                  series[0].data.push(item.requests / interval);
                });
                if (requests_ === 0) {
                  series[0].data.length = 0;
                }
              }

              return $q.when(series);
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
            .finally(function () {
              $scope._loading = false;
            });
        };

        $scope.$watch('ngDomain', function () {
          if (!$scope.ngDomain) {
            return;
          }
          $scope.reload();
        });
      }
    };
  }
})();
