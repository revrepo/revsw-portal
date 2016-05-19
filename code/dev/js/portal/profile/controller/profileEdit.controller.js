(function() {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('ProfileEditController', ProfileEditController);

  /*@ngInject*/
  function ProfileEditController($scope, User, AlertService) {

    $scope.user = User.getUser();

    $scope.pass = {
      current_password: '',
      new_password: '',
      confirm_password: ''
    };

    $scope.clearPassword = function() {
      $scope.pass = {
        current_password: '',
        new_password: '',
        confirm_password: ''
      };
    };

    /**
     * Update current users password
     *
     * @returns {Promise}
     */
    $scope.updatePassword = function() {
      if (!_.trim($scope.pass.current_password) || !_.trim($scope.pass.new_password)) {
        AlertService.danger('Please fill all fields. (New password should be at least 8 charecters length)', 5000);
        return;
      }
      if ($scope.pass.new_password !== $scope.pass.confirm_password) {
        AlertService.danger('Passwords did not match', 5000);
        return;
      }
      $scope._loading = true;
      return User.updatePassword($scope.pass.current_password, $scope.pass.new_password)
        .then(function(data) {
          $scope.clearPassword();
          AlertService.success(data);
          return data;
        })
        .catch(AlertService.danger)
        .finally(function() {
          $scope._loading = false;
        });
    };

    $scope.updateProfile = function(user) {
      $scope.updatePassword();
    };

  }
})();
