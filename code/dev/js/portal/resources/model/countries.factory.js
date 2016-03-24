(function() {
  'use strict';

  angular
    .module('revapm.Portal.Resources')
    .factory('Countries', CountriesService)
    .factory('CountriesResource', CountriesResource);


  /*@ngInject*/
  function CountriesResource(Resource, $config) {
    return Resource($config.API_URL + '/countries/list', {}, {
      query: {
        isArray: false
      }
    });
  }
  /*@ngInject*/
  function CountriesService($q, $http, $config) {
    // NOTE: query method used attribute "countryList" for caching data
    return {
      query: function() {
        if (!this.countryList) {
          this.countryList = {};
        }
        var deffer = $q.defer();
        if (_.isEmpty(this.countryList)) {
          var scope = this;
          $http.get($config.API_URL + '/countries/list')
            .then(function(data) {
                scope.countryList = data.data;
                deffer.resolve(data.data);
                return data.data;
              },
              function(err) {
                deffer.reject(err);
              });
        } else {
          deffer.resolve(this.countryList);
        }
        return deffer.promise;
      }
    };
  }
})();
