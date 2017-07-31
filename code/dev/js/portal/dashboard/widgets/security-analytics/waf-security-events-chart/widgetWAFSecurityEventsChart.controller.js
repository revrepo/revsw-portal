(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.SecurityAnalytics')
    .controller('widgetWAFSecurityEventsChartController', widgetWAFSecurityEventsChartController);

  function widgetWAFSecurityEventsChartController(config) {
    var vm = this;
    vm.config = config;
  }

})();
