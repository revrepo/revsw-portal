(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .controller('widgetHTTPStatusCodeLineGraphController', widgetHTTPStatusCodeLineGraphController);

  function widgetHTTPStatusCodeLineGraphController(config) {
    var vm = this;
    vm.config = config;
  }

})();
