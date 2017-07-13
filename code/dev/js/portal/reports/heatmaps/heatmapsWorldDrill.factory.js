// @see http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/maps/demo/category-map/
// @see http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/maps/demo/map-drilldown/
// @see https://code.highcharts.com/mapdata/
// @see  https://jsfiddle.net/gh/get/library/pure/highslide-software/highcharts.com/tree/master/samples/mapdata/countries/in/in-all
// @see http://www.maxmind.com/download/geoip/misc/region_codes.csv
(function() {
  'use strict';
  angular
    .module('revapm.Portal.Domains')
    .factory('HeatmapsWorldDrillDrawer', HeatmapsWorldDrillDrawer);

  /*@ngInject*/
  function HeatmapsWorldDrillDrawer() {

    /** *********************************
     * conf for the maps, common parts
     */
    function getConfig_() {

      return {
        credits: {
          enabled: false
        },
        chart: {
          style: {
            fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
            fontSize: '12px'
          },
          events: {
            drilldown: function(e) {
              if (!e.seriesOptions) {
                var chart = this;
                var namePoint = e.point.drilldown.toLowerCase();
                var mapKey = 'countries/' + namePoint + '/' + namePoint + '-all';
                // NOTE:  for key 'in' (India) need is used custom map 'India with Andaman and Nicobar' for show all data
                if (namePoint === 'in') {
                  mapKey = 'countries/in/custom/in-all-andaman-and-nicobar';
                }
                // Handle error, the timeout is cleared on success
                var fail = setTimeout(function() {
                  if (!Highcharts.maps[mapKey]) {
                    chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
                    fail = setTimeout(function() {
                      chart.hideLoading();
                    }, 2000);
                  }
                }, 3000);
                // Show the spinner
                chart.showLoading('<i class="glyphicon glyphicon-refresh spin"></i>'); // Font Awesome spinner

                // Load the drilldown map
                $.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function() {
                  var mapData = Highcharts.geojson(Highcharts.maps[mapKey]);
                  // Hide loading and add series
                  chart.hideLoading();
                  clearTimeout(fail);
                  chart.addSeriesAsDrilldown(e.point, {
                    allAreas: true,
                    joinBy: ['hc-key', 'id'],
                    name: e.point.name,
                    mapData: mapData,
                    data: e.point.options.regions,
                    dataLabels: {
                      enabled: true, // NOTE: show name on map
                      format: '{point.name}'
                    }
                  });
                });
              }
              // NOTE: change titles
              this.setTitle({
                text: e.point.name
              }, {
                text: ''
              });
            },
            drillup: function() {
              this.setTitle({
                text: ''
              }, {
                text: 'Click On Country To See Per-Region Heatmap'
              });
            }
          }
        },
        title: {
          text: '',
          align: 'center',
          y: 10,
          style: {
            fontSize: '16px'
          }
        },
        subtitle: {
          text: 'Click On Country To See Per-Region Heatmap',
          floating: false,
          align: 'left',
          y: 10,
          style: {
            fontSize: '12px'
          }
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
        plotOptions: {
          map: {
            allAreas: true,
            joinBy: ['iso-a2', 'id'],
            mapData: Highcharts.maps['custom/world-highres'],
          }
        },
        colorAxis: {
          minColor: '#99CCFF',
          maxColor: '#0050A1',
          type: 'logarithmic',
          tickPixelInterval: 100
        },
        tooltip: {
          useHTML: true,
          formatter: function() {
            var labelText = '<span style="font-weight: bold; color: #004090;">' + this.point.name + '</span><br>';
            if (!!this.point.tooltip) {
              labelText += this.point.tooltip;
            }
            return labelText;
          }
        },
        // @see http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/maps/demo/map-drilldown/
        // legend: small ? {} : {
        //   layout: 'vertical',
        //   align: 'right',
        //   verticalAlign: 'middle'
        // },
        legend: {
          enabled: true,
          itemDistance: 60,
          symbolHeight: 6,
          symbolWidth: 400
        },

        series: [{
          name: '', // TODO: change title?
          borderColor: 'white',
          states: {
            hover: {
              color: '#A9DCFF'
            }
          },
          dataLabels: {
            enabled: false,
            // format: '{point.properties.hc-key}'
            formatter: function() {
              return this.point.labelrank && this.point.name && this.point.labelrank > 1000000 ? this.point.name : null;
            }
          },
          nullColor: '#B0B0B0'
        }],
        drilldown: {
          activeDataLabelStyle: {
            color: '#FFFFFF',
            textDecoration: 'none',
            textOutline: '1px #000000'
          },
          drillUpButton: {
            relativeTo: 'spacingBox',
            position: {
              align: 'top',
              x: 0,
              y: 0
            }
          }
        }
      };
    }

    /** *********************************
     *  ctor
     *
     * @param {string} DOM node ID
     */
    function Drawer(containerID) {
      this.reInit(containerID);
      this.currentMap = '';
      this.currentOpts = {};
      this.currentData = null;
    }

    /** *********************************
     *  re-init context
     *
     * @param {string} DOM node ID
     */
    Drawer.prototype.reInit = function(containerID) {
      if (!containerID) {
        throw new Error('Drawer: containerID should be provided');
      }
      this.destroy();
      this.$el = $(containerID);
      this.$el.css({
        width: '100%',
        'padding-bottom': '55%'
      });
      this.$wrapper = $('<div></div>');
      this.$el.append(this.$wrapper);
      this.$wrapper.css({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      });
    };

    /** *********************************
     *
     *
     */
    Drawer.prototype.destroy = function() {
      if (!this.$el) {
        return;
      }
      this.$wrapper.highcharts().destroy();
      this.$wrapper.remove();
      this.$wrapper = null;
      this.$el = null;
    };

    /** *********************************
     * Draw World map
     *
     * @param {object} data:
        world: [{
            name: 'United States of America',
            id: 'US',
            value: 42,
            tooltip: 'something: <strong>666</strong> ms',
            regions:[]
          },{
            name: 'China', ............
          }],
        usa: [{
            name: 'AL',
            id: 'AL',
            value: 12,
            tooltip: 'something: <strong>12</strong> ms',
            regions:[]
          },{
            name: 'MI', ............
          }]
     * @param {object} options to override maps config
     */
    Drawer.prototype.drawWorldMap = function(data, opts) {
      if (!data) {
        return;
      }
      this.currentData = data;
      this.currentOpts = opts;
      var conf = getConfig_();
      conf.colorAxis.max = data.reduce(function(prev, curr) {
        return curr.value === undefined || curr.id === '--' || curr.value <= prev ? prev : curr.value;
      }, 0);
      conf.colorAxis.min = data.reduce(function(prev, curr) {
        return curr.value === undefined || curr.id === '--' || curr.value >= prev ? prev : curr.value;
      }, conf.colorAxis.max);

      if (!data || !data.length || !conf.colorAxis.min) {
        conf.colorAxis.type = 'linear';
      } else {
        conf.colorAxis.type = 'logarithmic';
      }
      conf.series[0].joinBy = ['iso-a2', 'id'];
      conf.series[0].data = data.map(function(item) {
        return _.clone(item);
      });
      var dataMap_ = Highcharts.geojson(Highcharts.maps['custom/world-highres']);
      conf.series[0].mapData = $.each(dataMap_, function(item) {
        // console.log(this.properties);
        this.drilldown = this.properties['hc-key'];
        this.value = item; // Non-random bogus data
      });

      // conf.series[0].mapData = Highcharts.maps['custom/world-highres'];
      this.$wrapper.highcharts('Map', _.defaultsDeep({}, (opts || {}), conf));

    };

    /** *********************************
     * (re)Draw current map with the new data, world for the first call
     *
     * @params  data {world:[],usa:[]}
     */
    Drawer.prototype.drawCurrentMap = function(data, opts) {
      this.drawWorldMap(data.world, opts);
    };

    //  ---------------------------------
    return {
      create: function(containerID) {
        return new Drawer(containerID);
      }
    };

  }

})();
