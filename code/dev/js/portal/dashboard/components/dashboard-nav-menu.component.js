(function() {
  'use strict';
  /**
   * @name
   */
  angular
    .module('revapm.Portal.Dashboard')
    .directive('dashboardNavMenu', dashboardNavMenu);

  /*@ngInject*/
  function dashboardNavMenu(DashboardSrv) {
    return {
      restrict: 'AE',
      replace: true,
      template: '  <li ui-sref-active-if="{class: \'active-side-menu-item\', state: \'index.dashboard\'}">' +
        '  <a ui-sref="index.dashboard.details({dashboardId:vm.dashboardsList[0].id})" class="side-menu-item">Dashboards</a>' +
        '  <a ui-sref-active="active" ui-sref="index.dashboard.details({dashboardId:dash.id})" ng-repeat="dash in vm.dashboardsList" class="side-menu-sub-item">{{dash.title}}</a>' +
        '</li>',
      scope: false,
      controller: function($scope, DashboardSrv) {
        var vm = this;
        this.dashboardsList = DashboardSrv.dashboardsList;
        // [{
        //   id: 1,
        //   title: "Demo1"
        // }, {
        //   id: 2,
        //   title: "Demo2"
        // }];
      },
      controllerAs: 'vm',
      controllerBind: true
    };
  }
})();
