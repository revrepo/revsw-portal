/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

describe('Negative', function () {

  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
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

      beforeEach(function () {
      });

      it('should not create user when a required field is filled with blank ' +
        'space chars',
        function () {
          var emptyUserData = {};
          Portal.userListPage.clickAddNewUser();
          Portal.addUserPage.form.fill(emptyUserData);
          var addBtn = Portal.addUserPage.getCreateUserBtn();
          expect(addBtn.isEnabled()).toBeFalsy();
        });

      it('should not create user when the filled email is already used by ' +
        'another user',
        function () {
          var tom = DataProvider.generateUser();
          var jerry = DataProvider.generateUser();
          jerry.email = tom.email;
          if (user.role === 'Admin') {
            delete jerry.role;
            delete tom.role;
          } else {
            jerry.company = [user.account.companyName];
            tom.company = [user.account.companyName];
          }
          Portal.userListPage.clickAddNewUser();
          Portal.addUserPage.createUser(tom);
          Portal.addUserPage.clickBackToList();
          Portal.userListPage.clickAddNewUser();
          Portal.addUserPage.createUser(jerry);
          expect(Portal.alerts.getAll().count()).not.toEqual(0);
          var alert = Portal.alerts.getFirst();
          var expectedMessage = Constants.alertMessages.users.MSG_FAIL_ADD_EMAIL_EXISTS;
          expect(alert.getText()).toContain(expectedMessage);
          Portal.addUserPage.clickBackToList();
          browser.sleep(5);
        });

      it('should not allow to create a user without email',
        function () {
          var derek = DataProvider.generateUser();
          derek.email = '';
          Portal.userListPage.clickAddNewUser();
          if (user.role === 'Admin') {
            delete derek.role;
          } else {
            derek.company = [user.account.companyName];
          }
          Portal.addUserPage.form.fill(derek);
          var addBtn = Portal.addUserPage.getCreateUserBtn();
          expect(addBtn.isEnabled()).toBeFalsy();
        });

      it('should not allow to create a user without first name',
        function () {
          var mathew = DataProvider.generateUser();
          mathew.firstName = '';
          Portal.userListPage.clickAddNewUser();
          if (user.role === 'Admin') {
            delete mathew.role;
          } else {
            mathew.company = [user.account.companyName];
          }
          Portal.addUserPage.form.fill(mathew);
          var addBtn = Portal.addUserPage.getCreateUserBtn();
          expect(addBtn.isEnabled()).toBeFalsy();
        });

      it('should not allow to create a user without last name',
        function () {
          var mathew = DataProvider.generateUser();
          mathew.lastName = '';
          Portal.userListPage.clickAddNewUser();
          if (user.role === 'Admin') {
            delete mathew.role;
          } else {
            mathew.company = [user.account.companyName];
          }
          Portal.addUserPage.form.fill(mathew);
          var addBtn = Portal.addUserPage.getCreateUserBtn();
          expect(addBtn.isEnabled()).toBeFalsy();
        });

      if (user.role === 'Reseller') {
        it('should not allow to create a user without any role',
        function () {
          var scott = DataProvider.generateUser();
          scott.role = '--- Select Role ---';
          Portal.userListPage.clickAddNewUser();
          Portal.addUserPage.form.fill(scott);
          var addBtn = Portal.addUserPage.getCreateUserBtn();
          expect(addBtn.isEnabled()).toBeFalsy();
        });
      }
    });
  });


});
