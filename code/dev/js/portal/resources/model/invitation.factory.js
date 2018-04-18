(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Invitation', InvitationResource);

  /*@ngInject*/
  function InvitationResource(Resource, $config) {

    return Resource(null, {id: '@id'}, {
      completeInvitation: {
        url: $config.API_URL + '/users/:id/complete_invitation',
        method: 'PUT'
      },
      resendInvitation: {
        url: $config.API_URL + '/users/:id/resend_invitation',
        method: 'POST'
      },
      getTokenStatus: {
        url: $config.API_URL + '/users/:id/status',
        method: 'GET'
      }
    });
  }
})();
