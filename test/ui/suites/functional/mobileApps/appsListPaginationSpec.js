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
  describe('Pagination List App', function () {

    var adminUser = config.get('portal.users.admin');
    var iosApps = DataProvider.generateMobileAppData('iOS', 25);
    //var androidApps = DataProvider.generateMobileAppData('Android', 25);
    //var apps = iosApps.concat(androidApps);

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createMobileApps('iOS', iosApps);
      //Portal.createMobileApps('Android', androidApps);
    });

    afterAll(function () {
      Portal.deleteMobileApps(iosApps);
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('should check the pagination of apps table - iOS', function () {
      Portal.goToMobileApps();
      Portal.header.goTo('iOS');
      var first = Portal.mobileApps.listPage.appsTable.getFirst();
      var last = Portal.mobileApps.listPage.appsTable.getLast();
      var next = Portal.mobileApps.listPage.appsTable.getNext();
      var previous = Portal.mobileApps.listPage.appsTable.getPrevious();
      expect(first.isDisplayed()).toBe(false);
      expect(last.isDisplayed()).toBe(false);
      expect(next.isDisplayed()).toBe(false);
      expect(previous.isDisplayed()).toBe(false);
      
      var newApp = {
        name: 'iOS26',
        platform: 'iOS'
      };
      Portal.mobileApps.listPage.addNewApp(newApp);
      Portal.goToMobileApps();
      Portal.header.goTo('iOS');
      first = Portal.mobileApps.listPage.appsTable.getFirst();
      last = Portal.mobileApps.listPage.appsTable.getLast();
      next = Portal.mobileApps.listPage.appsTable.getNext();
      previous = Portal.mobileApps.listPage.appsTable.getPrevious();
      expect(first.isDisplayed()).toBe(true);
      expect(last.isDisplayed()).toBe(true);
      expect(next.isDisplayed()).toBe(true);
      expect(previous.isDisplayed()).toBe(true);

      Portal.mobileApps.listPage.searchAndDelete(newApp);
      Portal.dialog.clickOk();
    });
  });
});
