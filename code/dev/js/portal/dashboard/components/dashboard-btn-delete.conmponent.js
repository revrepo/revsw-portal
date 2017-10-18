(function () {
  'use strict';

  angular
    .module('revapm.Portal.Dashboard')
    .directive('dashboardBtnDelete', dashboardBtnDelete);
  /*@ngInject*/
  function dashboardBtnDelete(DashboardSrv) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'parts/dashboard/buttons/dashboard-btn-delete.tpl.html',
      scope: {
        model: '='
      },
      controller: function ($scope, $state, $uibModal, DashboardSrv, dashboard, AlertService) {
        'igInject';
        var vm = this;
        /**
         * @name  onCreateDashboard
         * @description Creating new dashboard
         * @param  {[type]} e Event object
         * @return
         */
        this.onDeleteDashboard = function (e) {
          var deleteDashboardScope = $scope.$new();
          deleteDashboardScope._isLoading = false;
          deleteDashboardScope.model = angular.copy($scope.model);
          var instance = $uibModal.open({
            scope: deleteDashboardScope,
            templateUrl: 'parts/dashboard/modals/dashboard-delete.modal.tpl.html',
            backdrop: 'static'
          });

          deleteDashboardScope.isLast = function () {
            return (DashboardSrv.dashboardsList.length === 1);
          };

          deleteDashboardScope.closeDialog = function () {
            // close modal and destroy the scope
            instance.close();
            deleteDashboardScope.$destroy();
          };
          /**
           * @name  applyDialog
           * @description
           * @param  {Object} model - new dashboard info
           * @return {[type]}       [description]
           */
          deleteDashboardScope.deleteDialog = function (model) {
            deleteDashboardScope._isLoading = true;
            DashboardSrv
              .delete(model.id)
              .then(function (data) {
                deleteDashboardScope.closeDialog();
                $state.go('index.dashboard.main');
              }, function (err) {
                AlertService.danger(err);
              })
              .finally(function () {
                deleteDashboardScope._isLoading = false;
              });
          };
        };
      },
      controllerAs: 'vm',
      controllerBind: true
    };
  }
})();
