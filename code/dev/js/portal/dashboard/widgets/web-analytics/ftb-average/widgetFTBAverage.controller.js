(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .controller('widgetFTBAverageController', widgetFTBAverageController);

  function widgetFTBAverageController(config) {
    var vm = this;
    vm.config = config;
  }

})();
