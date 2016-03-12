(function () {
  'use strict';

  angular
    .module('revapm.Portal.Usage')
    .controller('UsageWebController', UsageWebController);

  /*@ngInject*/
  function UsageWebController($scope, User, AlertService, Stats, Util) {

    $scope._loading = true;
    $scope.accounts = [];
    $scope.account = null;
    $scope.month_year = new Date();
    $scope.month_year_symbol = $scope.month_year.toISOString().slice( 0, 7 );
    $scope.report = null;

    $scope.onAccountSelect = function ( acc ) {
      User.selectAccount( acc );
      $scope.account = acc;
    };

    $scope.onTimeSet = function( newDate ) {
      newDate = new Date( newDate );
      // console.log( newDate );
      $scope.month_year = newDate;
      $scope.month_year_symbol = newDate.toISOString().slice( 0, 7 );
    };

    $scope.showTraffic = function() {
      return $scope.report && $scope.report.count !== '0';
    };

    var format_ = function( data ) {
      data.count = Util.formatNumber( data.count );
      data.cache_hits.MISS = Util.formatNumber( data.cache_hits.MISS );
      data.cache_hits.HIT = Util.formatNumber( data.cache_hits.HIT );
      for ( var port in data.port_hits ) {
        data.port_hits[port] = Util.formatNumber( data.port_hits[port] );
      }
      data.received_bytes = Util.humanFileSizeInGB( data.received_bytes );
      data.sent_bytes = Util.humanFileSizeInGB( data.sent_bytes );
      for ( var zone in data.traffic_per_billing_zone ) {
        data.traffic_per_billing_zone[zone].count = Util.formatNumber( data.traffic_per_billing_zone[zone].count );
        data.traffic_per_billing_zone[zone].received_bytes = Util.humanFileSizeInGB( data.traffic_per_billing_zone[zone].received_bytes );
        data.traffic_per_billing_zone[zone].sent_bytes = Util.humanFileSizeInGB( data.traffic_per_billing_zone[zone].sent_bytes );

        if ( data.traffic_per_billing_zone[zone].billable_received_bps !== undefined ) {
          data.traffic_per_billing_zone[zone].billable_received_bps = Util.convertTraffic( data.traffic_per_billing_zone[zone].billable_received_bps );
          data.traffic_per_billing_zone[zone].billable_sent_bps = Util.convertTraffic( data.traffic_per_billing_zone[zone].billable_sent_bps );
        }
      }
    }

    $scope.onUpdate = function () {

      if ( $scope.accounts.length === 0 || !$scope.account ) {
        return;
      }

      $scope._loading = true;
      var q = {
        from: moment($scope.month_year).utc().startOf( 'month' ).toISOString().slice( 0, 10 ),
        to: moment($scope.month_year).utc().endOf( 'month' ).toISOString().slice( 0, 10 )
      };
      if ( $scope.account.acc_id ) {
        q.account_id = $scope.account.acc_id;
      }
      Stats.usage_web( q )
        .$promise
        .then( function( data ) {

          // debug
          // console.log( data );
          // debug

          var d = data.data[data.data.length - 1/*summary*/];

          //  let's format something
          format_( d );
          for ( var domain in d.domains_usage ) {
            format_( d.domains_usage[domain] );
          }

          $scope.report = d;
        })
        .catch( function( err ) {
          AlertService.danger('Oops! Something went wrong');
          console.log( err );
        })
        .finally( function() {
          $scope._loading = false;
        });
    };

    if ( User.getSelectedAccount() ) {
      $scope.account = User.getSelectedAccount();
    }

    User.getUserAccounts()
      .then(function ( accs ) {
        $scope.accounts = accs;
        if ( accs.length === 1 ) {
          $scope.account = accs[0];
        }
        $scope.onUpdate();
      })
      .catch(function ( err ) {
        AlertService.danger('Oops! Something went wrong');
      })
      .finally(function () {
        $scope._loading = false;
      });

  }
})();


// console.log( user );
// companyId: Array[1]
//   0: "5588869fbde7a0d00338ce8f"
// created_at: "2015-06-22T23:07:40.000Z"
// domain: Array[11]
//   0: "test-proxy-acl-deny-except.revsw.net"
//   1: "test-proxy-cache-config-02.revsw.net"
//   ...
// email: "victor@revsw.com"
// firstname: "Victor"
// last_login_at: "2016-03-03T03:26:35.894Z"
// last_login_from: "172.16.0.153"
// lastname: "Garvich2"
// role: "admin"
// theme: "light"
// two_factor_auth_enabled: false
// updated_at: "2016-03-03T03:26:35.897Z"
// user_id: "5588953c1ef09d211562a43f"

