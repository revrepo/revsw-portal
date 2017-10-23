(function (angular) {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('validateGithubPersonalAccessToken', validateGithubPersonalAccessToken);
  /**
   * @name  validateGithubPersonalAccessToken
   * @description validation GitHub Personal Access Token
   *
   * @return {Boolean}
   */
  function validateGithubPersonalAccessToken($config) {
    'ngInject';
    var _name = 'github-personal-access-token';
    var GITHUB_PERSONAL_ACCESS_TOKEN = $config.PATTERNS.GITHUB_PERSONAL_ACCESS_TOKEN;

    function link(scope, element, attrs, ngModel) {

      ngModel.$validators.githubPersonalAccessToken = function (value) {
        ngModel.$setValidity(_name, true);

        if (value !== undefined && (GITHUB_PERSONAL_ACCESS_TOKEN.test(value) === false)) {
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
