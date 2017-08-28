(function() {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .directive('mobileRpsChart', mobileRpsChartDirective);

  /*@ngInject*/
  function mobileRpsChartDirective() {

    return {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/mobile-base-traffic.html',
      scope: {
        ngAccount: '=',
        ngApp: '=',
        flOses: '=',
        flDevices: '=',
        flCountries: '=',
        flOperators: '=',
        flNetworks: '=',
        flDisabled: '=',
        filtersSets: '='
      },
      /*@ngInject*/
      controller: function($scope, Stats, Util) {
        var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os', 'browser','network','operator','account_id','app_id'];
        $scope.heading = 'Requests Per Second Graph';
        $scope.span = '1';
        $scope._loading = false;

        $scope.hits = {
          labels: [],
          series: [{
            name: 'RPS',
            data: []
          }]
        };

        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now(),
          os: null,
          device: null,
          country: null,
          operator: null,
          network: null
        };

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
        if ($scope.filtersSets) {
          _.extend($scope.filters, $scope.filtersSets);
        }
        //  ---------------------------------
        var info_ = null,
          rps_avg_ = 0,
          rps_max_ = 0,
          hits_total_ = 0,
          tickInterval_ = 4;

        $scope.chartOptions = {
          chart: {
            events: {
              redraw: function() {
                if (info_) {
                  info_.destroy();
                  info_ = null;
                }
                info_ = this /*chart*/ .renderer
                  .label('RPS Avg <span style="font-weight: bold; color: #3c65ac;">' + (Math.round(rps_avg_ * 1000) / 1000) +
                    '</span> Max <span style="font-weight: bold; color: #3c65ac;">' + (Math.round(rps_max_ * 1000) / 1000) +
                    '</span><br>Hits Total <span style="font-weight: bold; color: #3c65ac;">' + Util.formatNumber(hits_total_) +
                    '</span>',
                    this.xAxis[0].toPixels(0), 0, '', 0, 0, true /*html*/ )
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
            title:{ // Display 'Date' instead of 'Category'
              text: 'Date'
            },
            crosshair: {
              width: 1,
              color: '#000000'
            },
            tickInterval: tickInterval_   
          },
          tooltip: {
            xDateFormat: '<span style="color: #000; font-weight: bold;">%H:%M</span> %b %d',
            shared: true,
            headerFormat: '{point.key}<br/>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.3f}</b><br/>'
          }
        };

        //  ---------------------------------
        $scope.reload = function() {

          $scope._loading = true;

          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ($scope.ngApp || null);
          return Stats.sdk_flow(generateFilterParams($scope.filters))
            .$promise
            .then(function(data) {

              var hits_series = [{
                name: 'RPS',
                data: []
              }];

              rps_avg_ = rps_max_ = hits_total_ = 0;
              if (data.data && data.data.length > 0) {
                var labels = [];
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;

                data.data.forEach(function(item, idx, items) {

                  var val = moment(item.time + offset);
                  var label = val.format('[<span style="color: #000; font-weight: bold;">]HH:mm[</span>] MMM D');
                  labels.push(label); // Pass just a label to avoid [object Object] bug                  

                  var rps = item.hits / interval;
                  rps_avg_ += rps;
                  if (rps > rps_max_) {
                    rps_max_ = rps;
                  }
                  hits_series[0].data.push(Math.round(1000 * rps) / 1000);
                  hits_total_ += item.hits;
                });
                rps_avg_ /= data.data.length;
                if (hits_total_ === 0) {
                  hits_series[0].data.length = 0;
                }
                $scope.hits = {
                  labels: labels,
                  series: hits_series
                };
              } else {
                $scope.hits = {
                  labels: [],
                  series: []
                };
              }
            })
            .finally(function() {
              $scope._loading = false;
            });
        };

        //  ---------------------------------
        $scope.$watch('ngApp', function() {
          if ($scope.ngAccount || $scope.ngApp) {
            $scope.reload();
          }
        });
      }
    };
  }
})();
