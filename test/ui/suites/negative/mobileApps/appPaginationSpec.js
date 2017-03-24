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

describe('Negative', function () {
  describe('Apps Pagination', function () {

    var users = [
      config.get('portal.users.admin')
    ];
    var platforms = [
      Portal.constants.mobileApps.platforms.android,
      Portal.constants.mobileApps.platforms.ios
    ];

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        platforms.forEach(function (platform) {

          describe('For platform: ' + platform, function () {

            beforeAll(function () {
              Portal.signIn(user);
            });

            afterAll(function () {
              Portal.signOut();
            });

            beforeEach(function () {
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
            });

            afterEach(function () {
              Portal.mobileApps.listPage.searcher.clearSearchCriteria();
            });

            it('should not display pagination when there is not any app to ' +
              'show', function () {
              var uniqueString = 'unique_string_' + (new Date()).getTime();
              Portal.mobileApps.listPage.setSearch(uniqueString);
              expect(Portal.mobileApps.listPage.pager.getPaginationButtons().isDisplayed()).toEqual([false, false]);
            });

            it('should not show pagination buttons when the search criteria ' +
              'does not match with any word in the `App List`', function () {
              var uniqueString = 'unique_string_' + (new Date()).getTime();
              var availablePages = Portal.mobileApps.listPage.pager
                .getAllPageIndexButtons()
                .count();
              Portal.mobileApps.listPage.setSearch(uniqueString);
              var filteredPages = Portal.mobileApps.listPage.pager
                .getAllPageIndexButtons()
                .count();
              expect(availablePages).toBeGreaterThan(1);
              expect(filteredPages).toEqual(0);
              expect(availablePages).toBeGreaterThan(filteredPages);
            });

            it('should display the `Previous Page` disabled after filtering ' +
              'does not return any apps in the `App List`', function () {
              var uniqueString = 'unique_string_' + (new Date()).getTime();
              Portal.mobileApps.listPage.setSearch(uniqueString);
              expect(Portal.mobileApps.listPage.pager.getPreviousBtn().isDisplayed()).toBe(false);
            });

            it('should not display the `Next Page` after filtering does not ' +
              'return any apps in the `App List`', function () {
              var uniqueString = 'unique_string_' + (new Date()).getTime();
              Portal.mobileApps.listPage.setSearch(uniqueString);
              expect(Portal.mobileApps.listPage.pager.getNextBtn().isDisplayed()).toBe(false);
            });

          });
        });
      });
    });
  });
});
