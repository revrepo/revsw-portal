(function(angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateBotProtectionLocationName', validateBotProtectionLocationName);
  /**
   * @name  validateBotProtectionLocationName
   * @description validation Bot Protection Location Name
   *
   * @return {Boolean}
   */
  function validateBotProtectionLocationName($config) {
    'ngInject';
    var _name = 'bot-protection-location-name';
    var BOT_PROTECTION_LOCATION_NAME = $config.PATTERNS.BOT_PROTECTION_LOCATION_NAME;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.botProtectionLocationName = function(value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && (BOT_PROTECTION_LOCATION_NAME.test(value) === false)) {
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
