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
      var colors = Highcharts.getOptions().colors;
      var colorsNum = colors.length;
      // ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]


      /**
       *  watchers
       */
      $scope.$watch('ngData', function(value) {
        if (!value || !_.isObject(value)) {
          return;
        }

        // Update series
        if (_.isArray(value.series)) {

          //  clear series
          var i = chart.series.length;
          while ( i-- ) {
            chart.series[i].remove();
          }

          //  Set new data (add new or reset exists)
          value.series.forEach(function(val, key) {
            if (!!value.pointStart) {
              val.pointStart = value.pointStart;
            }
            if (!!value.pointInterval) {
              val.pointInterval = value.pointInterval;
            }
            if ( !val.color ) {
              val.color = colors[key % colorsNum];
            }
            chart.addSeries(val);
          });
        }

        // update labels
        if (_.isArray(value.labels)) {
          if (value.labels.length === 0) {

            chart.series.forEach(function(series) {
              series.setData([]);
            });

          }
          // Set new data
          chart.xAxis[0].setCategories(value.labels);
        }
        if (!!value.plotLines) {
          value.plotLines.forEach(function(val, key) {
            chart.xAxis[0].addPlotLine(val);
          });
        }

        chart.redraw();
      }, true);


      $scope.$watch('xAxis', function(value) {
        if (!value || !_.isArray(value)) {
          return;
        }
        if (value.length === 0) {
          chart.series.forEach(function(series) {
            series.setData([]);
          });
          chart.redraw();
          return;
        }

        chart.xAxis[0].update(value);
      }, true);

      // NOTE: new Highcharts object must be destroyed
      $scope.$on('$destroy', function () {
          chart.destroy();
      });
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
