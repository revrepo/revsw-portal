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
var Constants = require('./../../../page_objects/constants');
var DataProvider = require('./../../../common/providers/data');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin'),
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.user')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Zone Records list', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {

        });

        it('should be displayed when clicking "Manage Records" button on available DNS Zone',
          function () {
            Portal.goToDNSZones();
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);

            Portal.dnsZones.listPage.searcher.clearSearchCriteria();
            Portal.dnsZones.listPage.searcher.setSearchCriteria(zone.domain);
            Portal.dnsZones.listPage.table
              .getFirstRow()
              .clickManageRecords();
            expect(Portal.zoneRecords.listPage.isDisplayed()).toBeTruthy();
            Portal.deleteDNSZone(zone);
          });

        it('should be displayed when "Back to list" button is clicked from ' +
          '"Add Zone Record" page',
          function () {
            Portal.goToDNSZones();
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);

            Portal.dnsZones.listPage.searcher.clearSearchCriteria();
            Portal.dnsZones.listPage.searcher.setSearchCriteria(zone.domain);
            Portal.dnsZones.listPage.table
              .getFirstRow()
              .clickManageRecords();

            Portal.zoneRecords.listPage.clickAddNewRecord();
            Portal.zoneRecords.addPage.clickBackToList();
            expect(Portal.zoneRecords.listPage.isDisplayed()).toBeTruthy();
            Portal.deleteDNSZone(zone);
          });

        it('should be displayed when "Cancel" button is clicked from ' +
          '"Add DNS Zone" page',
          function () {
            Portal.goToDNSZones();
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);

            Portal.dnsZones.listPage.searcher.clearSearchCriteria();
            Portal.dnsZones.listPage.searcher.setSearchCriteria(zone.domain);
            Portal.dnsZones.listPage.table
              .getFirstRow()
              .clickManageRecords();

            Portal.zoneRecords.listPage.clickAddNewRecord();
            Portal.zoneRecords.addPage.clickCancel();
            expect(Portal.zoneRecords.listPage.isDisplayed()).toBeTruthy();
            Portal.deleteDNSZone(zone);
          });
      });
    });
  });
});
