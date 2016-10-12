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
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('Sorting List App', function () {

    var adminUser = config.get('portal.users.admin');
    var platforms = Portal.constants.mobileApps.platforms;

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    it('should sort list in ascendant and descendant directions - iOS', function () {
      Portal.helpers.nav.goToMobileAppsMenuItem(platforms.ios);
      Portal.mobileApps.listPage.sortByName();
      var appName1 = Portal.mobileApps.listPage.table
        .getFirstRow()
        .getName();

      Portal.mobileApps.listPage.sortByName();
      var appName2 = Portal.mobileApps.listPage.table
        .getFirstRow()
        .getName();
      expect(appName1).toBeLessThan(appName2);
      expect(appName2).toBeGreaterThan(appName1);

      Portal.mobileApps.listPage.sortByName();
      var appName3 = Portal.mobileApps.listPage.table
        .getFirstRow()
        .getName();
      expect(appName1).toEqual(appName3);
    });

    it('should sort list in ascendant and descendant directions - Android', function () {
      Portal.helpers.nav.goToMobileAppsMenuItem(platforms.android);
      Portal.mobileApps.listPage.sortByName();
      var appName1 = Portal.mobileApps.listPage.table
        .getFirstRow()
        .getName();

      Portal.mobileApps.listPage.sortByName();
      var appName2 = Portal.mobileApps.listPage.table
        .getFirstRow()
        .getName();
      expect(appName1).toBeLessThan(appName2);
      expect(appName2).toBeGreaterThan(appName1);

      Portal.mobileApps.listPage.sortByName();
      var appName3 = Portal.mobileApps.listPage.table
        .getFirstRow()
        .getName();
      expect(appName1).toEqual(appName3);
    });

    it('should list be sorted in descendant direction by default - iOS',
      function () {
        Portal.helpers.nav.goToMobileAppsMenuItem(platforms.ios);

        var appName1 = Portal.mobileApps.listPage.table
          .getFirstRow()
          .getName();
        Portal.mobileApps.listPage.sortByName();
        Portal.mobileApps.listPage.sortByName();
        var appName2 = Portal.mobileApps.listPage.table
          .getFirstRow()
          .getName();
        expect(appName1).toBeLessThan(appName2);
      });

    it('should list be sorted in descendant direction by default - Android',
      function () {
        Portal.helpers.nav.goToMobileAppsMenuItem(platforms.android);

        var appName1 = Portal.mobileApps.listPage.table
          .getFirstRow()
          .getName();
        Portal.mobileApps.listPage.sortByName();
        Portal.mobileApps.listPage.sortByName();
        var appName2 = Portal.mobileApps.listPage.table
          .getFirstRow()
          .getName();
        expect(appName1).toBeLessThan(appName2);
      });
  });
});
