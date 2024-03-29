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
  describe('Edit user', function () {

    var users = [
//      config.get('portal.users.revAdmin'),
//      config.get('portal.users.reseller'),
      config.get('portal.users.admin')
    ];

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToUsers();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should contain correct default permissions in edit user form', function (done) {
          Portal.helpers.users
              .create({
                role: Constants.user.roles.ADMIN
              })
              .then(function (testUser) {
                Portal.userListPage.refresh();
                // Edit user
                Portal.userListPage.searchAndClickEdit(testUser.email);
                expect(Portal
                  .editUserPage
                  .form
                  .permissions
                  .getPermission('portalLogin')).toBeTruthy();
                expect(Portal
                  .editUserPage
                  .form
                  .permissions
                  .getPermission('enforce2FA')).toBeFalsy();
                done();
              })
              .catch(done);
        });

        it('should update successfully the "first name" of an "admin-role" user',
          function (done) {
            Portal.helpers.users
              .create({
                role: Constants.user.roles.ADMIN
              })
              .then(function (testUser) {
                var valueToAdd = 'updated';
                Portal.userListPage.refresh();
                // Edit user
                Portal.userListPage.searchAndClickEdit(testUser.email);
                Portal.editUserPage.form.setFirstName(valueToAdd);
                Portal.editUserPage.clickUpdateUser();
                var alert = Portal.alerts.getFirst();
                expect(alert.getText())
                  .toContain(Constants.alertMessages.users.MSG_SUCCESS_UPDATE);
                // Check user is in list
                Portal.editUserPage.clickBackToList();
                var user = Portal.userListPage.searchAndGetFirstRow(testUser.email);
                expect(user.getEmail()).toEqual(testUser.email);
                expect(user.getRole()).toEqual(Constants.user.roles.ADMIN);
                expect(user.getFirstName()).toContain(valueToAdd);
                done();
              })
              .catch(done);
          });

        it('should update successfully the "last name" of an "admin-role" user',
          function (done) {
            Portal.helpers.users
              .create({
                role: Constants.user.roles.ADMIN
              })
              .then(function (testUser) {
                Portal.userListPage.refresh();
                var valueToAdd = 'updated';
                // Edit user
                Portal.userListPage.searchAndClickEdit(testUser.email);
                Portal.editUserPage.form.setLastName(valueToAdd);
                Portal.editUserPage.clickUpdateUser();
                var alert = Portal.alerts.getFirst();
                expect(alert.getText())
                  .toContain(Constants.alertMessages.users.MSG_SUCCESS_UPDATE);
                // Check user is in list
                Portal.editUserPage.clickBackToList();
                var user = Portal.userListPage.searchAndGetFirstRow(testUser.email);
                expect(user.getEmail()).toEqual(testUser.email);
                expect(user.getRole()).toEqual(Constants.user.roles.ADMIN);
                expect(user.getLastName()).toContain(valueToAdd);
                done();
              })
              .catch(done);
          });       
      });
    });
  });
});
