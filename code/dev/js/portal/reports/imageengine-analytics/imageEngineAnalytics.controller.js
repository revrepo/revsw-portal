(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('imageEngineAnalyticsController', imageEngineAnalyticsController);

  /*@ngInject*/
  function imageEngineAnalyticsController($scope, User, AlertService, Stats, Countries, $q) {

    $scope._loading = true;
    // Domain that selected
    $scope.domain = null;
    $scope.domains = [];

    $scope.country = {};
    $scope.os = [];
    $scope.device = [];
    $scope.browser = [];
    $scope.filters = {};
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

    /**
     * reload everything
     */
    $scope.reload = function () {

      var filters = {
        domainId: $scope.domain.id,
        from_timestamp: moment().subtract($scope.delay, 'hours').valueOf(),
        to_timestamp: Date.now()
      };
      if ($scope.country_filter) {
        filters.country = $scope.country_filter;
      }
      // NOTE: lock UI before finish all requests
      $scope._loading = true;
      $scope.reloadDataPieChart(filters);
      // TODO: add reload seccond Pie Chart
      $scope._loading = false;
    };
    /**
     * @name onDomainSelected
     * @description method call when need reload data on the page
     *
     */
    $scope.onDomainSelected = function () {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.reload(); // NOTE: reload data

      //  reload all lists
      var now = Date.now();

      Stats.topLists({
        domainId: $scope.domain.id,
        from_timestamp: (now - 86400000 /*day in ms*/ ),
        to_timestamp: now
      }).$promise.then(function (data) {
        console.log( 'lists', data );
        $scope.os = data.data.os;
        $scope.browser = data.data.browser;
        $scope.device = data.data.device;
        var c = {};
        data.data.country.forEach(function (item) {
          c[item.key] = item.value;
        });
        $scope.country = c;
      });

    };

    $scope.protocol = [];
    /**
     * @name reloadDataPieChart
     * @description method reload data for ImageEngine Butes Send
     * @param {Object} filters
     *
     * @return {Promise}
     */
    $scope.reloadDataPieChart = function(filters){
      $scope.protocol.length = 0;
      // TODO: !!! use new report type !!!
      return Stats.protocol(filters)
        .$promise
        .then(function (data) {
          $scope.dataImageEngineBytesSaved = data.data.map(function (item) {
            return {
              name: ((item.key | 0) === 80 ? 'HTTP' : ((item.key | 0) === 443 ? 'HTTPS' : 'Unknown')),
              y: item.count
            };
          });
        })
        .catch(function () {
          $scope.protocol.length=0;
        });
    };
  }
})();
