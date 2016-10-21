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

// Defining smoke suite
describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.admin'),
    config.get('portal.users.user')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      // Defining suite for deleting a DNS Zone Record
      describe('Delete DNS Zone Record', function () {

        beforeAll(function () {
          Portal.load();
          Portal.signIn(user);
          Portal.helpers.nav.goToDNSZones();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should display delete DNS Zone Record button', function () {
          var zone = DataProvider.generateDNSZoneData();
          Portal.createDNSZone(zone);
          Portal.openDNSZoneRecords(zone);
          var deleteButton = Portal.zoneRecords.listPage.table
            .getFirstRow()
            .getDeleteBtn();
          expect(deleteButton.isDisplayed()).toBeTruthy();
        });

        it('should allow to delete DNS Zone Record', function () {
          var zone = DataProvider.generateDNSZoneData();
          Portal.createDNSZone(zone);
          Portal.openDNSZoneRecords(zone);
          var deleteButton = Portal.zoneRecords.listPage.table
            .getFirstRow()
            .getDeleteBtn();
          deleteButton.click();
          Portal.dialog.clickOk();
          var tableRows = Portal.dnsZones.listPage.table.getRows();
          expect(tableRows.count()).toEqual(0);
        });

        it('should display a confirmation message when deleting a DNS Zone record',
          function () {
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);
            Portal.openDNSZoneRecords(zone);
            var deleteButton = Portal.zoneRecords.listPage.table
              .getFirstRow()
              .getDeleteBtn();
            deleteButton.click();
            Portal.dialog.clickOk();
            expect(Portal.alerts.getAll().count()).toEqual(1);
            expect(Portal.alerts.getFirst().getText())
              .toContain('Successfully deleted the DNS zone record');
          });
      });
    });
  });
});
