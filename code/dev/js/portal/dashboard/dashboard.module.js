(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard', [
      'ngStorage',
      'revapm.Portal.Shared',
      'revapm.Portal.Config',
      'revapm.Portal.Resources',
      'ui.router',
      'ngSanitize',
      // 'adf', // TODO: add after fix conflict with directive "alert"
      'adf.provider',
    ])
    .config(function(dashboardProvider) {
      // NOTE: define dashboard structures
      dashboardProvider
        .structure('6-6', {
          title: '"Two Columns Of Equal Width"',
          rows: [{
            columns: [{
              styleClass: 'col-md-6'
            }, {
              styleClass: 'col-md-6'
            }]
          }]
        });


    });
})();
