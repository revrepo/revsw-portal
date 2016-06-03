(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .controller('widgetEdgeCacheHitMissRatioController', widgetEdgeCacheHitMissRatioController);

  function widgetEdgeCacheHitMissRatioController(config, Stats) {
    var vm = this;
    vm.delay = '24';
    vm.config = config;
    var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country'];

    function generateFilterParams(filters) {
      var params = {
        from_timestamp: moment().subtract(vm.delay, 'hours').valueOf(),
        to_timestamp: Date.now()
      };
      _.forEach(filters, function(val, key) {
        if (_.indexOf(_filters_field_list, key) !== -1) {
          if (val !== '-' && val !== '') {
            params[key] = val;
          }
        } else {
          if (key === 'delay') {
            params.from_timestamp = moment().subtract(val, 'hours').valueOf();
            params.to_timestamp = Date.now();
            delete params.delay;
          }
        }
      });
      return params;
    }

    function reloadCacheStatus(filters) {
      vm.cacheStatus = [];
      Stats.cacheStatus(filters)
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
              vm.cacheStatus = newData;
            }
          }
        });
    }

    vm.reload = function() {
      if (!vm.config.domain) {
        return;
      }
      reloadCacheStatus(angular.merge({
        domainId: vm.config.domain.id
      }, generateFilterParams(vm.config.filters)));
    };


    vm.reload();
  }

})();
