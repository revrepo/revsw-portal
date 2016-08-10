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
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {
  describe('Top Objects', function () {

    var adminUser = config.get('portal.users.admin');
    var noDomain = 'Select Domain';

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.header.goTo(Constants.header.appMenu.WEB_ANALYTICS);
      Portal.header.goTo(Constants.sideBar.analytics.TOP_OBJECTS);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should display "Top Objects" title in the portal',
      function () {
        var titleReport = Constants.topObjects.TITLE;
        expect(Portal.topObjectsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topObjectsPage.getTitle()).toEqual(titleReport);
      });

    it('should display "Top Most Requested Objects" report with empty data',
      function () {
        var titleChart = Constants.topObjects.TOP_MOST_REQUESTED_OBJECTS;
        Portal.topObjectsPage.form.clickTopMostRequestedTab();
        browser.sleep(2000);
        expect(Portal.topObjectsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topObjectsPage.getChartTitle()).toEqual(titleChart);
      });

    it('should display default "Top Referers" report with empty data',
      function () {
        var titleChart = Constants.topObjects.TOP_REFERERS;
        Portal.topObjectsPage.form.clickTopRefersTab();
        browser.sleep(2000);
        expect(Portal.topObjectsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topObjectsPage.getChartTitle()).toEqual(titleChart);
      });

    it('should display default "Top Edge Cache Hits" report with empty data',
      function () {
        var titleChart = Constants.topObjects.TOP_EDGE_CACHE_HITS;
        Portal.topObjectsPage.form.clickTopEdgeCacheHitsTab();
        browser.sleep(2000);
        expect(Portal.topObjectsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topObjectsPage.getChartTitle()).toEqual(titleChart);
      });

    it('should display default "Top Edge Cache Misses" report with empty data',
      function () {
        var titleChart = Constants.topObjects.TOP_EDGE_CACHE_MISSES;
        Portal.topObjectsPage.form.clickTopEdgeCacheMissesTab();
        browser.sleep(2000);
        expect(Portal.topObjectsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topObjectsPage.getChartTitle()).toEqual(titleChart);
      });

    it('should display "Top 404 Not Found Objects" report with empty data',
      function () {
        var titleChart = Constants.topObjects.TOP_404_NOT_FOUND_OBJECTS;
        Portal.topObjectsPage.form.clickTop404Tab();
        browser.sleep(2000);
        expect(Portal.topObjectsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topObjectsPage.getChartTitle()).toEqual(titleChart);
      });

    it('should display "Top Objects with 5XX Error Codes" with empty data',
      function () {
        var titleChart = Constants.topObjects.TOP_OBJECTS_WITH_5XX_ERROR_CODES;
        Portal.topObjectsPage.form.clickTop5XXTab();
        browser.sleep(2000);
        expect(Portal.topObjectsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topObjectsPage.getChartTitle()).toEqual(titleChart);
      });

    it('should display "Top Objects With Unsuccessful Completion Status" with empty data',
      function () {
        var titleChart = Constants.topObjects.TOP_FAILED;
        Portal.topObjectsPage.form.clickTopObjetcsWithUnsuccessfulStatusTab();
        browser.sleep(2000);
        expect(Portal.topObjectsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topObjectsPage.getChartTitle()).toEqual(titleChart);
      });

    it('should display "Objects With Slowest FBT" with empty data',
      function () {
        var titleChart = Constants.topObjects.TOP_SLOWEST_FBT;
        Portal.topObjectsPage.form.clickObjectsWithSlowestFBTtab();
        browser.sleep(2000);
        expect(Portal.topObjectsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topObjectsPage.getChartTitle()).toEqual(titleChart);
      });

    it('should display "Objects With Slowest Download Time" with empty data',
      function () {
        var titleChart = Constants.topObjects.TOP_SLOWEST_DOWNLOAD_TIME;
        Portal.topObjectsPage.form.clickObjectsWithSlowestDownTimeTab();
        browser.sleep(2000);
        expect(Portal.topObjectsPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.topObjectsPage.getChartTitle()).toEqual(titleChart);
      });

  });
});
