(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('barChart', barChartDirective);

  /*@ngInject*/
  function barChartDirective() {

    function link($scope, element, attrs) {
      var el = element[0];
      var chartOpts = {
        chart: {
          renderTo: el,
//          plotBackgroundColor: null,
//          plotBorderWidth: null,
//          plotShadow: false,
          type: 'bar',

        },

        title: false,
        tooltip: false,
        //{
        //   formatter: function() {
        //     return '<b>'+ this.point.name +': </b>'+
        //       Highcharts.numberFormat(this.point.percentage, 0) + '% (' + Highcharts.numberFormat(this.y, 0, '.', ',') + ' requests)';
        //   }
        // },

        plotOptions: {
          bar: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f}%',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            },
                innerSize: 100,
                depth: 45
          }
        },

        credits: {
          enabled: false
        },

        series: []
      };
      var colors = Highcharts.getOptions().colors;
      var colorsNum = colors.length;
      var chart = new Highcharts.Chart( angular.merge(chartOpts, ($scope.ngChartOptions || {})));

      $scope.$watch('ngData', function (value) {
        if(!value || !_.isObject(value)) {
          return;
        }
        // Update series
        if(_.isArray(value.series)) {

          //  clear series
          var i = chart.series.length;
          while(i--) {
            chart.series[i].remove();
          }

          //  Set new data (add new or reset exists)
          value.series.forEach(function(val, key) {
            if(!!value.pointStart) {
              val.pointStart = value.pointStart;
            }
            if(!!value.pointInterval) {
              val.pointInterval = value.pointInterval;
            }
            if(!val.color) {
              val.color = colors[key % colorsNum];
            }
            chart.addSeries(val);
          });
        }
      });
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
