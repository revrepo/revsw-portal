(function() {
  'use strict';

  angular
    .module('revapm.Portal.Usage')
    .controller('UsageWebController', UsageWebController);

  /*@ngInject*/
  function UsageWebController($scope, $q, User, DTOptionsBuilder, DTColumnDefBuilder, AlertService, Stats, Util, Locations, $uibModal, $config, $sce, Companies) {
    $scope.auth = User;
    $scope._loading = true;
    $scope.accounts = [];
    $scope.selected = {
      val: null
    };
    $scope.month_year = new moment().utc();
    $scope.month_year_symbol = $scope.month_year.format('YYYY-MM');
    $scope.report = null;
    $scope.traffic = null;
    $scope.formatNumber = Util.formatNumber;
    $scope.bytesToGB = Util.humanFileSizeInGB;

    $scope.aggReportForReseller = false;

    $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
    $scope.popoverHelpHTML ={
      'traffic': $sce.trustAsHtml('This bar chart shows the amount of traffic (in GB) used by the account for each day of reported calendar month')
    };

    var pageLength = 10;
    var tickInterval_ = 2;

    $scope.accountsDtOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(pageLength)
      .withBootstrap()
      .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>')
      .withOption('order', [
        [1, 'desc']
      ]);

    $scope.colDefs = [{
      targets: [1],
      type: 'num-fmt'
    }, {
      targets: [6, 7],
      type: 'num'
    }, {
      targets: [2, 3, 4, 5],
      orderable: true
    }];

    $scope.domainDTOptions = DTOptionsBuilder.newOptions()
      .withPaginationType('full_numbers')
      .withDisplayLength(pageLength)
      .withBootstrap()
      .withDOM('<<"pull-left"pl>f<t>i<"pull-left"p>>')
      .withOption('order', [
        [1, 'desc']
      ]);

    $scope.domainColDefs = [{
      targets: [0, 6]
    }];
    var traffic_total_ = 0;
    var info_ = null;
    $scope.chartOptions = {
      chart: {
        type: 'column',
        //NOTE: used for debug data in graph and table
        // zoomType: 'x',
        // events: {
        //   redraw: function() {
        //     if (info_) {
        //       info_.destroy();
        //       info_ = null;
        //     }
        //     var _text = '</span>Traffic Total <span style="font-weight: bold; color: #3c65ac;">' + Util.humanFileSizeInGB(traffic_total_, 3) +
        //       '</span>';
        //     // NOTE: information about error
        //     if ($scope.hasFailedToLoadData === true) {
        //       _text = '<strong style="color: red;"> Failed to retrieve the data - please try again later </strong>';
        //     }
        //     var x = this.xAxis[0].toPixels(this.xAxis[0].min) + 3;
        //     info_ = this /*chart*/ .renderer
        //       .label(_text,
        //         x /*x*/ , 3 /*y*/ , '' /*img*/ , 0, 0, true /*html*/ )
        //       .css({
        //         color: '#444'
        //       })
        //       .attr({
        //         fill: 'rgba(240, 240, 240, 0.6)',
        //         stroke: $scope.hasFailedToLoadData ? 'red' : '#3c65ac', // NOTE: border color
        //         'stroke-width': 1,
        //         padding: 6,
        //         r: 2,
        //         zIndex: 5
        //       })
        //       .add();
        //   }
        // }
      },
      yAxis: {
        title: {
          text: 'GBT'
        },
        labels: {
          formatter: function() {
            return Util.humanFileSizeInGB(this.value);
          }
        }
      },
      xAxis: {
        crosshair: {
          width: 1,
          color: '#000000'
        },
        title: {
          text: 'Date'
        },
        tickInterval: tickInterval_,
        labels: {
          autoRotation: false,
          useHTML: true,
          formatter: function() {
            return moment(this.value).format('[<span style="color: #000; font-weight: bold;">]MMM D[</span>]');
          }
        }
      },
      tooltip: {
        formatter: function() {
          return moment(this.key).format('[<span style="color: #000; font-weight: bold;">]MMMM Do YYYY[</span>]') + '<br/>' +
            this.series.name + ': <strong>' + Util.humanFileSizeInGB(this.y, 3) + '</strong>';
        }
      },
      plotOptions: {
        series: {
          pointPadding: 0,
          groupPadding: 0.1       
        }
      }
    };


    //  ---------------------------------
    $scope.onAccountSelect = function(acc) {
      $scope.selected.val = acc;
      //  do not store 'All accounts'
      if (acc.acc_id !== '') {
        User.selectAccount(acc);
      }
    };

    $scope.onAccountClick = function(acc_id) {
      var acc = $scope.fullAccounts.find(function(a) {
        return a.acc_id === acc_id;
      });
      $scope.selected.val = acc;
      if (acc.acc_id !== '') {
        User.selectAccount(acc);
      }
      $scope.onUpdate();
    };
    /**
     * @name  onTimeSet
     * @description
     * @param  {Date} newDate [description]
     * @return {[type]}         [description]
     */
    $scope.onTimeSet = function(newDate) {
      var newDate_ = new moment(newDate).utc().add(1, 'day'); //  add one day to avoid glitches with timezones
      $scope.month_year = newDate_;
      $scope.month_year_symbol = newDate_.format('YYYY-MM');
    };
    // NOTE: hand date update
    $scope.$watch('month_year_symbol', function(newVal, oldVal) {
      if (newVal !== oldVal && newVal.length === 7) {
        var newDate = new moment(newVal, 'YYYY-MM').utc();
        if (newDate.isValid()) {
          newDate.add(1, 'day');
          var newDateVal = newDate.startOf('month').startOf('day').valueOf();
          $scope.onTimeSet(newDateVal);
        }
      }
    });

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
    var subFormat_ = function(data) {
      if (data.count !== undefined) {
        data.count = Util.formatNumber(data.count);
        data.received_bytes = Util.humanFileSizeInGB(data.received_bytes, 3);
        data.sent_bytes = Util.humanFileSizeInGB(data.sent_bytes, 3);
      }
      if (data.billable_received_bps !== undefined) {
        data.billable_received_bps = Util.convertTrafficMbps(data.billable_received_bps, 3);
        data.billable_sent_bps = Util.convertTrafficMbps(data.billable_sent_bps, 3);
      }
      if (data.cache_hits !== undefined) {
        data.cache_hits.MISS = Util.formatNumber(data.cache_hits.MISS);
        data.cache_hits.HIT = Util.formatNumber(data.cache_hits.HIT);
        for (var port in data.port_hits) {
          data.port_hits[port] = Util.formatNumber(data.port_hits[port]);
        }
      }
    };

    var format_ = function(data) {
      subFormat_(data);
      for (var zone in data.traffic_per_billing_zone) {
        subFormat_(data.traffic_per_billing_zone[zone]);
      }

      for (var d in data.domains_usage) {
        var dmn = data.domains_usage[d];
        subFormat_(dmn);
        for (var t in dmn.traffic_per_billing_zone) {
          subFormat_(dmn.traffic_per_billing_zone[t]);
        }
      }

      if (data.traffic) {
        subFormat_(data.traffic);
      }

      if (data.accounts) {
        for (var i = 0, len = data.accounts.length; i < len; ++i) {
          subFormat_(data.accounts[i]);
        }
      }

      if (data.domains_usage !== undefined &&
        data.domains.list) {
        data.domains.list.forEach(function(domain) {
          if (!data.domains_usage[domain.name]) {
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

    /**
     * @name updateUsage_
     * @description get USage Report Date
     *
     * INCLUDE report days for time period
     * @param  {Date} month_year
     * @param  {Array|String} aid  [description]
     * @return {[type]}      [description]
     */

    var updateUsage_ = function(month_year, aid) {

      var from = new moment(month_year.toISOString()).utc().startOf('month').startOf('day').format('YYYY-MM-DD'); //  very beginning of the month
      var to = new moment(month_year.toISOString()).utc().endOf('month').endOf('day').format('YYYY-MM-DD'); //  very end of month (last day of report)

      var q = {
        account_id: aid,
        from: from,
        to: to
      };

      if ($scope.aggReportForReseller) {
        q.agg = true;
      }

      return Stats.usage_web(q)
        .$promise
        .then(function(data) {
          var overall = data.data[data.data.length - 1 /*overall summary*/ ];
          format_(overall);
          $scope.report = overall;
          // console.log( overall );
        });
    };
    /**
     * @name updateStats_
     * @description get Usage Roport data for histogram
     *
     * NOT INCLUDE last value of tipe period
     *
     * @param {Timestamp} from
     * @param {*} to
     * @param {*} aid
     */
    var updateStats_ = function(month_year, aid) {
      var from = new moment(month_year.toISOString()).utc().startOf('month').startOf('day').valueOf(); //  very beginning of the month
      var to = new moment(month_year.toISOString()).utc().add(1, 'month').startOf('month').startOf('day').valueOf(); //  very beginning of the next month

      var q = {
        account_id: aid,
        from_timestamp: from,
        to_timestamp: to
      };

      if ($scope.aggReportForReseller) {
        q.agg = true;
      }

      $scope.traffic = {
        series: [{
          name: 'GBT',
          data: []
        },
        {
          name: 'Optimized ImageEngine Traffic (Smart Bytes), GB',
          data: []
        },
        {
          name: 'Original ImageEngine Traffic, GB',
          data: []
        }]
      };
      var labels = [];
      var series = [{
        name: 'GBT',
        data: []
      },
      {
        name: 'Optimized ImageEngine Traffic (Smart Bytes), GB',
        data: []
      },
      {
        name: 'Original ImageEngine Traffic, GB',
        data: []
      }];
      return Stats.usage_web_stats(q)
        .$promise
        .then(function(data) {
          traffic_total_ = 0;
          if (data.data && data.data.length > 0) {
            labels.length = 0;
            var offset = parseInt(data.metadata.interval || 1800);

            // console.log( data );
            data.data.forEach(function(item, idx, items) {
              traffic_total_ += item.sent_bytes;
              var val = moment(item.time_utc).utc(),

                //label = val.format('[<span style="color: #000; font-weight: bold;">]MMM D[</span>]');
                label = val.format('MMM D YYYY');


              labels.push(label);

              if (item.count) {
                if (item.image_engine && item.image_engine.optimized_image_size_bytes > 0) {
                  series[1].data.push(item.image_engine.optimized_image_size_bytes);         
                } else {
                  series[1].data.push(null);                
                }
                if (item.image_engine && item.image_engine.original_image_size_bytes > 0) {
                  series[2].data.push(item.image_engine.original_image_size_bytes);         
                } else {
                  series[2].data.push(null);
                }
                series[0].data.push(item.sent_bytes);
              } else {
                series[0].data.push(null);
              }

            });
            return $q.when(series);
          } else {
            return $q.when(series);
          }
        })
        .then(function setNewData(data) {
          // model better to update once
          $scope.traffic = {
            labels: labels,
            series: series
          };
        })
        .catch(function(err) {
          $scope.traffic = {
            labels: [],
            series: series
          };
          $scope.hasFailedToLoadData = true;
        })
        .finally(function() {
          $scope._loading = false;
        });
    };

    //  ---------------------------------
    $scope.onUpdate = function() {

      if ($scope.accounts.length === 0 || !$scope.selected.val) {
        $scope._loading = false;
        return;
      }

      $scope._loading = true;
      var aid = $scope.selected.val.acc_id || '';

      $q.all([
          updateUsage_($scope.month_year, aid),
          updateStats_($scope.month_year, aid)
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
            .withOption('order', [
              [1, 'desc']
            ]);
        });
    };

    //  ---------------------------------
    var sel_account = User.getSelectedAccount();
    if (sel_account && sel_account.acc_id !== '' /*do not restore 'All accounts'*/ ) {
      $scope.selected.val = sel_account;
    }

    User.getUserAccounts()
      .then(function(accs) {
        $scope.accounts = accs;
        if (accs.length === 1) {
          $scope.selected.val = accs[0];
        }
        $scope.onUpdate();
      })
      .catch($scope.alertService.danger)
      .finally(function() {
        $scope._loading = false;
      });

    Locations.billingZones().$promise
      .then(function(data) {
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

    /**
     * @name beforeRenderCalendar
     * @description disable dates witch in the future
     * @see https://github.com/dalelotts/angular-bootstrap-datetimepicker/#before-render
     */
    $scope.beforeRenderCalendar = function($view, $dates, $leftDate, $upDate, $rightDate) {
      var currentMoment = moment().utc().valueOf();
      var index = Math.floor(Math.random() * $dates.length);
      _.forEach($dates, function(itemDate, key) {
        if (currentMoment < itemDate.utcDateValue) {
          $dates[key].selectable = false;
        }
      });
    };

    $scope.aggReports = function () {
      $scope._loading = true;
      if (!$scope.aggReportForReseller) {
        $scope.aggReportForReseller = true;
        $scope.aggAccounts = [];
        $scope.fullAccounts = $scope.accounts;
        Companies.getResellerAccounts().$promise.then(function (data) {
          data = _.map(data, function (item) {
            return {
              acc_name: item.companyName,
              acc_id: item.id,
              plan_id: item.billing_plan,// TODO:delete property name
              billing_plan: item.billing_plan,
              vendor_profile: item.vendor_profile
            };
          });
          $scope.aggAccounts = data;
          $scope.accounts = data;
        });

        $scope._loading = false;
        return;
      } else {
        $scope.aggReportForReseller = false;
        $scope.accounts = $scope.fullAccounts;
        $scope._loading = false;
        return;
      }
  };

    $scope.exportCSV = function (month_year) {
      month_year = month_year || $scope.month_year;
      var from = new moment(month_year.toISOString()).utc().startOf('month').startOf('day').format('YYYY-MM-DD'); //  very beginning of the month
      var to = new moment(month_year.toISOString()).utc().endOf('month').endOf('day').format('YYYY-MM-DD'); //  very end of month (last day of report)

      $scope._loading = true;
      var filter = {
        account_id: $scope.selected.val.acc_id,
        agg: $scope.aggReportForReseller,
        from: from,
        to: to
      };
      Stats.usage_report_export_csv(filter.account_id === '' ? null : filter)
        .$promise.then(function (res) {
          var data, filename, link;
          var csv = res.csvContent.join('');
          if (csv === null || csv.length === 0) {
            $scope.alertService.danger('CSV Report is empty');
            $scope._loading = false;
          }
          //usage_report_[ACCOUNT_ID]_[ACCOUNT_NAME]_[DATE_START]_[DATE_END]--csv report name format
          filename = 'usage_report_';
          filename += (filter.account_id === '' ? 'all_accounts' : filter.account_id) + '_';
          filename += filter.account_id === '' ? '' : $scope.selected.val.acc_name.replace(/ /g, '_') + '_';
          filename += moment(from).format('YYYY-MM-DD') + '_' + moment(to).format('YYYY-MM-DD');
          filename += '.csv';

          if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
          }
          data = encodeURI(csv);
          link = document.createElement('a');
          link.setAttribute('href', data);
          link.setAttribute('download', filename);
          document.body.appendChild(link);
          link.click();
          link.remove();
          $scope._loading = false;
      })
      .catch(function (err) {
        $scope.alertService.danger(err);
        $scope._loading = false;
      });
    };
  }
})();
