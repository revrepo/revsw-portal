(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('TopReportsTrafficController', TopReportsTrafficController);

  /*@ngInject*/
  function TopReportsTrafficController($scope, User, AlertService, Stats, Countries, Util) {
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
    $scope.usa_states = [];
    $scope.statusCode = [];
    $scope.requestStatus = [];
    $scope.mobileDesktopRatio = [];

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
    var reloadOS_ = function(filters) {
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
    var reloadDevice_ = function(filters) {
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
    var reloadBrowser_ = function(filters) {
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
    var reloadProtocol_ = function(filters) {
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
    var reloadHttpMethod_ = function(filters) {
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
    var reloadHttpProtocol_ = function(filters) {
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
    var reloadStatusCode_ = function(filters) {
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
    var reloadContentType_ = function(filters) {
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
    var reloadCacheStatus_ = function(filters) {
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
    var reloadQUIC_ = function(filters) {
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
    var reloadHTTP2_ = function(filters) {
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
     * Countries' data including traff
     *
     * @param {object} common parameters(domainId, from, to)
     */
    $scope.stateTraffChartOptions = {
      tooltip: {
        formatter: function() {
          return '<b>'+ this.point.name +': </b>'+
            Util.humanFileSize( this.y, 2 );
        }
      }
    };

    var reloadCountry_ = function(filters) {
      Stats.gbt_country(filters)
        .$promise
        .then(function(data) {

          // console.log( data.data );
          $scope.usa_states = [];
          $scope.country = data.data.filter( function( item ) {
              return item.key !== '--';
            })
            .map( function( item ) {
              if ( item.key === 'US' ) {
                var statesCodes2Names = Util.statesCodes2Names();
                var states = item.regions.filter( function( reg ) {
                  return reg.key !== '--';
                })
                .map( function( reg ) {
                  return {
                    name: statesCodes2Names[reg.key] || reg.key,
                    y: reg.sent_bytes
                  };
                });
                if ( states.length > 20 ) {
                  states.length = 20;
                }
                $scope.usa_states = states;
              }
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
    var reloadRequestStatus_ = function(filters) {
      Stats.requestStatus(filters)
        .$promise
        .then(function(data) {

          var ok = 0,
            failed = 0;
          data.data.forEach( function(item) {
            if (item.key === 'OK') {
              ok = item.count;
            } else {
              failed += item.count;
            }
          });
          if ( ( ok + failed ) === 0 ) {
            $scope.requestStatus = [];
          } else {
            $scope.requestStatus = [{
              name: 'Successfull',
              y: ok
            }, {
              name: 'Failed',
              y: failed
            }];
          }
        })
        .catch(function() {
          $scope.requestStatus = [];
        });

    };

    /**
     * requests distribution by mobile/desktop clients
     *
     * @param {object} common parameters(domainId, from, to)
     */
    var reloadMobileDesktopRatio_ = function(filters) {
      Stats.mobile_desktop(filters)
        .$promise
        .then(function(data) {
          if ( data.data.mobile + data.data.desktop + data.data.spiders === 0 ) {
            $scope.mobileDesktopRatio = [];
          } else {
            $scope.mobileDesktopRatio = [
              { name: 'Mobile', y: data.data.mobile },
              { name: 'Desktop', y: data.data.desktop },
              { name: 'Spiders', y: data.data.spiders }
            ]
          }
        })
        .catch(function() {
          $scope.mobileDesktopRatio = [];
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

      reloadOS_(filters);
      reloadDevice_(filters);
      reloadBrowser_(filters);
      reloadCountry_(filters);
      reloadProtocol_(filters);
      reloadHttpMethod_(filters);
      reloadHttpProtocol_(filters);
      reloadStatusCode_(filters);
      reloadContentType_(filters);
      reloadCacheStatus_(filters);
      reloadQUIC_(filters);
      reloadHTTP2_(filters);
      reloadRequestStatus_(filters);
      reloadMobileDesktopRatio_(filters);
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
