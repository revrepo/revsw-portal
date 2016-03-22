 (function() {
   'use strict';

   angular
     .module('revapm.Portal.Dashboard')
     .controller('DashdoardController', DashdoardController);

   function DashdoardController($scope, $window, $timeout, $localStorage, DashboardSrv, $stateParams) {
     'ngInject';
     var vm = this;
     vm.dashboardId = $stateParams.dashboardId;
     vm.model = {};
     // NOTE: resize for fix wigth of charts
     var resizing;

     function onResize() {
       if (resizing) {
         $timeout.cancel(resizing);
       }
       resizing = $timeout(function() {
         var event = new Event('resize');
         window.dispatchEvent(event);
         onResize();
       }, 1000);
     }
     onResize();
     DashboardSrv
       .get(vm.dashboardId)
       .then(function(data) {
           vm.model = data;
           // TODO: set type dashboard settings
           vm.model.editTemplateUrl = 'parts/dashboard/modals/dashboard-edit-with-options.tpl.html';
         },
         function() {
           // TODO: alert message and go to
         })
       .finally(function() {
         // TODO: loader
       });

     $scope.$on('adfDashboardChanged', function(event, dashboardId, model) {
       DashboardSrv.set(vm.dashboardId, model);
     });

     vm.reload = function() {
       $scope.$broadcast('widgetReload');
     };

     $scope.$watch(
       function() {
         return vm.model.options;
       },
       function(newVal, oldVal) {
         if (!!newVal && !!oldVal && newVal.autorefresh !== oldVal.autorefresh) {
           $scope.autoRefresh(newVal);
         }
       }, true);

     $scope.$watch(
       function() {
         return vm.model.refreshNow;
       },
       function(newVal, oldVal) {
         if (newVal !== oldVal) {
           vm.model.refreshNow = false;
           $scope.refreshWidgets();
         }
       }, true);

     var timeReload;
     $scope.autoRefresh = function(option) {
       if (!!timeReload) {
         $timeout.cancel(timeReload);
       }
       if (!!option && option.autorefresh !== '') {
         timeReload = $timeout(
           function() {
             $scope.$broadcast('widgetReload');
             $scope.autoRefresh(option);
           }, option.autorefresh * 60 * 1000);
       }
     };

     $scope.refreshWidgets = function() {
       if (!!timeReload) {
         $timeout.cancel(timeReload);
       }
       if (!!vm.model.option && vm.model.option.autorefresh !== '') {
         $scope.autoRefresh();
       } else {
         $scope.$broadcast('widgetReload');
       }
     };

     /**
      * @description
      * @return
      */
     $scope.$on('destroy', function() {
       if (!!timeReload) {
         $timeout.cancel(timeReload);
       }
       if (!!resizing) {
         $timeout.cancel(resizing);
       }
     });
   }
 })();
