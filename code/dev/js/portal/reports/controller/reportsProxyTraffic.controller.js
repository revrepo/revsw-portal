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

/*
    if ($config.INTRO_IS_ACTIVE) {
      if (!!$localStorage.intro && $localStorage.intro.isShowMainIntro === true) {
        $scope.IntroOptionsScope = {
          steps: [{
            element: '.form-inline',
            intro: 'Select doamin'
          }, {
            element: '.panel-body',
            intro: 'Watch data',
            position: 'top'
          }]
        };
        $timeout(function() {
          if ($localStorage.intro.pages[$state.current.name] !== true) {
            $scope.stateIntro();
          }
        }, 300);
      }
    }
*/

    $scope.userService = User;
    $scope._loading = true;
    // Domain that selected
    $scope.domain = $rootScope.domain;

    $scope.filters = {
      from_timestamp: moment().subtract(1, 'days').valueOf(),
      to_timestamp: Date.now()
    };

    $scope.pieOpts = {
      scaleOverride: true
    };

    $scope.os = [];
    $scope.device = [];
    $scope.browser = [];
    $scope.statusCode = [];

    var countriesList = Countries.query();
    $scope.country = {};


    /**
     * Reload list of given entities
     *
     * @param {string|number} domainId
     * @param {string} list name
     */
    $scope.reloadList = function( domainId, list ) {
      $scope[list] = {};
      Stats[list]({
        domainId: domainId
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
     * List of country
     *
     * @param {string|number} domainId
     */
    $scope.reloadCountry = function(domainId) {
      $scope.country = {};
      var c = {};
      Stats.country({
        domainId: domainId
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
     *
     * @param {string|number} domainId
     */
    $scope.reload = function() {
      $scope.reloadList($scope.domain.id, 'os');
      $scope.reloadList($scope.domain.id, 'device');
      $scope.reloadList($scope.domain.id, 'browser');
      $scope.reloadList($scope.domain.id, 'statusCode');
      $scope.reloadCountry($scope.domain.id);
    };

    $scope.onDomainSelected = function() {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.reload();
    };
  }
})();
