/**
 * @controller EdgeCacheReportsController
 * @module 'revapm.Portal.Reports'
 * @desc controller for the Web Analytics/Edge Cache Reports view
 */
(function(angular, _, empty) {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('EdgeCacheReportsController', EdgeCacheReportsController)
    .filter('humanizeMiliseconds', function() {

      var getDuration = function(millis, hiddens) {
        if (!hiddens) {
          hiddens = [];
        }
        var dur = {};
        var units = [{
            label: 'ms',
            short: 'ms',
            mod: 1000
          },
          {
            label: 'seconds',
            short: 's',
            mod: 60
          },
          {
            label: 'minutes',
            short: 'm',
            mod: 60
          },
          {
            label: 'hours',
            short: 'h',
            mod: 24
          },
          {
            label: 'days',
            short: 'd',
            mod: 31
          }
        ];
        // calculate the individual unit values...
        units.forEach(function(u) {
          millis = (millis - (dur[u.label] = (millis % u.mod))) / u.mod;
          if (u.short === 'ms') {
            // NOTE: Round all ms responses to three digits after the dot
            if (dur[u.label] > 0) {
              dur[u.label] = parseFloat(dur[u.label]).toFixed(3);
            } else {
              dur[u.label] = 0;
            }
          }
        });

        // convert object to a string representation...
        var nonZero = function(u) {
          if (hiddens.includes(u.short)) {
            return false;
          } else {
            if (u.short === units[units.length - 1].short) {
              return true;
            }
            return dur[u.label];
          }
        };
        dur.toString = function() {
          var res = units
            .reverse()
            .filter(nonZero)
            .map(function(u) {
              return dur[u.label] + ' ' + (dur[u.label] === 1 ? u.label.slice(0, -1) : u.label);
            })
            .join(' ');
          if (res.trim().length === 0) {
            return '-';
          }
          return res;
        };
        return dur;
      };
      return function(ms, params) {
        // NOTE: conver only numbers
        if (!angular.isNumber(ms)) {
          return '-';
        }
        // console.log(ms, params)
        return getDuration(ms, params).toString();
      };
    });

  /*@ngInject*/
  function EdgeCacheReportsController(
    $scope,
    $q,
    $timeout,
    $sce,
    $config,
    Stats,
    Countries,
    filterGeneratorConst,
    filterGeneratorService
  ) {
    var vm = this;
    vm._loading = true;
    // Domain that selected
    vm.domain = null;
    vm.domains = [];
    vm.os = [];
    vm.device = [];
    vm.browser = [];
    vm.country = []; // NOTE: Top country for filter

    $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
    $scope.popoverHelpHTML = {
      'cacheStatus': $sce.trustAsHtml('This graph shows the ratio of cache hits (requests served directly from the cache storage on our globally ' +
        'distributed proxy servers) and misses (objects requested from origin servers)'),
      'secondaryCacheStatusData': $sce.trustAsHtml('This pie chart shows cache hit/miss ratio for the secondary cache storage'),
      //
      'average_age_for_served_objects_ms': $sce.trustAsHtml('The metric shows the average time objects were stored in the edge cache ' +
        'before being served to end users'),
      'average_configured_edge_cache_ttl_ms': $sce.trustAsHtml('The metric shows the average configured TTL of cached objects'),
      'average_edge_cache_response_time_ms': $sce.trustAsHtml('The metric shows how long on average it took for the edge servers to pull requested ' +
        'objects from local cache storage. Normally the metric should be below 1 ms.'),
      'average_origin_response_time_ms': $sce.trustAsHtml('The number shows the average First Byte Time (FBT) metric for origin pull requests'),
      'new_unique_objects': $sce.trustAsHtml('The metric shows the number of new unique URL objects stored in the edge cache during the reported ' +
        'period of time'),
      'total_unique_objects': $sce.trustAsHtml('The metric specifies the total number of unique objects (URLs) served from the edge cache during ' +
        'the reported period of time')
    };

    vm.filters = {};
    var filter = {
      from_timestamp: moment().subtract(1, 'days').valueOf(),
      to_timestamp: Date.now()
    };
    // NOTE: fields in filter
    var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os', 'browser'];
    /**
     * @name generateFilterParams
     *
     * @param {Object} filters
     * @returns Object
     */
    function generateFilterParams(filters) {
      var params = {
        from_timestamp: moment().subtract(1, 'h').valueOf(),
        to_timestamp: Date.now()
      };
      _.forEach(filters, function(val, key) {
        if (_.indexOf(_filters_field_list, key) !== -1) {
          if (val !== '-' && val !== '') {
            params[key] = val;
          }
        } else {
          if (key === 'delay') {
            params.from_timestamp = moment().subtract(val, 'h').valueOf();
            params.to_timestamp = Date.now();
            delete params.delay;
          }
        }
      });
      return params;
    }

    /**
     * @name reload
     * @description  reload every charts
     */
    vm.reload = function() {
      if (!vm.domain || !vm.domain.id) {
        return;
      }
      // NOTE: lock UI before finish all requests
      vm._loading = true;

      var params_ = angular.merge({
        domainId: vm.domain.id
      }, generateFilterParams(vm.filters));

      $q.all([
          vm.reloadEdgeCacheData(params_),
          vm.reloadFilters(params_),
          vm.reloadCacheStatus(vm.filters),
          vm.reloadSecondaryCacheStatus(vm.filters)
        ])
        .finally(function() {
          vm._loading = false;
        });
    };
    /**
     * @name onDomainSelected
     * @description method call when need reload data on the page
     *
     */
    vm.onDomainSelected = function(model) {
      if (!vm.domain || !vm.domain.id) {
        return;
      }
      vm.reload(); // NOTE: reload data

      //  reload all lists for filters
      var now = Date.now();
      // NOTE: update filter data
      Stats.topLists({
        domainId: vm.domain.id,
        from_timestamp: (now - 86400000 /*day in ms*/ ),
        to_timestamp: now
      }).$promise.then(function(data) {
        vm.os = data.data.os;
        vm.browser = data.data.browser;
        vm.device = data.data.device;
        var c = {};
        data.data.country.forEach(function(item) {
          c[item.key] = item.value;
        });
        vm.country = c;
      });
    };

    vm.cacheStatus = [];
    /**
     * @name vm.reloadCacheStatus
     * @desc reloads cache status chart data
     * @kind function
     * @return {Promise}
     */
    vm.reloadCacheStatus = function(filters) {
      filters = angular.merge({
        domainId: vm.domain.id
      }, generateFilterParams(vm.filters));

      vm.cacheStatus.length = 0;
      return Stats
        .cacheStatus(filters)
        .$promise
        .then(function(data) {
          var newData = [];
          if (data.data && data.data.length > 0) {
            angular.forEach(data.data, function(val) {
              newData.push({
                name: val.key,
                y: val.count
              });
            });
            if (newData.length === 2 &&
              (newData[0].y > 0 || newData[1].y > 0)) {
              vm.cacheStatus = newData;
            }
          }
          return vm.cacheStatus;
        });
    };

    vm.secondaryCacheStatusData = [];
    /**
     * @name vm.reloadCacheStatus
     * @desc reloads cache status chart data
     * @kind function
     * @return {Promise}
     */
    vm.reloadSecondaryCacheStatus = function(filters) {
      filters = angular.merge({
        domainId: vm.domain.id
      }, generateFilterParams(vm.filters));
      vm.secondaryCacheStatusData.length = 0;
      return Stats
        .secondaryCacheStatus(filters)
        .$promise
        .then(function(data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function(val) {
              newData.push({
                name: val.key,
                y: val.count
              });
            });
            if (newData.length === 2 &&
              (newData[0].y > 0 || newData[1].y > 0)) {
              vm.secondaryCacheStatusData = newData;
            }
          }
          return vm.secondaryCacheStatusData;
        });
    };

    /**
     * @name reloadEdgeCacheData
     * @param {{Object}} filters
     */
    vm.reloadEdgeCacheData = function(params) {
      vm.edgeCacheData = {
        average_age_for_served_objects_sec: '-',
        average_configured_edge_cache_ttl_sec: '-',
        average_edge_cache_response_time_sec: '-',
        average_origin_response_time_sec: '-',
        new_unique_objects: '-',
        total_unique_objects: '-'
      };
      return Stats.edgeCache(params)
        .$promise
        .then(function(data) {
          // NOTE: convert seconds to miliseconds for work with angular "filter"
          vm.edgeCacheData = {
            average_age_for_served_objects_ms: data.average_age_for_served_objects_sec * 1000 || 0,
            average_configured_edge_cache_ttl_ms: data.average_configured_edge_cache_ttl_sec * 1000 || 0,
            average_edge_cache_response_time_ms: data.average_edge_cache_response_time_ms || 0,
            average_origin_response_time_ms: data.average_origin_response_time_ms || 0,
            new_unique_objects: data.new_unique_objects || 0,
            total_unique_objects: data.total_unique_objects || 0
          };
        });
    };

    vm.filtersExternal = null;
    // NOTE: action for send change filter data
    vm.reloadFilters = function(filters) {
      vm.filtersExternal = null;
      var deferred = $q.defer();
      $timeout(function() {
        vm.filtersExternal = filters;
        deferred.resolve();
      }, 1);
      return deferred;
    };
  }
})(angular, _);
