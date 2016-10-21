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
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
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
          Portal.helpers.nav.goToUsers();
        });

        it('should display edit user button', function () {
          var editButton = Portal.userListPage.table
            .getFirstRow()
            .getEditBtn();
          expect(editButton.isPresent()).toBeTruthy();
        });

        it('should display "Edit User" form', function () {
          Portal.userListPage.table
            .getFirstRow()
            .clickEdit();
          expect(Portal.editUserPage.isDisplayed()).toBeTruthy();
        });

        it('should allow to cancel an user edition', function () {
          Portal.userListPage.table
            .getFirstRow()
            .clickEdit();
          Portal.editUserPage.form.setFirstName('Something Else');
          Portal.editUserPage.clickCancel();
          expect(Portal.userListPage.isDisplayed()).toBeTruthy();
        });

        it('should update user when filling required data', function (done) {
          Portal.helpers.users
            .create()
            .then(function (testUser) {
              Portal.helpers.nav.goToDashboards();
              Portal.helpers.nav.goToUsers();
              // Edit user name and last name
              Portal.userListPage.searcher.setSearchCriteria(testUser.email);
              Portal.userListPage.table
                .getFirstRow()
                .clickEdit();
              var valueAdded = 'user-updated';
              Portal.editUserPage.form.setFirstName(valueAdded);
              Portal.editUserPage.form.setLastName(valueAdded);
              Portal.editUserPage.clickUpdateUser();
              // Check alert message and data updated
              var alert = Portal.alerts.getFirst();
              expect(alert.getText())
                .toContain(Constants.alertMessages.users.MSG_SUCCESS_UPDATE);
              var updatedFirstName = Portal.editUserPage.form.getFirstName();
              var updatedLastName = Portal.editUserPage.form.getLastName();
              expect(updatedFirstName).toContain(valueAdded);
              expect(updatedLastName).toContain(valueAdded);
              done();
            })
            .catch(done);
        });
      });
    });
  });
});
