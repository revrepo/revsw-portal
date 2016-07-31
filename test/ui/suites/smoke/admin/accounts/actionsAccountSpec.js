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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Actions Account', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToAccounts();
        });

        afterEach(function () {
        });

        it('should display "Usage Report" button from the first account',
          function () {
            var deleteButton = Portal.admin.accounts.listPage.table
              .getFirstRow()
              .getDeleteCompanyBtn();
            expect(deleteButton.isDisplayed()).toBeTruthy();
          });

        it('should display "Change Billing Plan" button from the first account',
          function () {
            var deleteButton = Portal.admin.accounts.listPage.table
              .getFirstRow()
              .getChangeBillingPlanBtn();
            expect(deleteButton.isDisplayed()).toBeTruthy();
          });

        it('should display "Statements" button from the first selected account',
          function () {
            var deleteButton = Portal.admin.accounts.listPage.table
              .getFirstRow()
              .getStatementsBtn();
            expect(deleteButton.isDisplayed()).toBeTruthy();
          });
      });
    });
  });
});