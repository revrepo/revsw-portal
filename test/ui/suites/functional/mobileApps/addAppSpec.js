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
  describe('Add New App', function () {

    var adminUser = config.get('portal.users.admin');
    var platforms = Portal.constants.mobileApps.platforms;
    var iosApps = DataProvider.generateMobileAppData(platforms.ios, 1);
    var androidApps = DataProvider.generateMobileAppData(platforms.android, 1);
    var windowsMobileApps = DataProvider
      .generateMobileAppData(platforms.windowsMobile, 1);
    var apps = iosApps.concat(androidApps).concat(windowsMobileApps);

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.deleteMobileApps(apps);
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    apps.forEach(function (app) {
      it('should get title from list app page - ' + app.platform,
        function () {
          Portal.helpers.nav.goToMobileAppsMenuItem(app.platform);
          var title = Portal.mobileApps.listPage.getTitle();
          expect(title).toEqual(app.title);
        });

      it('should add a new app - ' + app.platform,
        function () {
          Portal.helpers.nav.goToMobileAppsMenuItem(app.platform);
          Portal.mobileApps.listPage.addNew(app);

          var alert = Portal.alerts.getFirst();
          var expectedMsg = Constants.alertMessages.app.MSG_SUCCESS_ADD;
          expect(alert.getText()).toContain(expectedMsg);

          Portal.helpers.nav.goToMobileAppsMenuItem(app.platform);
          var findApp = Portal.mobileApps.listPage.findApp(app);
          expect(findApp).toBe(1);
        });
    });
  });
});
