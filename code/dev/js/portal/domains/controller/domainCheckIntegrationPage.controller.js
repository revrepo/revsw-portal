(function() {
  'use strict';

  angular
    .module('revapm.Portal.Domains')
    .controller('DomainCheckIntegrationPageController', DomainCheckIntegrationPageController);

  /*@ngInject*/
  function DomainCheckIntegrationPageController($scope,
    $timeout,
    $localStorage,
    CRUDController,
    DomainsConfig,
    $injector,
    $stateParams,
    $config,
    Companies,
    $http,
    $q,
    $state,
    $anchorScroll,
    DomainsCachingRuleDefault,
    SSL_certs,
    SSL_conf_profiles) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    $scope.isAdvancedMode = $stateParams.isAdvanced || false;

    //Set state (ui.router)
    $scope.setState('index.webApp.domains.');

    $scope.setResource(DomainsConfig);

    /**
     * @name setAccountName
     * @description
     *
     */
    function setAccountName() {
      if ($scope.auth.isReseller() || $scope.auth.isRevadmin()) {
        // Loading list of companies
        return Companies.query(function(list) {
          _.forEach($scope.records, function(item) {
            var index = _.findIndex(list, {
              id: item.account_id
            });
            if (index >= 0) {
              item.companyName = list[index].companyName;
            }
          });
        });
      } else {
        return $q.when();
      }
    }

    // Fetch list of records
    // $scope.$on('$stateChangeSuccess', function(state, stateTo, stateParam) {
    //   if ($state.is($scope.state)) {
    //     $scope.list()
    //       .then(setAccountName)
    //       .then(function() {
    //         if ($scope.elementIndexForAnchorScroll) {
    //           setTimeout(function() {
    //             $anchorScroll('anchor' + $scope.elementIndexForAnchorScroll);
    //             $scope.$digest();
    //           }, 500);
    //         }
    //       });
    //   } else {
    //     if (!!stateParam.id && !stateParam.id) {
    //       $scope.params = $stateParams;
    //       $scope.initEdit($stateParams.id);
    //     } else {
    //       $scope.setDefaultAccountId();
    //     }
    //   }
    // });



    /**
     * @name  getDomain
     * @description
     *
     * @param  {String} id
     * @return
     */
    $scope.getDomain = function(id) {
      $scope.get(id)
        .catch(function(err) {
          $scope.alertService.danger(err);
        });

    };

    $scope.storeToStorage = function(model) {
      $localStorage.selectedDomain = model;
    };

    $scope.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

    $scope.onClickRefresh = function() {
      // TODO: Broadcast
      $scope.getDomain($stateParams.id);
    };

  }

})();
