  (function () {
    'use strict';

    angular
      .module('revapm.Portal.Resources')
      .factory('StatsImageEngine', StatsImageEngineResource);

    /*@ngInject*/
    function StatsImageEngineResource(Resource, $config) {
      return Resource($config.API_URL + '/stats/imageengine/saved_bytes/:domainId', {}, {

        imageEngineSavedBytes: {
          method: 'GET'
        }

      });
    }
  })();
