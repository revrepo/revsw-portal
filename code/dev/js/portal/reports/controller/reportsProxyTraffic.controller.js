(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('ReportsProxyTrafficController', ReportsProxyTrafficController);

  /*@ngInject*/
  function ReportsProxyTrafficController($scope,
    $rootScope,
    $localStorage,
    User,
    AlertService,
    Stats,
    Countries,
    $timeout,
    $state,
    $config
  ) {

    $scope.userService = User;
    $scope._loading = true;
    // Domain that selected
    $scope.domain = $rootScope.domain;

    $scope.pieOpts = {
      scaleOverride: true
    };

    $scope.os = [];
    $scope.device = [];
    $scope.browser = [];
    $scope.country = {};
    $scope.statusCode = [];

    $scope.onDomainSelected = function() {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }

      var now = Date.now();
      //  reload all lists
      Stats.topLists({
        domainId: $scope.domain.id,
        from_timestamp: ( now - 30*86400000/*day in ms*/ ),
        to_timestamp: now,
        status_codes: true
      }).$promise.then(function(data) {
        // console.log( 'lists', data.data );
        $scope.os = data.data.os;
        $scope.browser = data.data.browser;
        $scope.device = data.data.device;
        $scope.statusCode = data.data.status_code;
        var c = {};
        data.data.country.forEach( function( item ) {
          c[item.key] = item.value;
        });
        $scope.country = c;
      });

    };
  }
})();
