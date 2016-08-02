(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('dnsZoneCheckIntegration', dnsZoneCheckIntegration)
    .constant('checkStatusCode', {
      OK: 'OK',
      ERROR: 'ERROR',
      WARNING: 'WARNING',
      SUCCESS: 'SUCCESS'
    })
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/dns_zones/dns-zone-check-integration/dns-zone-check-integration.tpl.html', true);
    });
  /**
   * @name  dnsZoneCheckIntegration
   * @description
   * @return {Object}
   */
  function dnsZoneCheckIntegration() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        zoneId: '=',
        zoneConfig: '='
      },
      templateUrl: 'parts/dns_zones/dns-zone-check-integration/dns-zone-check-integration.tpl.html',
      controllerAs: '$ctrl',
      controller: function dnsZoneCheckIntegrationController($scope, checkStatusCode) {
        'ngInject';
        var $ctrl = this;
        this.checkStatusCode = checkStatusCode;
        this.accordionState_ = {
          isDNSServersHeaderOpen: true,
          isDNSRecordHeaderOpen: true,
        };

        this.getStatusClass = function(checkStatusCode) {
          var class_ = '';
          switch (checkStatusCode) {
            case $ctrl.checkStatusCode.OK:
              class_ = 'text text-success';
              break;
            case $ctrl.checkStatusCode.ERROR:
              class_ = 'text text-danger';
              break;
            case $ctrl.checkStatusCode.WARNING:
              class_ = 'text text-warning';
              break;
          }
          return class_;
        };

        this.getClassStatusIcon = function(checkStatusCode) {
          var class_ = '';
          switch (checkStatusCode) {
            case $ctrl.checkStatusCode.OK:
              class_ = 'text-success fa fa-check-circle';
              break;
            case $ctrl.checkStatusCode.ERROR:
              class_ = 'text-danger fa fa-times-circle';
              break;
            case $ctrl.checkStatusCode.WARNING:
              class_ = 'text-warning fa fa-exclamation-triangle';
              break;
            default:
              class_ = 'text-info glyphicon glyphicon-refresh spin';
              break;
          }
          return class_;
        };

        $scope.$watch(function() {
          return $ctrl.resultChecks;
        }, function(newVal) {
          if (!!newVal) {
            $ctrl.updateSummary(newVal);
          }
        }, true);


        this.updateSummary = function(newVal) {
          $ctrl.summary = {
            total: 0,
            failed: 0,
            passed: 0,
            warnings: 0
          };
          _.keys(newVal).forEach(function(item) {
            if (!!$ctrl.resultChecks[item]) {
              $ctrl.summary.total++;
              switch ($ctrl.resultChecks[item].check_status_code) {
                case $ctrl.checkStatusCode.OK:
                  $ctrl.summary.passed++;
                  break;
                case $ctrl.checkStatusCode.ERROR:
                  $ctrl.summary.failed++;
                  break;
                case $ctrl.checkStatusCode.WARNING:
                  $ctrl.summary.warnings++;
                  break;
              }
            }

          });
        };

      }
    };
  }
})();
