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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');
var API = require('./../../../../common/api').API;

describe('Functional', function () {
  var user = config.get('portal.users.admin');
  describe('Usage Report DNS Zones', function () {
    describe('With user: ' + user.role, function () {
      var dnsZonesCount = 0;
      var dnsZoneToSearch = DataProvider.generateDNSZoneData();
      beforeAll(function (done) {
        API.helpers.authenticate(user).then(function () {
          API.resources.dnsZones
            .getAll()
            .expect(200)
            .then(function (res) {
              dnsZonesCount = res.body.length;
              Portal.signIn(user);
              done();
            })
            .catch(done);
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      it('should display correct amount of DNS Zones', function (done) {
        Portal.usageReportHelpers.generateReport().then(function () {
          Portal.helpers.nav.goToUsageReport().then(function () {
            Portal
              .usageReportHelpers
              .expectValue(dnsZonesCount, Constants.USAGE_REPORT_IDS.TOTAL_DNS_ZONES)
              .then(function () {
                expect(true).toBeTruthy();
                done();
              })
              .catch(function (err) {
                throw new Error(err);
              });
          });
        });
      });

      it('should display correct amount of ' +
        ' DNS Zones after creating a DNS Zone', function (done) {
          Portal.helpers.nav.goToDNSZones();
          Portal.dnsZones.listPage.clickAddNewDNSZone();
          Portal.dnsZones.addPage.createDNSZone(dnsZoneToSearch);
          Portal.alerts.waitToDisplay().then(function () {
            Portal.usageReportHelpers.generateReport().then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(dnsZonesCount + 1, Constants.USAGE_REPORT_IDS.TOTAL_DNS_ZONES)
                  .then(function () {
                    expect(true).toBeTruthy();
                    done();
                  })
                  .catch(function (err) {
                    throw new Error(err);
                  });
              });
            });
          });
        });

      it('should display correct amount of ' +
        ' DNS Zones after deleting a DNS Zone', function (done) {
          Portal.helpers.nav.goToDNSZones();
          Portal.dnsZones.listPage.searchAndClickDelete(dnsZoneToSearch.domain);
          Portal.dialog.clickOk();
          Portal.alerts.waitToDisplay().then(function () {
            Portal.usageReportHelpers.generateReport().then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(dnsZonesCount, Constants.USAGE_REPORT_IDS.TOTAL_DNS_ZONES)
                  .then(function () {
                    expect(true).toBeTruthy();
                    done();
                  })
                  .catch(function (err) {
                    throw new Error(err);
                  });
              });
            });
          });
        });
    });
  });
});

