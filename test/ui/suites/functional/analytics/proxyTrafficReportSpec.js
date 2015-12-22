/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
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
  describe('Proxy traffic reports', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = DataProvider.generateDomain('mydomain');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createDomain(myDomain);
    });

    afterAll(function () {
      Portal.deleteDomain(myDomain);
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.header.goTo(Constants.header.appMenu.ANALYTICS);
    });

    it('should create a default proxy traffic report for Bandwidth Usage',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createBandwidthUsageReport(dataReport);

        var getData = Portal.proxyTrafficPage.getBandwidthUsageValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default proxy traffic report for Total Requests',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createTotalRequestsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getTotalRequestsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default proxy traffic report for HTTP HTTPS Hits',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createHttpHttpsHitsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getHttpHttpsHitsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default proxy traffic report for HTTP Status Code',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createHttpStatusCodeHitsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getHttpStatusCodeHitsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default proxy traffic report for Request Status',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createRequestStatusReport(dataReport);

        var getData = Portal.proxyTrafficPage.getRequestStatusValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a default proxy traffic report for Edge Cache Hits',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createEdgeCacheEfficiencyHitsReport(dataReport);

        var data = Portal.proxyTrafficPage.getEdgeCacheEfficiencyHitsValues();
        expect(data.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for Bandwidth Usage',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        dataReport.delay = 'Last 7 day';
        dataReport.country = 'Mexico';
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createBandwidthUsageReport(dataReport);

        var getData = Portal.proxyTrafficPage.getBandwidthUsageValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for Total Requests',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        dataReport.delay = 'Last 7 day';
        dataReport.country = 'France';
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createTotalRequestsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getTotalRequestsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for HTTP HTTPS Hits',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        dataReport.delay = 'Last 7 day';
        dataReport.country = 'India';
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createHttpHttpsHitsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getHttpHttpsHitsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for HTTP Status Code',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        dataReport.delay = 'Last 7 day';
        dataReport.country = 'Bolivia';
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createHttpStatusCodeHitsReport(dataReport);

        var getData = Portal.proxyTrafficPage.getHttpStatusCodeHitsValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for Request Status',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        dataReport.delay = 'Last 7 day';
        dataReport.country = 'Angola';
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createRequestStatusReport(dataReport);

        var getData = Portal.proxyTrafficPage.getRequestStatusValues();
        expect(getData.delay).toContain(dataReport.delay);
    });

    it('should create a custom proxy traffic report for Edge Cache Hits',
      function () {
        var dataReport = DataProvider.generateProxyTrafficReport();
        dataReport.delay = 'Last 7 day';
        dataReport.country = 'Germany';
        Portal.proxyTrafficPage.selectDomain(myDomain);
        Portal.proxyTrafficPage.createEdgeCacheEfficiencyHitsReport(dataReport);

        var data = Portal.proxyTrafficPage.getEdgeCacheEfficiencyHitsValues();
        expect(data.delay).toContain(dataReport.delay);
    });
  });
});
