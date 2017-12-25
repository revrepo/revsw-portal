(function (angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateWallarmLocationName', validateWallarmLocationName);
  /**
   * @name  validateWallarmLocationName
   * @description validation Wallarm Location Name
   *
   * @return {Boolean}
   */
  function validateWallarmLocationName($config) {
    'ngInject';
    var _name = 'wallarm-location-name';
    var WALLARM_LOCATION_NAME = $config.PATTERNS.WALLARM_LOCATION_NAME;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.wallarmLocationName = function (value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && (WALLARM_LOCATION_NAME.test(value) === false)) {
          ngModel.$setValidity(_name, false);
        }
        // NOTE: only set value for attribute "$valid"
        return true;
      };
    }

    return {
      require: 'ngModel',
      link: link
    };
  }
})(angular);
