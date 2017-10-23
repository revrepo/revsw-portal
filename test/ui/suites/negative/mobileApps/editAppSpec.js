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
  describe('Basic Edit App', function () {

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
                    .create({ platform: platform })
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
            
            it('should allow to verify app if form is filled with valid data', function () {
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
              Portal.mobileApps.listPage.searchAndEdit(app.name);
              var enabled = Portal.mobileApps.editPage.form.isVerifyBtnEnabled();
              expect(enabled).toBe(true);
            });

            it('should allow to update app if form is filled with valid data', function () {
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
              Portal.mobileApps.listPage.searchAndEdit(app.name);
              var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
              expect(enabled).toBe(true);
            });

            it('should allow to publish app if form is filled with valid data', function () {
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
              Portal.mobileApps.listPage.searchAndEdit(app.name);
              var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
              expect(enabled).toBe(true);
            });

            it('should not allow to "verify" an app in Basic Edit mode with app name ' +
              'set to empty characters', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName(' ');
                var enabled = Portal.mobileApps.editPage.form.isVerifyBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should not allow to "update" an app in Basic Edit mode with app name ' +
              'set to empty characters', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName(' ');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should not allow to "publish" an app in Basic Edit mode with app name ' +
              'set to empty characters', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName(' ');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Update" button is disabled when Configuration ' +
              ' Refresh Interval  is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationRefreshInterval('');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });              

            it('should check "Update" button is disabled when Configuration ' +
              ' Stale Timeout  is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationStaleTimeout('');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when Configuration ' +
              ' Refresh Interval  is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationRefreshInterval('');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

              it('should check "Verify" button is disabled when Configuration ' +
              ' Refresh Interval is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationRefreshInterval('');
                var enabled = Portal.mobileApps.editPage.form.isVerifyBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when Configuration ' +
              ' Stale Timeout  is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationStaleTimeout('');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

              it('should check "Verify" button is disabled when Configuration ' +
              ' Stale Timeout is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationStaleTimeout('');
                var enabled = Portal.mobileApps.editPage.form.isVerifyBtnEnabled();
                expect(enabled).toBe(false);
              });

              it('should check "Publish" button is disabled when Analytics ' +
              ' Reporting Interval  is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAnalyticsReportingInterval('');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

              it('should check "Update" button is disabled when Analytics ' +
              ' Reporting Interval  is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAnalyticsReportingInterval('');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

              it('should check "Verify" button is disabled when Analytics ' +
              ' Reporting Interval is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAnalyticsReportingInterval('');
                var enabled = Portal.mobileApps.editPage.form.isVerifyBtnEnabled();
                expect(enabled).toBe(false);
              });

              it('should check "Publish" button is disabled when A/B Testing ' +
              ' Offloading Ratio is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setTestingOffloadingRatio('');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

              it('should check "Update" button is disabled when A/B Testing ' +
              ' Offloading Ratio is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setTestingOffloadingRatio('');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

              it('should check "Verify" button is disabled when A/B Testing ' +
              ' Offloading Ratio is empty.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setTestingOffloadingRatio('');
                var enabled = Portal.mobileApps.editPage.form.isVerifyBtnEnabled();
                expect(enabled).toBe(false);
              });
          });
        });
      });
    });
  });
});
