(function () {
  'use strict';

  angular
    .module('revapm.Portal.Usage')
    .controller('UsageWebController', UsageWebController);

  /*@ngInject*/
  function UsageWebController($scope, $q, User, DTOptionsBuilder, DTColumnDefBuilder, AlertService, Stats, Util, Locations, $uibModal) {

    $scope._loading = true;
    $scope.accounts = [];
    $scope.selected = { val: null };
    $scope.month_year = new Date();
    $scope.month_year_symbol = $scope.month_year.toISOString().slice( 0, 7 );
    $scope.report = null;
    $scope.traffic = null;
    $scope.formatNumber = Util.formatNumber;

    var pageLength = 10;
    var tickInterval_ = 2;

    $scope.accountsDtOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(pageLength)
      .withBootstrap()
      .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>')
      .withOption('order', [[1, 'desc']]);

    $scope.colDefs = [{
      targets: [1],
      type: 'num-fmt'
    }, {
      targets: [6,7],
      type: 'num'
    }, {
      targets: [2,3,4,5],
      orderable: false
    }];

    $scope.chartOptions = {
      chart: {
        type: 'column'
      },
      yAxis: {
        title: {
          text: 'GBT'
        },
        labels: {
          formatter: function() {
            return Util.humanFileSizeInGB( this.value );
          }
        }
      },
      xAxis: {
        crosshair: {
          width: 1,
          color: '#000000'
        },
        tickInterval: tickInterval_,
        labels: {
          autoRotation: false,
          useHTML: true,
          formatter: function() {
            return this.value.label;
          }
        }
      },
      tooltip: {
        formatter: function() {
          return this.key.tooltip + '<br/>' +
            this.series.name + ': <strong>' + Util.humanFileSizeInGB(this.y, 3) + '</strong>';
        }
      },
      plotOptions: {
          series: {
              pointWidth: 20 //width of the column bars irrespective of the chart size
          }
      }
    };


    //  ---------------------------------
    $scope.onAccountSelect = function ( acc ) {
      $scope.selected.val = acc;
      //  do not store 'All accounts'
      if ( acc.acc_id !== '' ) {
        User.selectAccount( acc );
      }
    };

    $scope.onAccountClick = function ( acc_id ) {
      var acc = $scope.accounts.find( function( a ) {
        return a.acc_id === acc_id;
      });
      $scope.selected.val = acc;
      //  do not store 'All account'
      if ( acc.acc_id !== '' ) {
        User.selectAccount( acc );
      }
      $scope.onUpdate();
    };

    $scope.onTimeSet = function( newDate ) {
      newDate = new Date( newDate + 86400000 ); //  add one day to avoid glitches with timezones
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
    var subFormat_ = function( data ) {
      if ( data.count !== undefined ) {
        data.count = Util.formatNumber( data.count );
        data.received_bytes = Util.humanFileSizeInGB( data.received_bytes, 3 );
        data.sent_bytes = Util.humanFileSizeInGB( data.sent_bytes, 3 );
      }
      if ( data.billable_received_bps !== undefined ) {
        data.billable_received_bps = Util.convertTrafficMbps( data.billable_received_bps, 3 );
        data.billable_sent_bps = Util.convertTrafficMbps( data.billable_sent_bps, 3 );
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
      subFormat_( data );
      for ( var zone in data.traffic_per_billing_zone ) {
        subFormat_( data.traffic_per_billing_zone[zone] );
      }

      for ( var d in data.domains_usage ) {
        var dmn = data.domains_usage[d];
        subFormat_( dmn );
        for ( var t in dmn.traffic_per_billing_zone ) {
          subFormat_( dmn.traffic_per_billing_zone[t] );
        }
      }

      if ( data.traffic ) {
        subFormat_( data.traffic );
      }

      if ( data.accounts ) {
        for ( var i = 0, len = data.accounts.length; i < len; ++i ) {
          subFormat_( data.accounts[i] );
        }
      }

      if ( data.domains_usage !== undefined &&
           data.domains.list ) {
        data.domains.list.forEach( function( domain ) {
          if ( !data.domains_usage[domain.name] ) {
            data.domains_usage[domain.name] = {
              count: '0',
              received_bytes: '0 GB',
              sent_bytes: '0 GB',
              billable_received_bps: '0 Mbps',
              billable_sent_bps: '0 Mbps',
              deleted: domain.deleted
            };
          } else {
            data.domains_usage[domain.name].deleted = domain.deleted;
          }
        });
      }
    };

    var updateUsage_ = function( from, to, aid ) {
      var q = {
        account_id: aid,
        from: from.toISOString().slice( 0, 10 ),
        to: to.toISOString().slice( 0, 10 )
      };
      return Stats.usage_web( q )
        .$promise
        .then( function( data ) {
          var overall = data.data[data.data.length - 1/*overall summary*/];
          format_( overall );
          $scope.report = overall;
          // console.log( overall );
        });
    };

    var updateStats_ = function( from, to, aid ) {
      var q = {
        account_id: aid,
        from_timestamp: from.valueOf(),
        to_timestamp: to.valueOf()
      };
      return Stats.usage_web_stats( q )
        .$promise
        .then(function(data) {
          var series = [{
            name: 'GBT',
            data: []
          }];
          if ( data.data && data.data.length > 0 ) {
            var labels = [];
            var offset = data.metadata.interval;

            // console.log( data );
            data.data.forEach(function(item, idx, items) {

              var st = moment(item.time),
                en = moment(item.time + offset - 1),
                val = moment(item.time),
                label;

              if (idx % tickInterval_) {
                label = '';
              } else {
                label = val.format('[<span style="color: #000; font-weight: bold;">]MMM D[</span>]');
              }

              labels.push({
                tooltip: val.format('[<span style="color: #000; font-weight: bold;">]MMMM Do YYYY[</span>]'),
                label: label
              });

              if (item.count) {
                series[0].data.push(item.sent_bytes);
              } else {
                series[0].data.push(null);
              }

            });

            $scope.traffic = {
              labels: labels,
              series: series
            };

          } else {
            $scope.traffic = {
              labels: [],
              series: series
            };
          }
        });
    };

    //  ---------------------------------
    $scope.onUpdate = function () {

      if ( $scope.accounts.length === 0 || !$scope.selected.val ) {
        $scope._loading = false;
        return;
      }

      $scope._loading = true;
      var from = new Date($scope.month_year );
      from.setDate( 1 );
      from.setHours( 0, 0, 0, 0 );  //  very beginning of the month
      var to = new Date( from );
      to.setMonth( to.getMonth() + 1 ); //  very beginning of the next month
      var aid = $scope.selected.val.acc_id || '';

      $q.all([
        updateUsage_( from, to, aid ),
        updateStats_( from, to, aid )
      ])
      .catch($scope.alertService.danger)
      .finally(function() {
        $scope._loading = false;
        $scope.accountsDtOptions = DTOptionsBuilder.newOptions()
          .withPaginationType('full_numbers')
          .withDisplayLength(pageLength)
          .withBootstrap()
          .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>')
          .withOption('paging', ($scope.report.accounts.length > pageLength))
          .withOption('order', [[1, 'desc']]);
      });
    };

    //  ---------------------------------
    var sel_account = User.getSelectedAccount();
    if ( sel_account && sel_account.acc_id !== ''/*do not restore 'All accounts'*/ ) {
      $scope.selected.val = sel_account;
    }

    User.getUserAccounts()
      .then(function ( accs ) {
        $scope.accounts = accs;
        if ( accs.length === 1 ) {
          $scope.selected.val = accs[0];
        }
        $scope.onUpdate();
      })
      .catch($scope.alertService.danger)
      .finally(function(){
        $scope._loading = false;
      });

     Locations.billingZones().$promise
      .then(function(data){
        $scope.billingZones = data;
        $scope.billingZonesGroup = _.chain(data).sortBy('billing_zone').groupBy('billing_zone').value();
      });

       /**
       * Confirmation dialog
       *
       * @param {string=} [template]
       * @param {Object=} [resolve]
       * @returns {*}
       */
      $scope.confirm = function(template, resolve) {
        if (angular.isObject(template)) {
          resolve = template;
          template = '';
        }
        if (angular.isObject(resolve)) {
          resolve = {
            model: resolve
          };
        }
        var modalInstance = $uibModal.open({
          animation: false,
          templateUrl: template || 'parts/modal/confirmDelete.html',
          controller: 'ConfirmModalInstanceCtrl',
          size: 'md',
          resolve: resolve || {}
        });

        return modalInstance.result;
      };

      /**
       * @name onGetBillingZonesDetails
       * @description show modal window with Billing Zones
       *
       * @return
       */
      $scope.onGetBillingZonesDetails = function() {
        var model = {
          billingZones: $scope.billingZonesGroup
        };
        $scope.confirm('parts/reports/modal/modal-billing-zones-details.tpl.html', model);
      };

  }
})();
