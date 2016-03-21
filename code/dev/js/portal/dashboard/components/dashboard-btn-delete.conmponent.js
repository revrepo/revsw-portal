(function() {
  'use strict';

  angular
    .module('revapm.Portal.Dashboard')
    .directive('dashboardBtnDelete', dashboardBtnDelete);
  /*@ngInject*/
  function dashboardBtnDelete(DashboardSrv) {
    return {
      restrict: 'AE',
      replace: true,
      template:
      // TODO: make template as file
        '<a ng-click="vm.onDeleteDashboard($event)" class="btn btn-danger" title="delete bashboard"> <i class="glyphicon glyphicon-remove"></i> Delete dashboard </a>',
      scope: {
        model: '='
      },
      controller: function($scope, $state, $uibModal, DashboardSrv, dashboard) {
        'igInject';
        var vm = this;
        /**
         * @name  onCreateDashboard
         * @description Creating new dashboard
         * @param  {[type]} e Event object
         * @return
         */
        this.onDeleteDashboard = function(e) {
          var deleteDashboardScope = $scope.$new();
          deleteDashboardScope._isLoading = false;
          deleteDashboardScope.model = angular.copy($scope.model);
          var instance = $uibModal.open({
            scope: deleteDashboardScope,
            templateUrl: 'parts/dashboard/modals/dashboard-delete.modal.tpl.html', // adfEditTemplatePath,
            backdrop: 'static'
          });
          // deleteDashboardScope.changeStructure = function(name, structure){
          //   $log.info('change structure to ' + name);
          //   changeStructure(model, structure);
          // };
          deleteDashboardScope.closeDialog = function() {
            // copy the new title back to the model
            //model.title = deleteDashboardScope.copy.title;
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
          deleteDashboardScope.deleteDialog = function(model) {
            deleteDashboardScope._isLoading = true;
            DashboardSrv
              .delete(model.id)
              .then(function(data) {
                deleteDashboardScope.closeDialog();
                $state.go("index.dashboard.main");
              }, function(err) {
                //TODO: add AlertService
              })
              .finally(function() {
                deleteDashboardScope._isLoading = false;
              });

          }
        }
      },
      controllerAs: 'vm',
      controllerBind: true
    };
  }
})();
