/* general.controller.js */

/**
 * @controller GeneralCtrl
 * @module 'revapm.Portal.Reports'
 * @desc controller for the Web Analytics/General view
 */
(function(angular, empty) {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('GeneralCtrl', GeneralCtrl);


  GeneralCtrl.$inject = [
    '$scope',
    'Stats',
    'reportsFilterService'
  ];

  /*@ngInject*/
  function GeneralCtrl(
    $scope,
    Stats,
    reportsFilterService
  ) {
    var vm = this;

    //ui data model
    vm.model = {
      total: {},
      domain: empty,
      filtersList: []
    };

    //ui actions
    vm.actions = {
      onDomainChange: onDomainChange
    };

    init();

    /////////////

    /**
     * @name init
     * @desc init controller logic function
     * @kind function
     */
    function init() {
      //{domainId: "568525ec6f641ea7285c4221", from_timestamp: 1457697412757, to_timestamp: 1457783812757}
    }

    /**
     * @name onDomainChange
     * @desc when domain changes
     * @kind function
     */
    function onDomainChange() {
      if (vm.model.domain) {
        var domainId = vm.model.domain.id;
        getFilterData(domainId);
      }
    }

    /**
     * @name getFilterData
     * @desc get Filter data
     * @kind function
     */
    function getFilterData(domainId) {
      reportsFilterService
        .getOs(domainId)
        .then(function(osData) {
          $scope.os = osData;
        });

      reportsFilterService
        .getDevices(domainId)
        .then(function(deviceData) {
          $scope.device = deviceData;
        });

      reloadCacheStatus();
      reloadHttpMethod();
      getTotal();
    }

    /**
     * @name reloadCacheStatus
     * @desc reloads cache status chart data
     * @kind function
     */
    function reloadCacheStatus(filters) {
      filters = filters || { domainId: '568525ec6f641ea7285c4221', from_timestamp: 1457697412757, to_timestamp: 1457783812757 };
      $scope.cacheStatus = [];
      Stats.cacheStatus(filters)
        .$promise
        .then(function(data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            _.forEach(data.data, function(val) {
              newData.push({
                name: val.key,
                y: val.count
              });
            });
            $scope.cacheStatus = newData;
          }
        });
    }

    /**
     * @name reloadHttpMethod
     * @desc reloads data for the http method chart
     * @kind function
     */
    function reloadHttpMethod(filters) {
      filters = filters || { domainId: '568525ec6f641ea7285c4221', from_timestamp: 1457697412757, to_timestamp: 1457783812757 };
      $scope.httpMethod = [];
      Stats.httpMethod( filters )
        .$promise
        .then(function (data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            _.forEach(data.data, function (val) {
              newData.push({
                name: val.key,
                y: val.count
              });
            });
            $scope.httpMethod = newData;
          }
        });
    }

    /**
     * @name getTotal
     * @desc gets data for the total
     * @kind function
     */
    function getTotal() {
      vm.model.total = {
        traficThisMonth: 123,
        cacheHitRate: 68,
        failedRequests: 0.01,
        ajaxHttpResponses: 0.01,
        averageResponseTime: 1243,
        averageTTFBTime: 45
      };
    }
  }
})(angular);
