(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('TrafficHeatmapsController', TrafficHeatmapsController);

  /*@ngInject*/
  function TrafficHeatmapsController($scope, HeatmapsDrawer, Countries, Stats, $q, Util) {

    /**
     * Loading flag
     *
     * @type {boolean}
     * @private
     */
    $scope._loading = false;

    /**
     * Domain object that will be selected from dropdown
     *
     * @type {?Object}
     */
    $scope.domain = null;

    /**
     * Delay in hours.
     * Will load list of countries reports for last `delay` hours.
     *
     * @type {string|number}
     */
    $scope.delay = '24';

    /**
     * Loading list of country names
     */
    $scope.countries = Countries.query();

    /**
     * Loads list of country hits.
     *
     * @param {String|Number} domainId
     */
    $scope.reloadHitsCountry = function (domainId) {
      $scope._loading = true;

      // Loading new data
      return Stats.country({
          domainId: domainId,
          count: 250,
          from_timestamp: moment().subtract($scope.delay || 6, 'hours').valueOf(),
          to_timestamp: Date.now()
        })
        .$promise
        .then(function (data) {
          var hits_data = [];
          if (data.data && data.data.length > 0) {
            data.data.forEach( function (item) {
              hits_data.push({
                name: ( $scope.countries[item.key.toUpperCase()] || item.key ),
                id: item.key.toUpperCase(),
                value: item.count,
                tooltip: '<strong>' + Util.convertValue(item.count) + '</strong> requests'
              });
            });
          }
          // Pass to next `.then()`
          return hits_data;
        });
    };

    /**
     * Loads list of country transferred data.
     *
     * @param {String|Number} domainId
     */
    $scope.reloadGBTCountry = function (domainId) {
      $scope._loading = true;
      // Loading new data
      return Stats.gbt_country({
          domainId: domainId,
          count: 250,
          from_timestamp: moment().subtract($scope.delay || 6, 'hours').valueOf(),
          to_timestamp: Date.now()
        })
        .$promise
        .then(function (data) {
          var gbt_data = [];
          if (data.data && data.data.length > 0) {
            data.data.forEach( function (item) {
              gbt_data.push({
                name: ( $scope.countries[item.key.toUpperCase()] || item.key ),
                id: item.key.toUpperCase(),
                value: item.sent_bytes,
                tooltip: ( 'Sent: <strong>' + Util.humanFileSizeInGB(item.sent_bytes) +
                  '</strong> Received: <strong>' + Util.humanFileSizeInGB(item.received_bytes) + '</strong>' )
              });
            });
          }
          // Pass to next `.then()`
          return gbt_data;
        });
    };

    /**
     * Handle domain select
     *
     * @see {$scope.reloadCountry}
     */
    $scope.onDomainSelect = function () {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $q.all([
        $scope.reloadHitsCountry($scope.domain.id),
        $scope.reloadGBTCountry($scope.domain.id)
      ]).then(function ( data ) {
        // Redraw maps using received data
        console.log( data );
        HeatmapsDrawer.drawWorldMap('#canvas-svg-hits', data[0/*hits_data*/] );
        HeatmapsDrawer.drawWorldMap('#canvas-svg-gbt', data[1/*gbt_data*/] );
      }).finally(function () {
        $scope._loading = false;
      });

    };
  }

})();
