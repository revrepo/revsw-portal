(function() {
  angular.module('revapm.Portal.Cache')
    .directive('cacheEnvironmentDropDownMenu', cacheEnvironmentDropDownMenu)
    .run(function($templateRequest) {
      'ngInject';
      $templateRequest('parts/cache/cache-environment-drop-down-menu/cache-environment-drop-down-menu.tpl.html', true);
    });;

  function cacheEnvironmentDropDownMenu($config) {
    'ngInject';
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      bindToController: {
        environment: '=environment'
      },
      templateUrl: 'parts/cache/cache-environment-drop-down-menu/cache-environment-drop-down-menu.tpl.html',
      controllerAs: '$ctrl',
      controller: function cacheEnvironmentDropDownMenuController() {
        var $ctrl = this;
        // $ctrl.environment='staging_only';
        $ctrl.purgeJobEnvorinments = $config.PURGE_JOB_ENVIRONMENTS_CHOICE;

        $ctrl.onModelSelect = function(model) {

        }
      }
    };
  }
})();
