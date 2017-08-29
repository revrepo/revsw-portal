(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .controller('widgetHTTPStatusCodeLineGraphController', widgetHTTPStatusCodeLineGraphController);

  function widgetHTTPStatusCodeLineGraphController(config, $q, Stats) {
    var vm = this;
    vm.config = config;
    // NOTE: The special action for this type of graph
    // need to update Status Codes list for the actual time period
    /**
     * List of Status Codes
     *
     * @param {string|number} domainId
     */
    var statusCode = [];
    vm.reloadStatusCode = function(domainId) {
      if (!config.domain || !config.domain.id) {
        return $q.when();
      }
      var delay = config.filters.delay || 1;
      return Stats.statusCode({
          domainId: config.domain.id,
          from_timestamp: moment().subtract(delay, 'day').valueOf(),
          to_timestamp: Date.now()
        }).$promise
        .then(function(data) {
          statusCode.length = 0;
          if (data.data && data.data.length > 0) {
            angular.forEach(data.data, function(item) {
              statusCode.push(item.key);
            });
            config.statusCode = statusCode;
          }
        });
    };
    vm.reloadStatusCode();
  }

})();
