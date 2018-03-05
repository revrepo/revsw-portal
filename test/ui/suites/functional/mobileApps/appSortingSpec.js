/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2018] Rev Software, Inc.
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
var tr = require('timeago-reverse');

describe('Functional', function() {
  describe('Sorting List App', function() {
    var adminUser = config.get('portal.users.revAdmin');
    var platforms = [
      Portal.constants.mobileApps.platforms.ios,
      Portal.constants.mobileApps.platforms.android
    ];

    platforms.forEach(function(platform) {
      describe('Platform: ' + platform, function() {
        beforeAll(function() {
          Portal.signIn(adminUser);
          Portal.helpers.nav.goToMobileAppsMenuItem(platform);
          Portal.mobileApps.listPage.sortByName('asc');
        });

        it('should apply `ascendant` sorting by `Name` column', function() {
          var appName1;
          Portal.mobileApps.listPage.sortByName('asc').then(function() {
            Portal.mobileApps.listPage.table
              .getFirstRow()
              .getName()
              .then(function(val1) {
                appName1 = val1;
                Portal.mobileApps.listPage.table
                  .getHeader()
                  .clickName()
                  .then(function() {
                    Portal.mobileApps.listPage.table
                      .getFirstRow()
                      .getName()
                      .then(function(val2) {
                        expect(appName1).not.toEqual(val2);
                      });
                  });
              });
          });
        });

        it('should apply `descendant` sorting by `Name` column', function() {
          var appName1;
          Portal.mobileApps.listPage.sortByName('des').then(function() {
            Portal.mobileApps.listPage.table
              .getFirstRow()
              .getName()
              .then(function(val1) {
                appName1 = val1;
                return Portal.mobileApps.listPage.table
                  .getHeader()
                  .clickName()
                  .then(function() {
                    Portal.mobileApps.listPage.table
                      .getFirstRow()
                      .getName()
                      .then(function(val2) {
                        expect(appName1).not.toEqual(val2);
                      });
                  });
              });
          });
        });

        it('should apply `ascendant` sorting by `Version` column', function() {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table
            .getHeader()
            .clickVersion()
            .then(function() {
              Portal.mobileApps.listPage.table
                .getFirstRow()
                .getVersion()
                .then(function(val1) {
                  first = val1;
                  Portal.mobileApps.listPage.table
                    .getHeader()
                    .clickVersion()
                    .then(function() {
                      Portal.mobileApps.listPage.table
                        .getFirstRow()
                        .getVersion()
                        .then(function(val2) {
                          expect(first).toBeLessThan(val2);
                        });
                    });
                });
            });
        });

        it('should apply `descendant` sorting by `Version` column', function() {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table
            .getFirstRow()
            .getVersion()
            .then(function(val1) {
              first = val1;
              Portal.mobileApps.listPage.table
                .getHeader()
                .clickVersion()
                .then(function() {
                  Portal.mobileApps.listPage.table
                    .getFirstRow()
                    .getVersion()
                    .then(function(val2) {
                      expect(first).toBeGreaterThan(val2);
                    });
                });
            });
        });

        it('should apply `ascendant` sorting by `Last Update` column', function() {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table
            .getHeader()
            .clickLastUpdate()
            .then(function() {
              Portal.mobileApps.listPage.table
                .getFirstRow()
                .getLastUpdate()
                .then(function(val1) {
                  first = val1;
                  Portal.mobileApps.listPage.table
                    .getHeader()
                    .clickLastUpdate()
                    .then(function() {
                      Portal.mobileApps.listPage.table
                        .getFirstRow()
                        .getLastUpdate()
                        .then(function(val2) {
                          expect(tr.parse(first)).toBeLessThan(tr.parse(val2));
                        });
                    });
                });
            });
        });

        it('should apply `descendant` sorting by `Last Update` column', function() {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table
            .getFirstRow()
            .getLastUpdate()
            .then(function(val1) {
              first = val1;
              Portal.mobileApps.listPage.table
                .getHeader()
                .clickLastUpdate()
                .then(function() {
                  Portal.mobileApps.listPage.table
                    .getFirstRow()
                    .getLastUpdate()
                    .then(function(val2) {
                      expect(tr.parse(first)).toBeGreaterThan(tr.parse(val2));
                    });
                });
            });
        });

        it('should apply `ascendant` sorting by `Account` column', function() {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table
            .getHeader()
            .clickAccount()
            .then(function() {
              Portal.mobileApps.listPage.table
                .getFirstRow()
                .getAccount()
                .then(function(val1) {
                  first = val1;
                  Portal.mobileApps.listPage.table
                    .getHeader()
                    .clickAccount()
                    .then(function() {
                      Portal.mobileApps.listPage.table
                        .getFirstRow()
                        .getAccount()
                        .then(function(val2) {
                          expect(first).toBeLessThan(val2);
                        });
                    });
                });
            });
        });

        it('should apply `descendant` sorting by `Account` column', function() {
          var first;
          Portal.mobileApps.listPage.searcher.clearSearchCriteria();
          Portal.mobileApps.listPage.table
            .getFirstRow()
            .getAccount()
            .then(function(val1) {
              first = val1;
              Portal.mobileApps.listPage.table
                .getHeader()
                .clickAccount()
                .then(function() {
                  Portal.mobileApps.listPage.table
                    .getFirstRow()
                    .getAccount()
                    .then(function(val2) {
                      expect(first).toBeGreaterThan(val2);
                    });
                });
            });
        });
      });
    });
  });
});
