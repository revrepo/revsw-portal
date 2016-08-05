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
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');

var MailinatorHelper = require('./../../../mailinator/helper');

describe('Smoke', function () {

  describe('Forgot Password', function () {

    beforeAll(function () {
      Portal.signUpUser('Gold').then(function (tmpUser) {
        expect(Portal.signUp.formPage.form.getDidntReceiveBtn() //TODO: add appropriate waiter on helper/PO level
          .isDisplayed()).toBeTruthy();
        user.email = tmpUser.email;
      });
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.load();
    });

    afterEach(function () {
    });

    it('should display Password Recovery dialog',
      function () {
        Portal.loginPage.clickForgotPassword();
        expect(Portal.loginPage.getForgotPasswordDialog()
          .isDisplayed()).toBeTruthy();
      });

    it('should display message for unverified user when doing recovery',
      function () {
        Portal.loginPage.clickForgotPassword();
        Portal.loginPage.setRecoveryEmail(user.email);
        Portal.dialog.clickSubmit();
        expect(Portal.loginPage.getRecoveryDialogTitle())
          .toBe('You still need to confirm your email address');
      });

    it('should be able to submit forgot password request after verification',
      function () {
        console.log(user.email);
        MailinatorHelper.getTokenFromEmail(user.email).then(function (token) {
          console.log(token);
          browser.get(token);
          browser.wait(protractor.ExpectedConditions.presenceOf(
            element(by.css(Portal.header.locators.labels.userInfo.css))), 16000); //TODO: add appropriate waiter on helper/PO level
        });

        Portal.signOut();
        Portal.loginPage.clickForgotPassword();
        Portal.loginPage.setRecoveryEmail(user.email);
        Portal.dialog.clickSubmit();
      });

    it('should proper message appear when doing password recovery',
      function () {
        var mess = 'An e-mail has been sent to '
          + user.email + ' with further instructions';
        Portal.loginPage.clickForgotPassword();
        Portal.loginPage.setRecoveryEmail(user.email);
        Portal.dialog.clickSubmit();
        expect(Portal.alerts.getAll().count()).toEqual(1);
        expect(Portal.alerts.getFirst().getText())
          .toEqual(mess);
      });

    xit('should appear reset password form after applying reset URL',
      function () {

        MailinatorHelper.getTokenFromEmail(user.email).then(function (token) {
          console.log(token);
          user.token = token;
          browser.get(token);
        });

        browser.wait(protractor.ExpectedConditions.presenceOf(
          element(by.css(Portal.resetPasswordPage.locators.labels.title.css))), 16000); //TODO: add appropriate waiter on helper/PO level
      });

    it('should be able to reset',
      function () {
        var mess = 'Your password has been changed';
        MailinatorHelper.getTokenFromEmail(user.email).then(function (token) {
          console.log(token);
          browser.get(token);
        });

        browser.wait(protractor.ExpectedConditions.presenceOf(
          element(by.css(Portal.resetPasswordPage.locators.labels.title.css))), 16000); //TODO: add appropriate waiter on helper/PO level

        user.password = '12345678';
        Portal.resetPasswordPage.setNewPassword(user.password);
        Portal.resetPasswordPage.setRepeatPassword(user.password);
        Portal.resetPasswordPage.clickResetPassword();

        expect(Portal.alerts.getFirst().getText())
          .toEqual(mess);
      });

    it('should be able to login with the new pass',
      function () {
        Portal.signIn(user);
      });
  });
});
