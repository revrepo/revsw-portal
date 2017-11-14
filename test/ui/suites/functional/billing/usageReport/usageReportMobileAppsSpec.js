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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');

describe('Functional', function () {
  var platforms = [
    Portal.constants.mobileApps.platforms.android,
    Portal.constants.mobileApps.platforms.ios
  ];
  var user = config.get('portal.users.admin');
  describe('Usage Report Mobile Apps', function () {
    describe('With user: ' + user.role, function () {
      platforms.forEach(function (platform) {
        describe('Platform: ' + platform, function () {
          var appsCount = 0;
          var pageKeys = 25;
          beforeAll(function (done) {
            var lastPageKeys = 0;
            var pages = 0;
            Portal.signIn(user);
            Portal.helpers.nav.goToMobileAppsMenuItem(platform);
            Portal.mobileApps.listPage.pager.getLastBtn().click();
            Portal.mobileApps.listPage.table.getRows().count().then(function (count) {
              lastPageKeys = count;
              Portal.mobileApps.listPage.pager.getCurrentPageIndex().then(function (text) {
                appsCount = (pageKeys * (text - 1)) + lastPageKeys;
                done();
              });
            });
          });

          afterAll(function () {
            Portal.signOut();
          });

          it('should display correct amount of ' + platform + ' mobile apps', function () {
            Portal.helpers.nav.goToUsageReport();
            Portal.billing.usageReportPage.getMobileAppsViewText().then(function (text) {
              expect(text).toContain(appsCount);
            });
          });
        });
      });
    });
  });
});
