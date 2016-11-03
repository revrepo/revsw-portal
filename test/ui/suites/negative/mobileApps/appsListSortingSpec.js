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
  describe('Sorting List App', function () {

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

            it('should sorted list apps ascendant and descendant', function () {
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
              var totalRows = Portal.mobileApps.listPage.table
                .getRows()
                .count();
              Portal.mobileApps.listPage.searcher
                .setSearchCriteria('Something weird');
              Portal.mobileApps.listPage.sortByName();
              var appsCount1 = Portal.mobileApps.listPage.table
                .getRows()
                .count();
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
              Portal.mobileApps.listPage.sortByName();
              var appsCount2 = Portal.mobileApps.listPage.table
                .getRows()
                .count();
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
              Portal.mobileApps.listPage.searcher
                .setSearchCriteria(' ');
              Portal.mobileApps.listPage.sortByName();
              var appsCount3 = Portal.mobileApps.listPage.table
                .getRows()
                .count();

              expect(appsCount1).toBe(0);
              expect(appsCount2).toBe(0);
              expect(appsCount3).toBe(totalRows);
            });
          });
        });
      });
    });
  });
});