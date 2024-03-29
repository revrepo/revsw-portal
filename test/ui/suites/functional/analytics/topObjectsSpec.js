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
  describe('Top Objects Reports', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToWATopObjects();
      Portal.topObjectsPage.selectDomain(myDomain);
    });

    afterAll(function () {
      Portal.signOut();
    });

    it('should create a default report for Top Most Requested Objects report',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTopMostRequestedObjectsReport(dataReport);
        var getData = Portal.topObjectsPage.getReport();

        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a default report for Top Referers report',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTopReferersReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a default report for Top Edge Cache Hits report',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTopEdgeCacheHitsReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a default report for Top Edge Cache Misses report',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTopEdgeCacheMissesReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a default report for Top 404 Not Found Objects report',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTop404NotFoundObjectsReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a default report for Top Objects with 5XX Error Codes',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTopObjects5XXErrorCodesReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a default report for Top Objects With Unsuccessful Completion Status',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createTopFailedObjectsReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a default report for Top Objects With Slowest FBT',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createObjectsWithSlowestFBTReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a default report for Top Objects With Slowest Download Time',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 1 Hour';
        Portal.topObjectsPage.createObjectsWithSlowestDownTimeReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a custom report for Top Most Requested Objects',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 12 Hours';
        dataReport.count = 'Top 5 Records';
        Portal.topObjectsPage.createTopMostRequestedObjectsReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a custom report for Top Referers',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 24 Hours';
        dataReport.count = 'Top 10 Records';
        Portal.topObjectsPage.createTopReferersReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a custom report for Top Edge Cache Hits',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 12 Hours';
        dataReport.count = 'Top 50 Records';
        Portal.topObjectsPage.createTopEdgeCacheHitsReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a custom report for Top Edge Cache Misses',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 12 Hours';
        dataReport.count = 'Top 50 Records';
        Portal.topObjectsPage.createTopEdgeCacheMissesReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a custom report for Top 404 Not Found Objects',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 24 Hours';
        dataReport.count = 'Top 100 Records';
        Portal.topObjectsPage.createTop404NotFoundObjectsReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a custom report for Top Objects with 5XX Error Codes',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 12 Hours';
        dataReport.count = 'Top 250 Records';
        Portal.topObjectsPage.createTopObjects5XXErrorCodesReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a custom report for Top Objects With Unsuccessful Completion Status',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 12 Hours';
        dataReport.count = 'Top 5 Records';
        Portal.topObjectsPage.createTopFailedObjectsReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a custom report for Top Objects With Slowest FBT',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 12 Hours';
        dataReport.count = 'Top 250 Records';
        Portal.topObjectsPage.createObjectsWithSlowestFBTReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });

    it('should create a custom report for Objects With Slowest Download Time',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 12 Hours';
        dataReport.count = 'Top 50 Records';
        Portal.topObjectsPage.createObjectsWithSlowestDownTimeReport(dataReport);

        var getData = Portal.topObjectsPage.getReport();
        expect(getData.delay).toEqual(dataReport.delay);
        expect(getData.country).toEqual(dataReport.country);
        expect(getData.os).toEqual(dataReport.os);
        expect(getData.device).toEqual(dataReport.device);
        expect(getData.count).toEqual(dataReport.count);
      });
  });
});
