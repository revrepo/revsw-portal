/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
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

var config = require('config');
var Portal = require('./../../../page_objects/portal');

describe('Negative', function () {
  describe('Update user password', function () {

    var users = [
      config.get('portal.users.admin')
    ];
    var testUser;

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeAll(function (done) {
          Portal.session.setCurrentUser(user);
          Portal.helpers.users
            .create()
            .then(function (newUser) {
              testUser = newUser;
              Portal.signIn(testUser);
              done();
            })
            .catch(done);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToUpdatePassword();
        });

        it('should not enable the Update Password button when no fields are ' +
          'filled',
          function () {
            var updateBtn = Portal.updatePasswordPage.getUpdatePasswordBtn();
            expect(updateBtn.isEnabled()).toBeFalsy();
          });

        it('should display error message when the "current password" is ' +
          'invalid',
          function () {
            var invalidCurrPassword = 'invalidpwd';
            var newPassword = 'password2';
            Portal.updatePasswordPage.update(invalidCurrPassword, newPassword);
            var alert = Portal.alerts.getFirst();
            var expectedMessage = '×\nThe current user password is not correct';
            expect(alert.getText()).toEqual(expectedMessage);
          });

        it('should not update password when the "current password" is invalid',
          function () {
            var invalidCurrPassword = 'invalidpwd';
            var newPassword = 'password2';
            Portal.updatePasswordPage.update(invalidCurrPassword, newPassword);
            Portal.signOut();
            Portal.signIn({
              email: testUser.email,
              password: newPassword
            });
            var alert = Portal.alerts.getFirst();
            var expectedMessage = '×\nWrong username or password';
            expect(alert.getText()).toEqual(expectedMessage);
            Portal.signIn(testUser);
          });

        it('should display error message when the "password" and "confirm ' +
          'password" do not match',
          function () {
            var newPassword = 'password2';
            var newPasswordConfirm = 'something2';
            Portal.updatePasswordPage.setCurrentPassword(testUser.password);
            Portal.updatePasswordPage.setNewPassword(newPassword);
            Portal.updatePasswordPage.setPasswordConfirm(newPasswordConfirm);
            var updateBtn = Portal.updatePasswordPage.getUpdatePasswordBtn();
            expect(updateBtn.isEnabled()).toBeFalsy();
          });

        it('should not allow to update password with a value less than 8 chars',
          function () {
            var newPassword = '123';
            Portal.helpers.nav.goToUpdatePassword();
            Portal.updatePasswordPage.setCurrentPassword(testUser.password);
            Portal.updatePasswordPage.setNewPassword(newPassword);
            Portal.updatePasswordPage.setPasswordConfirm(newPassword);
            var updateBtn = Portal.updatePasswordPage.getUpdatePasswordBtn();
            expect(updateBtn.isEnabled()).toBeFalsy();
          });

        it('should display an error message when trying to update password ' +
          'with a value greater than 15 chars',
          function () {
            var newPassword = '12345678901234567890';
            Portal.helpers.nav.goToUpdatePassword();
            Portal.updatePasswordPage.setCurrentPassword(testUser.password);
            Portal.updatePasswordPage.setNewPassword(newPassword);
            Portal.updatePasswordPage.setPasswordConfirm(newPassword);
            var updateBtn = Portal.updatePasswordPage.getUpdatePasswordBtn();
            expect(updateBtn.isEnabled()).toBeFalsy();
          });
      });
    });
  });
});
