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
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
//    config.get('portal.users.user'),  // TODO: somehow the test script is looking
// for "Add New User" element and cannot find it for user role (and should not)
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
//    config.get('portal.users.revAdmin') // TODO: need to fix user creation process
// for revadmin role
  ];

  // TODO: need to fix the script to create users with different roles instead of using
  // different roles to create the same test user

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Update user password', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToUpdatePassword();
        });

        it('should display updated password form', function () {
          expect(Portal.updatePasswordPage.isDisplayed()).toBeTruthy();
        });

        it('should update password successfully', function (done) {
          Portal.helpers.users
            .create()
            .then(function (testUser) {
              var newPassword = 'password2';
              Portal.signOut();
              Portal.signIn(testUser);
              Portal.helpers.nav.goToUpdatePassword();
              Portal.updatePasswordPage.setCurrentPassword(testUser.password);
              Portal.updatePasswordPage.setNewPassword(newPassword);
              Portal.updatePasswordPage.setPasswordConfirm(newPassword);
              Portal.updatePasswordPage.clickUpdatePassword();
              var alert = Portal.alerts.getFirst();
              expect(alert.getText())
                .toContain(Constants.alertMessages.users.MSG_SUCCESS_UPDATE_PASSWORD);
              done();
            })
            .catch(done);
        });
      });
    });
  });
});
