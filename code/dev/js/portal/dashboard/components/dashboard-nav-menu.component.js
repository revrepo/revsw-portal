(function() {
  'use strict';
  /**
   * @name
   */
  angular
    .module('revapm.Portal.Dashboard')
    .directive('dashboardNavMenu', dashboardNavMenu)
    .directive('dashboardBtnNew', dashboardBtnNew);


  /*@ngInject*/
  function dashboardNavMenu(DashboardSrv) {
    return {
      restrict: 'AE',
      replace: true,
      template:
      // TODO: make template as file
        '<ul class="dashboard_menu list"  ui-sref-active-if="{class: \'active-side-menu-item\', state: \'index.dashboard\'}">' +
        '<span ng-if="vm.dashboardsList.length>0" class="side-menu-item">' +
        '  <a ng-if="vm.dashboardsList.length>0" ui-sref="index.dashboard.details({dashboardId:vm.dashboardsList[0].id})" >Dashboards</a>' +
        '  <a ng-if="!vm.dashboardsList.length>0" class="side-menu-item">Dashboards</a>' +
        '  <dashboard-btn-new ng-if="!vm.dashboardsList.length>0"></dashboard-btn-new>' +
        '</span><span>' +
        '</span>' +
        '<li ng-repeat="dash in vm.dashboardsList" class="side-menu-sub-item">' +
        '<a ui-sref-active="active" ui-sref="index.dashboard.details({dashboardId:dash.id})">{{dash.title}}</a>' +
        '</li></ul>',
      scope: false,
      controller: function($scope, $state, $uibModal, DashboardSrv, dashboard) {
        'igInject';
        var vm = this;
        console.log(dashboard.structures)
        this.dashboardsList = DashboardSrv.dashboardsList;
        this.structures = dashboard.structures;
        // TODO: change
        this.changeStructure = function(name, structure) {
          console.log(name, structure)
        }

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
              title: "Dashboard",
              structure: "6-6"
            }
            // TODO: create modal
          var instance = $uibModal.open({
            scope: newDashboardScope,
            templateUrl: 'parts/dashboard/modals/dashboard-new.modal.tpl.html', // adfEditTemplatePath,
            backdrop: 'static'
          });
          // newDashboardScope.changeStructure = function(name, structure){
          //   $log.info('change structure to ' + name);
          //   changeStructure(model, structure);
          // };
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
                $state.go("index.dashboard.details", {
                  dashboardId: data.id
                });
              }, function(err) {
                //TODO: add AlertService
              })
              .finally(function() {
                newDashboardScope._isLoading = false;
              });

          }
        }
      },
      controllerAs: 'vm',
      controllerBind: true
    };
  }

  /*@ngInject*/
  function dashboardBtnNew(DashboardSrv) {
    return {
      restrict: 'AE',
      replace: true,
      template:
      // TODO: make template as file
        '<a ng-click="vm.onCreateDashboard($event)" class="btn btn-link" title="create new bashboard"> <i class="glyphicon glyphicon-plus"></i></a>' //+
        ,
      scope: false,
      controller: function($scope, $state, $uibModal, DashboardSrv, dashboard) {
        'igInject';
        var vm = this;
        console.log(dashboard.structures)
          // this.dashboardsList = DashboardSrv.dashboardsList;
        this.structures = dashboard.structures;
        this.changeStructure = function(name, structure) {
          console.log(name, structure)
        }

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
              title: "Dashboard",
              structure: "6-6"
            }
            // TODO: create modal
          var instance = $uibModal.open({
            scope: newDashboardScope,
            templateUrl: 'parts/dashboard/modals/dashboard-new.modal.tpl.html', // adfEditTemplatePath,
            backdrop: 'static'
          });
          // newDashboardScope.changeStructure = function(name, structure){
          //   $log.info('change structure to ' + name);
          //   changeStructure(model, structure);
          // };
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
                $state.go("index.dashboard.details", {
                  dashboardId: data.id
                });
              }, function(err) {
                //TODO: add AlertService
              })
              .finally(function() {
                newDashboardScope._isLoading = false;
              });

          }
        }
      },
      controllerAs: 'vm',
      controllerBind: true
    };
  }

})();
