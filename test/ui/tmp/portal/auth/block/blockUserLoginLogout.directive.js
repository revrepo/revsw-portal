(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .directive('userLoginLogout', userLoginLogoutDirective);

  /*@ngInject*/
  function userLoginLogoutDirective(User, $state) {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: 'parts/auth/block/user-login-logout.html',
      scope: {},
      link: function($scope) {
        $scope.isAuthorized = User.isAuthed();

        $scope.user = User.getUser();
        $scope.userACL = $scope.user.access_control_list;
        $scope.logout = function() {
          User.logout();
          $state.go('login');
        };

        $scope.$watch(User.getUser, function(newVal, oldVal) {
          $scope.user = newVal;
        });
      }
    };
  }
})();
