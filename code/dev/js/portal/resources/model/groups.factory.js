(function () {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Groups', GroupsResource);

  /*@ngInject*/
  function GroupsResource(Resource, $config) {

    return Resource($config.API_URL + '/groups/:id', {id: '@id'});
  }
})();
