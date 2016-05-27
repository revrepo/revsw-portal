(function() {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('GoodByeController', GoodByeController);

  /*@ngInject*/
  function GoodByeController($scope, $config) {

    $scope.websiteUrl = $config.LINKS.WEBSITE_URL;
    $scope.contactSupportUrl = $config.LINKS.CONTACT_SUPPORT_URL;

  }
})();
