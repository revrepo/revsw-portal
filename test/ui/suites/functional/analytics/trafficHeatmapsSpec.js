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
  describe('Traffic Heatmaps', function () {

    var adminUser = config.get('portal.users.admin');
    var myDomain = Constants.domain;

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToWATrafficHeatmaps();
      Portal.trafficHeatmapsPage.selectDomain(myDomain);
    });

    afterAll(function () {
      Portal.signOut();
    });

    it('should create a Hits Heatmap report with default values',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 6 Hours';
        Portal.trafficHeatmapsPage.createTrafficHeatmaps(dataReport);
        
        var hitsHeatmapImg = Portal.trafficHeatmapsPage.existHitsHeatmapImage();
        var gbtHeatmapImg = Portal.trafficHeatmapsPage.existGBTHeatmapImage();
        var getData = Portal.trafficHeatmapsPage.getInfoTrafficHeatmaps();
        
        expect(getData.delay).toContain(dataReport.delay);
        expect(hitsHeatmapImg).toBe(true);
        expect(gbtHeatmapImg).toBe(true);
    });

    it('should create a GBT Heatmap report with custom values',
      function () {
        var dataReport = DataProvider.generateAnalyticsInfo();
        dataReport.delay = 'Last 24 Hours';
        Portal.trafficHeatmapsPage.createTrafficHeatmaps(dataReport);

        var hitsHeatmapImg = Portal.trafficHeatmapsPage.existHitsHeatmapImage();
        var gbtHeatmapImg = Portal.trafficHeatmapsPage.existGBTHeatmapImage();
        var getData = Portal.trafficHeatmapsPage.getInfoTrafficHeatmaps();
        
        expect(getData.delay).toContain(dataReport.delay);
        expect(hitsHeatmapImg).toBe(true);
        expect(gbtHeatmapImg).toBe(true);
    });
  });
});
