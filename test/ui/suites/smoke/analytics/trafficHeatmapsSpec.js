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
  describe('Traffic Heatmaps', function () {

    var adminUser = config.get('portal.users.admin');
    var noDomain = 'Select Domain';

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToWATrafficHeatmaps();
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should display "Global Traffic Heatmaps" in the portal',
      function () {
        var titleReport = Constants.trafficHeatmaps.TITLE;
        var domain = Portal.trafficHeatmapsPage.getSelectedDomain();
        var title = Portal.trafficHeatmapsPage.getTitle();
        expect(domain).toEqual(noDomain);
        expect(title).toEqual(titleReport);
    });

    it('should display default "Hits Heatmap" report with empty data',
      function () {
        var titleChart = Constants.trafficHeatmaps.HITS_HEATMAP;
        var domain = Portal.trafficHeatmapsPage.getSelectedDomain();
        var hitsHeatmap = Portal.trafficHeatmapsPage.getChartTitle();
        expect(domain).toEqual(noDomain);
        expect(hitsHeatmap).toContain(titleChart);
    });

    it('should show default "GBT Heatmap" report with empty data',
      function () {
        var titleChart = Constants.trafficHeatmaps.GBT_HEATMAP;
        var domain = Portal.trafficHeatmapsPage.getSelectedDomain();
        var gbtHeatmap = Portal.trafficHeatmapsPage.getChartTitle();
        expect(domain).toEqual(noDomain);
        expect(gbtHeatmap).toContain(titleChart);
    });
  });
});
