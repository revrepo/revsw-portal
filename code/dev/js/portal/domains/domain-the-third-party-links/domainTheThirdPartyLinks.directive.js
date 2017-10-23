(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainTheThirdPartyLinks', domainTheThirdPartyLinks)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-the-third-party-links/domain-the-third-party-links.tpl.html', true);
    });
  /**
   * @name  domainTheThirdPartyLinks
   * @description
   * @return {Object}
   */
  function domainTheThirdPartyLinks() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        model: '=ngModel',
        _isEditLocked: '=isEditLocked'

      },
      templateUrl: 'parts/domains/domain-the-third-party-links/domain-the-third-party-links.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainTheThirdPartyLinksController($scope) {
        'ngInject';
        var $ctrl = this;
      }
    };
  }
})();
