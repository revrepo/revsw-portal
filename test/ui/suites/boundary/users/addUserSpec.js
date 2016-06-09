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
  describe('Add user', function () {

    var adminUser = config.get('portal.users.admin');
    // NOTE: All test on one open form
    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.selectUsersItem();
      Portal.userListPage.clickAddNewUserThroughClassName();
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
      Portal.addUserPage.form.clear(adminUser);
    });

    it('should not allow to create user with long email address (> 64 chars).',
      function () {
        var tommy = DataProvider.generateUser('Tommy');
        tommy.email = 'email678901234567890123456789012345678901234567890' +
          '123456789012345@ui-test-email.com';
        Portal.addUserPage.form.fill(tommy);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not allow to create user with long First Name.', function () {
      var rocky = DataProvider.generateUser('Rocky');
      rocky.firstName += ' is an invalid name longer than thirty characters.';
      Portal.addUserPage.form.fill(rocky);
      var addBtn = Portal.addUserPage.getCreateUserBtn();
      expect(addBtn.isEnabled()).toBeFalsy();
    });

    it('should not allow to create user with long Last Name.', function () {
      var paul = DataProvider.generateUser('Paul');
      paul.lastName += ' is an invalid name longer than thirty characters.';
      Portal.addUserPage.form.fill(paul);
      var addBtn = Portal.addUserPage.getCreateUserBtn();
      expect(addBtn.isEnabled()).toBeFalsy();
    });

    it('should not create user when the "Password" value is not 8 characters ' +
      'long',
      function () {
        var michael = DataProvider.generateUser('Michael');
        michael.password = '123';
        michael.passwordConfirm = '123';
        Portal.addUserPage.form.fill(michael);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });

    it('should not create user when the "Password" value is greater than ' +
      '15 characters long',
      function () {
        var vincent = DataProvider.generateUser('Vincent');
        vincent.password = '1234567890123456789012345678901234567890';
        vincent.passwordConfirm = '1234567890123456789012345678901234567890';
        Portal.addUserPage.form.fill(vincent);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
      });
  });
});
