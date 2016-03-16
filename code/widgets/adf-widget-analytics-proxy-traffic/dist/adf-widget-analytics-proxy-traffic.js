(function(window, undefined) {'use strict';


angular.module('adf.widget.analytics-proxy-traffic', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider) {

    dashboardProvider
      .structure('6-6', {
        rows: [{
          columns: [{
            styleClass: 'col-md-6'
          }, {
            styleClass: 'col-md-6'
          }]
        }]
      })
  }])
  .config(["dashboardProvider", function(dashboardProvider) {
    var _widget = {
      title: 'Proxy Traffic',
      description: 'Web Alalytics Proxy Traffic',
      templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/view.html',
      controller: ['$scope', function($scope) {

      }],
      edit: {
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/edit.html',
        controller: ['$scope', '$q', 'Stats', 'Countries', 'User', 'AlertService', 'filterGeneratorConst',
          function($scope, $q, Stats, Countries, User, AlertService, filterGeneratorConst) {
            var curConfig = angular.copy($scope.config);
            $scope.panel_filter_info = '{widgetsPath}/analytics-proxy-traffic/src/views/parts/panel-filter-settings.tpl.html';
            $scope.onDomainSelected = function() {
              console.log($scope.domain);
              if (!$scope.domain || !$scope.domain.id) {
                return;
              }
              $scope.reload();

            };

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
             * List of country
             *
             * @param {string|number} domainId
             */
            $scope.reloadCountry = function(domainId) {
              $scope.flCountry = Countries.query();
              // Stats.country({
              //   domainId: domainId
              // }).$promise.then(function(data) {
              //   if (data.data && data.data.length > 0) {
              //     angular.forEach(data.data, function(os) {
              //       $scope.country.labels.push(os.key);
              //       $scope.country.data.push(os.count);
              //     });
              //   }
              // });
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
             * Reload list of OS
             *
             * @param {string|number} domainId
             */
            $scope.reloadOS = function(domainId) {
              Stats.os({
                domainId: domainId
              }).$promise.then(function(data) {
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

          }
        ],
      }
    };

    dashboardProvider
      .widget('analytics-proxy-traffic-bandwidth-usage', angular.extend(_widget, {
        title: 'Bandwidth Usage',
        description: 'Display the Bandwidth Usage (requests-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-requests-chart.tpl.html',
      }))
      .widget('analytics-proxy-traffic-chart', angular.extend(_widget, {
        title: 'Total Requests',
        description: 'Display the Total Requests (proxy-traffic-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-proxy-traffic-chart.tpl.html',
      }))
      .widget('analytics-proxy-traffic-http-https-chart', angular.extend(_widget, {
        title: 'HTTP/HTTPS Hits',
        description: 'Display the HTTP/HTTPS Hits (http-https-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-http-https-chart.tpl.html',
      }))
      .widget('analytics-proxy-http-status-code-chart', angular.extend(_widget, {
        title: 'HTTP Status Code Hits',
        description: 'Display the HTTP Status Code Hits (http-status-code-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-http-status-code-chart.tpl.html',
      }))
      .widget('analytics-proxy-request-status-chart', angular.extend(_widget, {
        title: 'Success/Failure Request Status',
        description: 'Display the Success/Failure Request Status(request-status-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-request-status-chart.tpl.html',
      }))
      .widget('analytics-proxy-hits-cache-chart', angular.extend(_widget, {
        title: 'Edge Cache Efficiency Hits',
        description: 'Display the Edge Cache Efficiency Hits(hits-cache-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-hits-cache-chart.tpl.html',
      }));

  }]);

angular.module("adf.widget.analytics-proxy-traffic").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/edit.html","<form role=form><div class=form-group><label for=domain>domain</label><div domain-select id=domain ng-model=domain on-select=onDomainSelected() select-one=true></div></div><div class=form-group><label for=domain>Delay</label><select class=\"form-control fixed\" ng-model=config.delay><option value=1>Last 1 Day</option><option value=7>Last 7 Day</option><option value=30>Last 30 Day</option></select></div><div class=form-group><label for=country>Country</label><select id=country class=\"form-control fixed\" ng-options=\"key as item for (key, item) in flCountry\" ng-model=config.filters.country><option>All Countries</option></select></div><div class=form-group><label for=os>OS</label><select id=os class=\"form-control fixed\" ng-options=\"item for item in flOs.labels\" ng-model=config.filters.os><option>All OS</option></select></div><div class=form-group><label for=device>Device</label><select id=device class=\"form-control fixed\" ng-options=\"item for item in flDevice.labels\" ng-model=config.filters.device><option>All Devices</option></select></div></form>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-hits-cache-chart.tpl.html","<div class=col-lg-12><h4>{{config.domain.domain_name}}</h4><div class=row ng-include=\"\'{widgetsPath}/analytics-proxy-traffic/src/views/parts/panel-filter-settings.tpl.html\'\"></div><div hits-cache-chart filters-sets=config.filters ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-http-https-chart.tpl.html","<div class=col-lg-12><h4>{{config.domain.domain_name}}</h4><div class=row ng-include=\"\'{widgetsPath}/analytics-proxy-traffic/src/views/parts/panel-filter-settings.tpl.html\'\"></div><div http-https-chart filters-sets=config.filters ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-http-status-code-chart.tpl.html","<div class=col-lg-12><h4>{{config.domain.domain_name}}</h4><div class=row ng-include=\"\'{widgetsPath}/analytics-proxy-traffic/src/views/parts/panel-filter-settings.tpl.html\'\"></div><div http-status-code-chart filters-sets=config.filters status-codes=config.statusCode ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-proxy-traffic-chart.tpl.html","<div class=col-lg-12><h4>{{config.domain.domain_name}}</h4><div class=row ng-include=\"\'{widgetsPath}/analytics-proxy-traffic/src/views/parts/panel-filter-settings.tpl.html\'\"></div><div proxy-traffic-chart status-codes=statusCode.labels fl-os=config.os.labels fl-device=config.device.labels fl-country=config.countries ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-request-status-chart.tpl.html","<div class=col-lg-12><h4>{{config.domain.domain_name}}</h4><div class=row ng-include=\"\'{widgetsPath}/analytics-proxy-traffic/src/views/parts/panel-filter-settings.tpl.html\'\"></div><div request-status-chart status-codes=config.statusCode fl-os=config.os.labels fl-device=config.device.labels fl-country=config.countries ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-requests-chart.tpl.html","<div class=\"col-lg-12 view-requests-chart\"><h4>{{config.domain.domain_name}}</h4><div class=row ng-include=\"\'{widgetsPath}/analytics-proxy-traffic/src/views/parts/panel-filter-settings.tpl.html\'\"></div><div requests-chart filters-sets=config.filters ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/parts/panel-filter-settings.tpl.html","<div ng-show=!!config.filters[index.key] class=col-md-3 ng-repeat=\"index in [{key:\'os\',title:\'OS\'},{key:\'country\',title:\'Сountry\'},{key:\'device\',title:\'Device\'}]\"><span ng-if=!!config.filters[index.key]>{{index.title}}: {{config.filters[index.key]}}</span></div>");}]);})(window);