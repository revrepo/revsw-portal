(function(angular, window) {
  'use strict';
  angular
    .module('revapm.Portal.Config')
    .value('$values', {
      downloadLinks: {
        iOS: 'https://github.com/revrepo/SDK/blob/master/RevSDK.framework.zip'
      }
    });
})(angular, window);
