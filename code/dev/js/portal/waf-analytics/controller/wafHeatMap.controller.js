(function () {
  'use strict';

  angular
    .module('revapm.Portal.WAFAnalytics')
    .controller('WAFHeatmapsController', WAFHeatmapsController);

  /*@ngInject*/
  function WAFHeatmapsController($scope, HeatmapsDrawer, Countries, StatsWAF, $config, $sce) {

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
    $scope.delay = '1';

    /**
     * Loading list of country names
     */
    $scope.countries = Countries.query();
    var drawer = HeatmapsDrawer.create('#canvas-svg');

    $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
    $scope.popoverHelpHTML = $sce.trustAsHtml('The map provides a visual representation how detected WAF events are distributed ' +
      'around the globe');
    /**
     * Loads list of country hits.
     *
     * @param {String|Number} domainId
     */
    $scope.reloadCountry = function (domainId) {
      $scope._loading = true;
      return StatsWAF.topReport({
          domainId: domainId,
          count: 250,
          report_type: 'country',
          from_timestamp: moment().subtract($scope.delay || 1, 'hours').valueOf(),
          to_timestamp: Date.now()
        })
        .$promise
        .then(function (data) {

          var world = [],
            usa = [];

          if (data.data && data.data.length > 0) {
            data.data.forEach(function (item) {
              var key = item.key.toUpperCase();
              world.push({
                name: ($scope.countries[key] || item.key),
                id: key,
                value: item.count,
                tooltip: ('WAF Events: <strong>' + item.count + '</strong>')
              });

              if (key === 'US' && item.regions) {
                usa = item.regions;
              }
            });

            usa = usa.map(function (item) {
              return {
                id: item.key,
                name: item.key,
                value: item.count,
                tooltip: ('WAF Events: <strong>' + item.count + '</strong>')
              };
            });
          }

          return {
            world: world,
            usa: usa
          };
        })
        .finally(function () {
          $scope._loading = false;
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
      $scope
        .reloadCountry($scope.domain.id)
        .then(function (lm_rtt_data) {
          // Redraw a new map using received data
          drawer.drawCurrentMap(lm_rtt_data);
        });

    };
  }
})();
