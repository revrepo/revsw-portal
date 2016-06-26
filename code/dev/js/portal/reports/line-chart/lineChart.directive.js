(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('lineChart', lineChartDirective);

  /*@ngInject*/
  function lineChartDirective() {

    function link($scope, element, attrs) {
      var el = element[0];

      var chartOptions = {
        chart: {
          zoomType: 'x',
          renderTo: el,
          type: 'areaspline',

        },

        title: {
          text: ''
        },

        xAxis: {
          // NOTE: DON`T SET default property "categories" and "tickInterval"!!!
          crosshair: {
            width: 1,
            color: '#000000'
          },
        },

        yAxis: {
          title: {
            text: 'RPS'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },

        legend: {
          //layout: 'vertical',
          //align: 'bottom',
          //verticalAlign: 'middle',
          borderWidth: 0
        },

        plotOptions: {
          areaspline: {
            marker: {
              enabled: false
            }
          }
        },

        credits: {
          enabled: false
        },
        series: []
      };

      var chart = new Highcharts.Chart(angular.merge(chartOptions, ($scope.ngChartOptions || {})));

      /**
       * Redraw current chart
       */
      $scope.reload = function() {
        chart.redraw();
      };

      /**
       * Clear current chart
       */
      $scope.clearChart = function() {
        chart.series.forEach(function(series) {
          // series.remove();
          series.setData([]);
        });
        $scope.reload();
      };

      /**
       *
       */
      $scope.$watch('ngData', function(value) {
        if (!value || !_.isObject(value)) {
          return;
        }
        // update labels
        if (_.isArray(value.labels)) {
          if (value.labels.length === 0) {
            $scope.clearChart();
            return;
          }
          // Set new data
          chart.xAxis[0].setCategories(value.labels);
        }
        // Update series
        if (_.isArray(value.series)) {
          if (value.series.length === 0) {
            chart.series.forEach(function(val, key) {
              chart.series[key].setData([]);
              //chart.series[key].series.remove();
            });
            return;
          }
          // Set new data (add new or reset exists)
          value.series.forEach(function(val, key) {
            if (!chart.series[key]) {
              if (!!value.pointStart) {
                val.pointStart = value.pointStart;
              }
              if (!!value.pointInterval) {
                val.pointInterval = value.pointInterval;
              }
              chart.addSeries(val);
            } else {
              if (!!value.pointStart) {
                val.pointStart = value.pointStart;
              }
              if (!!value.pointInterval) {
                val.pointInterval = value.pointInterval;
              }
              chart.series[key].update(val, false);
            }
          });
        }
        if (!!value.plotLines) {
          value.plotLines.forEach(function(val, key) {
            chart.xAxis[0].addPlotLine(val);
          });
        }
        $scope.reload();
      }, true);

      $scope.$watch('xAxis', function(value) {
        if (!value || !_.isArray(value)) {
          return;
        }
        if (value.length === 0) {
          $scope.clearChart();
          return;
        }
        chart.xAxis[0].update(value);
      }, true);
    }

    return {
      scope: {
        ngChartOptions: '=',
        ngData: '='
      },
      link: link
    };
  }

})();
