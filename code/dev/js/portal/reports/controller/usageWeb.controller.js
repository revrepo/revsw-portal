(function () {
  'use strict';

  angular
    .module('revapm.Portal.Usage')
    .controller('UsageWebController', UsageWebController);

  /*@ngInject*/
  function UsageWebController($scope, User, AlertService, Stats, Util) {

    $scope._loading = true;
    $scope.accounts = [];
    $scope.selected = { val: null };
    $scope.month_year = new Date();
    $scope.month_year_symbol = $scope.month_year.toISOString().slice( 0, 7 );
    $scope.report = null;

    //  ---------------------------------
    $scope.onAccountSelect = function ( acc ) {
      // console.log( 'onAccountSelect', acc );
      User.selectAccount( acc );
      $scope.selected.val = acc;
    };
    $scope.onAccountClick = function ( acc_id ) {
      var acc = $scope.accounts.find( function( a ) {
        return a.acc_id === acc_id;
      });
      $scope.selected.val = acc;
      User.selectAccount( acc );
      $scope.onUpdate();
    };

    $scope.onTimeSet = function( newDate ) {
      newDate = new Date( newDate );
      // console.log( newDate );
      $scope.month_year = newDate;
      $scope.month_year_symbol = newDate.toISOString().slice( 0, 7 );
    };

    $scope.showTraffic = function() {
      return !$scope._loading && $scope.report && $scope.report.traffic.count !== '0';
    };
    $scope.showDomainsUsage = function() {
      return $scope.report && $scope.report.domains_usage;
    };
    $scope.showAccounts = function() {
      return $scope.report && $scope.report.accounts;
    };

    //  ---------------------------------
    var sub_format_ = function( data ) {
      if ( data.count !== undefined ) {
        data.count = Util.formatNumber( data.count );
        data.received_bytes = Util.humanFileSizeInGB( data.received_bytes );
        data.sent_bytes = Util.humanFileSizeInGB( data.sent_bytes );
      }
      if ( data.billable_received_bps !== undefined ) {
        data.billable_received_bps = Util.convertTraffic( data.billable_received_bps );
        data.billable_sent_bps = Util.convertTraffic( data.billable_sent_bps );
      }
      if ( data.cache_hits !== undefined ) {
        data.cache_hits.MISS = Util.formatNumber( data.cache_hits.MISS );
        data.cache_hits.HIT = Util.formatNumber( data.cache_hits.HIT );
        for ( var port in data.port_hits ) {
          data.port_hits[port] = Util.formatNumber( data.port_hits[port] );
        }
      }
    };

    var format_ = function( data ) {
      sub_format_( data );
      sub_format_( data.traffic );
      for ( var zone in data.traffic_per_billing_zone ) {
        sub_format_( data.traffic_per_billing_zone[zone] );
      }
      for ( var d in data.domains_usage ) {
        var dmn = data.domains_usage[d];
        sub_format_( dmn );
        for ( var t in dmn.traffic_per_billing_zone ) {
          sub_format_( dmn.traffic_per_billing_zone[t] );
        }
      }
      if ( data.accounts ) {
        for ( var i = 0, len = data.accounts.length; i < len; ++i ) {
          sub_format_( data.accounts[i] );
        }
      }
    };

    $scope.onUpdate = function () {

      if ( $scope.accounts.length === 0 || !$scope.selected.val ) {
        $scope._loading = false;
        return;
      }

      $scope._loading = true;
      var q = {
        from: moment($scope.month_year).utc().startOf( 'month' ).toISOString().slice( 0, 10 ),
        to: moment($scope.month_year).utc().endOf( 'month' ).toISOString().slice( 0, 10 )
      };
      //  not 'All Accounts'
      if ( $scope.selected.val.acc_id ) {
        q.account_id = $scope.selected.val.acc_id;
      }
      Stats.usage_web( q )
        .$promise
        .then( function( data ) {

          // debug
          console.log( data );
          // debug

          var overall = data.data[data.data.length - 1/*overall summary*/];
          format_( overall );
          $scope.report = overall;
        })
        .catch( function( err ) {
          AlertService.danger('Oops! Something went wrong');
          console.log( err );
        })
        .finally( function() {
          $scope._loading = false;
        });
    };

    //  ---------------------------------
    if ( User.getSelectedAccount() ) {
      $scope.selected.val = User.getSelectedAccount();
    }

    User.getUserAccounts()
      .then(function ( accs ) {
        $scope.accounts = accs;
        if ( accs.length === 1 ) {
          $scope.selected.val = accs[0];
        }
        $scope.onUpdate();
      })
      .catch(function ( err ) {
        AlertService.danger('Oops! Something went wrong');
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

