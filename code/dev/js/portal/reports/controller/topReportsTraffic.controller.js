(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('TopReportsTrafficController', TopReportsTrafficController);

  /*@ngInject*/
  function TopReportsTrafficController($scope, User, AlertService, Stats, Countries) {
    $scope.userService = User;

    $scope._loading = true;
    // Domain that selected
    $scope.domain = null;
    $scope.domains = [];
    $scope.pieOpts = {
      scaleOverride: true
    };

    $scope.os = [];
    $scope.device = [];
    $scope.browser = [];
    $scope.country = [];
    $scope.statusCode = [];
    $scope.requestStatus = [];

    $scope.countries = Countries.query();
    $scope.delay = '24';
    $scope.country_filter = '';

    var filter_ = function( data ) {
      return data.filter( function( item ) {
          return item.key !== '--';
        })
        .map( function( item ) {
          return {
            name: item.key,
            y: item.count
          };
        });
    };

    var direct_ = function( data ) {
      return data.map( function( item ) {
          return {
            name: item.key,
            y: item.count
          };
        });
    };

    /**
     * Reload list of OSes
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadOS = function(filters) {
      Stats.os(filters)
        .$promise
        .then(function(data) {
          $scope.os = filter_( data.data );
        })
        .catch(function() {
          $scope.os = [];
        });
    };

    /**
     * List of devices
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadDevice = function(filters) {
      Stats.device(filters)
        .$promise
        .then(function(data) {
          $scope.device = filter_( data.data );
        })
        .catch(function() {
          $scope.device = [];
        });
    };

    /**
     * List of browsers
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadBrowser = function(filters) {
      Stats.browser(filters)
        .$promise
        .then(function(data) {
          $scope.browser = filter_( data.data );
        })
        .catch(function() {
          $scope.browser = [];
        });
    };

    /**
     * HTTP/S requests distribution
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadProtocol = function(filters) {
      Stats.protocol(filters)
        .$promise
        .then(function(data) {
          $scope.protocol = data.data.map( function( item ) {
              return {
                name: ( (item.key|0) === 80 ? 'HTTP' : ( (item.key|0) === 443 ? 'HTTPS' : 'Unknown' ) ),
                y: item.count
              };
            });
        })
        .catch(function() {
          $scope.protocol = [];
        });
    };

    /**
     * requests distribution by HTTP methods
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadHttpMethod = function(filters) {
      Stats.httpMethod(filters)
        .$promise
        .then(function(data) {
          $scope.httpMethod = direct_( data.data );
        })
        .catch(function() {
          $scope.httpMethod = [];
        });
    };

    /**
     * requests distribution by HTTP protos
     *
     * @param {object}
     */
    $scope.reloadHttpProtocol = function(filters) {
      Stats.httpProtocol(filters)
        .$promise
        .then(function(data) {
          $scope.httpProtocol = direct_( data.data );
        })
        .catch(function() {
          $scope.httpProtocol = [];
        });
    };

    /**
     * requests distribution by statuses
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadStatusCode = function(filters) {
      Stats.statusCode(filters)
        .$promise
        .then(function(data) {
          $scope.statusCode = direct_( data.data );
        })
        .catch(function() {
          $scope.statusCode = [];
        });
    };

    /**
     * requests distribution by content types
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadContentType = function(filters) {
      Stats.contentType(filters)
        .$promise
        .then(function(data) {
          $scope.contentType = filter_( data.data );
        })
        .catch(function() {
          $scope.contentType = [];
        });
    };

    /**
     * cache HIT/MISS requests distribution
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadCacheStatus = function(filters) {
      Stats.cacheStatus(filters)
        .$promise
        .then(function(data) {
          var newData = direct_( data.data );
          if (newData.length === 2 &&
            (newData[0].y > 0 || newData[1].y > 0)) {
            $scope.cacheStatus = newData;
          } else {
            $scope.cacheStatus = [];
          }
        })
        .catch(function() {
          $scope.cacheStatus = [];
        });
    };

    /**
     * QUIC/non-QUIC requests distribution
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadQUIC = function(filters) {
      Stats.quic(filters)
        .$promise
        .then(function(data) {
          $scope.quic = data.data.map( function( item ) {
              return {
                name: ( item.key === '-' ? 'Non-QUIC' : item.key ),
                y: item.count
              };
            });
        })
        .catch(function() {
          $scope.quic = [];
        });
    };

    /**
     * H2/H2C HTTP2 requests distribution
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadHTTP2 = function(filters) {
      Stats.http2(filters)
        .$promise
        .then(function(data) {
          $scope.http2 = data.data.map( function( item ) {
              return {
                name: ( item.key === '' ? 'Non-HTTP2' : item.key.toUpperCase()),
                y: item.count
              };
            });
        })
        .catch(function() {
          $scope.http2 = [];
        });
    };

    /**
     * List of countries
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadCountry = function(filters) {
      Stats.country(filters)
        .$promise
        .then(function(data) {
          $scope.country = data.data.filter( function( item ) {
              return item.key !== '--';
            })
            .map( function( item ) {
              return {
                name: $scope.countries[item.key],
                y: item.count
              };
            });
        })
        .catch(function() {
          $scope.country = [];
        });
    };

    /**
     * success/failed requests distribution
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.reloadRequestStatus = function(filters) {
      Stats.requestStatus(filters)
        .$promise
        .then(function(data) {

          var st = [{
            name: 'Successfull',
            y: 0
          }, {
            name: 'Failed',
            y: 0
          }];

          data.data.forEach( function(item) {
            if (item.key === 'OK') {
              st[0].y = item.count;
            } else {
              st[1].y += item.count;
            }
          });
          $scope.requestStatus = st;
        })
        .catch(function() {
          $scope.requestStatus = [];
        });

    };

    /**
     * reload everything
     */
    $scope.reload = function() {

      var filters = {
        domainId: $scope.domain.id,
        from_timestamp: moment().subtract($scope.delay, 'hours').valueOf(),
        to_timestamp: Date.now()
      };
      if ($scope.country_filter) {
        filters.country = $scope.country_filter;
      }

      $scope.reloadOS(filters);
      $scope.reloadDevice(filters);
      $scope.reloadBrowser(filters);
      $scope.reloadCountry(filters);
      $scope.reloadProtocol(filters);
      $scope.reloadHttpMethod(filters);
      $scope.reloadHttpProtocol(filters);
      $scope.reloadStatusCode(filters);
      $scope.reloadContentType(filters);
      $scope.reloadCacheStatus(filters);
      $scope.reloadQUIC(filters);
      $scope.reloadHTTP2(filters);
      $scope.reloadRequestStatus(filters);
    };

    // Load user domains
    User.getUserDomains(true)
      .then(function(domains) {
        $scope.domains = domains;
      })
      .catch(function() {
        AlertService.danger('Oops something wrong');
      })
      .finally(function() {
        $scope._loading = false;
      });

    $scope.onDomainSelected = function(domain) {
      if (!$scope.domain || !$scope.domain.id) {
        return;
      }
      $scope.reload();
    };
  }
})();
