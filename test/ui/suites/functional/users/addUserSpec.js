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
  describe('Add user', function () {

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

    it('should display a successful message when creating user', function () {
      var bret = DataProvider.generateUser();
      Portal.userListPage.clickAddNewUser();
      Portal.addUserPage.createUser(bret);
      var alert = Portal.alerts.getFirst();
      expect(alert.getText())
        .toContain(Constants.alertMessages.users.MSG_SUCCESS_ADD);
      Portal.addUserPage.clickBackToList();
    });

    it('should create a new user with "user" role', function () {
      var carl = DataProvider.generateUser();
      carl.role = Constants.user.roles.USER;
      Portal.createUser(carl);
      Portal.userListPage.searcher.setSearchCriteria(carl.email);
      var user = Portal.userListPage.table.getFirstRow();
      expect(user.getRole()).toEqual(Constants.user.roles.USER);
    });

    it('should create a new user with "admin" role', function () {
      var tom = DataProvider.generateUser();
      tom.role = Constants.user.roles.ADMIN;
      Portal.createUser(tom);
      Portal.userListPage.searcher.setSearchCriteria(tom.email);
      var user = Portal.userListPage.table.getFirstRow();
      expect(user.getRole()).toEqual(Constants.user.roles.ADMIN);
    });
  });
});
