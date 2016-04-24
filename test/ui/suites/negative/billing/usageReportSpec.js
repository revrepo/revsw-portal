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
  describe('Usage Report', function () {

    var adminUser = config.get('portal.users.admin');
    var reportData = DataProvider.generateUsageReportData();

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.goToBilling();
      Portal.header.goTo(Constants.sideBar.billing.USAGE_REPORT);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('should check that Update Report fails with invalid date', function() {
      reportData.monthDD = '01-2016';
      Portal.billing.usageReportPage.fill(reportData);
      var enabledBtn = Portal.billing.usageReportPage.isEnabledUpdateReport();
      expect(enabledBtn).toBe(false);
    });

    it('should check that Update Report fails with empty date', function() {
      reportData.monthDD = '   ';
      Portal.billing.usageReportPage.fill(reportData);
      var enabledBtn = Portal.billing.usageReportPage.isEnabledUpdateReport();
      expect(enabledBtn).toBe(false);
    });

    it('should check that Update Report fails with special characters date',
      function() {
        reportData.monthDD = 'abcdefg!@#$%';
        Portal.billing.usageReportPage.fill(reportData);
        var enabledBtn = Portal.billing.usageReportPage.isEnabledUpdateReport();
        expect(enabledBtn).toBe(false);
    });
  });
});
