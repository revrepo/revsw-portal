(function () {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .factory('Util', UtilFactory);

  /*@ngInject*/
  function UtilFactory() {

    /**
     * Convert traffic value to bytes per second
     *
     * @param {number} bytes
     * @param {number} delay
     * @returns {number}
     */
    function toBps(bytes, delay) {
      delay = delay || 1800;
      if (!angular.isNumber(delay)) {
        delay = 1800;
      }
      return (bytes / delay * 8);
    }

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
     * Convert value to RPS
     *
     * @param {number} bytes
     * @param {number} delay
     * @param {boolean=} [isNumber] if true - result will be a numeric. Otherwise string
     * @returns {string|string}
     */
    function toRPS(bytes, delay, isNumber) {
      if (!angular.isNumber(delay)) {
        delay = 1800;
      }
      var result = (bytes / (delay)).toFixed(1);
      if (isNumber) {
        result = parseFloat(result);
        return result || 0;
      }
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
      toBps: toBps,

      /**
       * @inheritDoc
       */
      toRPS: toRPS,

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
