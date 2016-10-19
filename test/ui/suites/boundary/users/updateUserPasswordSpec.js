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
var DataProvider = require('./../../../common/providers/data');

describe('Boundary', function () {
  describe('Update user password', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToUsers();
    });

    it('should not update the password when it is less than 8 chars length.',
      function () {
        var bret = DataProvider.generateUser();
        var newPassword = '123';
        Portal.createUser(bret);
        Portal.signOut();
        Portal.signIn(bret);
        Portal.helpers.nav.goToUpdatePassword();
        Portal.updatePasswordPage.setCurrentPassword(bret.password);
        Portal.updatePasswordPage.setNewPassword(newPassword);
        Portal.updatePasswordPage.setPasswordConfirm(newPassword);
        var updateBtn = Portal.updatePasswordPage.getUpdatePasswordBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
      });

    it('should not update the password when it is greater than 15 chars ' +
      'length.',
      function () {
        var bruno = DataProvider.generateUser();
        var newPassword = '01234567890123456789';
        Portal.createUser(bruno);
        Portal.signOut();
        Portal.signIn(bruno);
        Portal.helpers.nav.goToUpdatePassword();
        Portal.updatePasswordPage.setCurrentPassword(bruno.password);
        Portal.updatePasswordPage.setNewPassword(newPassword);
        Portal.updatePasswordPage.setPasswordConfirm(newPassword);
        var updateBtn = Portal.updatePasswordPage.getUpdatePasswordBtn();
        expect(updateBtn.isEnabled()).toBeFalsy();
      });

    it('should not update the password when filling only blank spaces',
      function () {
        var carol = DataProvider.generateUser();
        var newPassword = '        '; // 8 spaces
        Portal.createUser(carol);
        Portal.signOut();
        Portal.signIn(carol);
        Portal.helpers.nav.goToUpdatePassword();
        Portal.updatePasswordPage.setCurrentPassword(carol.password);
        Portal.updatePasswordPage.setNewPassword(newPassword);
        Portal.updatePasswordPage.setPasswordConfirm(newPassword);
        Portal.updatePasswordPage.clickUpdatePassword();
        var alert = Portal.alerts.getFirst();
        var expectedMessage = '×\nPlease fill all fields. (New password should ' +
            'be at least 8 characters length)';
        expect(alert.getText()).toEqual(expectedMessage);
      });
  });
});
