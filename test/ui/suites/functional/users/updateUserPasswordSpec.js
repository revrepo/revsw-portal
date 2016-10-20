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

var config = require('config');
var Portal = require('./../../../page_objects/portal');
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('Update user password', function () {

    var users = [
      config.get('portal.users.admin')
    ];
    var testUser;

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeEach(function (done) {
          Portal.session.setCurrentUser(user);
          Portal.helpers.users
            .create()
            .then(function (newUser) {
              testUser = newUser;
              done();
            })
            .catch(done);
        });

        it('should go to "User List" page when clicking "Back" button',
          function () {
            Portal.signIn(user);
            Portal.helpers.nav.goToUpdatePassword();
            Portal.updatePasswordPage.clickBackToList();
            expect(Portal.userListPage.isDisplayed()).toBeTruthy();
            Portal.signOut();
          });

        it('should update password successfully using only letter values',
          function () {
            var newPassword = 'newpassword';
            Portal.signIn(testUser);
            Portal.helpers.nav.goToUpdatePassword();
            Portal.updatePasswordPage.setCurrentPassword(testUser.password);
            Portal.updatePasswordPage.setNewPassword(newPassword);
            Portal.updatePasswordPage.setPasswordConfirm(newPassword);
            Portal.updatePasswordPage.clickUpdatePassword();
            var alert = Portal.alerts.getFirst();
            expect(alert.getText())
              .toContain(Constants.alertMessages.users.MSG_SUCCESS_UPDATE_PASSWORD);
            Portal.signOut();
          });

        it('should update password successfully  using only numbers',
          function () {
            var newPassword = '12345678';
            Portal.signIn(testUser);
            Portal.helpers.nav.goToUpdatePassword();
            Portal.updatePasswordPage.setCurrentPassword(testUser.password);
            Portal.updatePasswordPage.setNewPassword(newPassword);
            Portal.updatePasswordPage.setPasswordConfirm(newPassword);
            Portal.updatePasswordPage.clickUpdatePassword();
            var alert = Portal.alerts.getFirst();
            expect(alert.getText())
              .toContain(Constants.alertMessages.users.MSG_SUCCESS_UPDATE_PASSWORD);
            Portal.signOut();
          });
      });
    });
  });
});
