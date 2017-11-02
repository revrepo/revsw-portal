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
  describe('Sorting List App', function () {

    var adminUser = config.get('portal.users.revAdmin');
    var platforms = [
      Portal.constants.mobileApps.platforms.ios,
      Portal.constants.mobileApps.platforms.android
    ];

    platforms.forEach(function (platform) {

      describe('Platform: ' + platform, function () {

        beforeAll(function () {
          Portal.signIn(adminUser);
          Portal.helpers.nav.goToMobileAppsMenuItem(platform);
        });

        it('should sort list in ascendant direction',
          function () {
            Portal.mobileApps.listPage.sortByName();
            var appName1 = Portal.mobileApps.listPage.table
              .getFirstRow()
              .getName();
            Portal.mobileApps.listPage.sortByName();
            var appName2 = Portal.mobileApps.listPage.table
              .getFirstRow()
              .getName();
            expect(appName1).toBeLessThan(appName2);
          });

        it('should sort list in descendant direction',
          function () {
            Portal.mobileApps.listPage.sortByName();
            Portal.mobileApps.listPage.sortByName();
            var appName1 = Portal.mobileApps.listPage.table
              .getFirstRow()
              .getName();

            Portal.mobileApps.listPage.sortByName();
            var appName2 = Portal.mobileApps.listPage.table
              .getFirstRow()
              .getName();
            expect(appName2).toBeLessThan(appName1);
          });

        it('should list be sorted in ascendant direction by default',
          function () {
            var appName1 = Portal.mobileApps.listPage.table
              .getRow(0)
              .getName();
            var appName2 = Portal.mobileApps.listPage.table
              .getRow(1)
              .getName();
            expect(appName1).toBeLessThan(appName2);
          });

        it('should sort list ascendant on `Version` click', function () {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table.getHeader().clickVersion().then(function () {
            Portal.mobileApps.listPage.table.getFirstRow().getVersion().then(function (val1) {
              first = val1;
              Portal.mobileApps.listPage.table.getHeader().clickVersion().then(function () {
                Portal.mobileApps.listPage.table.getFirstRow().getVersion().then(function (val2) {
                  expect(first).toBeLessThan(val2);
                });
              });
            });
          });
        });

        it('should sort list descendant on `Version` click', function () {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table.getFirstRow().getVersion().then(function (val1) {
            first = val1;
            Portal.mobileApps.listPage.table.getHeader().clickVersion().then(function () {
              Portal.mobileApps.listPage.table.getFirstRow().getVersion().then(function (val2) {
                expect(first).toBeGreaterThan(val2);
              });
            });
          });
        });

        it('should sort list ascendant on `Last Update` click', function () {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table.getHeader().clickLastUpdate().then(function () {
            Portal.mobileApps.listPage.table.getFirstRow().getLastUpdate().then(function (val1) {
              first = val1;
              Portal.mobileApps.listPage.table.getHeader().clickLastUpdate().then(function () {
                Portal
                  .mobileApps
                  .listPage
                  .table
                  .getFirstRow()
                  .getLastUpdate()
                  .then(function (val2) {
                    expect(first).toBeGreaterThan(val2);
                  });
              });
            });
          });
        });

        it('should sort list descendant on `Last Update` click', function () {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table.getFirstRow().getLastUpdate().then(function (val1) {
            first = val1;
            Portal.mobileApps.listPage.table.getHeader().clickLastUpdate().then(function () {
              Portal
              .mobileApps
              .listPage
              .table
              .getFirstRow()
              .getLastUpdate()
              .then(function (val2) {
                expect(first).toBeLessThan(val2);
              });
            });
          });
        });

        it('should sort list ascendant on `Account` click', function () {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table.getHeader().clickAccount().then(function () {
            Portal.mobileApps.listPage.table.getFirstRow().getAccount().then(function (val1) {
              first = val1;
              Portal.mobileApps.listPage.table.getHeader().clickAccount().then(function () {
                Portal
                .mobileApps
                .listPage
                .table
                .getFirstRow()
                .getAccount()
                .then(function (val2) {
                  expect(first).toBeLessThan(val2);
                });
              });
            });
          });
        });

        it('should sort list descendant on `Account` click', function () {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table.getFirstRow().getAccount().then(function (val1) {
            first = val1;
            Portal.mobileApps.listPage.table.getHeader().clickAccount().then(function () {
              Portal.mobileApps.listPage.table.getFirstRow().getAccount().then(function (val2) {
                expect(first).toBeGreaterThan(val2);
              });
            });
          });
        });
      });
    });
  });
});
