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
      describe('Add DNS Zone', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToDNSZones();
          Portal.dnsZones.listPage.clickAddNewDNSZone();
        });

        it('should display "Add DNS Zone" form', function () {
          expect(Portal.dnsZones.addPage.isDisplayed()).toBeTruthy();
          expect(Portal.dnsZones.addPage.form.isDisplayed()).toBeTruthy();
        });

        it('should allow to cancel a DNS Zone addition', function () {
          Portal.dnsZones.addPage.form.setDomain('something');
          Portal.dnsZones.addPage.clickCancel();
          expect(Portal.dnsZones.listPage.isDisplayed()).toBeTruthy();
        });

        it('should create a DNS Zone when filling all required data',
          function () {
            var dnsZoneToSearch = DataProvider.generateDNSZoneData();
            Portal.dnsZones.addPage.createDNSZone(dnsZoneToSearch);
            Portal.dnsZones.listPage.searcher
              .setSearchCriteria(dnsZoneToSearch.domain);
            expect(Portal.dnsZones.listPage
              .searchAndGetFirstRow(dnsZoneToSearch.domain)
              .getZoneName()).toEqual(dnsZoneToSearch.domain);
          });
      });
    });
  });
});
