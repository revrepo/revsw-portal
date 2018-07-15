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

// Requiring config information which stores data about test users
var config = require('config');

// Requiring the main Page Object, the entry point to handle all other page
// objects that our specs are going to need.
var Portal = require('./../../../page_objects/portal');

// Requiring Data Provider to generate test data. In this case we need it to
// generate test user data
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

// Defining smoke suite
describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.admin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      // Defining suite for deleting a SSL Cert
      describe('Delete SSL Name', function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToSSLNames();
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
        });

        afterEach(function () {
        });

        it('should display delete SSL Name button', function () {
          var deleteButton = Portal.sslNames.listPage.table
            .getFirstRow()
            .getDeleteBtn();
          expect(deleteButton.isDisplayed()).toBeTruthy();
        });

        xit('should allow to delete SSL Name', function () {
          var sslName = DataProvider.generateSSLNameData();
          Portal.createSSLName(sslName);
          Portal.sslNames.listPage.searchAndClickDelete(sslName.domainName);
          Portal.dialog.clickOk();
          expect(Portal.alerts.getFirst().getText())
            .toContain('Successfully deleted the SSL name');
          Portal.sslNames.listPage.searcher.setSearchCriteria(sslName.domainName);
          var tableRows = Portal.sslNames.listPage.table.getRows();
          expect(tableRows.count()).toEqual(0);
        });

        xit('should display a confirmation message when deleting a SSL Name',
          function () {
            var sslName = DataProvider.generateSSLNameData();
            Portal.createSSLName(sslName);
            Portal.sslNames.listPage.searchAndClickDelete(sslName.domainName);
            Portal.dialog.clickOk();
            expect(Portal.alerts.getFirst().getText())
              .toContain('Successfully deleted the SSL name');
          });
      });
    });
  });
});
