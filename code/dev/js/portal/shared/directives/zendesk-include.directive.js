(function () {
  'use strict';

  angular
    .module('revapm.Portal.Shared')
    .directive('zendescInclude', zendescIncludeDirective);

  /*@ngInject*/
  function zendescIncludeDirective() {

    return {
      restrict: 'A',
      link: function (scope, element, attr) {
        scope.$watch('vendorConfig', function(val){
          if (val) {
            element[0].setAttribute('src', 'js/zendesk/zendesk.js');
          }
        });
      }
    };
  }
})();
