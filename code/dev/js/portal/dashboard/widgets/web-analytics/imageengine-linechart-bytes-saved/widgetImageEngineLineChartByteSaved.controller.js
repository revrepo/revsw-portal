(function () {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .controller('widgetImageEngineLinechartBytesSavedController', widgetImageEngineLinechartBytesSavedController);

  function widgetImageEngineLinechartBytesSavedController(config, Stats) {
    var vm = this;
    vm.config = config;
    // NOTE: this widget use external directive with grapth and don`t need logic get data
  }
})();
