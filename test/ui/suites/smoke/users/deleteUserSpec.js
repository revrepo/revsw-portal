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

// Requiring config information which stores data about test users
var config = require('config');

// Requiring the main Page Object, the entry point to handle all other page
// objects that our specs are goint to need.
var Portal = require('./../../../page_objects/portal');

var Constants = require('./../../../page_objects/constants');

// Defining smoke suite
describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      // Defining suite for deleting a user
      describe('Delete user', function () {

        // Use this block to run some code before all specs are run
        beforeAll(function () {
          Portal.signIn(user);
        });

        // Use this block to run some code after all specs are run
        afterAll(function () {
          Portal.signOut();
        });

        // Use this block to run some code before each spec is run
        beforeEach(function () {
        });

        // Use this block to run some code after each spec is run
        afterEach(function () {
        });

        // This is an spec
        it('should display delete user button', function () {
          Portal.helpers.nav.goToUsers();
          // Getting reference to the delete button of the first user from the
          // list
          var deleteButton = Portal.userListPage.table
            .getFirstRow()
            .getDeleteBtn();

          // Validate delete button is displayed
          expect(deleteButton.isDisplayed()).toBeTruthy();
        });

        // This is another spec
        it('should allow to delete user', function (done) {
          // Create user Tom in portal app.
          // This is a Helper method that internally executes some other steps
          // required to create a user in portal app using the given user
          // information.
          Portal.helpers.users
            .create()
            .then(function (testUser) {
              Portal.userListPage.refresh();
              // Another helper method to search/filter the list by the provided
              // filter criteria (in this case an email) and then licks on the
              // delete button of the first user displayed after the filter is
              // applied.
              Portal.userListPage.searchAndClickDelete(testUser.email);

              // Clicks on OK button from the displayed modal dialog
              Portal.dialog.clickOk();

              // Applies another search criteria to the list by filling the
              // search text input field
              Portal.userListPage.searcher.setSearchCriteria(testUser.email);

              // Gets reference to all rows from the list
              var tableRows = Portal.userListPage.table.getRows();

              // Validates the size of all rows
              expect(tableRows.count()).toEqual(0);
              done();
            })
            .catch(done);
        });

        // Our last spec
        it('should display a confirmation message when deleting a user',
          function (done) {
            // Using helper method to create the user Chris
            Portal.helpers.users
              .create()
              .then(function (testUser) {
                Portal.userListPage.refresh();
                // Apply Chris' email as filter criteria in the search component
                Portal.userListPage.searcher.setSearchCriteria(testUser.email);

                // Click on `delete` button of the first row from the list
                Portal.userListPage.table
                  .getFirstRow()
                  .clickDelete();

                // Validate `modal dialog` is displayed after the click on
                // `delete` button
                expect(Portal.dialog.isDisplayed()).toBeTruthy();

                // Confirm the deletion. Note that this is a post action. It is
                // always important to leave the test environment as it was
                // before the test/spec started. Since this test/spec created
                // a user, then it should delete it once all validations were
                // made.
                Portal.dialog.clickOk();
                // Check App alert notifications
                expect(Portal.alerts.getAll().count()).not.toEqual(0);
                expect(Portal.alerts.getFirst().getText())
                  .toContain(Constants.alertMessages.users.MSG_SUCCESS_DELETE);
                done();
              })
              .catch(done);
          });
      });
    });
  });
});
