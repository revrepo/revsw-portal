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
  describe('Basic Edit App', function () {

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
      Portal.deleteMobileApps(iosApps);
      Portal.deleteMobileApps(androidApps);
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    apps.forEach(function (app) {
        it('should not allow to "verify" an app in Basic Edit mode with app name ' +
          'set to empty characters - ' +
          app.platform,
          function () {
            Portal.helpers.nav.goToMobileAppsMenuItem(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            var tempAppName = app.name;
            app.name = ' ';
            Portal.mobileApps.editPage.form.fill(app);
            var enabled = Portal.mobileApps.editPage.form.isEnabledVerify();
            expect(enabled).toBe(false);
        });

        it('should not alow to "update" an app in Basic Edit mode with app name ' +
          'set to empty characters - ' +
          app.platform,
          function () {
            Portal.helpers.nav.goToMobileAppsMenuItem(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            var tempAppName = app.name;
            app.name = ' ';
            Portal.mobileApps.editPage.form.fill(app);
            var enabled = Portal.mobileApps.editPage.form.isEnabledUpdate();
            expect(enabled).toBe(false);
        });

        it('should not alow to "publish" an app in Basic Edit mode with app name ' +
          'set to empty characters - ' +
          app.platform,
          function () {
            Portal.helpers.nav.goToMobileAppsMenuItem(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            var tempAppName = app.name;
            app.name = ' ';
            Portal.mobileApps.editPage.form.fill(app);
            var enabled = Portal.mobileApps.editPage.form.isEnabledPublish();
            expect(enabled).toBe(false);
        });
    });
  });
});
