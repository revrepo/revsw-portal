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

describe('Functional', function () {
  describe('Usage Report', function () {

    // Defining set of users for which all below tests will be run
    var users = [
      config.get('portal.users.admin'),
      config.get('portal.users.reseller'),
      config.get('portal.users.revAdmin')
    ];

    users.forEach(function (user) {
      describe('With user: ' + user.role, function () {
        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToUsageReport();
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should get title from Usage Report page', function() {
            var title = Portal.billing.usageReportPage.getTitle();
            expect(title).toEqual('Usage Report');
        });

        it('should check Domains form with correct report data', function() {
          var reportData = DataProvider.generateUsageReportData(user);
          var domains = {
            title: 'Domains',
            active: 'Active',
            deleted: 'Deleted',
            sslEnabled: 'SSL Enabled'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getDomainsForm();
          expect(result).toContain(domains.title);
          expect(result).toContain(domains.active);
          expect(result).toContain(domains.deleted);
          expect(result).toContain(domains.sslEnabled);
        });

        it('should display Mobile Apps section with correct report properties', function() {
          var reportData = DataProvider.generateUsageReportData(user);
          var mobileApps = {
            active: 'Active',
            deleted: 'Deleted'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getMobileAppsViewText();
          expect(result).toContain(mobileApps.active);
          expect(result).toContain(mobileApps.deleted);
        });

        it('should check API Keys form with correct report data', function() {
          var reportData = DataProvider.generateUsageReportData(user);
          var apiKeys = {
            active: 'Active',
            inactive: 'Inactive'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getApiKeysForm();
          expect(result).toContain(apiKeys.active);
          expect(result).toContain(apiKeys.inactive);
        });

        it('should check Total Traffic form with correct report data', function() {
          var reportData = DataProvider.generateUsageReportData(user);
          var totalTraffic = {
            hits: 'Requests',
            sent: 'Sent',
            received: 'Received',
            bwSent: 'BW Sent',
            bwReceived: 'BW Received'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getTotalTrafficForm();
          expect(result).toContain(totalTraffic.hits);
          expect(result).toContain(totalTraffic.sent);
          expect(result).toContain(totalTraffic.received);
          expect(result).toContain(totalTraffic.bwSent);
          expect(result).toContain(totalTraffic.bwReceived);
        });

        it('should check Edge Cache Usage form with correct report', function() {
          var reportData = DataProvider.generateUsageReportData(user);
          var edgeCacheUsage = {
            hit: 'Cache HIT',
            miss: 'Cache MISS'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getEdgeCacheUsageForm();
          expect(result).toContain(edgeCacheUsage.hit);
          expect(result).toContain(edgeCacheUsage.miss);
        });

        it('should check HTTP HTTPS Requests form with correct report', function() {
          var reportData = DataProvider.generateUsageReportData(user);
          var httpHttpsRequests = {
            http: 'HTTP',
            https: 'HTTPS'
          };
          Portal.billing.usageReportPage.updateReport(reportData);
          var result = Portal.billing.usageReportPage.getHTTPHTTPSRequestsForm();
          expect(result).toContain(httpHttpsRequests.http);
          expect(result).toContain(httpHttpsRequests.https);
        });
      });
    });
  });
});
