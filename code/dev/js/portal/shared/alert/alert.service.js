(function() {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .factory('AlertService', AlertService);

  /*@ngInject*/
  function AlertService($interval, toaster, $config) {
    /**
     * @name  getMessage
     * @description
     *  Internal method for get server text message
     *
     * @param  {Object} msg
     * @return {String}     message for display
     */
    function getMessage(msg) {

      if (angular.isObject(msg)) {
        if (msg.status === 403) {
          msg.message = 'Access denied. Do you have a read-only user account?';
          return msg.message;
        } else if (msg.data && msg.data.message) {
          return msg.data.message;
        } else if (msg.message) {
          return msg.message;
        } else {
          return 'Oops, something went wrong';
        }
      } else if (typeof msg === 'string') {
        return msg;
      } else {
        return 'Oops, something went wrong';
      }
    }

    /**
     * Show a success alert
     *
     * @param {string} msg
     * @param {number=} [timeout]
     */
    function success(msg, timeout) {
      if (angular.isUndefined(timeout)) {
        timeout = $config.SUCCESS_MESSAGE_DISPLAY_TIMEOUT;
      }

      var toasterParams = {
        timeout: timeout,
        body: getMessage(msg),
        type: 'success'
      };
      toaster.pop(toasterParams);
    }

    /**
     * Show a danger alert
     *
     * @param {string|object} msg
     * @param {number=} [timeout]
     */
    function danger(msg, timeout) {
      if (angular.isUndefined(timeout)) {
        timeout = $config.SUCCESS_MESSAGE_DISPLAY_TIMEOUT;
      }
      var toasterParams = {
        timeout: 0,
        showCloseButton: true,
        body: getMessage(msg),
        type: 'error'
      };
      toaster.pop(toasterParams);
    }
    /**
      * Show a info alert
      *
      * @param {string|object} msg
      * @param {number=} [timeout]
      */
    function info(msg, timeout) {
      if(angular.isUndefined(timeout)) {
        timeout = $config.SUCCESS_MESSAGE_DISPLAY_TIMEOUT;
      }
      var toasterParams = {
        timeout: 0,
        showCloseButton: true,
        body: getMessage(msg),
        type: 'primary'
      };
      toaster.pop(toasterParams);
    }
    /**
     * Clear all alerts
     */
    function clear() {
      toaster.clear();
    }

    return {

      success: success,

      danger: danger,

      info: info,

      clear: clear
    };
  }
})();
