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
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('Delete user', function () {

    var users = [
      config.get('portal.users.admin')
    ];
    var testUser;

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToUsers();
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function (done) {
          Portal.helpers.users
            .create()
            .then(function (newUser) {
              testUser = newUser;
              Portal.userListPage.refresh();
              done();
            })
            .catch(done);
        });

        afterEach(function () {
          testUser = undefined;
        });

        it('should delete successfully a user with "admin" role',
          function () {
            Portal.userListPage.searchAndClickDelete(testUser.email);
            Portal.dialog.clickOk();
            Portal.userListPage.searcher.setSearchCriteria(testUser.email);
            var tableRows = Portal.userListPage.table.getRows();
            expect(tableRows.count()).toEqual(0);
          });

        it('should delete successfully a user with "user" role',
          function () {
            Portal.userListPage.searchAndClickDelete(testUser.email);
            Portal.dialog.clickOk();
            Portal.userListPage.searcher.setSearchCriteria(testUser.email);
            var tableRows = Portal.userListPage.table.getRows();
            expect(tableRows.count()).toEqual(0);
          });

        it('should confirm user deletion when clicking "Ok" button',
          function () {
            Portal.userListPage.searchAndClickDelete(testUser.email);
            var okBtn = Portal.dialog.getOkBtn();
            expect(okBtn.isDisplayed()).toBeTruthy();
            Portal.dialog.clickOk();
            Portal.userListPage.searcher.setSearchCriteria(testUser.email);
            var tableRows = Portal.userListPage.table.getRows();
            expect(tableRows.count()).toEqual(0);
          });

        it('should cancel the deletion when clicking "Cancel" button',
          function () {
            Portal.userListPage.searchAndClickDelete(testUser.email);
            var okBtn = Portal.dialog.getCancelBtn();
            expect(okBtn.isDisplayed()).toBeTruthy();
            Portal.dialog.clickCancel();
            var tableRows = Portal.userListPage.table.getRows();
            expect(tableRows.count()).toEqual(1);
            Portal.userListPage.searchAndClickDelete(testUser.email);
            Portal.dialog.clickOk();
          });

        it('should cancel the deletion after pressing "ESCAPE" key',
          function () {
            Portal.userListPage.searchAndClickDelete(testUser.email);
            Portal.dialog.getModalEl().sendKeys(protractor.Key.ESCAPE);
            var tableRows = Portal.userListPage.table.getRows();
            expect(tableRows.count()).toEqual(1);
            Portal.userListPage.searchAndClickDelete(testUser.email);
            Portal.dialog.clickOk();
          });

        it('should not login a deleted user',
          function () {
            Portal.userListPage.searchAndClickDelete(testUser.email);
            Portal.dialog.clickOk();
            Portal.signOut().then(function () {
              Portal.signIn(testUser, false);
              var alert = Portal.alerts.getFirst();
              expect(alert.getText()).toContain(Constants
                .alertMessages
                .users
                .MSG_WRONG_USERNAME_PASSWORD);
              Portal.signIn(user);
            });
          });
      });
    });
  });
});
