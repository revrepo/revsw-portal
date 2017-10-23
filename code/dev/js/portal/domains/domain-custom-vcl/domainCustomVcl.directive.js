(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainCustomVcl', domainCustomVcl)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-custom-vcl/domain-custom-vcl.tpl.html', true);
    });
  /**
   * @name  domainCustomVcl
   * @description
   * @return {Object}
   */
  function domainCustomVcl() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        customVcl: '=ngModel',
        _isEditLocked: '=isEditLocked'
      },
      templateUrl: 'parts/domains/domain-custom-vcl/domain-custom-vcl.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainCustomVclController($scope) {
        'ngInject';
        var $ctrl = this;
        // accordion settings
        this.status = {
          isCustomHeaderOpen: false,
          isFirstOpen: false,
          isFirstDisabled: false
        };

      }
    };
  }
})();
