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
var Constants = require('./../../../page_objects/constants');

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

      describe('Edit DNS Zone', function () {

        beforeAll(function () {

        });

        afterAll(function () {

        });

        beforeEach(function () {
          Portal.load();//TODO: Got the problem when tests are failed when executed all in one scope
                        //Looks like it is not reproducible when doing Portal.load() before SignIn
                        //SignIn func needs to be investigated
          Portal.signIn(user);
          Portal.helpers.nav.goToDNSZones();
        });

        afterEach(function () {
          Portal.signOut();
        });

        it('should display edit DNS Zone button',
          function () {
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);

            var editButton = Portal.dnsZones.listPage.table
              .getFirstRow()
              .getEditBtn();
            expect(editButton.isPresent()).toBeTruthy();

            Portal.deleteDNSZone(zone);
          });

        it('should display "Edit DNS Zone" form',
          function () {
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);

            Portal.dnsZones.listPage.table
              .getFirstRow()
              .clickEdit();
            expect(Portal.dnsZones.editPage.isDisplayed()).toBeTruthy();

            Portal.deleteDNSZone(zone);
          });

        it('should allow to cancel an DNS Zone edition',
          function () {
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);

            Portal.dnsZones.listPage.searcher.clearSearchCriteria();
            Portal.dnsZones.listPage.searcher.setSearchCriteria(zone.domain);
            Portal.dnsZones.listPage.table
              .getFirstRow()
              .clickEdit();
            Portal.dnsZones.editPage.form.setRefresh('1000000');
            Portal.dnsZones.editPage.clickCancel();
            expect(Portal.dnsZones.listPage.isDisplayed()).toBeTruthy();

            Portal.deleteDNSZone(zone);
          });

        it('should update DNS Zone when filling all required data',
          function () {
            var zone = DataProvider.generateDNSZoneData();

            Portal.createDNSZone(zone);

            Portal.dnsZones.listPage.searcher.clearSearchCriteria();
            Portal.dnsZones.listPage.searcher.setSearchCriteria(zone.domain);
            Portal.dnsZones.listPage.table
              .getFirstRow()
              .clickEdit();

            Portal.dnsZones.editPage.updateDNSZone(zone);

            Portal.dialog.clickOk();
            Portal.dnsZones.editPage.clickBackToList();

            Portal.dnsZones.listPage.searcher.clearSearchCriteria();
            Portal.dnsZones.listPage.searcher.setSearchCriteria(zone.domain);
            Portal.dnsZones.listPage.table
              .getFirstRow()
              .clickEdit();

            expect(Portal.dnsZones.editPage.form.getSOAttl())
              .toBe(zone.soaTTL);
            expect(Portal.dnsZones.editPage.form.getRefresh())
              .toBe(zone.refresh);
            expect(Portal.dnsZones.editPage.form.getRetry())
              .toBe(zone.retry);
            expect(Portal.dnsZones.editPage.form.getExpire())
              .toBe(zone.expire);
            expect(Portal.dnsZones.editPage.form.getNXttl())
              .toBe(zone.nxTTL);

            Portal.dnsZones.editPage.clickBackToList();
            Portal.deleteDNSZone(zone);
          });
      });
    });
  });
});
