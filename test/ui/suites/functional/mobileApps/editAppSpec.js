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
  describe('Basic Edit App And Update', function () {

    var users = [
      config.get('portal.users.admin')
    ];
    var platforms = [
      Portal.constants.mobileApps.platforms.android,
      Portal.constants.mobileApps.platforms.ios
    ];
    var app;

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        platforms.forEach(function (platform) {

          describe('For platform: ' + platform, function () {

            beforeAll(function (done) {
              Portal
                .signIn(user)
                .then(function () {
                  return Portal.helpers.mobileApps
                    .create({platform: platform})
                    .then(function (newApp) {
                      app = newApp;
                      done();
                    })
                    .catch(done);
                })
                .catch(done);
            });

            afterAll(function () {
              Portal.signOut();
            });

            it('should get the title from basic edited app',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);

                var title = Portal.mobileApps.editPage.getTitle();
                expect(title).toContain('Edit App');
              });

            it('should basic edit and "verify" an existing app',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                var updatedApp = DataProvider.generateUpdateMobileApp(app);
                Portal.mobileApps.editPage.verify(updatedApp);
                var alert = Portal.alerts.getFirst();
                var expectedMsg = 'The configuration has been successfully verified';
                expect(alert.getText()).toEqual(expectedMsg);
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var count = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(count).toBe(1);
              });

            it('should basic edit and "update" an existing app',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                var updatedApp = DataProvider.generateUpdateMobileApp(app);
                Portal.mobileApps.editPage.update(updatedApp);
                Portal.dialog.clickOk();

                var alert = Portal.alerts.getFirst();
                var expectedMsg = Constants.alertMessages.app.MSG_SUCCESS_UPDATE;
                expect(alert.getText()).toContain(expectedMsg);

                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var count = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(count).toBe(1);
              });

            it('should basic edit and "publish" an existing app',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                var updatedApp = DataProvider.generateUpdateMobileApp(app);
                Portal.mobileApps.editPage.publish(updatedApp);
                Portal.dialog.clickOk();

                var alert = Portal.alerts.getFirst();
                var expectedMsg = Constants.alertMessages.app.MSG_SUCCESS_UPDATE;
                expect(alert.getText()).toContain(expectedMsg);

                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var count = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(count).toBe(1);
              });

            it('should basic edit and "verify" the app name',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                app.name = app.name + 'UPDATED';
                var updatedApp = DataProvider.generateUpdateMobileApp(app);
                Portal.mobileApps.editPage.verify(updatedApp);

                var alert = Portal.alerts.getFirst();
                var expectedMsg = Constants.alertMessages.app.MSG_SUCCESS_VERIFY;
                expect(alert.getText()).toContain(expectedMsg);

                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var count = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(count).toBe(1);
              });

            it('should basic edit and "update" the app name',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                app.name = app.name + 'UPDATED';
                var updatedApp = DataProvider.generateUpdateMobileApp(app);
                Portal.mobileApps.editPage.update(updatedApp);
                Portal.dialog.clickOk();

                var alert = Portal.alerts.getFirst();
                var expectedMsg = Constants.alertMessages.app.MSG_SUCCESS_UPDATE;
                expect(alert.getText()).toContain(expectedMsg);

                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var count = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(count).toBe(1);
              });

            it('should basic edit and "publish" the app name',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                app.name = app.name + 'UPDATED';
                var updatedApp = DataProvider.generateUpdateMobileApp(app);
                Portal.mobileApps.editPage.publish(updatedApp);
                Portal.dialog.clickOk();

                var alert = Portal.alerts.getFirst();
                var expectedMsg = Constants.alertMessages.app.MSG_SUCCESS_UPDATE;
                expect(alert.getText()).toContain(expectedMsg);

                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var count = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(count).toBe(1);
              });

            it('should verify staging status after "publish"',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                var updatedApp = DataProvider.generateUpdateMobileApp(app);
                Portal.mobileApps.editPage.publish(updatedApp);
                Portal.dialog.clickOk();

                var alert = Portal.alerts.getFirst();
                var expectedMsg = Constants.alertMessages.app.MSG_SUCCESS_UPDATE;
                expect(alert.getText()).toContain(expectedMsg);

                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var count = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(count).toBe(1);
                var row = Portal.mobileApps.listPage.table
                  .getFirstRow();
                expect(row.getPublishedStagingStatusIcon().isPresent()).toBeTruthy();
                expect(row.getPublishedGlobalStatusIcon().isPresent()).toBeTruthy();
              });

            it('should verify global status after "update"',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                var updatedApp = DataProvider.generateUpdateMobileApp(app);
                Portal.mobileApps.editPage.update(updatedApp);
                Portal.dialog.clickOk();

                var alert = Portal.alerts.getFirst();
                var expectedMsg = Constants.alertMessages.app.MSG_SUCCESS_UPDATE;
                expect(alert.getText()).toContain(expectedMsg);

                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var count = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(count).toBe(1);
                var row = Portal.mobileApps.listPage.table
                  .getFirstRow();
                expect(row.getPublishedStagingStatusIcon().isPresent()).toBeTruthy();
                expect(row.getModifiedGlobalStatusIcon().isPresent()).toBeTruthy();
              });

          });
        });
      });
    });
  });
});
