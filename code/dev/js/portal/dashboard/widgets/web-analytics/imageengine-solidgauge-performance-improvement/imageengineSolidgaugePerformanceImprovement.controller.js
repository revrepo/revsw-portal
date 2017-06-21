(function () {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .controller('widgetImageengineSolidgaugePerformanceImprovementController', widgetImageengineSolidgaugePerformanceImprovementController);

  function widgetImageengineSolidgaugePerformanceImprovementController(config, Stats) {
    var vm = this;
    vm.config = config;
    // NOTE: this widget use external directive with grapth and don`t need logic get data
  }
})();
