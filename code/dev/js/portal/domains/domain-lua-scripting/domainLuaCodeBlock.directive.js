(function() {
  'use strict';

  angular.module('revapm.Portal.Domains')
    .directive('domainLuaCodeBlock', domainLuaCodeBlock)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/domains/domain-lua-scripting/domain-lua-code-block.tpl.html', true);
    });
  /**
   * @name  domainLuaCodeBlock
   * @description
   * @return {Object}
   */
  function domainLuaCodeBlock() {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        luaBlock: '=ngModel'
      },
      templateUrl: 'parts/domains/domain-lua-scripting/domain-lua-code-block.tpl.html',
      controllerAs: '$ctrl',
      controller: function domainLuaCodeBlockController($scope) {
        'ngInject';
        var $ctrl = this;
      }
    };
  }
})();
