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

describe('Workflow', function () {
  describe('Admin role user', function () {

    var resellerUser = config.get('portal.users.reseller');
    var adminUser = DataProvider.generateUser();
    adminUser.role = Constants.user.roles.ADMIN;
    var anotherAdmin = DataProvider.generateUser();
    anotherAdmin.role = Constants.user.roles.ADMIN;

    beforeAll(function () {
      Portal.signIn(resellerUser);
      Portal.createUser(adminUser);
      Portal.createUser(anotherAdmin);
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToUsers();
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should be able to create other user after it was created by a ' +
      'reseller user',
      function () {
        var tom = DataProvider.generateUser();
        Portal.createUser(tom);
        var user = Portal.userListPage.searchAndGetFirstRow(tom.email);
        expect(user.getEmail()).toEqual(tom.email);
        expect(user.getFirstName()).toEqual(tom.firstName);
        expect(user.getLastName()).toEqual(tom.lastName);
        expect(user.getRole()).toEqual(tom.role);
      });

    it('should be able to update/edit other user after it was created by a ' +
      'reseller user',
      function () {
        var scott = DataProvider.generateUser();
        Portal.createUser(scott);
        Portal.userListPage.searchAndClickEdit(scott.email);
        Portal.editUserPage.updateUser({firstName: 'updated'});
        Portal.editUserPage.clickBackToList();
        var user = Portal.userListPage.searchAndGetFirstRow(scott.email);
        expect(user.getEmail()).toEqual(scott.email);
        expect(user.getFirstName()).toContain('updated');
        expect(user.getLastName()).toEqual(scott.lastName);
        expect(user.getRole()).toEqual(scott.role);
      });

    it('should be able to delete other user after it was created by a ' +
      'reseller user',
      function () {
        var frank = DataProvider.generateUser();
        Portal.createUser(frank);
        var user = Portal.userListPage.searchAndGetFirstRow(frank.email);
        expect(user.getEmail()).toEqual(frank.email);
        // Delete user
        Portal.userListPage.table
          .getFirstRow()
          .clickDelete();
        Portal.dialog.clickOk();
        Portal.userListPage.searcher.setSearchCriteria(frank.email);
        var totalRows = Portal.userListPage.table.getRows().count();
        expect(totalRows).toEqual(0);
      });

    it('should see users created by other admin', function () {
      Portal.signOut();
      // Use new ADMIN to create new USER
      Portal.signIn(anotherAdmin);
      var andrew = DataProvider.generateUser();
      Portal.createUser(andrew);
      Portal.signOut();
      // Check new user is visible to other admin
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToUsers();
      Portal.userListPage.searcher.setSearchCriteria(andrew.email);
      var newTotalRows = Portal.userListPage.table.getRows().count();
      expect(newTotalRows).toEqual(1);
    });

    it('should delete users created by other admin', function () {
      Portal.signOut();
      // Use new ADMIN to create new USER
      Portal.signIn(anotherAdmin);
      var bruce = DataProvider.generateUser();
      Portal.createUser(bruce);
      Portal.signOut();
      // Check new user is visible to other admin
      Portal.signIn(adminUser);
      // Delete user
      Portal.helpers.nav.goToUsers();
      Portal.userListPage.searcher.clearSearchCriteria();
      Portal.userListPage.searcher.setSearchCriteria(user.email);
      Portal.userListPage.table
        .getFirstRow()
        .clickDelete();
      Portal.dialog.clickOk();
      Portal.helpers.nav.goToUsers();
      Portal.userListPage.searcher.setSearchCriteria(bruce.email);
      var newTotalRows = Portal.userListPage.table.getRows().count();
      expect(newTotalRows).toEqual(0);
    });

    it('should edit/update users created by other admin', function () {
      Portal.signOut();
      // Use new ADMIN to create new USER
      Portal.signIn(anotherAdmin);
      var steve = DataProvider.generateUser();
      Portal.createUser(steve);
      Portal.signOut();
      // Check new user is visible to other admin
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToUsers();
      Portal.userListPage.searchAndClickEdit(steve.email);
      Portal.editUserPage.updateUser({firstName: 'updated'});
      Portal.editUserPage.clickBackToList();
      var user = Portal.userListPage.searchAndGetFirstRow(steve.email);
      expect(user.getEmail()).toEqual(steve.email);
      expect(user.getFirstName()).toContain('updated');
    });

    it('should not see reseller user', function () {
      Portal.userListPage.searcher.setSearchCriteria(resellerUser.email);
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
