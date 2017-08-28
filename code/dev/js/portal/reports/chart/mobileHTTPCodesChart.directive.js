(function() {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .directive('mobileHttpCodesChart', mobileHttpCodesChartDirective);

  /*@ngInject*/
  function mobileHttpCodesChartDirective() {

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

        $scope.heading = 'HTTP Status Codes Graph';
        $scope.span = '1';
        $scope._loading = false;
        $scope.hits = {
          labels: [],
          series: []
        };

        $scope.filters = {
          from_timestamp: moment().subtract(1, 'days').valueOf(),
          to_timestamp: Date.now(),
          report_type: 'status_code',
          os: null,
          device: null,
          country: null,
          operator: null,
          network: null
        };

        //  ---------------------------------
        var tickInterval_ = 4;
        $scope.chartOptions = {
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
            tickInterval: tickInterval_,            
          },
          tooltip: {
            xDateFormat: '<span style="color: #000; font-weight: bold;">%H:%M</span> %b %d',
            shared: true,
            headerFormat: '{point.key}<br/>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.3f}</b><br/>'
          }
        };
        var _filters_field_list = ['report_type','from_timestamp', 'to_timestamp', 'country', 'device', 'os', 'browser','network','operator','account_id','app_id'];
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
        $scope.reload = function() {

          $scope._loading = true;
          $scope.filters.account_id = $scope.ngAccount;
          $scope.filters.app_id = ($scope.ngApp || null);

          return Stats.sdk_agg_flow(generateFilterParams($scope.filters))
          .$promise
            .then(function(data) {

              if (data.data && data.data.length > 0) {
                var hits_series = [];
                var labels = [];
                var interval = data.metadata.interval_sec || 1800;
                var offset = interval * 1000;
                var labels_filled_up = false;

                angular.forEach(data.data, function(code) {
                  var s = {
                    name: ('' + code.key),
                    data: [],
                    visible: false
                  };
                  for (var i = 0, len = code.flow.length; i < len; ++i) {
                    var item = code.flow[i];
                    if (!labels_filled_up) {
                      var val = moment(item.time + offset);
                      var label = val.format('[<span style="color: #000; font-weight: bold;">]HH:mm[</span>] MMM D');                      

                      labels.push(label);
                    }
                    var rps = Math.round(item.hits * 1000 / interval) / 1000;
                    s.data.push(rps);
                    if (rps > 0.01) {
                      s.visible = true;
                    }
                  }
                  hits_series.push(s);
                  labels_filled_up = true;
                });

                hits_series[0].visible = true;
                $scope.hits = {
                  labels: labels,
                  series: hits_series
                };
              }else{
                 $scope.hits = {
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
