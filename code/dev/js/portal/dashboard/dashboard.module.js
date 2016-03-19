(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard', [
      'ngStorage',
      'revapm.Portal.Shared',
      'revapm.Portal.Config',
      'revapm.Portal.Resources',
      'ui.router',
      'ngSanitize',
      'adf',
      'adf.provider'
    ])
    .config(function(dashboardProvider) {

      dashboardProvider
        .structure('6-6', {
          rows: [{
            columns: [{
              styleClass: 'col-md-6'
            }, {
              styleClass: 'col-md-6'
            }]
          }]
        })
    })

})();
