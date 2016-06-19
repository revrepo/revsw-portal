(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('FBTReportsController', FBTReportsController);

  /*@ngInject*/
  function FBTReportsController($scope, User, AlertService, Stats, Countries, $q) {

    $scope._loading = true;
    // Domain that selected
    $scope.domain = null;
    $scope.domains = [];

    $scope.os = [];
    $scope.device = [];
    $scope.browser = [];

    var countriesList = Countries.query();
    $scope.countries = countriesList;
    $scope.country = {};

    /**
     * Reload list of given entities
     * @param {string} list name
     */
    $scope.reloadList = function( list ) {
      $scope[list] = {};
      Stats[list]({
        domainId: $scope.domain.id,
        count: 250
      }).$promise.then(function( data ) {
        if ( data.data && data.data.length > 0 ) {
          $scope[list] = data.data.filter( function( item ) {
            return item.key !== '--' && item.key !== '-' && item.key !== '';
          })
          .map( function( item ) {
            return item.key;
          });
        }
      });
    };

    /**
     * List of countries
     */
    $scope.reloadCountry = function() {
      $scope.country = {};
      var c = {};
      Stats.country({
        domainId: $scope.domain.id,
        count: 250
      }).$promise.then(function(data) {

        if (data.data && data.data.length > 0) {
          data.data.forEach( function(item) {
            if ( countriesList[item.key] ) {
              c[item.key] = countriesList[item.key];
            }
          });
        }
        $scope.country = c;
      });
    };

    /**
     * reload all lists
     */
    $scope.reload = function() {
      $scope.reloadList('os');
      $scope.reloadList('device');
      $scope.reloadList('browser');
      $scope.reloadCountry();
    };

    // Load user domains
    User.getUserDomains(true)
      .then(function (domains) {
        $scope.domains = domains;
      })
      .catch(function () {
        AlertService.danger('Oops something wrong');
      })
      .finally(function () {
        $scope._loading = false;
      });

    $scope.onDomainSelected = function () {
      if ( $scope.domain && $scope.domain.id ) {
        $scope.reload();
      }
    };
  }
})();
