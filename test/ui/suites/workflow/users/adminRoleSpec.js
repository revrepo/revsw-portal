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

describe('Workflow', function () {
  describe('Admin role user', function () {

    var users = [
      config.get('portal.users.reseller')
    ];
    var adminUser;
    var anotherAdmin;

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeAll(function (done) {
          Portal.session.setCurrentUser(user);
          Portal.helpers.users
            .create({role: Constants.user.roles.ADMIN})
            .then(function (firstAdmin) {
              adminUser = firstAdmin;
              Portal.helpers.users
                .create({role: Constants.user.roles.ADMIN})
                .then(function (secondAdmin) {
                  anotherAdmin = secondAdmin;
                  done();
                })
                .catch(done);
            })
            .catch(done);
        });

        beforeEach(function () {
          Portal.signIn(adminUser);
        });

        afterEach(function () {
          Portal.signOut();
        });

        it('should be able to create other user after it was created by a ' +
          'reseller user',
          function (done) {
            Portal.helpers.users
              .create()
              .then(function (testUser) {
                Portal.userListPage.refresh();
                var user = Portal.userListPage.searchAndGetFirstRow(testUser.email);
                expect(user.getEmail()).toEqual(testUser.email);
                expect(user.getFirstName()).toEqual(testUser.firstName);
                expect(user.getLastName()).toEqual(testUser.lastName);
                expect(user.getRole()).toEqual(testUser.role);
                done();
              })
              .catch(done);
          });

        it('should be able to update/edit other user after it was created by ' +
          'a reseller user',
          function (done) {
            Portal.helpers.users
              .create()
              .then(function (testUser) {
                Portal.userListPage.refresh();
                Portal.userListPage.searchAndClickEdit(testUser.email);
                Portal.editUserPage.updateUser({firstName: 'updated'});
                Portal.editUserPage.clickBackToList();
                var user = Portal.userListPage
                  .searchAndGetFirstRow(testUser.email);
                expect(user.getEmail()).toEqual(testUser.email);
                expect(user.getFirstName()).toContain('updated');
                expect(user.getLastName()).toEqual(testUser.lastName);
                expect(user.getRole()).toEqual(testUser.role);
                done();
              })
              .catch(done);
          });

        it('should be able to delete other user after it was created by a ' +
          'reseller user',
          function (done) {
            Portal.helpers.users
              .create()
              .then(function (testUser) {
                Portal.userListPage.refresh();
                var user = Portal.userListPage
                  .searchAndGetFirstRow(testUser.email);
                expect(user.getEmail()).toEqual(testUser.email);
                // Delete user
                Portal.userListPage.table
                  .getFirstRow()
                  .clickDelete();
                Portal.dialog.clickOk();
                Portal.userListPage.searcher.setSearchCriteria(testUser.email);
                var totalRows = Portal.userListPage.table.getRows().count();
                expect(totalRows).toEqual(0);
                done();
              })
              .catch(done);
          });

        it('should see users created by other admin', function (done) {
          // Use new ADMIN to create new USER
          var currentUser = Portal.session.getCurrentUser();
          Portal.session.setCurrentUser(anotherAdmin);
          Portal.helpers.users
            .create()
            .then(function (testUser) {
              Portal.session.setCurrentUser(currentUser);
              // Check new user is visible to other admin
              Portal.userListPage.refresh();
              Portal.userListPage.searcher.setSearchCriteria(testUser.email);
              var newTotalRows = Portal.userListPage.table.getRows().count();
              expect(newTotalRows).toEqual(1);
              done();
            })
            .catch(done);
        });

        it('should delete users created by other admin', function (done) {
          var currentUser = Portal.session.getCurrentUser();
          Portal.session.setCurrentUser(anotherAdmin);
          Portal.helpers.users
            .create()
            .then(function (testUser) {
              Portal.session.setCurrentUser(currentUser);
              // Delete user
              Portal.userListPage.refresh();
              Portal.userListPage.searcher.clearSearchCriteria();
              Portal.userListPage.searcher.setSearchCriteria(testUser.email);
              Portal.userListPage.table
                .getFirstRow()
                .clickDelete();
              Portal.dialog.clickOk();
              Portal.helpers.nav.goToUsers();
              Portal.userListPage.searcher.setSearchCriteria(testUser.email);
              var newTotalRows = Portal.userListPage.table.getRows().count();
              expect(newTotalRows).toEqual(0);
              done();
            })
            .catch(done);
        });

        it('should edit/update users created by other admin', function (done) {
          var currentUser = Portal.session.getCurrentUser();
          Portal.session.setCurrentUser(anotherAdmin);
          Portal.helpers.users
            .create()
            .then(function (testUser) {
              Portal.session.setCurrentUser(currentUser);
              // Check new user is visible to other admin
              Portal.userListPage.refresh();
              Portal.userListPage.searchAndClickEdit(testUser.email);
              Portal.editUserPage.updateUser({firstName: 'updated'});
              Portal.editUserPage.clickBackToList();
              var firstUser = Portal.userListPage
                .searchAndGetFirstRow(testUser.email);
              expect(firstUser.getEmail()).toEqual(testUser.email);
              expect(firstUser.getFirstName()).toContain('updated');
              done();
            })
            .catch(done);
        });

        it('should not see reseller user', function () {
          Portal.helpers.nav.goToUsers();
          Portal.userListPage.searcher.setSearchCriteria(user.email);
          var totalRows = Portal.userListPage.table.getRows().count();
          expect(totalRows).toEqual(0);
        });

        it('should be able to login successfully once it was created by an ' +
          'reseller user',
          function () {
            var userInfoEl = Portal.header.getUserInfoEl();
            expect(userInfoEl.isDisplayed()).toBeTruthy();
          });

        it('should be able to change his password and login again using it',
          function () {
            var oldPassword = adminUser.password;
            var newPassword = 'pwd123456';
            Portal.helpers.nav.goToUpdatePassword();
            Portal.updatePasswordPage.update(adminUser.password, newPassword);
            Portal.signOut();
            Portal.signIn({email: adminUser.email, password: newPassword});
            var userInfoEl = Portal.header.getUserInfoEl();
            expect(userInfoEl.isDisplayed()).toBeTruthy();
            Portal.helpers.nav.goToUpdatePassword();
            Portal.updatePasswordPage.update(newPassword, oldPassword);
          });
      });
    });
  });
});
