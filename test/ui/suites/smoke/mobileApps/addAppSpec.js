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

describe('Smoke', function() {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.user'),
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.roUser'),
  ];
  var platforms = [
    Portal.constants.mobileApps.platforms.ios,
    Portal.constants.mobileApps.platforms.android,
    Portal.constants.mobileApps.platforms.windowsMobile
  ];

  users.forEach(function(user) {

    describe('With user: ' + user.role, function() {
      describe('Add App', function() {

        beforeAll(function() {
          Portal.signIn(user);
        });

        afterAll(function() {
          Portal.signOut();
        });

        platforms.forEach(function(platform) {

          describe('Platform: ' + platform, function() {

            beforeEach(function() {
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
            });

            afterEach(function() {});
            switch (user.role) {
              case 'RO User':
                it('should show not active button "Add New App"',
                  function() {
                    expect(Portal.mobileApps.listPage.getAddNewAppBtn().isDisplayed()).toBeTruthy();
                    Portal.mobileApps.listPage.clickAddNewApp();
                    expect(Portal.mobileApps.listPage.isDisplayed()).toBeTruthy();
                  });
                break;
              default:
                it('should display "Add app" form',
                  function() {
                    Portal.mobileApps.listPage.clickAddNewApp();
                    expect(Portal.mobileApps.addPage.isDisplayed()).toBeTruthy();
                  });

                it('should allow to cancel an app creation',
                  function() {
                    Portal.mobileApps.listPage.clickAddNewApp();
                    Portal.mobileApps.addPage.setAppName('something');
                    Portal.mobileApps.addPage.clickCancel();
                    expect(Portal.mobileApps.listPage.isDisplayed()).toBeTruthy();
                  });

                // TODO the test is unstable - need to check why it does not fill out the form 
                it('should create an app successfully when filling all required ' +
                  'data',
                  function() {
                    var app = DataProvider.generateMobileApp(platform);
                    Portal.mobileApps.listPage.addNew(app);
                    expect(Portal.alerts.getAll().count()).not.toEqual(0);
                    expect(Portal.alerts.getFirst().getText())
                      .toContain(Constants.alertMessages.app.MSG_SUCCESS_ADD);
                  });
                break;
            }
          });
        });
      });
    });
  });
});
