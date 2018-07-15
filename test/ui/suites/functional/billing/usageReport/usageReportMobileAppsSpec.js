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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');
var API = require('./../../../../common/api').API;

describe('Functional', function () {
  var platforms = [
    Portal.constants.mobileApps.platforms.android,
    Portal.constants.mobileApps.platforms.ios
  ];
  var user = config.get('portal.users.admin');
  describe('Usage Report Mobile Apps', function () {
    describe('With user: ' + user.role, function () {
      /* jshint camelcase:false */
      platforms.forEach(function (platform) {
        describe('Platform: ' + platform, function () {
          var appsCount = {
            iOS: 0,
            Android: 0,
            Windows_Mobile: 0
          };
          beforeAll(function (done) {
            Portal.signIn(user);
            API.authenticate(user)
              .then(function () {
                API
                  .resources
                  .apps
                  .getAll()
                  .then(function (res) {
                    res.body.forEach(function (app) {
                      API
                        .resources
                        .apps
                        .getOne(app.id)
                        .then(function (res_) {
                          appsCount[app.app_platform]++;
                          if (res.body.indexOf(app) === res.body.length - 1) {
                            done();
                          }
                        })
                        .catch(done);
                    });
                  })
                  .catch(done);
              });
          });

          afterAll(function () {
            Portal.signOut();
          });

          it('should display correct amount of ' + platform + ' mobile apps', function (done) {
            Portal.usageReportHelpers.generateReport().then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal.billing.usageReportPage.getMobileAppsViewText().then(function (text) {
                  expect(text).toContain(appsCount[platform]);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });
});
