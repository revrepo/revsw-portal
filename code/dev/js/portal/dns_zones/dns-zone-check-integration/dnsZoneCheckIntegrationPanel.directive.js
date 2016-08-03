(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('dnsZoneCheckIntegrationPanel', dnsZoneCheckIntegrationPanel)

  .run(function($templateRequest) {
    'ngInject';
    $templateRequest('parts/dns_zones/dns-zone-check-integration/dns-zone-check-integration-panel.tpl.html', true);
  });
  /**
   * @name  dnsZoneCheckIntegrationPanel
   * @description
   * @return {Object}
   */
  function dnsZoneCheckIntegrationPanel() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        handler: '@',
        zoneId: '=',
        zoneConfig: '=',
        checkResults: '=status',
        typeCheck: '@'
      },
      templateUrl: 'parts/dns_zones/dns-zone-check-integration/dns-zone-check-integration-panel.tpl.html',
      controllerAs: '$ctrl',
      controller: function dnsZoneCheckIntegrationPanelController($scope, DNSZones, checkStatusCode) {
        'ngInject';
        var $ctrl = this;
        this._loading = false;
        this.checkStatusCode = checkStatusCode;
        this.onStartCheck = function() {
          var id_ = $ctrl.zoneId;
          var check_type_ = $ctrl.typeCheck || 'dns_servers';
          $ctrl._loading = true;
          $ctrl.checkResults = null;
          DNSZones.checkIntegration({ id: id_, check_type: check_type_ }).$promise
            .then(function(data) {
              $ctrl.checkResults = data;
            }, function(err) {
              $ctrl.checkResults = {
                check_type: check_type_,
                check_status_code: checkStatusCode.ERROR,
                message: 'Server request error'
              };
            })
            .finally(function() {
              $ctrl._loading = false;
            });

        };
        // Auto start request
        this.onStartCheck();

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
              class_ = 'text text-info ';
              break;
          }
          return class_;
        };
      }
    };
  }
})();
