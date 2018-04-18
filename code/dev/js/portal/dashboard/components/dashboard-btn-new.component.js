(function () {
  'use strict';

  angular
    .module('revapm.Portal.Dashboard')
    .directive('dashboardBtnNew', dashboardBtnNew);

  /*@ngInject*/
  function dashboardBtnNew(DashboardSrv) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'parts/dashboard/buttons/dashboard-btn-new.tpl.html',
      scope: false,
      controller: function ($scope, $state, $uibModal, DashboardSrv, dashboard, AlertService, User) {
        'igInject';
        var vm = this;
        this.isReadOnly = function () {
          return User.isReadOnly();
        };
        this.structures = dashboard.structures;
        this.changeStructure = function (name, structure) {
          //console.log(name, structure);
        };

        /**
         * @name  onCreateDashboard
         * @description Creating new dashboard
         * @param  {[type]} e Event object
         * @return
         */
        this.onCreateDashboard = function (e) {
          var newDashboardScope = $scope.$new();
          newDashboardScope._isLoading = false;
          newDashboardScope.structures = dashboard.structures;
          newDashboardScope.model = {
            title: 'My Dashboard',
            structure: '6-6',
            options: {
              autorefresh: '1'
            }
          };

          var instance = $uibModal.open({
            scope: newDashboardScope,
            templateUrl: 'parts/dashboard/modals/dashboard-new.modal.tpl.html', // adfEditTemplatePath,
            backdrop: 'static'
          });

          newDashboardScope.closeDialog = function () {
            // close modal and destroy the scope
            instance.close();
            newDashboardScope.$destroy();
          };

          /**
           * @name  applyDialog
           * @description
           * @param  {Object} model - new dashboard info
           * @return
           */
          newDashboardScope.applyDialog = function (model) {
            newDashboardScope._isLoading = true;
            DashboardSrv
              .create(model)
              .then(function (data) {
                newDashboardScope.closeDialog();
                $state.go('index.dashboard.details', {
                  dashboardId: data.id
                });
              }, function (err) {
                AlertService.danger(err);
              })
              .finally(function () {
                newDashboardScope._isLoading = false;
              });
          };
        };
      },
      controllerAs: 'vm',
      controllerBind: true
    };
  }
})();
