(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .directive('requestsChart', requestsChartDirective);

  function requestsChartDirective() {
    'ngInject';
    var directive = {
      restrict: 'AE',
      templateUrl: 'parts/reports/charts/traffic-common.html',
      scope: {
        ngDomain: '=',
        flCountry: '=',
        flOs: '=',
        flDevice: '=',
        flBrowser: '=',
        filtersSets: '=',
        isAutoReload: '@?isAutoReload' // NOTE: optional property. if not equ no
      },
      /*@ngInject*/
      controller: RequestsChartCtrl
    };

    return directive;
  }

  /*ngInject*/
  function RequestsChartCtrl($scope, Stats, Util, EventsSerieDataService, $q, $sce, $config) {

    var _filters_field_list = ['from_timestamp', 'to_timestamp', 'country', 'device', 'os', 'browser'];

    function generateFilterParams(filters) {
      var params = {
        from_timestamp: moment().subtract(1, 'days').valueOf(),
        to_timestamp: Date.now()
      };
      _.forEach(filters, function(val, key) {
        if (_.indexOf(_filters_field_list, key) !== -1) {
          if (val !== '-' && val !== '') {
            params[key] = val;
          }
        } else {
          if (key === 'count_last_day') {
            params.from_timestamp = moment().subtract(val, 'days').valueOf();
            params.to_timestamp = Date.now();
            delete params.count_last_day;
          }
        }
      });
      return params;
    }

    $scope._loading = false;
    $scope.heading = 'Bandwidth Usage';
    $scope.popoverPopupCloseDelay = $config.POPOVER_POPUP_CLOSE_DELAY_MS;
    $scope.popoverHelpHTML = 
      $sce.trustAsHtml('The graph shows the amount of data (per second) sent ("Outgoing Bandwidth") and received ("Incoming Bandwidth") to/from website visitors');

    $scope.reload = reload;
    $scope.filters = {
      from_timestamp: moment().subtract(1, 'days').valueOf(),
      to_timestamp: Date.now()
    };

    if ($scope.filtersSets) {
      _.extend($scope.filters, $scope.filtersSets);
    }

    //  ---------------------------------
    var info_ = null,
      traffic_avg_ = 0,
      traffic_max_ = 0,
      traffic_total_ = 0,
      tickInterval_ = 10;

    $scope.chartOptions = {
      chart: {
        zoomType: 'x',
        events: {
          redraw: function() {
            if (info_) {
              info_.destroy();
              info_ = null;
            }

            var _text = 'Traffic Level Avg <span style="font-weight: bold; color: #3c65ac;">' + Util.convertTraffic(traffic_avg_) +
              '</span> Max <span style="font-weight: bold; color: #3c65ac;">' + Util.convertTraffic(traffic_max_) +
              '</span><br>Traffic Total <span style="font-weight: bold; color: #3c65ac;">' + Util.humanFileSizeInGB(traffic_total_, 3) +
              '</span>';
            // NOTE: information about error
            if( $scope.hasFailedToLoadData === true){
              _text = '<strong style="color: red;"> Failed to retrieve the data - please try again later </strong>';
            }
            var x = this.xAxis[0].toPixels(this.xAxis[0].min) + 3;
            info_ = this /*chart*/ .renderer
              .label(_text,
                x /*x*/ , 3 /*y*/ , '' /*img*/ , 0, 0, true /*html*/ )
              .css({
                color: '#444'
              })
              .attr({
                fill: 'rgba(240, 240, 240, 0.6)',
                stroke: $scope.hasFailedToLoadData ? 'red' : '#3c65ac', // NOTE: border color
                'stroke-width': 1,
                padding: 6,
                r: 2,
                zIndex: 5
              })
              .add();
          }
        }
      },
      yAxis: {
        title: {
          text: 'Bandwidth'
        },
        labels: {
          formatter: function() {
            return Util.convertTraffic(this.value);
          }
        },
      },
      xAxis: {
        type: 'datetime',
        pointInterval: 24 * 60 * 60 * 1000,
      },
      tooltip: {
        xDateFormat: '<span style="color: #000; font-weight: bold;">%H:%M</span> %b %d',
        shared: true,
        headerFormat: '{point.key}<br/>',
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y:.3f}</b><br/>',
        pointFormatter: defaultPointFormatter
      }
    };
    // NOTE: specific format for data - use Util.convertTraffic
    function defaultPointFormatter() {
      return '<span style="color:' + this.series.color + '">' + this.series.name + '</span>: ' + Util.convertTraffic(this.y) + '<br/>';
    }

    $scope.$watch('ngDomain', function() {
      if (!$scope.ngDomain || $scope.isAutoReload === 'false') {
        return;
      }
      reload();
    });

    //////////////////
    /**
     * @name reload
     * @desc reload traffic stats
     * @kind function
     */
    function reload() {
      if (!$scope.ngDomain || !$scope.ngDomain.id) {
        $scope.traffic = {
          series: [{
            name: 'Incoming Bandwidth',
            data: []
          }, {
            name: 'Outgoing Bandwidth',
            data: []
          }]
        };
        return;
      }
      $scope._loading = true;
      $scope.hasFailedToLoadData = false;
      var _xAxisPointStart = null;
      var _xAxisPointInterval = null;
      var series = [{
        name: 'Incoming Bandwidth',
        data: []
      }, {
        name: 'Outgoing Bandwidth',
        data: []
      }];
      Stats.traffic(angular.merge({
          domainId: $scope.ngDomain.id
        }, generateFilterParams($scope.filters)))
        .$promise
        .then(function getData(data) {
          traffic_avg_ = traffic_max_ = traffic_total_ = 0;
          if (data.data && data.data.length > 0) {
            _xAxisPointStart = parseInt(data.metadata.start_timestamp);
            _xAxisPointInterval = parseInt(data.metadata.interval_sec) * 1000;

            var interval = parseInt(data.metadata.interval_sec || 1800);

            data.data.forEach(function(item, idx, items) {

              var sent_bw = item.sent_bytes * 8 / interval /*BITS per second*/ ;
              series[1].data.push(sent_bw);
              series[0].data.push(item.received_bytes / interval * 8 /*BITS per second*/ );
              traffic_total_ += item.sent_bytes;
              if (traffic_max_ < sent_bw) {
                traffic_max_ = sent_bw;
              }
              traffic_avg_ += sent_bw;
            });

            traffic_avg_ /= data.data.length;
            if (traffic_avg_ === 0) {
              series[0].data.length = 0;
              series[1].data.length = 0;
            }
            return $q.when(series);
          } else {
            return $q.when(series);
          }
        })
        // NOTE: add event data
        .then(function(series) {
          var filterParams = generateFilterParams($scope.filters);
          var options = {
            from_timestamp: filterParams.from_timestamp,
            to_timestamp: filterParams.to_timestamp,
            domain_id: $scope.ngDomain.id,
          };
          return EventsSerieDataService.extendSeriesEventsDataForDomainId(series, options);
        })
        .then(function setNewData(data) {
          // model better to update once
          $scope.traffic = {
            pointStart: _xAxisPointStart,
            pointInterval: _xAxisPointInterval,
            series: series
          };
        })
        .catch(function(err){
           $scope.traffic = {
            pointStart: _xAxisPointStart,
            pointInterval: _xAxisPointInterval,
            series: series
          };
          $scope.hasFailedToLoadData = true;
        })
        .finally(function() {
          $scope._loading = false;
        });
    }
  }
})();
