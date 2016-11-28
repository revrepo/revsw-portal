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

      describe('Edit DNS Zone record', function () {

        beforeAll(function () {
          Portal.signIn(user);
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

        beforeEach(function () {
          Portal.helpers.nav.goToDNSZones();
        });

        it('should display edit DNS Zone record button',
          function () {
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);
            Portal.openDNSZoneRecords(zone);
            var editButton = Portal.zoneRecords.listPage.table
              .getFirstRow()
              .getEditBtn();
            expect(editButton.isPresent()).toBeTruthy();
          });

        it('should display "Edit DNS Zone record" form',
          function () {
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);
            Portal.openDNSZoneRecords(zone);
            Portal.zoneRecords.listPage.table
              .getFirstRow()
              .clickEdit();
            expect(Portal.zoneRecords.editPage.isDisplayed()).toBeTruthy();
          });

        it('should allow to cancel an DNS Zone record edition',
          function () {
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);
            Portal.openDNSZoneRecords(zone);
            Portal.zoneRecords.listPage.table
              .getFirstRow()
              .clickEdit();
            Portal.zoneRecords.editPage.form.setTTL('3601');
            Portal.zoneRecords.editPage.clickCancel();
            expect(Portal.zoneRecords.listPage.isDisplayed()).toBeTruthy();
          });

        it('should update DNS Zone record when filling all required data',
          function () {
            var zone = DataProvider.generateDNSZoneData();
            Portal.createDNSZone(zone);
            Portal.openDNSZoneRecords(zone);
            Portal.zoneRecords.listPage.table
              .getFirstRow()
              .clickEdit();
            Portal.zoneRecords.editPage.form.setTTL('3601');
            Portal.zoneRecords.editPage.form.setAnswerById(0, 'dns11.p03.nsone.net');
            Portal.zoneRecords.editPage.form.setAnswerById(1, 'dns12.p03.nsone.net');
            Portal.zoneRecords.editPage.form.setAnswerById(2, 'dns13.p03.nsone.net');
            Portal.zoneRecords.editPage.form.setAnswerById(3, 'dns14.p03.nsone.net');
            Portal.zoneRecords.editPage.clickUpdate();
            Portal.dialog.clickOk();
            Portal.zoneRecords.editPage.clickBackToList();
            Portal.zoneRecords.listPage.table
              .getFirstRow()
              .clickEdit();
            expect(Portal.zoneRecords.editPage.form.getTTL()).toBe('3601');
            expect(Portal.zoneRecords.editPage.form.getAnswerById(0))
              .toBe('dns11.p03.nsone.net');
            expect(Portal.zoneRecords.editPage.form.getAnswerById(1))
              .toBe('dns12.p03.nsone.net');
            expect(Portal.zoneRecords.editPage.form.getAnswerById(2))
              .toBe('dns13.p03.nsone.net');
            expect(Portal.zoneRecords.editPage.form.getAnswerById(3))
              .toBe('dns14.p03.nsone.net');
          });
      });
    });
  });
});
