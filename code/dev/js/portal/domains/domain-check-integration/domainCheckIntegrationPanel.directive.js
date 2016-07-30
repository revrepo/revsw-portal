(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainCheckIntegrationPanel', domainCheckIntegrationPanel)

  .run(function($templateRequest) {
    'ngInject';
    $templateRequest('parts/domains/domain-check-integration/domain-check-integration-panel.tpl.html', true);
  });
  /**
   * @name  domainCheckIntegrationPanel
   * @description
   * @return {Object}
   */
  function domainCheckIntegrationPanel() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        handler: '@',
        domainId: '=',
        domainConfig: '=',
        checkResults: '=status',
        typeCheck: '@'
      },
      templateUrl: 'parts/domains/domain-check-integration/domain-check-integration-panel.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainCheckIntegrationPanelController($scope, DomainsConfig, checkStatusCode) {
        'ngInject';
        var $ctrl = this;
        this._loading = false;
        this.checkStatusCode = checkStatusCode;
        this.onStartCheck = function() {
          var id_ = $ctrl.domainId;
          var check_type = $ctrl.typeCheck || 'cname';
          $ctrl._loading = true;
          $ctrl.checkResults = null;
          DomainsConfig.checkIntegration({ id: id_, check_type: check_type }).$promise
            .then(function(data) {
              $ctrl.checkResults = data;
            }, function(err) {
              $ctrl.checkResults = {
                check_type: check_type,
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
