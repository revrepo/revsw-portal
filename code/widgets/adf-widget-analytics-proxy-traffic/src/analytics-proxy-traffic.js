'use strict';

angular.module('adf.widget.analytics-proxy-traffic', ['adf.provider'])
  .config(function(dashboardProvider) {
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

  });
