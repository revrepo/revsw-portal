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
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.user'),
    config.get('portal.users.admin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('DNS Zone Records search', function () {

        beforeAll(function () {

        });

        afterAll(function () {

        });

        beforeEach(function () {
          Portal.load();//TODO: Got the problem when tests are failed when executed all in one scope
                        //Looks like it is not reproducible when doing Portal.load() before SignIn
                        //SignIn func needs to be investigated

          Portal.signIn(user);
          Portal.goToDNSZones();
        });

        afterEach(function () {
          Portal.signOut();
        });

        it('should be displayed when displaying DNS Zones Records List page',
          function () {
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);

            Portal.dnsZones.listPage.searcher.setSearchCriteria(zone.domain);
            Portal.dnsZones.listPage.table
              .getFirstRow()
              .clickManageRecords();

            var searchField = Portal.zoneRecords.listPage.searcher
              .getSearchCriteriaTxtIn();

            expect(searchField.isPresent()).toBeTruthy();

            Portal.deleteDNSZone(zone);
          });

        it('should filter items according to text filled',
          function () {
            var dnsZone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(dnsZone);
            var dnsRecord = DataProvider.generateDNSZoneRecordData();
            Portal.dnsZones.listPage.searcher.clearSearchCriteria();
            Portal.dnsZones.listPage.searcher.setSearchCriteria(dnsZone.domain);
            Portal.dnsZones.listPage.table
              .getFirstRow()
              .clickManageRecords();

            Portal.zoneRecords.listPage.clickAddNewRecord();
            Portal.zoneRecords.addPage.form.fill(dnsRecord);
            Portal.zoneRecords.addPage.clickAddNewRecord();

            Portal.zoneRecords.listPage.searcher
              .setSearchCriteria(dnsRecord.name);

            var allRows = Portal.zoneRecords.listPage.table.getRows();
            expect(allRows.count()).toEqual(1);
            Portal.deleteDNSZone(dnsZone);
          });
      });
    });
  });
});
