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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    xdescribe('With user: ' + user.role, function () {
      describe('Add user', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToUsers();
          Portal.userListPage.clickAddNewUser();
        });

        xit('should display "Add user" form', function () {
          expect(Portal.addUserPage.isDisplayed()).toBeTruthy();
          expect(Portal.addUserPage.form.isDisplayed()).toBeTruthy();
        });

        xit('should allow to cancel an user edition', function () {
          Portal.addUserPage.form.setEmail('something');
          Portal.addUserPage.clickCancel();
          expect(Portal.userListPage.isDisplayed()).toBeTruthy();
        });

        xit('should create an user successfully when filling all required data',
          function () {
            // Create user
            var bruce = DataProvider.generateUser();
            Portal.addUserPage.createUser(bruce);
            // Check App alert notifications
            expect(Portal.alerts.getFirst().getText())
              .toContain(Constants.alertMessages.users.MSG_SUCCESS_ADD);
          });
      });
    });
  });
  // Tests for users with READ-ONLY permissions
  var roUsers = [
    config.get('portal.users.roResseler')
  ];

  roUsers.forEach(function (user) {
    describe('With user: ' + user.role, function () {
      describe('Add user', function () {
        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

         beforeEach(function () {
          Portal.helpers.nav.goToUsers();
        });

        it('should button "Add new User" is no active',function(){
           browser.sleep(5000);
          expect(Portal.userListPage.isDisplayed()).toBeTruthy();
          Portal.userListPage.clickAddNewUser();
          expect(Portal.userListPage.isDisplayed()).toBeTruthy();

        });
      });
    });
  });

});
