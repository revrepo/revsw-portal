 (function() {
   'use strict';

   angular
     .module('revapm.Portal.Dashboard')
     .controller('DashdoardController', DashdoardController);

   function DashdoardController($scope, $localStorage) {
     'ngInject';

     this.name = "Dashboard";

     var data = $localStorage[this.name];
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

     this.model = data;

     $scope.$on('adfDashboardChanged', function(event, name, model) {
       $localStorage[name] = model;
     });
   }

 })();
