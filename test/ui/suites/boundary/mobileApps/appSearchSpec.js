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

describe('Boundary', function () {
  describe('App search', function () {

    var user = config.get('portal.users.admin');
    var platforms = [
      Portal.constants.mobileApps.platforms.ios,
      Portal.constants.mobileApps.platforms.android
    ];

    platforms.forEach(function (platform) {

      describe('Platform: ' + platform, function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToMobileAppsMenuItem(platform);
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
        });

        it('should search apps with 50 characters',
          function () {

            var longString = new Array(51).join('x');
            var app = DataProvider.generateMobileAppData(platform, 1)[0];
            app.name = longString;

            Portal.mobileApps.listPage.addNew(app);
            Portal.helpers.nav.goToMobileAppsMenuItem(platform);
            var countApps = Portal.mobileApps.listPage.searchAndCount(app.name);
            expect(countApps).toBe(1);

            Portal.mobileApps.listPage.searchAndDelete(app);
            Portal.dialog.clickOk();
          });

        it('should search field accept higher or equal to 200 characters to filter.',
          function () {

            var longString = new Array(200).join('x');
            var app = {
              name: longString
            };
            var countApps = Portal.mobileApps.listPage.searchAndCount(app.name);
            expect(countApps).toBe(0);
          });

        it('should search text field accept special characters to filter.',
          function () {
            Portal.helpers.nav.goToMobileAppsMenuItem(platform);

            var app = {
              name: '& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :'
            };
            var countApps = Portal.mobileApps.listPage.searchAndCount(app.name);
            expect(countApps).toBe(0);
          });
      });
    });
  });
})
;
