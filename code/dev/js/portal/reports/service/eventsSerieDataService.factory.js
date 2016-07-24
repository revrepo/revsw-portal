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

  function EventsSerieDataService($q, Activity, ActivityPhrase, DomainsConfig, $uibModal) {
    'ngInject';
    // TODO: rebase to config
    var constEventsColor = {
      'domain': 'blue',
      'purge': 'green',
      'sslcert': 'red'
    };
    // service API
    return {
      getEventsSerieDataForDomain: getEventsSerieDataForDomain
    };
    /**
     * @name  getEventsSerieDataForDomain
     * @description
     *   get Events (Activity) for Domain
     * @param  {Object} options
     * @return {Promise}
     */
    function getEventsSerieDataForDomain(options) {
      var promises = [];
      var queryParams = {
        from_timestamp: options.from_timestamp,
        to_timestamp: options.to_timestamp
      };
      // TODO: activate after checking server work
      if (!!options.account_id) {
        queryParams.account_id = options.account_id;
      }

      /**
       * @actionPreparingRequestSSLCertEvents
       * @description
       *   Preparing request for get Events(Activity) of target type "SSL Certificates"
       * @return {Promise}
       */
      function actionPreparingRequestSSLCertEvents(options) {
        var def = $q.defer();
        if (!!options.domain_id) {
          DomainsConfig.get({
            id: options.domain_id
          }).$promise.then(function(domainConfig) {
            if (domainConfig.ssl_cert_id && domainConfig.ssl_cert_id !== '') {
              var sslCertQueryPrams = {
                from_timestamp: options.from_timestamp,
                to_timestamp: options.to_timestamp,
                target_id: domainConfig.ssl_cert_id,
                target_type: 'sslcert'
              };
              def.resolve(Activity.query(sslCertQueryPrams).$promise);
            }
            def.resolve($q.when(null));
          });
        } else {
          def.resolve($q.when(null));
        }
        return def.promise;
      }
      /**
       * @name  actionPreparingRequestDomainEvents
       * @description
       *    Action for preparing to get events (activities) only type 'domain'
       *
       * @param  {Object} options
       * @return {[type]}          [description]
       */
      function actionPreparingRequestDomainEvents(options) {
        var def = $q.defer();
        if (!!options.domain_id) {
          var domainQueryPrams = {
            from_timestamp: options.from_timestamp,
            to_timestamp: options.to_timestamp,
            target_id: options.domain_id,
            target_type: 'domain',
            activity_type: 'publish'
          };
          def.resolve(Activity.query(domainQueryPrams).$promise);
        } else {
          def.resolve($q.when(null));
        }
        return def.promise;
      }

      /**
       * @name  actionPreparingRequestPurgeEvents
       * @description
       *    Action for preparing to get events (activities) only type 'purge'
       *    Attention: target_id - is Domain ID
       *
       * @param  {Object} options
       * @return {Promise}
       */
      function actionPreparingRequestPurgeEvents(options) {
        var def = $q.defer();
        if (!!options.domain_id) {
          var domainQueryPrams = {
            from_timestamp: options.from_timestamp,
            to_timestamp: options.to_timestamp,
            target_id: options.domain_id,
            target_type: 'domain',
            activity_type: 'purge'
          };
          def.resolve(Activity.query(domainQueryPrams).$promise);
        } else {
          def.resolve($q.when(null));
        }
        return def.promise;
      }
      // Async call all needed data
      return $q.all([
          actionPreparingRequestDomainEvents(options),
          actionPreparingRequestSSLCertEvents(options),
          actionPreparingRequestPurgeEvents(options)
        ])
        .then(function(dataAllRequests) {
          // NOTE: create series data
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
          angular.forEach(dataAllRequests, function(data) {
            if (data !== null) {
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
            }
          });
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
