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
    //var apps = DataProvider.generateMobileApps();
    var iosApps = DataProvider.generateMultipleMobileApps('iOS', 3);
    var androidApps = DataProvider.generateMultipleMobileApps('Android', 3);
    var apps = iosApps.concat(androidApps);

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createMobileApps(apps);
    });

    afterAll(function () {
      Portal.deleteMobileApps(apps);
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('should sorted list apps descendant - ' + iosApps[0].platform,
      function () {
        Portal.goToMobileApps();
        Portal.header.goTo(iosApps[0].platform);

        Portal.mobileApps.listPage.appsTable.sortByName();
        var firstApp = Portal.mobileApps.listPage.appsTable.getFirstRow();
        expect(firstApp.name).toEqual(iosApps[0].name);
        expect(firstApp.platform).toEqual(iosApps[0].platform);
        
        Portal.mobileApps.listPage.appsTable.sortByName();
        firstApp = Portal.mobileApps.listPage.appsTable.getFirstRow();
        expect(firstApp.name).toEqual(iosApps[2].name);
        expect(firstApp.platform).toEqual(iosApps[2].platform);

        Portal.mobileApps.listPage.appsTable.sortByName();
        firstApp = Portal.mobileApps.listPage.appsTable.getFirstRow();
        expect(firstApp.name).toEqual(iosApps[0].name);
        expect(firstApp.platform).toEqual(iosApps[0].platform);
    });

    it('should sorted list apps descendant - ' + androidApps[0].platform,
      function () {
        Portal.goToMobileApps();
        Portal.header.goTo(androidApps[0].platform);

        Portal.mobileApps.listPage.appsTable.sortByName();
        var firstApp = Portal.mobileApps.listPage.appsTable.getFirstRow();
        expect(firstApp.name).toEqual(androidApps[0].name);
        expect(firstApp.platform).toEqual(androidApps[0].platform);
        
        Portal.mobileApps.listPage.appsTable.sortByName();
        firstApp = Portal.mobileApps.listPage.appsTable.getFirstRow();
        expect(firstApp.name).toEqual(androidApps[2].name);
        expect(firstApp.platform).toEqual(androidApps[2].platform);

        Portal.mobileApps.listPage.appsTable.sortByName();
        firstApp = Portal.mobileApps.listPage.appsTable.getFirstRow();
        expect(firstApp.name).toEqual(androidApps[0].name);
        expect(firstApp.platform).toEqual(androidApps[0].platform);
    });
  });
});