(function () {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .factory('Util', UtilFactory);

  /*@ngInject*/
  function UtilFactory() {

    /**
     * Convert trafic value to Kbps, Mbps, Gbps, Tbps
     *
     * @param {number} bps
     * @returns {string}
     */
    function convertTraffic(bps) {
      if (!bps) {
        return '0 Bps';
      }
      if ( bps < 1 ) {
        return bps.toFixed(2) + ' Bps';
      }
      var sizes = ['Bps', 'Kbps', 'Mbps', 'Gbps', 'Tbps'];
      var i = Math.floor(Math.log(bps) / Math.log(1024));
      var result = ( Math.round(100 * bps / Math.pow(1024, i)) / 100 ) + ' ' + (sizes[i] || '');
      return result || '';
    }

    /**
     * 1234567890.456 --> 1'234'567'890.456
     * 1234567890.456 --> 1'234'567'890.5 when fixed == 1
     *
     * @returns {string}
     */
    function formatNumber( num, fixed ) {
      return ( fixed !== undefined ? num.toFixed( fixed ) : num.toString() )
        .replace( /\B(?=(\d{3})+(?!\d))/g, '\'' );
    }

    /**
     * 1234567890 --> 1.15 GB
     * @returns {string}
     */
    function humanFileSize(size, pr) {
      if ( !size ) {
        return '0 B';
      }
      var i = Math.floor( Math.log(size) / Math.log(1024) );
      return ( size / Math.pow(1024, i) ).toFixed((pr||2)) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }

    /**
     * same as above, fixed to GB
     * @returns {string}
     */
    function humanFileSizeInGB(size, pr) {
      if ( !size ) {
        return '0 GB';
      }
      return ( size / 1073741824/*1024^3*/ ).toFixed((pr||2)) * 1 + ' GB';
    }

    return {

      /**
       * @inheritDoc
       */
      convertTraffic: convertTraffic,

      /**
       * @inheritDoc
       */
      formatNumber: formatNumber,

      /**
       * @inheritDoc
       */
      humanFileSize: humanFileSize,

      /**
       * @inheritDoc
       */
      humanFileSizeInGB: humanFileSizeInGB
    };
  }
})();
