(function() {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('GoodByeController', GoodByeController);

  /*@ngInject*/
  function GoodByeController($scope, $rootScope, $config) {

    $scope.websiteUrl = vendorConfig.companyWebsiteURL;
    $scope.contactSupportUrl = vendorConfig.contactUsLink;

  }
})();
