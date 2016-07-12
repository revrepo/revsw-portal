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
        customVcl: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-custom-vcl/domain-custom-vcl.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainCustomVclController($scope) {
        'ngInject';
        var $ctrl = this;
        this.status = {
          isCustomHeaderOpen: false,
          isFirstOpen: true,
          isFirstDisabled: false
        };

      }
    };
  }
})();
