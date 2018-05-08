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
  describe('Edge Cache Reports', function () {

    var adminUser = config.get('portal.users.admin');
    var noDomain = 'Select Domain';

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToEdgeCache();
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should display "Edge Cache" in the portal',
      function () {
        var titleReport = Constants.edgeCache.TITLE;
        expect(Portal.edgeCachePage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.edgeCachePage.getTitle()).toEqual(titleReport);
    });

    it('should display default "Edge Cache Efficiency Hits" report with empty data',
      function () {
        var titleChart = Constants.edgeCache.EDGE_CACHE_EFFICIENCY_HITS;
        expect(Portal.edgeCachePage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.edgeCachePage.getChartTitle()).toContain(titleChart);
    });

    it('should display default "Edge Cache Hit/Miss Ratio" report with empty data',
      function () {
        var titleChart = Constants.edgeCache.EDGE_CACHE_HIT_MISS_RATIO;
        expect(Portal.edgeCachePage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.edgeCachePage.getChartTitle()).toContain(titleChart);
    });

    it('should display default "Secondary Cache Efficiency Hits" report with empty data',
      function () {
        var titleChart = Constants.edgeCache.SECONDARY_CACHE_EFFICIENCY_HITS;
        expect(Portal.edgeCachePage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.edgeCachePage.getChartTitle()).toContain(titleChart);
    });

    it('should display default "Secondary Cache Hit/Miss Ratio" report with empty data',
      function () {
        var titleChart = Constants.edgeCache.SECONDARY_CACHE_HIT_MISS_RATIO;
        expect(Portal.edgeCachePage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.edgeCachePage.getChartTitle()).toContain(titleChart);
    });

    it('should display the default "Cache Hit Ratio For Top 20 Object Content Types" report with empty data',
      function () {
        var titleChart = Constants.edgeCache.CACHE_HIT_RATIO_BY_CONTENT_TYPE;
        expect(Portal.edgeCachePage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.edgeCachePage.getChartTitle()).toContain(titleChart);
    });
  });
});
