(function() {
  'use strict';

  angular
    .module('revapm.Portal.Auth')
    .controller('LoginController', LoginController);

  /*@ngInject*/
  function LoginController($scope, $rootScope, User, Vendors, $state, AlertService, DashboardSrv, $config, $uibModal, $location, $auth, Util) {

    document.querySelector('body').style.paddingTop = '0';

    $scope._loading = false;

    $scope.style = {
      height: document.documentElement.clientHeight + 'px'
    };

/* 
    var images = [
      'images/bg/bay_bridge.jpg',
      'images/bg/burney_falls.jpg',
      'images/bg/golden_gate.jpg',
      'images/bg/mirror_lake.jpg',
      'images/bg/painted_ladies.jpg',
      'images/bg/tunnel_view.jpg',
      'images/bg/twin_peaks.jpg',
      'images/bg/yosemite_hill.jpg',
      'images/bg/yosemite_valley.jpg',
    ];

*/
    $scope.randomImageStyle = {
      'background-image': 'url(' + Util.getRandomImageURL() + ')'
    };
    $scope.authenticate = function(provider) {
      User.authenticate(provider)
        .then(function(data) {
          // NOTE: call event - user signin
          $scope.$emit('user.signin', data.data);
        });

    };
    $scope.login = function(email, pass) {
      AlertService.clear();
      $scope._loading = true;
      try {
        User.login(email, pass)
          .then(function(data) {
            User.checkPermissions();
            if (data.data.vendor === $rootScope.vendor) {
              // NOTE: call event - user signin
              $scope.$emit('user.signin', data.data);
            } else {
              Vendors.getByName({
                vendor: data.data.vendor
              }).$promise.then(function(response){
                window.location.href = response.vendorUrl;
              });
            }
          })
          .catch(function(err) {
            $scope._loading = false;
            if (err.status === $config.STATUS.TWO_FACTOR_AUTH_REQUIRED) {
              $scope.enter2faCode(email, pass);
            }
            if (err.status === $config.STATUS.SUBSCRIPTION_REQUIRED) {
              $scope.resendRegistrationEmail(email, pass);
            }
            if (err.status === $config.STATUS.UNAUTHORIZED) {
              AlertService.danger('Wrong username or password');
            }
            if (!!err.data) {
              if (err.data.message && (err.status !== $config.STATUS.SUBSCRIPTION_REQUIRED)) {
                AlertService.danger(err);
              }
            } else {
              AlertService.danger(err);
            }
          });
      } catch (err) {
        AlertService.danger(err);
        $scope._loading = false;
      }
    };

    if (localStorage && localStorage.email && localStorage.password) {
      $scope.login(localStorage.email, localStorage.password);
    }

    $scope.enter2faCode = function(email, password) {
      var modalInstance = $uibModal.open({
        templateUrl: 'parts/auth/two-factor-auth-code.html',
        controller: 'TwoFactorAuthCodeModalController',
        size: 'md',
        resolve: {
          auth: function() {
            return {
              email: email,
              password: password
            };
          }
        }
      });

      modalInstance.result.then(function(data) {
        if (data.status === 200) {
          $scope.$emit('user.signin', data.data);
        }
      });
    };

    $scope.forgotPassword = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'parts/auth/forgot-password.html',
        controller: 'ForgotPasswordController',
        size: 'md' //,
          //resolve: {
          //  items: function () {
          //    return $scope.items;
          //  }
          //}
      });

      modalInstance.result.then(function(message) {
        if (!!message) {
          AlertService.success(message);
        }
      });
    };

    $scope.resendRegistrationEmail = function(email, password) {
      var modalInstance = $uibModal.open({
        templateUrl: 'parts/auth/resend-subscription-info.html',
        controller: 'resendRegistrationEmailController',
        size: 'md',
        resolve: {
          auth: function() {
            return {
              email: email,
              password: password
            };
          }
        }
      });

      modalInstance.result.then(function(data) {
        // $state.go('index');
        // $uibModalInstance.close();
      });
    };
  }
})();
