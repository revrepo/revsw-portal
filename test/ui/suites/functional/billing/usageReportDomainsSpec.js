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
// var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('Usage Report/Domains', function () {

    var user = config.get('portal.usageReport.testDomainOwner');
    var testDomain = config.get('portal.usageReport.testDomain');
    var USAGE_REPORT = Constants.sideBar.billing.USAGE_REPORT;
    // var reportData = DataProvider.generateUsageReportData();

    describe('With user: ' + user.role, function () {
      beforeAll(function () {
        Portal.signIn(user);
        Portal.goToBilling();
        Portal.header.goTo(USAGE_REPORT);
      });

      afterAll(function () {
        Portal.signOut();
      });

      beforeEach(function () {
      });

      afterEach(function () {
      });

      //  ---------------------------------

    });
  });
});
