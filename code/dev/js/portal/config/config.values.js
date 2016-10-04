(function(angular, window) {
  'use strict';
  angular
    .module('revapm.Portal.Config')
    .value('$values', {
      SDKDownloadLinks: {
        iOS: 'https://github.com/revrepo/SDK/releases/download/v1.0.5/RevSDK.framework.zip'
      },
      SDKIntroductionVideoLinks: {
        iOS: 'https://www.youtube.com/watch?v=s0xDOPg_Wts'
      }
    });
})(angular, window);
