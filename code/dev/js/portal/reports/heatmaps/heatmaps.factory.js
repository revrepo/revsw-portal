(function () {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .factory('HeatmapsDrawer', HeatmapsDrawer);

  /*@ngInject*/
  function HeatmapsDrawer() {

    /**
     * conf for the maps, common parts
     */
    function getConfig_() {

      return {
        chart: {
          style: {
            fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
            fontSize: '12px'
          },
        },
        title : {
          text : null
        },
        mapNavigation: {
          enabled: true,
          enableButtons: true,
          enableMouseWheelZoom: false,
          enableTouchZoom: false,
          buttonOptions: {
            align: 'left',
            verticalAlign: 'bottom'
          }
        },
        colorAxis: {
          minColor: '#99CCFF',
          maxColor: '#0050A1',
          type: 'logarithmic'
        },
        tooltip: {
          useHTML: true,
          formatter: function () {
            console.log( this.point );
            return this.point.name + '<br>' + this.point.tooltip;
          }
        },
        legend: {
          enabled: true
        },
        series: [{
          name: '',
          borderColor: 'white',
          states: {
            hover: { color: '#A9DCFF' }
          },
          dataLabels: {
            enabled: false,
            formatter: function () {
              return this.point.labelrank && this.point.name && this.point.labelrank > 1000000 ? this.point.name : null;
            }
          },
          nullColor: '#B0B0B0'
        }]
      };
    }

    /**
     * Draw a world map using given HTML element id
     *
     * @param {String} dom container ID
     * @param {object} data:
        [{
          name: 'United States of America',
          id: 'US',
          value: 42,
          tooltip: 'something: <strong>666</strong> ms'
        },{
          name: 'China', ............
        }]
     */
    function drawWorldMap(containerID, data, opts) {

      clearMap( containerID );
      var $el = $(containerID);

      var $wrapper = $( '<div></div>' );
      $el.append( $wrapper );
      var $btn = $( '<button style="position:absolute;top:0px;left:0px;" class="btn btn-info">Switch to USA map</button>' );
      $el.append( $btn );
      $btn.on( 'click', function() {
        drawUSAMap( containerID, data, opts );
      });

      var conf = getConfig_();
      conf.chart.width = $el.width();
      conf.chart.height = conf.chart.width / 1.4;
      conf.colorAxis.max = data.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.value <= prev ? prev : curr.value;
      }, 0 );
      conf.colorAxis.min = data.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.value >= prev ? prev : curr.value;
      }, conf.colorAxis.max );

      if ( !data || !data.length ) {
        data = [];
        conf.colorAxis.type = 'linear';
      } else {
        conf.colorAxis.type = 'logarithmic';
      }

      conf.series[0].joinBy = ['iso-a2', 'id'];
      conf.series[0].data = data.map( function( item ) {
        return _.clone( item );
      });
      conf.series[0].mapData = Highcharts.maps['custom/world-highres'];

      $wrapper.highcharts( 'Map', _.defaultsDeep( ( opts || {} ), conf ) );
      $el.css( 'height', 'auto' );
    }

    /**
     * Draw a us map using given HTML element id
     *
     * @param {String} container ID
     * @param {object} data - see above drawWorldMap description
     */
    function drawUSAMap( containerID, data, opts ) {

      clearMap( containerID );
      var $el = $(containerID);

      var $wrapper = $( '<div></div>' );
      $el.append( $wrapper );
      var $btn = $( '<button style="position:absolute;top:0px;left:0px;" class="btn btn-info">Switch to World map</button>' );
      $el.append( $btn );
      $btn.on( 'click', function() {
        drawWorldMap( containerID, data, opts );
      });

      var conf = getConfig_();
      conf.chart.width = $el.width();
      conf.chart.height = conf.chart.width / 1.4;
      conf.colorAxis.max = data.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.value <= prev ? prev : curr.value;
      }, 0 );
      conf.colorAxis.min = data.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.value >= prev ? prev : curr.value;
      }, conf.colorAxis.max );

      if ( !data || !data.length ) {
        data = [];
        conf.colorAxis.type = 'linear';
      } else {
        conf.colorAxis.type = 'logarithmic';
      }

      // conf.series[0].joinBy = ['iso-a2', 'id'];
      conf.series[0].joinBy = ['hc-key', 'id'];
      conf.series[0].data = data.map( function( item ) {
        return _.clone( item );
      });
      conf.series[0].mapData = Highcharts.maps['countries/us/us-all'];
      $wrapper.highcharts( 'Map', _.defaultsDeep( ( opts || {} ), conf ) );
      $el.css( 'height', 'auto' );
    }

    /**
     * Clear map
     */
    function clearMap( containerID ) {
      var $el = $( containerID );
      var $wrapper = $el.children('div');
      if ( $wrapper.length ) {
        //  to avoid height jumping
        $el.height( $el.height() );
        $wrapper.highcharts().destroy();
        $wrapper.remove();
      }
      $el.children('button').remove();
    }

    //  ---------------------------------
    return {

      /**
       * @inheritDoc
       */
      clearMap: clearMap,

      /**
       * @inheritDoc
       */
      drawUSAMap: drawUSAMap,

      /**
       * @inheritDoc
       */
      drawWorldMap: drawWorldMap
    };

  }

})();
