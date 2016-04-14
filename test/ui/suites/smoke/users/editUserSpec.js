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
var DataProvider = require('./../../../common/providers/data');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin') // TODO: need to fix the user creation process
// for revadmin role
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Edit user', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.getUsersPage();
        });

        it('should display edit user button', function () {
          var editButton = Portal.userListPage.userTbl
            .getFirstRow()
            .getEditBtn();
          expect(editButton.isPresent()).toBeTruthy();
        });

        it('should display "Edit User" form', function () {
          Portal.userListPage.userTbl
            .getFirstRow()
            .clickEdit();
          expect(Portal.editUserPage.isDisplayed()).toBeTruthy();
        });

        it('should allow to cancel an user edition', function () {
          Portal.userListPage.userTbl
            .getFirstRow()
            .clickEdit();
          Portal.editUserPage.userForm.setFirstName('Something Else');
          Portal.editUserPage.clickCancel();
          expect(Portal.userListPage.isDisplayed()).toBeTruthy();
        });

        it('should update user when filling all required data', function () {
          var joe = DataProvider.generateUser('Joe');
          // TODO need to find a more decent way to deal with company
          // assignments for reseller/revadmin roles
          if (user.role === 'Admin') {
            delete joe.company;
          }
          Portal.createUser(joe);
          // Edit user name and last name
          Portal.userListPage.searcher.setSearchCriteria(joe.email);
          Portal.userListPage.userTbl
            .getFirstRow()
            .clickEdit();
          var valueAdded = 'user-updated';
          Portal.editUserPage.userForm.setFirstName(valueAdded);
          Portal.editUserPage.userForm.setLastName(valueAdded);
          Portal.editUserPage.clickUpdateUser();
          // Check alert message and data updated
          var alert = Portal.alerts.getFirst();
          expect(alert.getText()).toEqual('User updated');
          var updatedFirstName = Portal.editUserPage.userForm.getFirstName();
          var updatedLastName = Portal.editUserPage.userForm.getLastName();
          expect(updatedFirstName).toContain(valueAdded);
          expect(updatedLastName).toContain(valueAdded);
          Portal.editUserPage.clickBackToList();
          // Delete created user
          Portal.deleteUser(joe);
        });
      });
    });
  });
});
