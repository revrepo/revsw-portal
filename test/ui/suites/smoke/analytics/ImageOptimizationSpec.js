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
  describe('Proxy traffic reports', function () {

    var adminUser = config.get('portal.users.admin');
    var noDomain = 'Select Domain';

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToImageOptimization();
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    it('should display "Image Optimization Analytics" in the portal',
      function () {
        var titleReport = Constants.imageOptimization.TITLE;
        expect(Portal.imageOptimizationPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.imageOptimizationPage.getTitle()).toEqual(titleReport);
      });

    it('should display the default "Performance Improvement" report with empty data',
      function () {
        var titleChart = Constants.imageOptimization.PERFORMANCE_IMPROVEMENT;
        expect(Portal.imageOptimizationPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.imageOptimizationPage.getChartTitle()).toContain(titleChart);
      });

    it('should display the default "Bandwidth Saved" report with empty data',
      function () {
        var titleChart = Constants.imageOptimization.BANDWIDTH_SAVED;
        expect(Portal.imageOptimizationPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.imageOptimizationPage.getChartTitle()).toContain(titleChart);
      });

    it('should display the default "Image Format Changes" report with empty data',
      function () {
        var titleChart = Constants.imageOptimization.FORMAT_CHANGES;
        expect(Portal.imageOptimizationPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.imageOptimizationPage.getChartTitle()).toContain(titleChart);
      });

    it('should display default "Image Resolution Changes" report with empty data',
      function () {
        var titleChart = Constants.imageOptimization.RESOLUTION_CHANGES;
        expect(Portal.imageOptimizationPage.getSelectedDomain()).toEqual(noDomain);
        expect(Portal.imageOptimizationPage.getChartTitle()).toContain(titleChart);
      });
  });
});
