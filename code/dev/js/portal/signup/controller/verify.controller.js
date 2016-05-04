(function() {
  'use strict';
  // NOTE: functionality is depricated - we no more verify user by token.
  angular
    .module('revapm.Portal.Signup')
    .controller('VerifyController', VerifyController);

  /*@ngInject*/
  function VerifyController($scope,
    Users,
    User,
    $stateParams,
    $state,
    AlertService,
    $localStorage,
    $window) {
    $scope.user = User.getUser();

    $scope.resendToken = function(model) {
      Users.resend({
          email: model.email
        })
        .$promise
        .then(function() {
          AlertService.success('Verification link is sent to ' + model.email, 5000);
        })
        .catch(AlertService.danger);
    };

    if ($stateParams.token) {
      Users.verify({
          token: $stateParams.token
        })
        .$promise
        .then(function(res) {
          $localStorage.user = {
            email: res.email
          };
          // TODO: inform into modal window
          return User.updateToken(res.token)
            .then(User.reloadUser)
            .then(function() {
              $state.go('index');
            }, function(err) {
              AlertService.danger(err.message);
            });
        }, function(err) {
          //TODO: change message - show message from server
          AlertService.danger('Oops something went wrong', 5000);
        })
        .catch(function(err) {
          // TODO: detect type error
          //$state.go('resend_token');
        });
    }
  }
})();
