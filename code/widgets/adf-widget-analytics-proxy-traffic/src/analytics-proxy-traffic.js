'use strict';

angular.module('adf.widget.analytics-proxy-traffic', ['adf.provider'])
  .config(function(dashboardProvider) {

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
  })
  .config(function(dashboardProvider) {
    var _widget = {
      title: 'Proxy Traffic',
      titleTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-title-with-params.html',
      description: 'Web Alalytics Proxy Traffic',
      templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/view.html',
      editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      styleClass: 'rev-widget',
      controller: ['$scope', function($scope) {

      }],
      config: {
        // filters: {
        //   country: 'All country',
        //   os: 'All OS',
        //   device: 'All device'
        // }
      },
      edit: {
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/edit.html',
        controller: ['$scope', '$q', 'Stats', 'Countries', 'User', 'AlertService', 'filterGeneratorConst',
          function($scope, $q, Stats, Countries, User, AlertService, filterGeneratorConst) {
            var curConfig = angular.copy($scope.config);

            $scope.filtersList = [
              filterGeneratorConst.COUNTRIES,
              filterGeneratorConst.OS,
              filterGeneratorConst.DEVICES
            ];



            $scope.onDomainSelected = function() {
              console.log($scope.domain);
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
             * @name  reloadOS
             * @description Reload list of OS
             * @param {string|number} domainId
             * @return
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
        titleTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-title-with-params.html',
        editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
        description: 'Display the Bandwidth Usage (requests-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-requests-chart.tpl.html',

      }))
      .widget('analytics-proxy-traffic-chart', angular.extend(_widget, {
        title: 'Total Requests',
        description: 'Display the Total Requests (proxy-traffic-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-proxy-traffic-chart.tpl.html',
        editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      }))
      .widget('analytics-proxy-traffic-http-https-chart', angular.extend(_widget, {
        title: 'HTTP/HTTPS Hits',
        description: 'Display the HTTP/HTTPS Hits (http-https-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-http-https-chart.tpl.html',
        editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      }))
      .widget('analytics-proxy-http-status-code-chart', angular.extend(_widget, {
        title: 'HTTP Status Code Hits',
        description: 'Display the HTTP Status Code Hits (http-status-code-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-http-status-code-chart.tpl.html',
        editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      }))
      .widget('analytics-proxy-request-status-chart', angular.extend(_widget, {
        title: 'Success/Failure Request Status',
        description: 'Display the Success/Failure Request Status(request-status-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-request-status-chart.tpl.html',
        editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      }))
      .widget('analytics-proxy-hits-cache-chart', angular.extend(_widget, {
        title: 'Edge Cache Efficiency Hits',
        description: 'Display the Edge Cache Efficiency Hits(hits-cache-chart)',
        templateUrl: '{widgetsPath}/analytics-proxy-traffic/src/views/view-hits-cache-chart.tpl.html',
        editTemplateUrl: '{widgetsPath}/analytics-proxy-traffic/src/widget-edit.html',
      }));

  });
