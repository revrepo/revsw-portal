(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .controller('WAFEventsListController', WAFEventsListController);

  /*@ngInject*/
  function WAFEventsListController($scope,
    User,
    AlertService,
    StatsWAF,
    Countries,
    $config
  ) {
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
    vm.filters = {
       count: 50
    };

    vm.onDomainSelect = function () {
      vm.loadData();
    };

    vm.loadData = function () {
      if (!vm.domain || !vm.domain.id) {
        return;
      }
      vm._loading = true;
      var params = angular.merge({}, {
          domainId: vm.domain.id
        },
        vm.filters, {
          page: vm.currentPage
        });

      StatsWAF.events(params).$promise
        .then(function (data) {
          vm.wafEventsList = data.data;
          vm.totalItems = data.metadata.total || 0;
        })
        .catch(AlertService.danger)
        .finally(function(){
          vm._loading = false;
        });
    };

    vm.pageChanged = function () {
      vm.loadData();
    };

   vm.getRelativeDate = function(datetime) {
      return moment.utc(datetime).fromNow();
    };

  }
})();
