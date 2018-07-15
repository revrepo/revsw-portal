(function() {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileDistributionsController', MobileDistributionsController);

  /*@ngInject*/
  function MobileDistributionsController($scope, $q, User, AlertService, Stats, Util, $config, $sce) {

    $scope._loading = true;
    $scope.application = null;
    var u = User.getUser();
    $scope.account = u.account_id || null;

    $scope.destination_hits = [];
    $scope.destination_gbt = [];
    $scope.transport_hits = [];
    $scope.transport_gbt = [];
    $scope.status_hits = [];
    $scope.status_gbt = [];
    $scope.cache_hits = [];
    $scope.cache_gbt = [];
    $scope.domain_hits = [];
    $scope.domain_gbt = [];
    $scope.status_code_hits = [];

    $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
    $scope.popoverHelpHTML = {
      'destination_hits': $sce.trustAsHtml('This pie chart shows the distribution of traffic (by level of requests) between ' +
        'the origin and CDN'),
      'destination_gbt': $sce.trustAsHtml('This pie chart shows the distribution of traffic (by amount of transferred data) between ' +
        'the origin and CDN'),
      'transport_hits': $sce.trustAsHtml('This pie chart shows the distribution of traffic (by level of requests) between ' +
        'different data transport protocols used by the SDK to communicate with the CDN edge'),
      'transport_gbt': $sce.trustAsHtml('This pie chart shows the distribution of traffic (by amount of transfrerred data) between ' +
        'different data transport protocols used by the SDK to communicate with the CDN edge'),
      'status_hits': $sce.trustAsHtml('This pie chart shows the distribution of traffic (by level of requests) between ' +
        'successful and unsuccessful request completion statuses'),
      'status_gbt': $sce.trustAsHtml('This pie chart shows the distribution of traffic (by amount of transferred data) between ' +
        'successful and unsuccessful request completion statuses'),
      'cache_hits': $sce.trustAsHtml('This chart shows the ratio of edge cache hits and misses (by level of requests)'),
      'cache_gbt': $sce.trustAsHtml('This chart shows the ratio of edge cache hits and misses (by amount of transferred data)'),
      'domain_hits': $sce.trustAsHtml('TODO text popover'),
      'domain_gbt': $sce.trustAsHtml('TODO text popover'),
      'status_code_hits': $sce.trustAsHtml('TODO text popover')
    };

    $scope.span = '24';
    $scope.gbtChartOpts = {
      tooltip: {
        formatter: function() {
          return '<b>' + this.point.name + ': </b>' +
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Util.humanFileSize(this.y, 2) + ')';
        }
      },
    };
    $scope.hitsChartOpts = {
      tooltip: {
        formatter: function() {
          return '<b>' + this.point.name + ': </b>' +
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Highcharts.numberFormat(this.y, 0, '.', '\'') + ' hits)';
        }
      },
    };

    //  ---------------------------------
    $scope.reloadTwo = function(name, filters) {
      filters.report_type = name;
      return Stats.sdk_distributions(filters)
        .$promise
        .then(function(data) {
          if (data.data && data.data.length > 0) {
            var hits = [];
            var gbt = [];
            angular.forEach(data.data, function(item) {
              hits.push({
                name: item.key,
                y: item.count
              });
              gbt.push({
                name: item.key,
                y: item.received_bytes
              });
            });
            $scope[name + '_hits'] = hits;
            $scope[name + '_gbt'] = gbt;
          } else {
            $scope[name + '_hits'] = [];
            $scope[name + '_gbt'] = [];
          }
        })
        .catch(function() {
          $scope[name + '_hits'] = [];
          $scope[name + '_gbt'] = [];
        });
    };

    //  ---------------------------------
    $scope.reload = function() {

      if (!$scope.account &&
        (!$scope.application || !$scope.application.app_id)) {
        return;
      }

      var filters = {
        account_id: $scope.account,
        app_id: (($scope.application && $scope.application.app_id) || null),
        from_timestamp: moment().subtract($scope.span, 'hours').valueOf(),
        to_timestamp: Date.now(),
        count: 10
      };

      $scope._loading = true;
      $q.all([
          $scope.reloadTwo('destination', filters),
          $scope.reloadTwo('transport', filters),
          $scope.reloadTwo('status', filters),
          $scope.reloadTwo('cache', filters),
        ])
        .catch(AlertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };

  }
})();
