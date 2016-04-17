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
  describe('Edit App And Update', function () {

    var adminUser = config.get('portal.users.admin');
    var apps = DataProvider.generateMobileApps();

    beforeAll(function () {
      Portal.signIn(adminUser);
      // Portal.goToMobileApps();
      // Portal.header.goTo('Android');
      Portal.createMobileApps(apps);
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
        xit('should get title from list app list', function () {
            var title = Portal.mobileApps.listPage.getTitle();
            expect(title).toEqual('Android Apps List');
        });

        it('should basic edit and "verify" an existing app - ' + app.platform,
          function () {
            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            Portal.mobileApps.editAppPage.verify(app);

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App configuration is correct';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        it('should basic edit and "update" an existing app - ' + app.platform,
          function () {
            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            Portal.mobileApps.editAppPage.update(app);
            Portal.dialog.clickOk();

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App updated';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        it('should basic edit and "publish" an existing app - ' + app.platform,
          function () {
            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            Portal.mobileApps.editAppPage.publish(app);
            Portal.dialog.clickOk();

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App configuration is published';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        xit('should basic edit and "verify" the app name - ' + app.platform,
          function () {
            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            app.name = app.name + 'UPDATED';
            Portal.mobileApps.editAppPage.verify(app);

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App configuration is correct';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        xit('should basic edit and "update" the app name - ' + app.platform,
          function () {
            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            app.name = app.name + 'UPDATED';
            Portal.mobileApps.editAppPage.update(app);
            Portal.dialog.clickOk();

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App updated';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });

        xit('should basic edit and "publish" the app name - ' + app.platform,
          function () {
            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            Portal.mobileApps.listPage.searchAndEdit(app);
            app.name = app.name + 'UPDATED';
            Portal.mobileApps.editAppPage.update(app);
            Portal.dialog.clickOk();

            var alert = Portal.alerts.getFirst();
            var expectedMsg = 'App configuration is published';
            expect(alert.getText()).toEqual(expectedMsg);

            Portal.goToMobileApps();
            Portal.header.goTo(app.platform);
            var findApp = Portal.mobileApps.listPage.findApp(app);
            expect(findApp).toBe(1);
        });
    });
  });
});
