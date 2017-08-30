/* activityInformation.factory.js

/**
 * @service reportsFilterService
 * @module 'revapm.Portal.Reports'
 * @desc service for the getting data for Events(Activity) information
 */
(function(angular, moment, _) {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .factory('EventsSerieDataService', EventsSerieDataService);

  function EventsSerieDataService($q, Activity, ActivityPhrase, DomainsConfig, Stats, $uibModal) {
    'ngInject';
    var constEventsColor = ActivityPhrase.EVENT_COLORS;
    // service API
    return {
      getEventsSerieDataForDomain: getEventsSerieDataForDomain,
      extendSeriesEventsDataForDomainId: extendSeriesEventsDataForDomainId
    };
    /**
     * @name extendSeriesEventsDataForDomainId
     *
     * @param {Array} series
     * @param {Object} options
     * @returns
     */
    function extendSeriesEventsDataForDomainId(series, options) {
      var self = this;
      return $q.when(series)
        .then(function(data) {
          var isEmpty = true;
          _.forEach(series, function(item) {
            if (item.data.length > 0) {
              isEmpty = false;
            }
          });
          // NOTE:if we have no main data when we don't add series data "Events"
          if (isEmpty) {
            return series;
          }
          return self.getEventsSerieDataForDomain(options)
            .then(function(data) {
              // NOTE: add new series data "Events"
              series.push(data);
              return series;
            });
        })
        .catch(function() {
          return series;
        });
    }
    /**
     *
     * @param {Object} options
     */
    function getEventsSerieDataForDomain(options) {
      var queryParams = {
        from_timestamp: options.from_timestamp,
        to_timestamp: options.to_timestamp,
        domainId: options.domain_id || options.id
      };

      return Stats.statsDomainActivity(queryParams).$promise
        .then(function(data) {
          // NOTE: create series data for Domain Events
          var serie = {
            name: 'Events',
            data: [],
            type: 'flags',
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
                click: function clickOnPointWithEventInfo() {
                  showEventDetails(this.options.total);
                }
              }
            },
            tooltip: {
              headerFormat: '',
              pointFormatter: function eventPointFormatter() {
                var _text = 'Event ';
                switch (this.options.name) {
                  // case 'purge':
                  case 'domain':
                    var _name_ = 'domain';
                    if (this.total.activity_type === 'purge') {
                      _name_ = 'purge';
                    }
                    _text = '<b>' + this.series.name + '</b> ' + ActivityPhrase.EVENT_TYPES[_name_] +
                      '<br>' + moment(this.x).format('[<span style="color: #000; font-weight: bold;">]HH:mm[</span>] MMM D') + '';
                    _text += '<br> performed by ' + this.total.user_name + '';
                    break;
                  case 'sslcert':
                  case 'wafrule':
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
            }
          };

          if (data !== null) {
            // var startPointData = {
            //   y: 0,
            //   x: data.metadata.start_timestamp
            // };
            // serie.data.push(startPointData);
            // var endPointData = {
            //   y: 0,
            //   x: data.metadata.end_timestamp
            // };
            // serie.data.push(endPointData);
            serie.pointStart = data.metadata.start_timestamp;
            angular.forEach(data.data, function addPointsToSerie(item) {
              // Set color for activity_target name
              var marker = {
                fillColor: constEventsColor[item.activity_target],
                radius: 6
              };
              var title_ = item.activity_target[0].toUpperCase();
              // Event 'Object Purge' is Activity Domain
              if (item.activity_target === 'domain') {
                if (item.activity_type === 'purge') {
                  title_ = 'P';
                  marker.fillColor = constEventsColor[item.activity_type];
                }
              }
              var eventPointData = {
                id: item.activity_target + '_' + item.datetime,
                name: item.activity_target,
                activity_target: item.activity_target,
                activity_type: item.activity_type,
                user_type: item.user_type,
                total: item,
                title: title_,
                y: 0,
                x: item.datetime,
                marker: marker
              };
              serie.data.push(eventPointData);
            });
            //   var startPointData = {
            //   y: 0,
            //   x: data.metadata.start_timestamp
            // };
            // serie.data.push(startPointData);
            // var endPointData = {
            //   y: 0,
            //   x: data.metadata.end_timestamp
            // };
            // serie.data.push(endPointData);
          }
          console.log(serie.data);
          return serie;
        });

    }

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
})(angular, moment, _);
