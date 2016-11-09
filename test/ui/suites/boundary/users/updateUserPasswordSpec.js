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

describe('Boundary', function () {
  describe('Update user password', function () {

    var tom;
    var users = [
      config.get('portal.users.admin')
    ];

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeAll(function (done) {
          Portal
            .signIn(user)
            .then(function () {
              Portal.helpers.users
                .create({firstName: 'Tom'})
                .then(function (user) {
                  tom = user;
                  Portal.signOut();
                  done();
                })
                .catch(done);
            })
            .catch(done);
        });

        beforeEach(function () {
          Portal.signIn(tom);
          Portal.helpers.nav.goToUpdatePassword();
          Portal.helpers.nav.goToUpdatePassword();
        });

        afterEach(function () {
          Portal.signOut();
        });

        it('should not update the password when it is less than 8 chars ' +
          'length.',
          function () {
            var newPassword = '123';
            Portal.updatePasswordPage.setCurrentPassword(tom.password);
            Portal.updatePasswordPage.setNewPassword(newPassword);
            Portal.updatePasswordPage.setPasswordConfirm(newPassword);
            var updateBtn = Portal.updatePasswordPage.getUpdatePasswordBtn();
            expect(updateBtn.isEnabled()).toBeFalsy();
          });

        it('should not update the password when it is greater than 15 chars ' +
          'length.',
          function () {
            var newPassword = '01234567890123456789';
            Portal.updatePasswordPage.setCurrentPassword(tom.password);
            Portal.updatePasswordPage.setNewPassword(newPassword);
            Portal.updatePasswordPage.setPasswordConfirm(newPassword);
            var updateBtn = Portal.updatePasswordPage.getUpdatePasswordBtn();
            expect(updateBtn.isEnabled()).toBeFalsy();
          });

        it('should not update the password when filling only blank spaces',
          function () {
            var newPassword = '        '; // 8 spaces
            Portal.updatePasswordPage.setCurrentPassword(tom.password);
            Portal.updatePasswordPage.setNewPassword(newPassword);
            Portal.updatePasswordPage.setPasswordConfirm(newPassword);
            Portal.updatePasswordPage.clickUpdatePassword();
            var alert = Portal.alerts.getFirst();
            var expectedMessage = 'Please fill all fields. (New password ' +
              'should be at least 8 characters length)';
            expect(alert.getText()).toContain(expectedMessage);
          });
      });
    });
  });
});
