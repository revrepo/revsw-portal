 (function() {
   'use strict';

   angular
     .module('revapm.Portal.Dashboard')
     .controller('DashdoardController', DashdoardController);

   function DashdoardController($scope, $localStorage, DashboardSrv, $stateParams) {
     'ngInject';
     var vm = this;
     vm.dashboardId = $stateParams.dashboardId;
     vm.model = {};

     DashboardSrv
       .get(vm.dashboardId)
       .then(function(data) {
           vm.model = data;
           // TODO: set type dashboard settings
           vm.model.editTemplateUrl = 'parts/dashboard/modals/dashboard-edit-with-options.tpl.html'
         },
         function() {
           // TODO: alert message and go to

         })
       .finally();
     $scope.$on('adfDashboardChanged', function(event, dashboardId, model) {
       console.log(vm.dashboardId)
       DashboardSrv.set(vm.dashboardId, model);
     });

   }
 })();
