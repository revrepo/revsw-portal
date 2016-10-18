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
  describe('Add New App', function () {

    var users = [
      config.get('portal.users.admin')
    ];
    var platforms = [
      Portal.constants.mobileApps.platforms.android,
      Portal.constants.mobileApps.platforms.ios
    ];
    var length51Characters = new Array(52).join('x');

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

            it('should check Register button is disabled when app name have ' +
              'more than 51 characters', function () {
              Portal.mobileApps.listPage.clickAddNewApp();
              app.name = length51Characters;
              Portal.mobileApps.addPage.fill(app);
              var enabled = Portal.mobileApps.addPage.isEnabledRegister();
              expect(enabled).toBe(false);
            });

            it('should check Register button is disabled when app name have ' +
              'zero characters', function () {
              Portal.mobileApps.listPage.clickAddNewApp();
              app.name = '';
              Portal.mobileApps.addPage.fill(app);
              var enabled = Portal.mobileApps.addPage.isEnabledRegister();
              expect(enabled).toBe(false);
            });

            it('should check Register button is disabled when app name have ' +
              'empty characters', function () {
              Portal.mobileApps.listPage.clickAddNewApp();
              app.name = '       ';
              Portal.mobileApps.addPage.fill(app);
              var enabled = Portal.mobileApps.addPage.isEnabledRegister();
              expect(enabled).toBe(false);
            });

            it('should check Register button is disabled when app name have ' + // jshint ignore:line
              'special characters', function () {
              Portal.mobileApps.listPage.clickAddNewApp();
              app.name = '& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :';
              Portal.mobileApps.addPage.fill(app);
              var enabled = Portal.mobileApps.addPage.isEnabledRegister();
              expect(enabled).toBe(false);
            });
          });
        });
      });
    });
  });
});
