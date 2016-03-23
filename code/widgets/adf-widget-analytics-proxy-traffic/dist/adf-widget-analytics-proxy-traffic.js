(function(window, undefined) {'use strict';


angular.module('adf.widget.analytics-proxy-traffic', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider) {
    var _widget = {
      title: 'Proxy Traffic',
      titleTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-title-with-params.html',
      description: 'Web Alalytics Proxy Traffic',
      templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/view.html',
      // editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      editTemplateUrl: 'parts/dashboard/widgets/widget-edit.html',
      styleClass: 'rev-widget',
      controller: ['$scope', '$window', function($scope, $window, $timeout) {
        $window.dispatchEvent(new Event('resize'));
      }],
      edit: {
        // templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/edit.html',
        templateUrl: 'parts/dashboard/widgets/edit-proxy-traffic.html',
        controller: ['$scope', '$q', 'Stats', 'Countries', 'User', 'AlertService', 'filterGeneratorConst',
          function($scope, $q, Stats, Countries, User, AlertService, filterGeneratorConst) {
            var curConfig = angular.copy($scope.config);
            var _defaultConfig = {
              filters: {
                country: '-',
                os: '-',
                device: '-',
                count_last_day: '1'
              }
            };
            _.defaultsDeep($scope.config, _defaultConfig);
            $scope.filtersList = [
              filterGeneratorConst.COUNTRIES,
              filterGeneratorConst.OS,
              filterGeneratorConst.DEVICES
            ];

            $scope.onDomainSelected = function() {
              if (!$scope.domain || !$scope.domain.id) {
                return;
              }
              $scope.reload();

            };
            /**
             * @name  reload
             * @description Reload data
             * @return
             */
            $scope.reload = function() {
              angular.extend($scope.config, {
                domain: angular.copy($scope.domain)
              });
              $scope.reloadCountry($scope.domain.id);
              $scope.reloadOS($scope.domain.id);
              $scope.reloadDevice($scope.domain.id);
              $scope.reloadStatusCode($scope.domain.id);
            }

            $scope.flCountry = {};
            /**
             * @name  reloadCountry
             * @description Reload data flCountry
             * @param  {String|Number} domainId
             * @return {[type]}          [description]
             */
            $scope.reloadCountry = function(domainId) {
              $scope.flCountry = Countries.query();
            };

            /**
             * @name  flOs
             * @description list OS for select in configuration
             * @type {Object}
             */
            $scope.flOs = {
              labels: [],
              data: []
            };

            /**
             * @name  reloadOS
             * @description Reload list of OS
             * @param {string|number} domainId
             * @return
             */
            $scope.reloadOS = function(domainId) {
              Stats.os({
                domainId: domainId
              }).$promise.then(function(data) {
                // $scope.flOs = data.data;
                // TODO: fix
                $scope.flOs.labels.length = 0;
                $scope.flOs.data.length = 0;
                if (data.data && data.data.length > 0) {
                  angular.forEach(data.data, function(item) {
                    $scope.flOs.labels.push(item.key);
                    $scope.flOs.data.push(item.count);
                  });
                }
              });
            };

            /**
             * @name flDdevice
             * @description List devices for selected domain
             * @type {Object}
             */
            $scope.flDevice = {
              labels: [],
              data: []
            };

            /**
             * @name reloadDevice
             * @description Reload list of devices for domain
             * @param   {string|number}  domainId
             */
            $scope.reloadDevice = function(domainId) {

              Stats.device({
                domainId: domainId
              }).$promise.then(function(data) {
                // $scope.flDevice = data.data;
                //$scope.flDevice.push("")
                $scope.flDevice.labels.length = 0;
                $scope.flDevice.data.length = 0;
                if (data.data && data.data.length > 0) {
                  angular.forEach(data.data, function(item) {
                    $scope.flDevice.labels.push(item.key);
                    $scope.flDevice.data.push(item.count);
                  });
                }
              });
            };

            $scope.statusCode = {
              labels: [],
              data: []
            };
            /**
             * List of devices
             *
             * @param {string|number} domainId
             */
            $scope.reloadStatusCode = function(domainId) {
              return Stats.statusCode({
                domainId: domainId
              }).$promise.then(function(data) {
                $scope.statusCode.labels.length = 0;
                $scope.statusCode.data.length = 0;
                if (data.data && data.data.length > 0) {
                  angular.forEach(data.data, function(item) {
                    $scope.statusCode.labels.push(item.key);
                    $scope.statusCode.data.push(item.count);
                  });
                  $scope.config.statusCode = $scope.statusCode.labels;
                }
              });
            };

            //==================
            // Load user domains
            User.getUserDomains(true);

            //datepicker ranges
            var ranges = {};
            var FILTER_EVENT_TIMEOUT = 2000,
              DATE_PICKER_SELECTOR = '.date-picker',
              LAST_DAY = 'Last 1 Day',
              LAST_WEEK = 'Last 7 Days ',
              LAST_MONTH = 'Last 30 Days';

            //Default valuew is Last 1 Day!
            ranges[LAST_DAY] = [moment().subtract(1, 'days'), moment()];
            ranges[LAST_WEEK] = [moment().subtract(7, 'days'), moment()];
            ranges[LAST_MONTH] = [moment().subtract(30, 'days'), moment()];

            //date picker params
            $scope.datePicker = {
              overlay: {
                show: true,
                val: LAST_DAY
              },
              options: {
                timePicker: true,
                timePickerIncrement: 30,
                ranges: ranges
              },
              date: {
                startDate: ranges[LAST_DAY][0],
                endDate: ranges[LAST_DAY][1]
              }
            };
          }
        ],
      }
    };

    dashboardProvider
      .widget('analytics-proxy-traffic-bandwidth-usage', angular.extend(_widget, {
        title: 'Bandwidth Usage',
        titleTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-title-with-params.html',
        // editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
        editTemplateUrl: 'parts/dashboard/widgets/widget-edit.html',
        description: 'Display the Bandwidth Usage', // NOTE: use directive 'requests-chart
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-requests-chart.tpl.html',

      }))
      // .widget('analytics-proxy-traffic-chart', angular.extend(_widget, {
      //   title: 'Total Requests',
      //   description: 'Display the Total Requests', // NOTE: use directive 'proxy-traffic-chart'
      //   templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-proxy-traffic-chart.tpl.html',
      //   editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      // }))
      .widget('analytics-proxy-traffic-http-https-chart', angular.extend(_widget, {
        title: 'HTTP/HTTPS Hits',
        description: 'Display the HTTP/HTTPS Hits', // NOTE: use directive 'http-https-chart'
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-http-https-chart.tpl.html',
        editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      }))
      // .widget('analytics-proxy-http-status-code-chart', angular.extend(_widget, {
      //   title: 'HTTP Status Code Hits',
      //   description: 'Display the HTTP Status Code Hits', // NOTE: use directive 'http-status-code-chart'
      //   templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-http-status-code-chart.tpl.html',
      //   editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      // }))
      // .widget('analytics-proxy-request-status-chart', angular.extend(_widget, {
      //   title: 'Success/Failure Request Status',
      //   description: 'Display the Success/Failure Request Status', // NOTE: use directive 'request-status-chart'
      //   templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-request-status-chart.tpl.html',
      //   editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      // }))
      // .widget('analytics-proxy-hits-cache-chart', angular.extend(_widget, {
      //   title: 'Edge Cache Efficiency Hits',
      //   description: 'Display the Edge Cache Efficiency Hits', // NOTE: use directive 'hits-cache-chart'
      //   templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-hits-cache-chart.tpl.html',
      //   editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      // }));

    .widget('adf-widget-gbt-heatmaps', {
        title: 'GBT Heatmap',
        titleTemplateUrl: 'parts/dashboard/widgets/heatmaps/widget-title-with-params-heatmap.html',
        description: 'Global Traffic Heatmaps - GBT Heatmap',
        templateUrl: 'parts/dashboard/widgets/heatmaps/view-gbt-heatmaps.tpl.html',
        controller: reportGBTHeatmapController,
        edit: {
          // templateUrl: '{widgetsPath}/adf-widget-top-reports/src/edit-heatmap.html',
          templateUrl: 'parts/dashboard/widgets/heatmaps/edit-heatmap.html',
          controller: editHeatMapReportsConfigController
        }
      })
      //==========Top Objects============================

    .widget('adf-widget-http-https-requests-ratio', {
      title: 'Top 10 Countries',
      titleTemplateUrl: 'parts/dashboard/widgets/top-reports/widget-title-with-params-top-reports.html',
      description: 'Top Proxy Traffic Reports - Top 10 Countries',
      templateUrl: 'parts/dashboard/widgets/top-reports/view-top-10-countries.tpl.html',
      controller: reportTop10Countries,
      edit: {
        // templateUrl: '{widgetsPath}/adf-widget-top-reports/src/edit.html',
        templateUrl: 'parts/dashboard/widgets/top-reports/edit-top-reports.html',
        controller: editTopReportConfig
      }
    });


    //==================
    /**
     * @name  editHeatMapReportsConfigController
     * @description
     * @param  {[type]} $scope   [description]
     * @param  {[type]} $window  [description]
     * @param  {[type]} $timeout [description]
     * @param  {[type]} Stats    [description]
     * @return {[type]}          [description]
     */
    function editHeatMapReportsConfigController($scope, $window, $timeout, Stats) {
      'ngInject';

      $scope.onDomainSelected = function() {
        if (!$scope.domain || !$scope.domain.id) {
          return;
        }
        $scope.reload();
      };

      /**
       * @name  reload
       * @description Reload data
       * @return
       */
      $scope.reload = function() {
        angular.extend($scope.config, {
          domain: angular.copy($scope.domain)
        });
        //$scope.reloadCountry($scope.domain.id);

      }
    }
    editHeatMapReportsConfigController.$inject = ["$scope", "$window", "$timeout", "Stats"];;

    /**
     * @name  reportGBTHeatmapController
     * @description
     * @param  {[type]} $scope         [description]
     * @param  {[type]} $window        [description]
     * @param  {[type]} $timeout       [description]
     * @param  {[type]} Stats          [description]
     * @param  {[type]} HeatmapsDrawer [description]
     * @return {[type]}                [description]
     */
    function reportGBTHeatmapController($scope, $window, $timeout, Stats, Countries, HeatmapsDrawer) {
      'ngInject';
      var _defaultConfig = {
        filters: {
          count_last_hours: '6'
        }
      };
      _.defaultsDeep($scope.config, _defaultConfig);

      $scope.elId = (new Date()).getTime();

      $scope.countries = Countries.query();

      $scope.reload = function() {
        if (!$scope.config.domain) {
          return;
        }

        var filters = {
          domainId: $scope.config.domain.id,
          count_last_hours: $scope.config.filters.count_last_hours || '6',
          from_timestamp: moment().subtract($scope.config.filters.count_last_hours, 'hours').valueOf(),
          to_timestamp: Date.now()
        };

        $scope.reloadGBTCountry(filters)
          .then(function() {
            // Redraw maps using received data
            HeatmapsDrawer.drawMap('#canvas-svg-gbt' + $scope.elId, '#tooltip-container-gbt' + $scope.elId, $scope.countryGBTData);
          }).finally(function() {
            $scope._loading = false;
          });
      }

      /**
       * Loads list of country trensferred data.
       *
       * @param {String|Number} domainId
       */
      $scope.reloadGBTCountry = function(filters) {
        // Remove prev map
        HeatmapsDrawer.clearMap('#canvas-svg-gbt' + $scope.elId);
        // Set loading
        $scope._loading = true;
        // Clear old data
        $scope.countryGBTData = {};

        // Loading new data
        return Stats.gbt_country({
            domainId: filters.domainId,
            count: 250,
            from_timestamp: moment().subtract(filters.count_last_hours || '6', 'hours').valueOf(),
            to_timestamp: Date.now()
          })
          .$promise
          .then(function(data) {
            if (data.data && data.data.length > 0) {
              angular.forEach(data.data, function(item) {
                var name = $scope.countries[item.key.toUpperCase()] || item.key;
                $scope.countryGBTData[name] = {
                  value: item.sent_bytes,
                  tooltip: ('Sent: <strong>' + HeatmapsDrawer.valueFormat(item.sent_bytes, 'G' /*force G*/ ) +
                    'B</strong> Received: <strong>' + HeatmapsDrawer.valueFormat(item.received_bytes, 'G') + 'B</strong>')
                };
              });
            }
            // Pass to next `.then()`
            return data;
          });
      };
      $scope.reload();
    }
    reportGBTHeatmapController.$inject = ["$scope", "$window", "$timeout", "Stats", "Countries", "HeatmapsDrawer"];;

    /**
     * @name  editTopReportConfig
     * @description
     * @param  {[type]} $scope   [description]
     * @param  {[type]} $window  [description]
     * @param  {[type]} $timeout [description]
     * @param  {[type]} Stats    [description]
     * @return {[type]}          [description]
     */
    function editTopReportConfig($scope, $window, $timeout, Countries, Stats) {
      'ngInject';
      var _defaultConfig = {
        filters: {
          count_last_hours: '1',
          country: '-'
        }
      };
      _.defaultsDeep($scope.config, _defaultConfig);
      $scope.refCountries = Countries.query();
      $scope.onDomainSelected = function() {
        if (!$scope.domain || !$scope.domain.id) {
          return;
        }
        $scope.reload();
      };

      /**
       * @name  reload
       * @description Reload data
       * @return
       */
      $scope.reload = function() {
        angular.extend($scope.config, {
          domain: angular.copy($scope.domain)
        });
      }
    }
    editTopReportConfig.$inject = ["$scope", "$window", "$timeout", "Countries", "Stats"];;

    // TODO: directive
    function reportTop10Countries($scope, Countries, Stats) {
      'ngInject';
      var _filters_field_list = ['domainId', 'from_timestamp', 'to_timestamp', 'country'];
      $scope.countries = Countries.query();

      function generateFilterParams(filters) {
        var params = {
          from_timestamp: moment().subtract(1, 'hours').valueOf(),
          to_timestamp: Date.now()
        };
        _.forEach(filters, function(val, key) {
          if (_.indexOf(_filters_field_list, key) !== -1) {
            if (val !== '-' && val !== '') {
              params[key] = val;
            }
          } else {
            if (key === 'count_last_hours') {
              params.from_timestamp = moment().subtract(val, 'hours').valueOf();
              params.to_timestamp = Date.now();
              delete params.count_last_hours;
            }
          }
        });
        return params;
      }

      $scope.reload = function() {
        if (!$scope.config.domain) {
          return;
        }

        var filters = {
          domainId: $scope.config.domain.id,
          country: $scope.config.filters.country,
          count_last_hours: $scope.config.filters.count_last_hours || '6'
        };

        $scope.reloadTopReportCountry(filters);

      }
      $scope.country = [];
      /**
       * List of country
       *
       * @param {object} common parameters(domainId, from, to)
       */
      $scope.reloadTopReportCountry = function(filters) {
        Stats.country(generateFilterParams(filters))
          .$promise
          .then(function(data) {
            $scope.country.lenght = 0;
            if (data.data && data.data.length > 0) {
              // console.log($scope.countries)
              angular.forEach(data.data, function(val) {
                var name = $scope.countries[val.key.toUpperCase()] || val.key;
                $scope.country.push({
                  name: name,
                  y: val.count
                });
              });
            }
          });
      };
      $scope.reload();
    }
    reportTop10Countries.$inject = ["$scope", "Countries", "Stats"];
  }]);

angular.module("adf.widget.analytics-proxy-traffic").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/edit.html","<form role=form><div class=form-group><label for=domain>Domain</label><div domain-select id=domain ng-model=domain on-select=onDomainSelected() select-one=true></div></div><div class=form-group><label for=domain>Filters</label>{{config.filters}}</div><div class=form-inline><div class=form-group><select id=country class=\"form-control fixed\" ngoptions=\"key as item for (key, item) in flCountry\" ng-model=config.filters.country ng-disabled=!domain><option value=->All Countries</option><option ng-repeat=\"(key, item) in flCountry\" value={{key}}>{{item}}</option></select></div><div class=form-group><select id=os class=\"form-control fixed\" ngoptions=\"item for item in flOs.labels\" ng-model=config.filters.os ng-disabled=!domain><option value=->All OS</option><option ng-repeat=\"item in flOs.labels\" value={{item}}>{{item}}</option></select></div><div class=form-group><select id=device class=\"form-control fixed\" ngoptions=\"item for item in flDevice.labels\" ng-model=config.filters.device ng-disabled=!domain><option value=->All Devices</option><option ng-repeat=\"item in flDevice.labels\" value={{item}}>{{item}}</option></select></div></div><div class=form-group><label for=domain>Time Period</label></div><div class=form-group></div></form>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html","<form name=widgetEditForm novalidate role=form ng-submit=saveDialog()><div class=modal-header><button type=button class=close ng-click=closeDialog() aria-hidden=true>&times;</button><h4 class=modal-title>{{widget.title}}</h4></div><div class=modal-body><div class=\"alert alert-danger\" role=alert ng-show=validationError><strong>Apply error:</strong> {{validationError}}</div><div ng-if=widget.edit><adf-widget-content model=definition content=widget.edit></adf-widget-content></div></div><div class=modal-footer><button type=button class=\"btn btn-default\" ng-click=closeDialog()>Cancel</button> <input type=submit class=\"btn btn-primary\" ng-disabled=widgetEditForm.$invalid value=Apply></div></form>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/widget-title-with-params.html","<h3 class=panel-title>{{definition.title}} <span ng-if=!!definition.config.domain>(<strong>{{definition.config.domain.domain_name}}</strong>)</span> <span class=pull-right><a title=\"reload widget content\" ng-if=widget.reload ng-click=reload()><i class=\"glyphicon glyphicon-refresh\"></i></a> <a title=\"Change Widget Location\" class=adf-move ng-if=editMode><i class=\"glyphicon glyphicon-move\"></i></a> <a title=\"Collapse Widget\" ng-show=\"options.collapsible && !widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"glyphicon glyphicon-minus\"></i></a> <a title=\"Expand Widget\" ng-show=\"options.collapsible && widgetState.isCollapsed\" ng-click=\"widgetState.isCollapsed = !widgetState.isCollapsed\"><i class=\"glyphicon glyphicon-plus\"></i></a> <a title=\"Edit Widget Configuration\" ng-click=edit() ng-if=editMode><i class=\"glyphicon glyphicon-cog\"></i></a> <a title=\"Fullscreen Widget\" ng-click=openFullScreen() ng-show=options.maximizable><i class=\"glyphicon glyphicon-fullscreen\"></i></a> <a title=\"Remove Widget\" ng-click=remove() ng-if=editMode><i class=\"glyphicon glyphicon-remove\"></i></a></span></h3><small ng-if=definition.config.filters.count_last_day>Last {{definition.config.filters.count_last_day}} day</small> <span class=widget_filters_info ng-show=!!definition.config.filters[index.key] ng-repeat=\"index in [{key:\'os\',title:\'OS\'},{key:\'country\',title:\'Сountry\'},{key:\'device\',title:\'Device\'}]\"><small ng-if=\"!!definition.config.filters[index.key]&& definition.config.filters[index.key]!==\'-\'\">&nbsp;{{index.title}}: {{definition.config.filters[index.key]}}&nbsp;</small></span> <span></span>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-hits-cache-chart.tpl.html","<div class=col-lg-12><div hits-cache-chart filters-sets=config.filters ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-http-https-chart.tpl.html","<div class=col-lg-12><div http-https-chart filters-sets=config.filters ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-http-status-code-chart.tpl.html","<div class=col-lg-12><div http-status-code-chart filters-sets=config.filters status-codes=config.statusCode ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-proxy-traffic-chart.tpl.html","<div class=col-lg-12><div proxy-traffic-chart filters-sets=config.filters status-codes=config.statusCode.labels ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-request-status-chart.tpl.html","<div class=col-lg-12><div request-status-chart status-codes=config.statusCode fl-os=config.os.labels fl-device=config.device.labels fl-country=config.countries ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-requests-chart.tpl.html","<div class=col-lg-12><div requests-chart filters-sets=config.filters ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/parts/panel-filter-settings.tpl.html","<div ng-show=!!config.filters[index.key] class=col-md-3 ng-repeat=\"index in [{key:\'os\',title:\'OS\'},{key:\'country\',title:\'Сountry\'},{key:\'device\',title:\'Device\'}]\"><small>{{index.title}}: {{config.filters[index.key]}}</small></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/parts/title-with-filter-params.tpl.html","");}]);})(window);