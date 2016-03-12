(function(){
  "use strict";

  angular
  .module('revapm.Portal.Keys')
  .directive('editInline',editInlineDirective);

  function editInlineDirective() {
    return {
      restrict: 'E',
      scope:{
        item:'=',
        value:'@',
        callback:'='
      },
      template:
      '<button ng-if="!isEdit" ng-click="changeEdit(true)" class="btn-link">{{item[value]}}</button>' +
      '<input ng-show="isEdit" type="text" ng-blur="changeEdit(false)" ng-model="newValue">',

      controller:function($scope,$timeout){
        $scope.isEdit = false;
        $scope.newValue = angular.copy($scope.item[$scope.value]);

        $scope.changeEdit = function(status){
          $scope.isEdit = status;
          if(status) {
            $timeout($scope.focusInput);
          } else {
            if($scope.item[$scope.value] != $scope.newValue){
              $scope.callback($scope.item,$scope.newValue);
            }
          }
        }
      },
      link:function($scope,$element){
        var editInline = angular.element($element);
        $scope.focusInput = function(){
          editInline.find('input').focus();
        };
      }
    }
  }

})();
