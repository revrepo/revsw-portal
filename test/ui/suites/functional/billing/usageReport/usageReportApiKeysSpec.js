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
  var user = config.get('portal.users.admin');
  describe('Usage Report API Keys', function () {
    describe('With user: ' + user.role, function () {
      var apiKeysCount = 0;
      var pageKeys = 25;
      beforeAll(function (done) {
        // get the amount of API keys we have
        var lastPageKeys = 0;
        var pages = 0;
        Portal.signIn(user);
        Portal.helpers.nav.goToAPIKeys();
        Portal.admin.apiKeys.listPage.pager.getLastBtn().click();
        Portal.admin.apiKeys.listPage.table.getRows().count().then(function (count) {
          lastPageKeys = count;
          Portal.admin.apiKeys.listPage.pager.getCurrentPageIndex().then(function (text) {
            apiKeysCount = (pageKeys * (text - 1)) + lastPageKeys;
            done();
          });
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      it('should display correct amount of API keys', function () {
        Portal.helpers.nav.goToUsageReport();
        Portal.billing.usageReportPage.getApiKeysForm().then(function (text) {
          expect(text).toContain(apiKeysCount);
        });
      });
    });
  });
});
