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

describe('Boundary', function () {
  describe('Basic Edit App', function () {

    var users = [
      config.get('portal.users.admin')
    ];
    var platforms = [
      Portal.constants.mobileApps.platforms.android,
      Portal.constants.mobileApps.platforms.ios
    ];
    var length51Characters = new Array(52).join('x');
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

            it('should check "Verify" button is disabled when app name have more ' +
              'than 51 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName(length51Characters);
                expect(Portal.mobileApps.editPage.form.isVerifyBtnEnabled()).toBe(false);
              });

            it('should click "Verify" button and validate app name with zero ' +
              'characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName('');
                var enabled = Portal.mobileApps.editPage.form.isVerifyBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Verify" button and validate app name with empty ' +
              'and space characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName('       ');
                var enabled = Portal.mobileApps.editPage.form.isVerifyBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Verify" button and validate app name with special ' +
              'characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setAppName('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isVerifyBtnEnabled();
                expect(enabled).toBe(false);
              });

            /* Update tests: */

            it('should check "Update" button is disabled when app name have more ' +
              'than 51 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName(length51Characters);
                var enabled = Portal.mobileApps.editPage.form.isVerifyBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Update" button and validate app name with zero ' +
              'or none characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName('');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Update" button and validate app name with empty ' +
              'and space characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName('       ');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Update" button and validate app name with special ' +
              'characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setAppName('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Update" button and validate Configuration Refresh Interval ' +
              'with special characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setConfigurationRefreshInterval('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Update" button is disabled when Configuration ' +
              ' Refresh Interval  have less than 3 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationRefreshInterval('12');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Update" button is disabled when Configuration ' +
              ' Refresh Interval  have more than 6 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationRefreshInterval('1234567');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Update" button and validate Configuration Stale Timeout ' +
              'with special characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setConfigurationStaleTimeout('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });


            it('should check "Update" button is disabled when Configuration ' +
              ' Stale Timeout  have less than 3 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationStaleTimeout('12');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Update" button is disabled when Configuration ' +
              ' Stale Timeout  have more than 6 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationStaleTimeout('1234567');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Update" button is disabled when Analytics ' +
              ' Reporting Interval  value is less than 20.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAnalyticsReportingInterval('19');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Update" button and validate Analytics Reporting Interval ' +
              'with special characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setAnalyticsReportingInterval('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Update" button is disabled when Analytics ' +
              ' Reporting Interval value is more than 3600 .', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAnalyticsReportingInterval('3601');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Update" button is disabled when A/B ' +
              ' Testing Offloading Ratio value is more than 100 .', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setTestingOffloadingRatio('101');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Update" button and validate A/B Testing Offloading Ratio' +
              'with special characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setTestingOffloadingRatio('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isUpdateBtnEnabled();
                expect(enabled).toBe(false);
              });

            /* Publish tests: */

            it('should check "Publish" button is disabled when app name have more ' +
              'than 51 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName(length51Characters);
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Publish" button and validate app name with zero ' +
              'characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName('');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Publish" button and validate app name with empty ' +
              'and space characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAppName('       ');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should click "Publish" button and validate app name with special ' +
              'characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setAppName('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when Configuration ' +
              ' Refresh Interval  have less than 3 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationRefreshInterval('12');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });



            it('should check "Publish" button is disabled when Configuration ' +
              ' Refresh Interval  have more than 6 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationRefreshInterval('1234567');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when Configuration Refresh Interval' +
              ' contains special characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setConfigurationRefreshInterval('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when Configuration ' +
              ' Stale Timeout  have less than 3 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationStaleTimeout('12');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when Configuration ' +
              ' Stale Timeout  have more than 6 characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setConfigurationStaleTimeout('1234567');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when Configuration Stale Timeout' +
              ' contains special characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setConfigurationStaleTimeout('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when Analytics ' +
              ' Reporting Interval  value is less than 20.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAnalyticsReportingInterval('19');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when Analytics ' +
              ' Reporting Interval value is more than 3600 .', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setAnalyticsReportingInterval('3601');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when Analytics Reporting Interval' +
              ' contains special characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setAnalyticsReportingInterval('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when A/B ' +
              ' Testing Offloading Ratio value is more than 100 .', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form.setTestingOffloadingRatio('101');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });

            it('should check "Publish" button is disabled when A/B Testing Offloading Ratio' +
              ' contains special characters.', function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndEdit(app.name);
                Portal.mobileApps.editPage.form
                  .setTestingOffloadingRatio('& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :');
                var enabled = Portal.mobileApps.editPage.form.isPublishBtnEnabled();
                expect(enabled).toBe(false);
              });
          });
        });
      });
    });
  });
});
