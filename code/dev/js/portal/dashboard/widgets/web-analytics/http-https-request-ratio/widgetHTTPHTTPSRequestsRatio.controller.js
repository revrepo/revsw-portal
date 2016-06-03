(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.WebAnalytics')
    .controller('widgetHTTPHTTPSRequestsRatioController', widgetHTTPHTTPSRequestsRatioController);

  function widgetHTTPHTTPSRequestsRatioController(config, Stats) {
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


    vm.reloadProtocol = function(filters) {
      vm.protocol = [];
      Stats.protocol(filters)
        .$promise
        .then(function(data) {
          if (data.data && data.data.length > 0) {
            var newData = [];
            angular.forEach(data.data, function(val) {
              var protocol = 'Unknows';
              if (val.key === 80 || val.key === '80') {
                protocol = 'HTTP';
              }
              if (val.key === 443 || val.key === '443') {
                protocol = 'HTTPS';
              }
              newData.push({
                name: protocol,
                y: val.count
              });
            });
            vm.protocol = newData;
          }
        });
    };

    vm.reload = function() {
      if (!vm.config.domain) {
        return;
      }
      vm.reloadProtocol(angular.merge({
        domainId: vm.config.domain.id
      }, generateFilterParams(vm.config.filters)));
    };
    vm.reload();

  }

})();
