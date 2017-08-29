(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.DNSAnalytics')
    .controller('widgetsDNSAnalyticsDefaultChartController', widgetsDNSAnalyticsDefaultChartController);

  function widgetsDNSAnalyticsDefaultChartController(config) {
    var vm = this;
    vm.config = config;
  }

})();
