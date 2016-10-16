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

describe('Negative', function () {
  describe('Edit App Advanced Mode', function () {

    var adminUser = config.get('portal.users.admin');
    var platforms = Portal.constants.mobileApps.platforms;
    var iosApps = DataProvider.generateMobileAppData(platforms.ios, 1);
    var androidApps = DataProvider.generateMobileAppData(platforms.android, 1);
    var apps = iosApps.concat(androidApps);

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createMobileApps(platforms.ios, iosApps);
      Portal.createMobileApps(platforms.android, androidApps);
    });

    afterAll(function () {
      Portal.deleteMobileApps(apps);
      Portal.signOut();
    });

    apps.forEach(function (app) {
      it('should edit advanced mode & "cancel" json editor - ' + app.platform,
        function () {
          Portal.helpers.nav.goToMobileAppsMenuItem(platform);
          Portal.mobileApps.listPage.searchAndAdvancedEdit(app.name);
          Portal.mobileApps.advancedEditPage.cancel();

          Portal.helpers.nav.goToMobileAppsMenuItem(platform);
          var findApp = Portal.mobileApps.listPage.searchAndCount(app.name);
          expect(findApp).toBe(1);
      });
    });
  });
});
