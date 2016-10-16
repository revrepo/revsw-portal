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
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('Delete App', function () {

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
                    .createOne({platform: platform})
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

            it('should delete an app', function () {
              Portal.helpers.nav.goToMobileAppsMenuItem(platform);
              Portal.mobileApps.listPage.searchAndDelete(app.name);
              Portal.dialog.clickOk();
              var alert = Portal.alerts.getFirst();
              var expectedMsg = Constants.alertMessages.app.MSG_SUCCESS_DELETE;
              expect(alert.getText()).toContain(expectedMsg);
              var total = Portal.mobileApps.listPage.searchAndCount(app.name);
              expect(total).toBe(0);
            });
          });
        });
      });
    });
  });
});
