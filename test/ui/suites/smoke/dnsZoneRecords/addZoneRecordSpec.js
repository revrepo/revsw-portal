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
    config.get('portal.users.admin'),
    config.get('portal.users.user')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Add DNS Zone Record', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function (done) {
          Portal.helpers.dnsZones
            .cleanup()
            .then(function () {
              Portal.signOut().then(function () {
                done();
              });
            })
            .catch(done);
        });

        beforeEach(function () {
          Portal.helpers.nav.goToDNSZones();
        });

        it('should display "Add DNS Zone Record" form', function () {
          var dnsZone = DataProvider.generateDNSZoneData();
          Portal.createDNSZone(dnsZone);
          Portal.dnsZones.listPage.searcher.clearSearchCriteria();
          Portal.dnsZones.listPage.searcher.setSearchCriteria(dnsZone.domain);
          Portal.dnsZones.listPage.table
            .getFirstRow()
            .clickManageRecords();
          Portal.zoneRecords.listPage.clickAddNewRecord();
          expect(Portal.zoneRecords.addPage.isDisplayed()).toBeTruthy();
          expect(Portal.zoneRecords.addPage.form.isDisplayed()).toBeTruthy();
        });

        it('should allow to cancel a DNS Zone Record addition', function () {
          var dnsZone = DataProvider.generateDNSZoneData();
          Portal.createDNSZone(dnsZone);
          Portal.dnsZones.listPage.searcher.clearSearchCriteria();
          Portal.dnsZones.listPage.searcher.setSearchCriteria(dnsZone.domain);
          Portal.dnsZones.listPage.table
            .getFirstRow()
            .clickManageRecords();
          Portal.zoneRecords.listPage.clickAddNewRecord();
          Portal.zoneRecords.addPage.form.setDomain('something');
          Portal.zoneRecords.addPage.clickCancel();
          expect(Portal.zoneRecords.listPage.isDisplayed()).toBeTruthy();
        });

        it('should create a DNS Zone when filling all required data',
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
            var zoneRecord = Portal.zoneRecords.listPage
              .searchAndGetFirstRow(dnsRecord.name);
            expect(zoneRecord.getRecord())
              .toEqual(dnsRecord.name + '.' + dnsZone.domain);
            zoneRecord.clickDelete();
          });
      });
    });
  });
});
