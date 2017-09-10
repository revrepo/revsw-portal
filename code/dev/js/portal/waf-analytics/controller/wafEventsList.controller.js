(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .controller('WAFEventsListController', WAFEventsListController);

  /*@ngInject*/
  function WAFEventsListController(
    $q,
    $injector,
    $scope,
    $state,
    $stateParams,
    $timeout,
    CRUDController,
    User,
    AlertService,
    StatsWAF,
    Countries,
    $config,
    $localStorage
  ) {
    //Invoking crud actions
    $injector.invoke(CRUDController, this, {
      $scope: $scope,
      $stateParams: $stateParams
    });
    //Set state (ui.router)
    $scope.setState('index.security.waf_events');
    // Fetch list of users
    $scope.$on('$stateChangeSuccess', function (state, stateTo, stateParam) {
      var data = null;
      // NOTE: set filter params for specific state
      if ($state.is($scope.state)) {
        $scope.list(data);
      }
    });
    $scope.setResource(StatsWAF);
    var vm = this;
    $scope.vm = vm;
    vm.domain = null;
    vm.countries = Countries.query();
    vm.zonesList = $config.WAF_REQUEST_ZONES;

    vm.user = User;
    vm._loading = false;

    vm.wafEventsList = [];
    vm.currentPage = 1;
    vm.totalItems = 0;
    // NOTE: send filter
    vm.filters = {
      count: 50,
      sortBy: null,
      sortDirection: null
    };
    // NOTE: UI filter
    $scope.filter = {
      filter: '',
      limit: 25,
      skip: 0,
      predicate: 'date',
      reverse: false
    };
    /**
     * @name onDomainSelect
     */
    vm.onDomainSelect = function () {
      vm.currentPage = 1;
      $scope.list();
    };

    vm.pageChanged = function () {
      $scope.list();
    };

    vm.getRelativeDate = function (datetime) {
      return moment.utc(datetime).fromNow();
    };

    /**
     * Loads list of models
     *
     * @throws Error is not {@link $scope.resource} provided
     * @returns {Promise}
     */

    $scope.list = function (data) {
      if (!vm.domain || !vm.domain.id) {
        return;
      }
      vm._loading = true;
      var params = angular.merge({}, {
        domainId: vm.domain.id
      },
        vm.filters, {
          page: vm.currentPage,
          limit: $scope.filter.count,
          sortBy: (!!$scope.filter.predicate && $scope.filter.predicate.length > 0) ? $scope.filter.predicate : null,
          sortDirection: ($scope.filter.reverse === true) ? '1' : '-1'
        });
      if (!$scope.resource) {
        throw new Error('No resource provided.');
      }
      vm.loading(true);
      //fetching data
      return $scope.resource
        .events(params, function (data) {
          // NOTE: control data type
          if (!data || !angular.isArray(data.data)) {
            // no data for display in a list
            $scope.records = null;
            return null;
          }
          if (!$scope._baseFilter) {
            $scope.records = data.data;
          } else {
            $scope.records = $filter('filter')(data.data, $scope._baseFilter, true);
          }
          // NOTE: set total count of records
          vm.totalItems = data.metadata.total || 0;
          return data; // Send data to future promise
        }, function () {
          $scope.records = null;
          return null;
        }).$promise
        .finally(function () {
          vm.loading(false);
        });
    };

    /**
     * Manually filter list of records with 300ms delay
     *
     * Delay added for UX. Without it function might be called on every letter in filter field.
     * So it will be invokd lot of times and might break output.
     */
    $scope.filterList = function () {
      if ($scope._delayTimeout) {
        $timeout.cancel($scope._delayTimeout);
        $scope._delayTimeout = null;
      }
      $scope._delayTimeout = $timeout($scope.list, 300);
    };

    /**
     * Getter and setter for {@link vm._loading} property
     *
     * @param {boolean?} [loading]
     * @returns {boolean}
     */
    vm.loading = function (loading) {
      if (angular.isUndefined(loading)) {
        return vm._loading;
      }
      vm._loading = Boolean(loading);
    };

    /**
     * @name order
     * @description don`t  change order if data is loading
     */
    vm.order = function (name) {
      if (vm._loading) {
        return;
      }
      $scope.order(name);
    };


    /**
     * @name getRuleDescription
     * @description get the rule description by id
     */
    $scope.getRuleDescription = function (id) {
      var STORAGE_NAME_FOR_DOMAIN_WAR_RULES_CODES = 'domainWafRulesCodesList';
      var wafRulesCodesList = $localStorage[STORAGE_NAME_FOR_DOMAIN_WAR_RULES_CODES] || {};
      if (wafRulesCodesList.data.length > 0) {

        for (var i = 0; i < wafRulesCodesList.data.length; i++) {
          if (wafRulesCodesList.data[i].id === id) {
            return wafRulesCodesList.data[i].msg;
          }
        }
      }
    };


    /**
  * @name getCountryName
  * @description get the full name of a country
  */
    $scope.getCountryName = function (short) {
      return vm.countries[short] !== undefined ? vm.countries[short] : short;
    };
  }
})();
