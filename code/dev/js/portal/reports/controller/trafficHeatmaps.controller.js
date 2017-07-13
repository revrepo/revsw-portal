(function () {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('TrafficHeatmapsController', TrafficHeatmapsController);

  /*@ngInject*/
  function TrafficHeatmapsController($scope, $config, HeatmapsDrawer, HeatmapsWorldDrillDrawer, Countries, Stats, $q, Util) {

    var hitsDrawer = HeatmapsWorldDrillDrawer.create('#canvas-svg-hits'),
      gbtDrawer = HeatmapsDrawer.create('#canvas-svg-gbt');

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

          var world = [],
            usa = [];

          if (data.data && data.data.length > 0) {
            data.data.forEach( function (item) {

              var key = item.key.toUpperCase();
              var worldItem = {
                name: ($scope.countries[key] || item.key),
                  id: key,
                  value: item.count,
                  tooltip: '<strong>' + Util.convertValue(item.count) + '</strong> requests',
                  regions: []
              };
              // TODO: add exclude data for key equal 'FO'. This data broke a map
              // if(['FO'].indexOf(key) !== -1){
              //   return;
              // }
              world.push(worldItem);

              // NOTE: change region information for display details on map
              if ( item.regions ) {
                _.each(item.regions,function(itemRegion){
                  // NOTE: not use data without 'hc-key' and
                  // TODO: check 'hc-key' equals 'us-ae' ("Armed Forces Europe, Middle East, & Canada")
                  // TODO: check 'ar-df' - "Distrito Federal" ??
                  if(!itemRegion['hc-key']){
                    if(itemRegion['in-key']){
                      var item = _.find();
                    }
                    return;
                  }

                  worldItem.regions.push({
                    name: key + itemRegion.key,
                    id: itemRegion['hc-key'],
                    value: itemRegion.count,
                    tooltip: '<strong>' + Util.convertValue(itemRegion.count) + '</strong> requests'
                  });
                });
                // NOTE: additional actions for add data to regions
                _.map(item.regions, function(itemRegion) {
                   if(itemRegion['in-key']) {
                     var item = _.find(worldItem.regions,function(itemRegion_){
                       return itemRegion_.id ===itemRegion['in-key'];
                     });

                     if(!!item){
                       item.value += itemRegion.count;
                       item.tooltip= '<strong>' + Util.convertValue(item.value) + '</strong> requests';
                     }
                  }});
              }
              if ( key === 'US' && item.regions ) {
                usa = item.regions;
              }
            });

            usa = usa.map( function( item ) {
              return {
                id: item.key,
                name: item.key,
                value: item.count,
                tooltip: '<strong>' + Util.convertValue(item.count) + '</strong> requests'
              };
            });
          }

          // Pass to next `.then()`
          return {
            world: world,
            usa: usa
          };
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

          var world = [],
            usa = [];

          if (data.data && data.data.length > 0) {
            data.data.forEach( function (item) {

              // console.log( item );
              var key = item.key.toUpperCase();
              world.push({
                name: ( $scope.countries[key] || item.key ),
                id: key,
                value: item.sent_bytes,
                tooltip: ( 'Sent: <strong>' + Util.humanFileSizeInGB(item.sent_bytes) +
                  '</strong> Received: <strong>' + Util.humanFileSizeInGB(item.received_bytes) + '</strong>' )
              });

              if ( key === 'US' && item.regions ) {
                usa = item.regions;
              }
            });

            usa = usa.map( function( item ) {
              return {
                id: item.key,
                name: item.key,
                value: item.sent_bytes,
                tooltip: ( 'Sent: <strong>' + Util.humanFileSizeInGB(item.sent_bytes) +
                  '</strong> Received: <strong>' + Util.humanFileSizeInGB(item.received_bytes) + '</strong>' )
              };
            });
          }

          // Pass to next `.then()`
          return {
            world: world,
            usa: usa
          };
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
        // $scope.reloadGBTCountry($scope.domain.id)
      ]).then(function ( data ) {

        //  (re)Draw maps using received data
        hitsDrawer.drawCurrentMap( data[0/*hits data*/] );
        // gbtDrawer.drawCurrentMap( data[1/*gbt data*/] );

      }).finally(function () {
        $scope._loading = false;
      });

    };
  }

})();
