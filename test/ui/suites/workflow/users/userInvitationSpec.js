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
var Constants = require('./../../../page_objects/constants');
var DataProvider = require('./../../../common/providers/data');
var Mailinator = require('./../../../mailinator/helper');

describe('Workflow', function () {
  describe('User invitation', function () {
    var users = [
      config.portal.users.admin,
      config.portal.users.reseller,
      config.portal.users.revAdmin
    ];

    var roles = [
      'admin',
    ];

    users.forEach(function (user) {

      if (user.role !== 'Admin') {
        // Test inviting a reseller too if we are not an admin
        roles.push('reseller');
      }

      roles.forEach(function (role) {
        describe('With user - ' + user.role + '. Inviting user - ' + role, function () {

          var invitedUser = DataProvider.generateUser({
            role: role
          });

          if (user.role === 'Admin') {
            delete invitedUser.role;
          } else {
            invitedUser.company = [user.account.companyName];
          }

          beforeAll(function () {
            Portal.signIn(user);
            invitedUser = DataProvider.generateUser();
            if (user.role === 'Admin') {
              delete invitedUser.role;
            } else {
              invitedUser.company = [user.account.companyName];
            }
            Portal.helpers.nav.goToUsers();
            Portal.userListPage.clickAddNewUser();
            Portal.addUserPage.form.fill(invitedUser);
            Portal.addUserPage.clickCreateUser();
          });

          it('should successfully send an invitation email '
            + 'to a newly created user', function (done) {
              Mailinator
                .getInvitationURL(invitedUser.email)
                .then(function (url) {
                  expect(url).not.toBe('');
                  done();
                });
            });

          it('should successfully set a password through the invitation link '
            + ' and login to the portal', function (done) {
              Mailinator
                .getInvitationURL(invitedUser.email)
                .then(function (url) {
                  browser.get(url).then(function () {
                    Portal.invitationPage.setPass('password1');
                    browser.refresh();
                    Portal.invitationPage.setNewPassword('password1');
                    Portal.alerts.waitToDisplay(60000);
                    var alert = Portal.alerts.getFirst();
                    expect(alert.getText()).toContain(Constants
                      .alertMessages
                      .users
                      .MSG_SUCCESS_SET_PASSWORD);
                    invitedUser.password = 'password1';
                    Portal.loginPage.setEmail(invitedUser.email);
                    Portal.loginPage.setPassword(invitedUser.password);
                    Portal.loginPage.clickSignIn();
                    expect(Portal.header.getUserInfoEl().isDisplayed()).toBeTruthy();
                    var headerText = invitedUser.firstName + ' ' + invitedUser.lastName +
                      ' (' + (invitedUser.role || 'admin') + ')';
                    expect(Portal.header.getUserInfoEl().getText()).toContain(headerText);
                    expect(Portal
                      .header
                      .getUserInfoEl()
                      .getText()).toContain(user.account.companyName);
                    done();
                  });
                });
            });
        });
      });
    });
  });
});
