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
        credits: { enabled: false },
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
            // console.log( this.point );
            return '<span style="font-weight: bold; color: #004090;">' + this.point.name + '</span><br>' + this.point.tooltip;
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
        world: [{
            name: 'United States of America',
            id: 'US',
            value: 42,
            tooltip: 'something: <strong>666</strong> ms'
          },{
            name: 'China', ............
          }],
        usa: [{
            name: 'AL',
            id: 'AL',
            value: 12,
            tooltip: 'something: <strong>12</strong> ms'
          },{
            name: 'MI', ............
          }]
     * @param {Object} options to override maps config
     */
    function drawWorldMap(containerID, data, opts) {

      clearMap( containerID );
      var $el = $(containerID);
      $el.css({ width: '100%', 'padding-bottom': '55%' });

      var $wrapper = $( '<div></div>' );
      $el.append( $wrapper );
      $wrapper.css({ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 });
      var $btn = $( '<button style="position:absolute;top:0px;left:0px;" class="btn">Show USA Map</button>' );
      $el.append( $btn );
      $btn.on( 'click', function() {
        drawUSAMap( containerID, data, opts );
      });

      var conf = getConfig_();
      conf.colorAxis.max = data.world.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.id === '--' || curr.value <= prev ? prev : curr.value;
      }, 0 );
      conf.colorAxis.min = data.world.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.id === '--' || curr.value >= prev ? prev : curr.value;
      }, conf.colorAxis.max );

      if ( !data.world || !data.world.length || !conf.colorAxis.min ) {
        conf.colorAxis.type = 'linear';
      } else {
        conf.colorAxis.type = 'logarithmic';
      }

      conf.series[0].joinBy = ['iso-a2', 'id'];
      conf.series[0].data = data.world.map( function( item ) {
        return _.clone( item );
      });
      conf.series[0].mapData = Highcharts.maps['custom/world-highres'];

      $wrapper.highcharts( 'Map', _.defaultsDeep( ( opts || {} ), conf ) );
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
      $el.css({ width: '100%', 'padding-bottom': '70%' });

      var $wrapper = $( '<div></div>' );
      $el.append( $wrapper );
      $wrapper.css({ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 });
      var $btn = $( '<button style="position:absolute;top:0px;left:0px;" class="btn">Show World Map</button>' );
      $el.append( $btn );
      $btn.on( 'click', function() {
        drawWorldMap( containerID, data, opts );
      });

      var conf = getConfig_();
      conf.colorAxis.max = data.usa.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.id === '--' || curr.value <= prev ? prev : curr.value;
      }, 0 );
      conf.colorAxis.min = data.usa.reduce( function( prev, curr ) {
        return curr.value === undefined || curr.id === '--' || curr.value >= prev ? prev : curr.value;
      }, conf.colorAxis.max );

      conf.colorAxis.type = 'linear';
      // if ( !data.usa || !data.usa.length || !conf.colorAxis.min ) {
      //   conf.colorAxis.type = 'linear';
      // } else {
      //   conf.colorAxis.type = 'logarithmic';
      // }

      conf.series[0].joinBy = ['postal-code', 'id'];
      conf.series[0].data = data.usa.map( function( item ) {
        return _.clone( item );
      });
      conf.series[0].mapData = Highcharts.maps['countries/us/us-all'];
      $wrapper.highcharts( 'Map', _.defaultsDeep( ( opts || {} ), conf ) );
    }

    /**
     * Clear map
     */
    function clearMap( containerID ) {
      var $el = $( containerID );
      var $wrapper = $el.children('div');
      if ( $wrapper.length ) {
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
