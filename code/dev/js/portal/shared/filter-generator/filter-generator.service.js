/* filter-generator.service.js */

/** 
 * @name filterGeneratorService
 * @module 'revapm.Portal.Shared'
 * @desc filter generator
 */
(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .service('filterGeneratorService', filterGeneratorService);

  filterGeneratorService.$inject = [
    '$rootScope',
    '$config'
  ];

  function filterGeneratorService(
    $rootScope,
    $config
  ) {
    var api = {
      broadcastFilterChangeEvent: broadcastFilterChangeEvent,
      subscribeOnFilterChangeEvent: subscribeOnFilterChangeEvent
    };

    return api;

    ////////////

    /**
     * @name broadcastFilterChangeEvent
     * @desc broadcasts in the rootScope filter change event and sends filter values
     * @kind function
     * @params {Array} Array of the new values
     */
    function broadcastFilterChangeEvent(values) {
      $rootScope.$emit($config.EVENTS.FILTER_CHANGED, { data: values });
    }

    /**
     * @name subscribeOnFilterChangeEvent
     * @desc subscribes on the filter change event and clears the event on the scope destroy
     * @kind function
     * @params {Object} $Scope of the controller
     * @params {Function} callback to trigger on the event
     */
    function subscribeOnFilterChangeEvent($scope, callback) {
      var event = $rootScope.$on($config.EVENTS.FILTER_CHANGED, callback);
      
      $scope.$on('$destroy', function() {
        event();
      });
    }
  }
})(angular);
