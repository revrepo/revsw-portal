(function () {
    'use strict';
  
    angular
      .module('revapm.Portal.Shared')
      .directive('permissions', PermissionsDirective);
  
    /*@ngInject*/
    function PermissionsDirective() {
      return {
        templateUrl: 'parts/shared/permissions/permissions.html',
        controllerUrl: './permissions.controller.js'
      };
    }
  })();
  