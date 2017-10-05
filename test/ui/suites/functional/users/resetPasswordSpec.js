/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Rev Software, Inc. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Rev Software, Inc.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Rev Software, Inc.
 */

var user = {};
var config = require('config');
var revAdmin = config.get('portal.users.revAdmin');
var Portal = require('./../../../page_objects/portal');

describe('Functional', function () {

  describe('Forgot Password', function () {

    beforeAll(function (done) {
      Portal
        .signUpAndVerifyUser()
        .then(function (newUser) {
          user = newUser;
          browser.executeScript('$(".introjs-overlay").hide();');
          Portal.signOut().then(function () {

            done();

          });
        });
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.load();
    });

    it('should display Password Recovery dialog',
      function () {
        Portal.loginPage.clickForgotPassword();
        expect(Portal.loginPage.getForgotPasswordDialog()
          .isDisplayed()).toBeTruthy();
      });

    it('should successfully send change-password request.',
      function () {
        Portal.loginPage.clickForgotPassword();
        Portal.dialog.setEmail(user.email);
        Portal.dialog.clickSubmit();
        expect(Portal.alerts
          .getFirst()
          .getText()).toEqual('An e-mail has been sent to ' + user.email +
          ' with further instructions');
      });

    it('should display message for unverified user when doing recovery',
      function () {
        Portal.signUpUser('Gold').then(function (tmpUsr) {
          Portal.signUp.formPage.verificationMessage.waitToDisplay();
          Portal.load();
          Portal.loginPage.clickForgotPassword();
          Portal.loginPage.setRecoveryEmail(tmpUsr.email);
          Portal.dialog.clickSubmit();
          expect(Portal.loginPage.getRecoveryDialogTitle())
            .toBe('You still need to confirm your email address');
        });
      });

    it('should be able to reset the password and login',
      function () {
        user.password = '12345678';
        Portal.applyResetURL(user);
        Portal.resetPasswordPage.resetPassword(user.password);
        Portal.loginPage.waitToDisplay();
        Portal.signIn(user);
        expect(Portal.header.getUserInfoEl().isDisplayed()).toBeTruthy();
      });
  });
});
