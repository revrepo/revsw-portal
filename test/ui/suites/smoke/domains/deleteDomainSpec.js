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
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Delete domain', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToDomains();
          Portal.domains.listPage.searcher.clearSearchCriteria();
        });

        afterEach(function () {
        });

        it('should display delete domain button',
          function () {
            var deleteButton = Portal.domains.listPage.table
              .getFirstRow()
              .getDeleteBtn();
            expect(deleteButton.isDisplayed()).toBeTruthy();
          });

        it('should allow to delete domain',
          function () {
            var domain = DataProvider.generateDomain('domain-01');
            // Create domain
            Portal.createDomain(domain);
            Portal.domains.listPage.searchAndClickDelete(domain.name);
            Portal.dialog.clickOk();
            expect(Portal.alerts.getAll().count()).not.toEqual(0);
            expect(Portal.alerts.getFirst().getText())
              .toContain(Constants.alertMessages.domains.MSG_SUCCESS_DELETE);
            Portal.domains.listPage.searcher.setSearchCriteria(domain.name);
            // Gets reference to all rows from the list
            var tableRows = Portal.domains.listPage.table.getRows();
            // Validates the size of all rows
            expect(tableRows.count()).toEqual(0);
          });

        // Our last spec
        it('should display a confirmation message when deleting a domain',
          function () {
            var domain = DataProvider.generateDomain('domain-02');
            // Create domain
            Portal.createDomain(domain);
            Portal.domains.listPage.searcher.setSearchCriteria(domain.name);
            Portal.domains.listPage.table
              .getFirstRow()
              .clickDelete();
            // Validate `modal dialog` is displayed
            expect(Portal.dialog.isDisplayed()).toBeTruthy();
            // Confirm deletion
            Portal.dialog.clickOk();
          });
      });
    });
  });
});
