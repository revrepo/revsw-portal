(function(angular, window) {
  'use strict';
  angular
    .module('revapm.Portal.Config')
    .value('$values', {
      downloadLinks: {
        iOS: 'https://github.com/revrepo/SDK/releases/download/v1.0.5/RevSDK.framework.zip'
      }
    });
})(angular, window);
