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
    };

    $scope.onTimeSet = function( newDate ) {
      newDate = new Date( newDate );
      // console.log( newDate );
      $scope.month_year = newDate;
      $scope.month_year_symbol = newDate.toISOString().slice( 0, 7 );
    };

    $scope.onUpdate = function () {

      if ( $scope.accounts.length === 0 || !$scope.account ) {
        return;
      }

      $scope._loading = true;
      Stats.usage_web({
          account_id: $scope.account.acc_id,
          from: moment($scope.month_year).utc().startOf( 'month' ).toISOString().slice( 0, 10 ),
          to: moment($scope.month_year).utc().endOf( 'month' ).toISOString().slice( 0, 10 )
        })
        .$promise
        .then( function( data ) {
          // console.log( data );
          var d = data.data[data.data.length - 1/*summary*/];
          //  let's format something
          d.count = Util.formatNumber( d.count );
          d.cache_hits.MISS = Util.formatNumber( d.cache_hits.MISS );
          d.cache_hits.HIT = Util.formatNumber( d.cache_hits.HIT );
          for ( var port in d.port_hits ) {
            d.port_hits[port] = Util.formatNumber( d.port_hits[port] );
          }
          d.received_bytes = Util.humanFileSize( d.received_bytes );
          d.sent_bytes = Util.humanFileSize( d.sent_bytes );
          for ( var zone in d.traffic_per_billing_zone ) {
            d.traffic_per_billing_zone[zone].count = Util.formatNumber( d.traffic_per_billing_zone[zone].count );
            d.traffic_per_billing_zone[zone].received_bytes = Util.humanFileSize( d.traffic_per_billing_zone[zone].received_bytes );
            d.traffic_per_billing_zone[zone].sent_bytes = Util.humanFileSize( d.traffic_per_billing_zone[zone].sent_bytes );
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


// account_id: "ACCOUNTS_SUMMARY"
// api_keys: Object
//   active: 1
//   inactive: 1
//   total: 2
// applications: Object
//   active: 10
//   deleted: 66
//   total: 76
// domains: Object
//   active: 21
//   deleted: 3
//   ssl_enabled: 24
//   total: 24
// count: 493665
// cache_hits: Object
//   HIT: 60000
//   MISS: 433665
// port_hits: Object
//   80: 433665
//   443: 60000
// received_bytes: 154782750
// sent_bytes: 493713375
// traffic_per_billing_zone: Object
//   Unknown(IAD02): Object
//     billing_samples: null
//     count: 120000
//     received_bytes: 24000000
//     sent_bytes: 240000000
//   Unknown(TESTSJC20): Object
//     billing_samples: null
//     count: 373665
//     received_bytes: 130782750
//     sent_bytes: 253713375



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

