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
var Portal = require('./../../page_objects/portal');

describe('Smoke', function () {

  // Users
  var admin = config.get('portal.users.admin');
  var reseller = config.get('portal.users.reseller');
  var revAdmin = config.get('portal.users.revAdmin');
  var users = [
    admin,
    reseller,
    revAdmin
  ];

  // Platforms
  var ios = Portal.constants.mobileApps.platforms.ios;
  var android = Portal.constants.mobileApps.platforms.android;
  var platforms = [
    ios,
    android
  ];

  // Domains
  var domains = {};
  domains[admin.role] = 'qa-admin-10-portal-ui-test.com';
  domains[reseller.role] = 'qa-reseller-10-portal-ui-test.com';
  domains[revAdmin.role] = 'qa-rev-admin-10-portal-ui-test.com';

  // Mobile Apps
  var mobileApps = {};
  mobileApps[ios] = {};
  mobileApps[ios][admin.role] = 'qa-admin-ios-10';
  mobileApps[ios][reseller.role] = 'qa-reseller-ios-10';
  mobileApps[ios][revAdmin.role] = 'qa-rev-admin-ios-10';
  mobileApps[android] = {};
  mobileApps[android][admin.role] = 'qa-admin-android-10';
  mobileApps[android][reseller.role] = 'qa-reseller-android-10';
  mobileApps[android][revAdmin.role] = 'qa-rev-admin-android-10';

  // Accounts
  var accounts = {};
  accounts[admin.role] = 'qa-admin-10-portal-ui-test.com';
  accounts[reseller.role] = 'qa-reseller-10-portal-ui-test.com';
  accounts[admin.role] = 'qa-admin-10-portal-ui-test.com';

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Global Search', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.globalSearcher.clearSearchCriteria();
        });

        afterEach(function () {
        });

        it('should search domain: ' + domains[user.role],
          function () {
            var domainName = domains[user.role];
            Portal.globalSearcher.search(domainName);
            expect(Portal.domains.editPage.getTitle()).toContain(domainName);
          });

        platforms.forEach(function (platform) {

          describe('Platform: ' + platform, function () {

            it('should search mobile app: ' + mobileApps[platform][user.role],
              function () {
                var appName = mobileApps[platform][user.role];
                Portal.globalSearcher.search(appName);
                expect(Portal.mobileApps.editPage.getTitle())
                  .toContain(appName);
              });
          });
        });
      });
    });
  });
});
