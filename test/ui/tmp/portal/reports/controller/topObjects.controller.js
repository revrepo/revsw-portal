(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('TopObjectsController', TopObjectsController);

  /*@ngInject*/
  function TopObjectsController($scope, User, AlertService, Stats, Countries, $q) {

    $scope._loading = true;
    // Domain that selected
    $scope.domain = null;
    $scope.domains = [];

    $scope.country = {};
    $scope.os = [];
    $scope.device = [];
    $scope.browser = [];

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
      if ( !$scope.domain || !$scope.domain.id ) {
        return;
      }

      //  reload all lists
      var now = Date.now();
      Stats.topLists({
        domainId: $scope.domain.id,
        from_timestamp: ( now - 86400000/*day in ms*/ ),
        to_timestamp: now
      }).$promise.then(function(data) {
        // console.log( 'lists', data );
        $scope.os = data.data.os;
        $scope.browser = data.data.browser;
        $scope.device = data.data.device;
        var c = {};
        data.data.country.forEach( function( item ) {
          c[item.key] = item.value;
        });
        $scope.country = c;
      });

    };
  }
})();
