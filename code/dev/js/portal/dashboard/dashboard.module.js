(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard', [
      'ngStorage',
      'revapm.Portal.Shared',
      'revapm.Portal.Config',
      'revapm.Portal.Resources',
      'ui.router',
      'ngSanitize',
      // 'adf', // TODO: add after fix conflict with directive 'alert'
      'adf.provider',
    ])
    .config(function(dashboardProvider) {
      // NOTE: define dashboard structures
      dashboardProvider.structure('8-4', {
          title: '(One Wide Column And One Narrow Column)',
          rows: [{
            columns: [{
              styleClass: 'col-md-8'
            }, {
              styleClass: 'col-md-4'
            }]
          }]
        })
        .structure('12', {
          title: '(One Wide Column)',
          rows: [{
            columns: [{
              styleClass: 'col-md-12'
            }]
          }]
        })
        .structure('6-6', {
          title: '(Two Columns Of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-6'
            }, {
              styleClass: 'col-md-6'
            }]
          }]
        })
        .structure('4-4-4', {
          title: '(Three Columns of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-4'
            }, {
              styleClass: 'col-md-4'
            }, {
              styleClass: 'col-md-4'
            }]
          }]
        })
        .structure('3-3-3-3', {
          title: '(Four Columns Of Equal Width)',
          rows: [{
            columns: [{
              styleClass: 'col-md-3'
            }, {
              styleClass: 'col-md-3'
            }, {
              styleClass: 'col-md-3'
            }, {
              styleClass: 'col-md-3'
            }]
          }]
        });
    });
})();
