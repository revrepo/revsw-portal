(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('solidgaugeChart', solidgaugeChartDirective);

  /*@ngInject*/
  function solidgaugeChartDirective() {

    function link($scope, element, attrs) {
      var el = element[0];
      var chartOpts = {
        chart: {
          renderTo: el,
          type: 'solidgauge'
        },
        title: null,
        pane: {
          center: ['50%', '85%'],
          size: '140%',
          startAngle: -90,
          endAngle: 90,
          background: {
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
          }
        },
        tooltip: {
          enabled: false,
          // formatter: function () {
          //   return '<b>' + this.point.name + ': </b>' +
          //     Highcharts.numberFormat(this.point.percentage, 0) + '% (' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' origin size)';
          // }
        },
        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 5,
              borderWidth: 0,
              useHTML: true
            }
          }
        },
        yAxis: {
          stops: [
            [0.1, '#55BF3B'], //  green - '#55BF3B'
            [0.5, '#55BF3B'], // yellow - '#DDDF0D'
            [0.9, '#55BF3B'] // red -'#DF5353'
          ],
          lineWidth: 0,
          minorTickInterval: null,
          tickAmount: 2,
          title: {
            y: -70
          },
          labels: {
            y: 16
          }
        },

        credits: {
          enabled: false
        },
        series: [{
          name: ' ',
          data: [100],
          dataLabels: {
            format: '<div style="text-align:center"><span style="font-size:25px;color:' +
              ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}%</span><br/>' +
              '<span style="font-size:12px;color:silver"> </span></div>'
          },
          tooltip: {
            valueSuffix: ' '
          }
        }]
      };

      var chart = new Highcharts.Chart(angular.merge(chartOpts, ($scope.ngChartOptions || {})));

      $scope.$watch('ngData', function (value) {
        if (!value || !_.isArray(value)) {
          return;
        }
        // Set new data
        chart.series[0].setData(value);
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
