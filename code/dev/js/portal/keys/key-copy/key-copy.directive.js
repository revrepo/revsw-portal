(function(){
  "use strict";

  angular
  .module('revapm.Portal.Keys')
  .directive('copyContainer',copyContainerDirective);

  function copyContainerDirective() {
    return {
      restrict: 'A',
      link:function($scope){
        var clipboard = new Clipboard('.copyKey');
        $scope.$on('destroy',clipboard.destroy);
      }
    }
  }

})();
