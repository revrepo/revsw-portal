(function () {
  'use strict';

  angular
    .module('revapm.Portal.Profile')
    .controller('TwoFactorAuthController', TwoFactorAuthController);

  /*@ngInject*/
  function TwoFactorAuthController($scope, User, TwoFactorAuth, AlertService, $uibModal, $config) {
    /**
     * Loading flag
     *
     * @type {boolean}
     * @private
     */
    $scope._loading = false;

    /**
     * Current user object
     *
     * @type {Object|null|*}
     */
    $scope.user = User.getUser();

    /**
     * Flag checks if 2fa enabled to current user.
     * Note I couldn't name var starting from number.
     * But I like name `2faEnabled` much better. Thank you JavaScript developers !
     *
     * @type {Boolean}
     */
    $scope.twoFAEnabled = ($scope.user && $scope.user.two_factor_auth_enabled);

    /**
     * Link to QR code image
     *
     * @type {string}
     */
    $scope.qrImg = '';

    /**
     * ASCII code
     * @type {string}
     */
    $scope.asciiCode = '';

    /**
     * Flag that show/hide disable 2fa elements
     *
     * @type {boolean}
     */
    $scope.showDisable = false;

    /**
     * Clear all codes related to enable 2fa
     */
    $scope.clearCodes = function () {
      $scope.qrImg = '';
      $scope.asciiCode = '';
      $scope.oneTimePassword = '';
      $scope.hideDisablePart();
    };

    /**
     * Update current user profile with new 2fa state
     *
     * @param {Boolean} enabled
     */
    $scope.updateUserProfile = function (enabled) {
      $scope.twoFAEnabled = enabled;
      $scope.clearCodes();
      User.reloadUser();
    };

    /**
     * Init 2fa for current loged in user
     */
    $scope.init = function () {
      $scope._loading = true;

      TwoFactorAuth.init().$promise.then(function (data) {
        if (data.google_auth_qr) {
          $scope.qrImg = data.google_auth_qr;
        }
        if (data.ascii) {
          $scope.asciiCode = data.ascii;
        }
        if (data.base32) {
          $scope.base32Code = data.base32;
        }
      }).catch(function (err) {
        AlertService.danger(err, 5000);
      }).finally(function () {
        $scope._loading = false;
      });
    };

    /**
     * Enable 2fa for current user
     *
     * @param {String} oneTimePassword
     */
    $scope.enable = function (oneTimePassword) {
      if (!oneTimePassword) {
        AlertService.danger('Please enter your One Time Password');
        angular.element('#one-time-password').focus();
        return;
      }
      // Set loading flag
      $scope._loading = true;
      // Call method
      TwoFactorAuth
        .enable({
          oneTimePassword: oneTimePassword
        })
        .$promise
        .then(function (data) {
          AlertService.success(data.message);
          $scope.updateUserProfile(true);
        })
        .catch(function (err) {
          AlertService.danger(err);
        })
        .finally(function () {
          $scope._loading = false;
        });
    };

    /**
     * Will show elements related to disable 2fa
     */
    $scope.showDisablePart = function () {
      $scope.showDisable = true;
    };

    /**
     * Will show elements related to disable 2fa
     */
    $scope.hideDisablePart = function () {
      $scope.showDisable = false;
    };

    /**
     * Disables 2fa for user
     */
    $scope._disable = function (/*oneTimePassword*/) {
      //if (!oneTimePassword) {
      //  AlertService.danger('Please enter your One Time Password');
      //  angular.element('#one-time-password').focus();
      //  return;
      //}
      // Set loading flag
      $scope._loading = true;
      // Call method
      TwoFactorAuth
        .disable({
          userId: $scope.user.user_id
        }, {
          //oneTimePassword: oneTimePassword
        })
        .$promise
        .then(function (data) {
          AlertService.success(data.message);
          $scope.updateUserProfile(false);
        })
        .catch(function (err) {
          AlertService.danger(err);
        })
        .finally(function () {
          $scope._loading = false;
        });
    };

    /**
     * Show confirmation popup
     *
     * @returns {Promise}
     */
    $scope.confirm = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'confirm2FaDisable.html',
        controller: 'ConfirmModalInstanceCtrl',
        size: 'md',
        resolve: {
          model: {
            isMyUser: $scope.isMyUser,
            user: $scope.currentUser
          }
        }
      });

      return modalInstance.result;
    };

    /**
     * Show confirmation popup and disable 2fa
     */
    $scope.disable = function () {
      $scope.confirm().then($scope._disable);
    };

    // Var for holding the OTP
    $scope.code = '';
    // Replace digits with wildcard
    $scope.wildcard = function (e) {
      if (($scope.code.length - e.target.value.length) > 1) {
        $scope.code = '';
        e.target.value = '';
      }
      if (e.target.value === '') {
        $scope.code = '';
      } else {
        if (e.keyCode === 8 || e.keyCode === 46) { // Check if key is backspace or delete
          $scope.code = $scope.code.slice(0, -1);
        } else if (e.target.value.includes(e.key)) {
          $scope.code += e.key;
          setTimeout(function () {
            e.target.value = e.target.value.replace(e.key, '*');
          }, $config.OTP_WILDCARD_DELAY);
        } else {
          $scope.code = e.target.value;
        }
      }
    };
  }
})();
