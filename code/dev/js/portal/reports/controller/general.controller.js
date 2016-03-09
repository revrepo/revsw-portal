/* general.controller.js */

/**
 * @controller GeneralCtrl
 * @module 'revapm.Portal.Reports'
 * @desc controller for the Web Analytics/General view
 */
(function() {
  'use strict';

  angular
    .module('revapm.Portal.Reports')
    .controller('GeneralCtrl', GeneralCtrl);


  GeneralCtrl.$inject = [];

  /*@ngInject*/
  function GeneralCtrl() {
    var vm = this;
    
    //ui data model
    vm.model = {
    	filtersList: []
    };
  }
})();
