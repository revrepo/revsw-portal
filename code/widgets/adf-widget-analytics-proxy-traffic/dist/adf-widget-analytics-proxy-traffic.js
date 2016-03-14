(function(window, undefined) {'use strict';


angular.module('adf.widget.analytics-proxy-traffic', ['adf.provider'])
  .config(["dashboardProvider", function(dashboardProvider) {
    var _widget = {
      title: 'Proxy Traffic',
      description: 'Web Alalytics Proxy Traffic',
      templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/view.html',
      controller: 'ReportsProxyTrafficController',
      edit: {
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/edit.html',
        controller: ['$scope', '$q', 'Stats', 'Countries', 'User', 'AlertService', function($scope, $q, Stats, Countries, User, AlertService) {
          $scope.flCountries = Countries.query();
          $scope.flDevice = [];
          $scope.flOs = [];

          $scope.filters = {
            os: null,
            device: null,
            country: null,
          };
          // Load user domains
          User.getUserDomains(true);
          /**
           * @name updateFlLists
           * @description Update data
           * @return {Promise}
           */
          var updateFlLists = function() {
            var promises = [
              Stats.os({
                domainId: $scope.config.domain.id
              }).$promise,
              Stats.device({
                domainId: $scope.config.domain.id
              }).$promise
            ];
            return $q.all(promises)
              .then(
                function(res) {
                  $scope.flDevice = res[0];
                  $scope.flOs = [1];
                })
          }

          $scope.$watch('config.domain', function(newVal, oldVAl) {
            // TODO: get data for lists or use filter-generator
            // if (!!newVal) updateFlLists()
          }, true)
        }],
      }
    };

    dashboardProvider
      .widget('analytics-proxy-traffic-bandwidth-usage', angular.extend(_widget, {
        title: 'Bandwidth Usage',
        description: 'Display the Bandwidth Usage (requests-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-requests-chart.tpl.html',
      }))
      .widget('analytics-proxy-traffic', angular.extend(_widget, {
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

angular.module("adf.widget.analytics-proxy-traffic").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/edit.html","<form role=form><div class=form-group><label for=domain>domain</label><div domain-select id=domain ng-model=config.domain on-select=onDomainSelected() select-one=true></div></div><div class=form-group><label for=country>Country</label><select id=country class=\"form-control fixed\" ng-options=\"key as item for (key, item) in flCountries\" ng-model=config.filters.country><option>All Countries</option></select></div><div class=form-group><label for=os>OS</label><select id=os class=\"form-control fixed\" ng-options=\"item for item in flOs\" ng-model=config.filters.os><option>All OS</option></select></div><div class=form-group><label for=device>Device</label><select id=device class=\"form-control fixed\" ng-options=\"item for item in flDevice\" ng-model=config.filters.device><option>All Devices</option></select></div></form>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/title.tpl.html","<h1>Hello</h1>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-hits-cache-chart.tpl.html","<div class=col-lg-12><h4>{{config.domain.domain_name}}</h4><div hits-cache-chart ng-filters=config.filters fl-os=config.os.labels fl-device=config.device.labels fl-country=config.countries ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-http-https-chart.tpl.html","<div class=col-lg-12><h4>{{config.domain.domain_name}}</h4><div http-https-chart fl-os=config.os.labels fl-device=config.device.labels fl-country=config.countries ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-http-status-code-chart.tpl.html","<div class=col-lg-12><h4>{{config.domain.domain_name}}</h4><div http-status-code-chart status-codes=config.statusCode.labels fl-os=config.os.labels fl-device=config.device.labels fl-country=config.countries ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-proxy-traffic-chart.tpl.html","<div class=col-lg-12><h4>{{config.domain.domain_name}}</h4><div proxy-traffic-chart status-codes=statusCode.labels fl-os=config.os.labels fl-device=config.device.labels fl-country=config.countries ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-request-status-chart.tpl.html","<div class=col-lg-12><h4>{{config.domain.domain_name}}</h4><div request-status-chart status-codes=config.statusCode.labels fl-os=config.os.labels fl-device=config.device.labels fl-country=config.countries ng-domain=config.domain></div></div>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/views/view-requests-chart.tpl.html","<div class=\"col-lg-12 view-requests-chart\"><h4>{{config.domain.domain_name}}</h4><div class=row><div class=\"col-md-12 view-requests-chart_filter_settings\"></div></div><div requests-chart filters=config.filters fl-os=config.os.labels fl-device=config.device.labels fl-country=config.countries ng-domain=config.domain></div></div>");}]);})(window);