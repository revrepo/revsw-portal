(function() {
  'use strict';

  angular
    .module('revapm.Portal.Mobile')
    .controller('MobileTopsController', MobileTopsController);

  /*@ngInject*/
  function MobileTopsController($scope, $q, User, AlertService, Stats, Countries, Util, $config, $sce) {

    $scope._loading = false;
    $scope.application = null;
    var u = User.getUser();
    $scope.account = u.account_id || null;
    $scope.countries = Countries.query();

    $scope.country_hits = [];
    $scope.country_users = [];

    $scope.country_gbt = [];
    $scope.usa_states_gbt = [];

    $scope.os_hits = [];
    $scope.os_users = [];
    $scope.os_gbt = [];
    $scope.device_hits = [];
    $scope.device_users = [];
    $scope.device_gbt = [];
    $scope.operator_hits = [];
    $scope.operator_users = [];
    $scope.operator_gbt = [];
    $scope.network_hits = [];
    $scope.network_users = [];
    $scope.network_gbt = [];

    $scope.domain_hits = [];
    $scope.domain_gbt = [];
    $scope.status_code_hits = [];

    $scope.span = '24';
    $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
    $scope.popoverHelpHTML = {
      'country_hits': $sce.trustAsHtml('The chart shows the most popular countries (by number of requests) originating traffic for the app'),
      'country_users': $sce.trustAsHtml('This chart shows the most popular countries by number of mobile application users'),
      'country_gbt': $sce.trustAsHtml('This chart shows the most popular countries by amount of transferred data'),
      'usa_states_gbt': $sce.trustAsHtml('This chart shows the most popular US states by amount of transferred data'),
      'os_hits': $sce.trustAsHtml('This graph shows most popular operating systems by number of mobile app data transfer requests'),
      'os_users': $sce.trustAsHtml('This graph shows most popular operating systems by number of mobile app users'),
      'os_gbt': $sce.trustAsHtml('This graph shows most popular operating systems by amount of transferred data'),
      'device_hits': $sce.trustAsHtml('The graph shows most popular mobile devices by number of data transfer requests'),
      'device_users': $sce.trustAsHtml('The graph shows most popular mobile devices by number of mobile application users'),
      'device_gbt': $sce.trustAsHtml('The graph shows most popular mobile devices by amount of transferred data'),
      'operator_hits': $sce.trustAsHtml('The graph shows most popular mobile operators by number of received mobile application requests'),
      'operator_users': $sce.trustAsHtml('The graph shows most popular mobile operators by number of mobile application users'),
      'operator_gbt': $sce.trustAsHtml('The graph shows most popular mobile operators by amount of transferred data'),
      'network_hits': $sce.trustAsHtml('The pie chart shows the distribution of traffic between cellular and WiFi networks by number of ' +
        'received mobile application requests'),
      'network_users': $sce.trustAsHtml('The pie chart shows the distribution of traffic between cellular and WiFi networks by number of ' +
        'mobile app users'),
      'network_gbt': $sce.trustAsHtml('The pie chart shows the distribution of traffic between cellular and WiFi networks by amount of ' +
        'transferred data'),
      'domain_hits': $sce.trustAsHtml('The graph shows most popular domain names by number of served requests'),
      'domain_gbt': $sce.trustAsHtml('The graph shows most popular domain names by amount of transferred data'),
      'status_code_hits': $sce.trustAsHtml('The pie chart shows the ratio of different HTTP status codes returned for handled requests')
    };

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
    $scope.usersChartOpts = {
      tooltip: {
        formatter: function() {
          return '<b>' + this.point.name + ': </b>' +
            Highcharts.numberFormat(this.point.percentage, 1) + '% (' + Highcharts.numberFormat(this.y, 0, '.', '\'') + ' users)';
        }
      },
    };

    //  ---------------------------------
    var reloadOne_ = function(type, name, count, filters) {
      filters.report_type = name;
      filters.count = count;
      return Stats['sdk_top_' + type](filters)
        .$promise
        .then(function(data) {
          if (data.data && data.data.length > 0) {
            var newData = [];

            // debug
            // if (name === 'country') {
            //   console.log( data.data );
            // }
            // debug

            data.data.forEach( function(item) {

              if (name === 'country') {
                if ( item.key === 'US' && type === 'gbt' && item.regions ) {
                  //  usa states
                  $scope.usa_states_gbt = item.regions.map( function( r ) {
                    return {
                      name: r.key,
                      y: r.received_bytes
                    };
                  });
                }
                item.key = $scope.countries[item.key.toUpperCase()] || item.key;
              }
              newData.push({
                name: item.key,
                y: (type === 'gbt' ? item.received_bytes : item.count)
              });
            });
            $scope[name + '_' + type] = newData;
          } else {
            $scope[name + '_' + type] = [];
          }
        })
        .catch(function() {
          $scope[name + '_' + type] = [];
        });
    };

    //  ---------------------------------
    var reloadOther_ = function(type, name, count, filters) {

      filters.report_type = name;
      filters.count = count;
      return Stats.sdk_distributions(filters)
        .$promise
        .then(function(data) {
          if (data.data && data.data.length > 0) {
            $scope[name + '_' + type] = data.data.map( function(item) {
              return {
                name: item.key,
                y: (type === 'gbt' ? (item.received_bytes + item.sent_bytes) : item.count)
              };
            });

            // debug
            // if ( type === 'gbt' && name === 'domain' ) {
            //   debugger;
            // }
            // debug
          } else {
            $scope[name + '_' + type] = [];
          }
        })
        .catch(function() {
          $scope[name + '_' + type] = [];
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
        to_timestamp: Date.now()
      };

      $scope._loading = true;
      return $q.all([
          reloadOne_('hits', 'country', 20, filters),
          reloadOne_('users', 'country', 20, filters),
          reloadOne_('gbt', 'country', 20, filters),
          reloadOne_('hits', 'os', 10, filters),
          reloadOne_('users', 'os', 10, filters),
          reloadOne_('gbt', 'os', 10, filters),
          reloadOne_('hits', 'device', 20, filters),
          reloadOne_('users', 'device', 20, filters),
          reloadOne_('gbt', 'device', 20, filters),
          reloadOne_('hits', 'operator', 20, filters),
          reloadOne_('users', 'operator', 20, filters),
          reloadOne_('gbt', 'operator', 20, filters),
          reloadOne_('hits', 'network', 2, filters),
          reloadOne_('users', 'network', 2, filters),
          reloadOne_('gbt', 'network', 2, filters),
          reloadOther_('gbt', 'domain', 10, filters),
          reloadOther_('hits', 'domain', 10, filters),
          reloadOther_('hits', 'status_code', 10, filters)
        ])
        .catch(function(err) {
          AlertService.danger('Oops! Something went wrong');
          // console.log(err);
        })
        .finally(function() {
          $scope._loading = false;
        });
    };

  }
})();
