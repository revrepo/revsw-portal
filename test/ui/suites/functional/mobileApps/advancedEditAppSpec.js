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

describe('Functional', function () {

  describe('Advanced Edit App', function () {

    var users = [
      config.get('portal.users.admin')
    ];
    var platforms = [
      Portal.constants.mobileApps.platforms.android,
      Portal.constants.mobileApps.platforms.ios
    ];

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

            it('should edit advanced mode & "verify" json editor',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndAdvancedEdit(app.name);
                Portal.mobileApps.advancedEditPage.verify();
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var total = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(total).toBe(1);
              });

            it('should edit advanced mode & "update" json editor',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndAdvancedEdit(app.name);
                Portal.mobileApps.advancedEditPage.update();
                Portal.dialog.clickOk();

                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var total = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(total).toBe(1);
              });

            it('should edit advanced mode & "publish" json editor',
              function () {
                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                Portal.mobileApps.listPage.searchAndAdvancedEdit(app.name);
                Portal.mobileApps.advancedEditPage.publish();
                Portal.dialog.clickOk();

                Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                var total = Portal.mobileApps.listPage.searchAndCount(app.name);
                expect(total).toBe(1);
              });
          });
        });
      });
    });
  });
});
