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
        controller: ['$scope', 'Stats', 'Countries', 'User', 'AlertService', function($scope, Stats, Countries, User, AlertService) {
          $scope.countries = Countries.query();
          // Load user domains
          User.getUserDomains(true)
        }],
      }
    }
    dashboardProvider
      .widget('analytics-proxy-traffic-bandwidth-usage', angular.extend(_widget, {
        title: 'Bandwidth Usage',
        description: 'Display the Bandwidth Usage (requests-chart)',
        template: '<div class="col-lg-12">' +
          '<div ' +
          ' requests-chart' +
          ' status-codes="config.statusCode.labels"' +
          ' fl-os="config.os.labels"' +
          ' fl-device="config.device.labels"' +
          ' fl-country="config.countries"' +
          ' ng-domain="config.domain">Bandwidth Usage</div>' +
          '</div>',
      }))
      .widget('analytics-proxy-traffic', angular.extend(_widget, {
        title: 'Total Requests',
        description: 'Display the Total Requests (proxy-traffic-chart)',
        template: '<div class="col-lg-12">' +
          '<div ' +
          ' proxy-traffic-chart' +
          ' status-codes="config.statusCode.labels"' +
          ' fl-os="config.os.labels"' +
          ' fl-device="config.device.labels"' +
          ' fl-country="config.countries"' +
          ' ng-domain="config.domain">Proxy Traffic</div>' +
          '</div>',
      }))
      .widget('analytics-proxy-traffic-http-https-chart', angular.extend(_widget, {
        title: 'HTTP/HTTPS Hits',
        description: 'Display the HTTP/HTTPS Hits (http-https-chart)',
        template: '<div class="col-lg-12">' +
          '<div ' +
          ' http-https-chart' +
          ' fl-os="config.config.os.labels"' +
          ' fl-device="config.device.labels"' +
          ' fl-country="config.countries"' +
          ' ng-domain="config.domain">HTTP/HTTPS Hits</div>' +
          '</div>',
      }))

    ;
  }]);

angular.module("adf.widget.analytics-proxy-traffic").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div><div class=form-group><label for=domain>domain</label><div domain-select id=domain ng-model=config.domain on-select=onDomainSelected() select-one=true></div></div></form>");
$templateCache.put("{widgetsPath}/analytics-proxy-traffic/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");}]);})(window);