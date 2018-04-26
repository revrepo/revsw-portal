(function() {
  'use strict';

  angular.module('revapm.Portal.Dashboard.Widgets.AppsAnalytics')
    .controller('widgetsMobileTopsEditConfigController', widgetsMobileTopsEditConfigController);

  /**
   * @name widgetsMobileTopsEditConfigController
   * @description method for configuration params for widget
   *
   * @param {any} $scope
   * @param {any} $q
   * @param {any} User
   * @param {any} Stats
   * @param {any} Util
   */
  function widgetsMobileTopsEditConfigController($scope, $q, User, Stats, Util) {
    'ngInject';
    // NOTE:  Default values for config
    var _defaultConfig = {
      filters: {
        delay: '24'
      }
    };

    _.defaultsDeep($scope.config, _defaultConfig);
    var u = User.getUser();
    $scope.accountId = u.account_id || null;
    $scope.application = $scope.config.application;

    $scope.onApplicationSelected = function () {
      if (!$scope.application && !$scope.accountId) {
        return;
      }
      $scope.reload();
    };

    /**
     * @name  reload
     * @description Reload data
     *
     * @return
     */
    $scope.reload = function () {
      angular.extend($scope.config, {
        application: angular.copy($scope.application),
        account_id: angular.copy($scope.accountId),
        app_id: (($scope.application && $scope.application.app_id) || null)
      });
    };
    //=======================
    // Load user applications
    User.getUserApps(true);
  }

})();
