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

    $scope.countries = Countries.query();
    $scope.os = [];
    $scope.device = [];
    $scope.browser = [];
    $scope.country = {};

    $scope.os24 = [];
    $scope.device24 = [];
    $scope.browser24 = [];
    $scope.country24 = {};

    //  load user domains
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
      if ( !$scope.domain || !$scope.domain.id ) {
        return;
      }

      //  reload all lists
      var now = Date.now();
      // NOTE: temporary commented - we can't get now data for last 30 days
      // - specific work ElasticeSerch
      // Stats.topLists({
      //   domainId: $scope.domain.id,
      //   from_timestamp: ( now - 30 * 86400000/*day in ms*/ ),
      //   to_timestamp: now
      // }).$promise.then(function(data) {
      //   // console.log( 'lists', data );
      //   $scope.os = data.data.os;
      //   $scope.browser = data.data.browser;
      //   $scope.device = data.data.device;
      //   var c = {};
      //   data.data.country.forEach( function( item ) {
      //     c[item.key] = item.value;
      //   });
      //   $scope.country = c;
      // });

      Stats.topLists({
        domainId: $scope.domain.id,
        from_timestamp: ( now - 86400000/*day in ms*/ ),
        to_timestamp: now
      }).$promise.then(function(data) {
        // console.log( 'lists', data );
        $scope.os24 = data.data.os;
        $scope.browser24 = data.data.browser;
        $scope.device24 = data.data.device;
        var c = {};
        data.data.country.forEach( function( item ) {
          c[item.key] = item.value;
        });
        $scope.country24 = c;
        // NOTE: this data used into filters on graph with have time filter 1/7/30 days
        // but filter  will has data from last 24 hours
        $scope.os = data.data.os;
        $scope.browser = data.data.browser;
        $scope.device = data.data.device;
        $scope.country = c;
      });

    };
  }
})();
