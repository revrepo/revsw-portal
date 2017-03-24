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

      describe('DNS Zones list', function () {

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

        it('should be displayed when clicking "DNS Zones" from sidebar',
          function () {
            expect(Portal.dnsZones.listPage.isDisplayed()).toBeTruthy();
          });

        it('should be displayed when "Back to list" button is clicked from ' +
          '"Add DNS Zone" page',
          function () {
            Portal.dnsZones.listPage.clickAddNewDNSZone();
            Portal.dnsZones.addPage.clickBackToList();
            expect(Portal.dnsZones.listPage.isDisplayed()).toBeTruthy();
          });

        it('should be displayed when "Cancel" button is clicked from ' +
          '"Add DNS Zone" page',
          function () {
            Portal.dnsZones.listPage.clickAddNewDNSZone();
            Portal.dnsZones.addPage.clickCancel();
            expect(Portal.dnsZones.listPage.isDisplayed()).toBeTruthy();
          });

        it('should display a `edit` icon for the zone',
          function () {
            Portal.dnsZones.listPage.table
              .getRow(0)
              .getEditBtn()
              .isDisplayed()
              .then(function (isDisplayed) {
                expect(isDisplayed).toBeTruthy();
              });
          });

        it('should display a `delete` icon for the zone',
          function () {
            Portal.dnsZones.listPage.table
              .getRow(0)
              .getDeleteBtn()
              .isDisplayed()
              .then(function (isDisplayed) {
                expect(isDisplayed).toBeTruthy();
              });
          });

        it('should display a `stats` icon for the zone',
          function () {
            Portal.dnsZones.listPage.table
              .getRow(0)
              .getStatsBtn()
              .isDisplayed()
              .then(function (isDisplayed) {
                expect(isDisplayed).toBeTruthy();
              });
          });
      });
    });
  });
});
