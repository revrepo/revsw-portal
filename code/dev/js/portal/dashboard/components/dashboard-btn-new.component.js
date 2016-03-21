(function() {
  'use strict';

  angular
    .module('revapm.Portal.Dashboard')
    .directive('dashboardBtnNew', dashboardBtnNew);

  /*@ngInject*/
  function dashboardBtnNew(DashboardSrv) {
    return {
      restrict: 'AE',
      replace: true,
      template:
      // TODO: make template as file
        '<a ng-click="vm.onCreateDashboard($event)" class="btn btn-link" title="Add New Dashboard"> <i class="glyphicon glyphicon-plus"></i></a>',
      scope: false,
      controller: function($scope, $state, $uibModal, DashboardSrv, dashboard) {
        'igInject';
        var vm = this;
        this.structures = dashboard.structures;
        this.changeStructure = function(name, structure) {
          // TODO: console.log(name, structure);
        };

        /**
         * @name  onCreateDashboard
         * @description Creating new dashboard
         * @param  {[type]} e Event object
         * @return
         */
        this.onCreateDashboard = function(e) {
          var newDashboardScope = $scope.$new();
          newDashboardScope._isLoading = false;
          newDashboardScope.structures = dashboard.structures;
          newDashboardScope.model = {
              title: 'Dashboard',
              structure: '6-6'
            };

          var instance = $uibModal.open({
            scope: newDashboardScope,
            templateUrl: 'parts/dashboard/modals/dashboard-new.modal.tpl.html', // adfEditTemplatePath,
            backdrop: 'static'
          });

          newDashboardScope.closeDialog = function() {
            // copy the new title back to the model
            //model.title = newDashboardScope.copy.title;
            // close modal and destroy the scope
            instance.close();
            newDashboardScope.$destroy();
          };
          /**
           * @name  applyDialog
           * @description
           * @param  {Object} model - new dashboard info
           * @return {[type]}       [description]
           */
          newDashboardScope.applyDialog = function(model) {
            newDashboardScope._isLoading = true;
            DashboardSrv
              .create(model)
              .then(function(data) {
                newDashboardScope.closeDialog();
                console.log(data);
                $state.go('index.dashboard.details', {
                  dashboardId: data.id
                });
              }, function(err) {
                //TODO: add AlertService
              })
              .finally(function() {
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
