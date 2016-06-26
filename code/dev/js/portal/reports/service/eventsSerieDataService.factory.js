/* activityInformation.factory.js

/**
 * @service reportsFilterService
 * @module 'revapm.Portal.Reports'
 * @desc service for the getting data for the global filter reports
 */
(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .factory('EventsSerieDataService', EventsSerieDataService);

  function EventsSerieDataService($q, Activity, ActivityPhrase, $uibModal) {
    'ngInject';
    // TODO: rebase to config
    var constEventsColor = {
      'domain': 'blue',
      'purge': 'green',
      'sslcert': 'red'
    };

    return {
      getEventsSerieDataForDomain: getEventsSerieDataForDomain
    };

    function getEventsSerieDataForDomain(options) {
      var queryParams = {
        from_timestamp: options.from_timestamp,
        to_timestamp: options.to_timestamp
      };
      // TODO: activate after checking server work
      // if (!!options.account_id) {
      //   queryParams.account_id = options.account_id;
      // }

      return Activity.query(queryParams).$promise
        .then(function(data) {
          // NOTE: Activity series
          var serie = {
            name: 'Events',
            data: [],
            type: 'flags', //'scatter',
            // color: '#333333',
            shape: 'circlepin',
            states: {
              hover: {
                fillColor: '#faa947' // darker
              }
            },
            events: {
              hide: function() {},
              show: function() {}
            },
            point: {
              events: {
                click: function() {
                  showEventDetails(this.options.total);
                }
              }
            },
            tooltip: {
              headerFormat: '',
              pointFormatter: function eventPointFormatter() {
                var _text = 'Event ';
                switch (this.options.name) {
                  case 'purge':
                  case 'domain':
                  case 'sslcert':
                    _text = '<b>' + this.series.name + '</b> ' + ActivityPhrase.EVENT_TYPES[this.options.name] +
                      '<br>' + moment(this.x).format('[<span style="color: #000; font-weight: bold;">]HH:mm[</span>] MMM D') + '';
                    _text += '<br> performed by ' + this.total.user_name + '';
                    break;
                  default:
                    _text = '<b>' + 'Event ' + ' </b> ' + ActivityPhrase.EVENT_TYPES[this.options.name];
                    break;
                }
                return _text;
              }
            },
            // showInLegend: false,
            // style: { // text style
            //   color: 'white'
            // },
          };
          // - Cache purges
          // - Domain configuration changes (publishes)
          // - SSL Cert
          angular.forEach(data.data, function(item) {
            if (item.activity_target === 'purge' ||
              (item.activity_target === 'domain' && item.activity_type === 'publish') ||
              item.activity_target === 'sslcert') {
              // Skip events not for domain
              if (!!options.domain_name) {
                if (((item.activity_target === 'domain' && item.activity_type === 'publish') ||
                    item.activity_target === 'purge') && item.target_name !== options.domain_name) {
                  return;
                }
              }
              // Set color for activity_target
              var marker = {
                fillColor: constEventsColor[item.activity_target],
                radius: 6
              };
              var eventPointData = {
                id: item.activity_target + '_' + item.datetime,
                name: item.activity_target,
                activity_target: item.activity_target,
                user_type: item.user_type,
                total: item,
                title: item.activity_target[0].toUpperCase(),
                y: 0,
                x: item.datetime,
                marker: marker
              };
              serie.data.push(eventPointData);
            }
          });
          return $q.when(serie);
        }, function() {
          return $q.when(serie);
        });
    }

    //
    /**
     * Show modal dialog with log details
     *
     * @see {@link ConfirmModalInstanceCtrl}
     * @param {Object} log
     * @returns {*}
     */
    function showEventDetails(log) {
      // Need to clone object here not to overwrite defaults
      var log2 = angular.copy(log);
      log2.target_object = JSON.stringify(log2.target_object, null, '    ');
      log2.activity = ActivityPhrase.ACTIVITY_TYPE[log2.activity_type];
      log2.activity += ' ' + ActivityPhrase.ACTIVITY_TARGET[log2.activity_target];

      // Uses ConfirmModalInstanceCtrl. This controller has all needed methods
      // So no need to create a new one.
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'parts/reports/modal/modal-event-info.tpl.html',
        controller: 'ConfirmModalInstanceCtrl',
        size: 'md',
        resolve: {
          model: log2
        }
      });

      return modalInstance.result;
    }
  }
})(angular);