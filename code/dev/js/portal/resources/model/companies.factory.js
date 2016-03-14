(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Companies', CompaniesResource);

  /*@ngInject*/
  function CompaniesResource(Resource, $config) {

    return Resource($config.API_URL + '/accounts/:id', {id: '@id', invoice: '@invoice'},{
      invoices: {
        url: $config.API_URL + '/accounts/:id/invoices',
        method: 'GET',
        isArray: true
      },
      invoice: {
        url: $config.API_URL + '/accounts/:id/invoices/:invoice',
        method: 'GET',
        isArray: false
      },
      getPdfStatement: {
        url: $config.API_URL + '/accounts/:id/invoices/:invoice/pdf',
        method: 'GET',
        headers: {
          accept: 'application/pdf'
        },
        responseType: 'arraybuffer',
        cache: false,
        transformResponse: function (data) {
          var pdf;
          if (data) {
            pdf = new Blob([data], {
              type: 'application/pdf'
            });
          }
          return {
            response: pdf
          };
        }
      },
      transactions: {
        url: $config.API_URL + '/accounts/:id/transactions',
        method: 'GET',
        isArray: true
      }
      }
    );
  }

})();
