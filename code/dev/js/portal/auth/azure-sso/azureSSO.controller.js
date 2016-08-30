 (function(angular) {
   'use strict';

   angular
     .module('revapm.Portal.Auth')
     .controller('AzureSSOController', AzureSSOController);

   function AzureSSOController($scope, User, $stateParams, AlertService, $timeout, $state) {
     'ngInject';
     var $ctrl = this;
     var token = $stateParams.token;
     this.loading = false;
     $ctrl.authState = 'progress';
     this.initAuth = function(formData) {
       AlertService.clear();
       $ctrl.loading = true;
       User.authAzureSSO(token)
         .then(function(userData) {
           // NOTE: no message - only redirect
           $ctrl.authState = 'success';
           $state.go('index.dashboard.main');
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
