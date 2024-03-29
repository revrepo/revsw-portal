/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];
  var platforms = [
    Portal.constants.mobileApps.platforms.ios,
    Portal.constants.mobileApps.platforms.android,
    Portal.constants.mobileApps.platforms.windowsMobile
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Delete App', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        platforms.forEach(function (platform) {

          describe('Platform: ' + platform, function () {

            var app;

            beforeEach(function () {
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
            });

            afterEach(function () {
            });

            it('should display delete app button',
              function () {
                var editButton = Portal.mobileApps.listPage.table
                  .getFirstRow()
                  .getDeleteBtn();
                expect(editButton.isPresent()).toBeTruthy();
              });

            it('should display a confirmation message when deleting an app',
              function () {
                app = DataProvider.generateMobileApp(platform);
                Portal.mobileApps.listPage.addNew(app);
                expect(Portal.alerts.getAll().count()).not.toEqual(0);
                expect(Portal.alerts.getFirst().getText())
                  .toContain(Constants.alertMessages.app.MSG_SUCCESS_ADD);
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndDelete(app.name);
                expect(Portal.dialog.isDisplayed()).toBeTruthy();
                Portal.dialog.clickCancel();
              });

            it('should allow to delete an app',
              function () {
                Portal.mobileApps.listPage.searchAndDelete(app.name);
                expect(Portal.dialog.isDisplayed()).toBeTruthy();
                Portal.dialog.clickOk();
                Portal.mobileApps.listPage.setSearch(app.name);
                var count = Portal.mobileApps.listPage.table
                  .getRows()
                  .count();
                expect(count).toBe(0);
              });
          });
        });
      });
    });
  });
});
