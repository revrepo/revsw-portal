(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('TrafficAlerts', TrafficAlertsResource);

  /*@ngInject*/
  function TrafficAlertsResource(Resource, $config) {

    return Resource($config.API_URL + '/traffic_alerts/:id', { id: '@id' }, {
      status: {
        url: $config.API_URL + '/traffic_alerts/:id/status',
        method: 'GET'
      }
    });
  }
})();
