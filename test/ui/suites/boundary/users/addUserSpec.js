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
      Portal.helpers.nav.goToUsers();
      Portal.userListPage.clickAddNewUser();
    });

    afterAll(function () {
      Portal.signOut();
    });

    afterEach(function () {
      Portal.addUserPage.form.clear(adminUser);
    });

    it('should not allow to create user with long email address (> 64 chars).',
      function () {
        var tommy = DataProvider.generateUser();
        delete tommy.role;
        tommy.email = 'email678901234567890123456789012345678901234567890' +
          '123456789012345@ui-test-email.com';
        Portal.addUserPage.form.fill(tommy);
        var addBtn = Portal.addUserPage.getCreateUserBtn();
        expect(addBtn.isEnabled()).toBeFalsy();
        expect(Portal.addUserPage.form.getEmailTxtIn().getAttribute('class'))
          .toMatch('ng-invalid');
        expect(Portal.addUserPage.form.getEmailTxtIn().getAttribute('class'))
          .toMatch('ng-invalid-maxlength');
    });

    it('should not allow to create user with long First Name.', function () {
      var rocky = DataProvider.generateUser();
      delete rocky.role;
      rocky.firstName += ' is an invalid name longer than thirty characters.';
      Portal.addUserPage.form.fill(rocky);
      var addBtn = Portal.addUserPage.getCreateUserBtn();
      expect(addBtn.isEnabled()).toBeFalsy();
      expect(Portal.addUserPage.form.getFirstNameTxtIn().getAttribute('class'))
        .toMatch('ng-invalid');
      expect(Portal.addUserPage.form.getFirstNameTxtIn().getAttribute('class'))
        .toMatch('ng-invalid-maxlength');
    });

    it('should not allow to create user with long Last Name.', function () {
      var paul = DataProvider.generateUser();
      delete paul.role;
      paul.lastName += ' is an invalid name longer than thirty characters.';
      Portal.addUserPage.form.fill(paul);
      var addBtn = Portal.addUserPage.getCreateUserBtn();
      expect(addBtn.isEnabled()).toBeFalsy();
      expect(Portal.addUserPage.form.getLastNameTxtIn().getAttribute('class'))
        .toMatch('ng-invalid');
      expect(Portal.addUserPage.form.getLastNameTxtIn().getAttribute('class'))
        .toMatch('ng-invalid-maxlength');
    });
  });
});
