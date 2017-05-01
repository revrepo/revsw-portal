(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('WAFAnalyticsController', WAFAnalyticsController);

  /*@ngInject*/
  function WAFAnalyticsController($scope,
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

    $scope.countries = Countries.query();

    // TODO: ?? rebase to $config
    $scope.zonesList = {
      'args': 'ARGS',
      'header': 'HEADER',
      'body': 'BODY',
      'url': 'URL'
    };
    // Domain that selected
    $scope.domain = $rootScope.domain;
    $scope.pieOpts = {
      scaleOverride: true
    };
    $scope._loading = true;
    var u = User.getUser();
    $scope.account = u.companyId[0] || null;


    /**
     * @name onDomainSelected
     * @desc action
     */
    $scope.onDomainSelected = function () {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.reload();
    };
    /**
     * @name reload
     * @desc method update all data
     */
    $scope.reload = function () {
      // TODO: add call reload all data sections
      // $scope.reloadTops();
    };

    /**
     * @name reloadTops
     * @desc method reload First Section - Tops
     */
    $scope.reloadTops = function () {
      console.log('Reload Tops');
      // $q.all([])
      // .then(function(dataTops){
      //   $scope.topCountries = dataTops[0];
      //   $scope.topCountries = dataTops[0];
      //   $scope.topCountries = dataTops[0];
      // });
    };


  }
})();
