 (function(angular) {
   'use strict';

   angular
     .module('revapm.Portal.Auth')
     .controller('AzureSSOController', AzureSSOController);

   function AzureSSOController($scope, User, $stateParams, AlertService, $timeout, $state, DashboardSrv) {
     'ngInject';
     var $ctrl = this;
     var token = $stateParams.token;
     var resourceId = $stateParams.resourceId;
     this.loading = false;
     $ctrl.authState = 'progress';
     this.initAuth = function(formData) {
       AlertService.clear();
       $ctrl.loading = true;
       User.authAzureSSO(token, resourceId)
         .then(function(results) {
           var userInfo = results.data;
           // NOTE: no message
           $ctrl.authState = 'success';
           $scope.$emit('user.signin', userInfo);
         })
         .catch(function(err) {
           AlertService.danger(err);
           $ctrl.authState = 'failed';
         })
         .finally(function() {
           $ctrl.loading = false;
         });
     };
     // NOTE: time to read message before start
     $timeout(function() {
       $ctrl.initAuth(token);
     }, 500);
   }
 })(angular);
