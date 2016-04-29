/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];
  var platforms = [
    config.get('portal.mobileApps.platforms.ios'),
    config.get('portal.mobileApps.platforms.android')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Edit App', function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.goToMobileApps();
        });

        afterAll(function () {
          Portal.signOut();
        });

        platforms.forEach(function (platform) {

          describe('Platform: ' + platform, function () {

            beforeEach(function () {
              Portal.header.goTo(platform);
            });

            afterEach(function () {
            });

            it('should display edit app button',
              function () {
                var editButton = Portal.mobileApps.listPage.appsTable
                  .getEditApp();
                expect(editButton.isPresent()).toBeTruthy();
              });

            it('should display `Edit app` form',
              function () {
                Portal.mobileApps.listPage.appsTable.clickEditApp();
                expect(Portal.mobileApps.editAppPage.isDisplayed())
                  .toBeTruthy();
              });

            it('should allow to cancel an app edition',
              function () {
                Portal.mobileApps.listPage.appsTable.clickEditApp();
                Portal.mobileApps.editAppPage.form.setAppName('something');
                Portal.mobileApps.editAppPage.form.clickCancel();
                expect(Portal.mobileApps.listPage.isDisplayed()).toBeTruthy();
              });

            it('should update an app successfully when filling all required ' +
              'data',
              function () {
                var app = DataProvider.generateMobileApp(platform);
                Portal.mobileApps.listPage.addNewApp(app);
                expect(Portal.alerts.getAll().count()).toEqual(1);
                expect(Portal.alerts.getFirst().getText())
                  .toEqual('App registered');
                Portal.mobileApps.addAppPage.clickBackToList();
                Portal.mobileApps.listPage.searchAndEdit(app);
                app.name = 'UPDATED-' + app.name;
                Portal.mobileApps.editAppPage.update(app);
                Portal.dialog.clickOk();
                expect(Portal.alerts.getAll().count()).toEqual(1);
                expect(Portal.alerts.getFirst().getText())
                  .toEqual('App updated');
              });
          });
        });
      });
    });
  });
});
