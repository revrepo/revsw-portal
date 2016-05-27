(function () {
  'use strict';

  angular
    .module('revapm.Portal')
    .config(configure);

  /*@ngInject*/
  function configure(cfpLoadingBarProvider) {
   // All configuration except routing should be placed here
     cfpLoadingBarProvider.includeBar = false;
  }
})();
