(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .controller('widgetHTTPStatusCodesRatioController', widgetHTTPStatusCodesRatioController);

  function widgetHTTPStatusCodesRatioController(config, Stats) {
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


    function reloadStatusCode(filters) {
      vm.statusCode = [];
      Stats.statusCode(filters)
        .$promise
        .then(function(data) {
          var newData = [];
          if (data.data && data.data.length > 0) {
            angular.forEach(data.data, function(os) {
              newData.push({
                name: os.key,
                y: os.count
              });
            });
            vm.statusCode = newData;
          }
        });
    }

    vm.reload = function() {
      if (!vm.config.domain) {
        return;
      }
      reloadStatusCode(angular.merge({
        domainId: vm.config.domain.id
      }, generateFilterParams(vm.config.filters)));
    };

    vm.reload();
  }

})();
