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

      // Defining suite for deleting a DNS Zone
      describe('Delete DNS Zone', function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDNSZones();
        });

        afterAll(function (done) {
          Portal.helpers.dnsZones
            .cleanup()
            .then(function () {
              Portal.signOut();
              done();
            })
            .catch(done);
        });

        it('should display delete DNS Zone button', function () {
          var zone = DataProvider.generateDNSZoneData();
          Portal.createDNSZone(zone);
          var deleteButton = Portal.dnsZones.listPage.table
            .getFirstRow()
            .getDeleteBtn();
          expect(deleteButton.isDisplayed()).toBeTruthy();
        });

        it('should allow to delete DNS Zone', function () {
          var zone = DataProvider.generateDNSZoneData();
          Portal.createDNSZone(zone);
          Portal.dnsZones.listPage.searchAndClickDelete(zone.domain);
          Portal.dialog.clickOk();
          Portal.dnsZones.listPage.searcher.setSearchCriteria(zone.domain);
          var tableRows = Portal.dnsZones.listPage.table.getRows();
          expect(tableRows.count()).toEqual(0);
        });

        it('should display a confirmation message when deleting a DNS Zone',
          function () {
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);
            Portal.dnsZones.listPage.searchAndClickDelete(zone.domain);
            Portal.dialog.clickOk();
            expect(Portal.alerts.getAll().count()).not.toEqual(0);
            expect(Portal.alerts.getFirst().getText())
              .toContain('Successfully deleted the DNS zone');
          });
      });
    });
  });
});
