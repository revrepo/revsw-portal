 (function() {
   'use strict';

   angular
     .module('revapm.Portal.Dashboard')
     .controller('DashdoardController', DashdoardController);

   function DashdoardController($scope, $localStorage, DashboardSrv) {
     'ngInject';
     var vm = this;
     // TODO: get dashboardId from $stateParams or User profile
     vm.dashboardId = "Dashboard";

     DashboardSrv
       .get(this.dashboardId)
       .then(function(data) {
           if (!data) {
             data = {
               "title": "Dashboard",
               "structure": "6-6",
               "rows": [{
                 "columns": [{
                   "styleClass": "col-md-6",
                   "widgets": []
                 }, {
                   "styleClass": "col-md-6",
                   "widgets": []
                 }]
               }]
             };
           }
           vm.model = data;
         },
         function() {
            // TODO: create new dashdoard
         })
     $scope.$on('adfDashboardChanged', function(event, dashboardId, model) {
       DashboardSrv.set(dashboardId, model);
     });
   }

 })();
