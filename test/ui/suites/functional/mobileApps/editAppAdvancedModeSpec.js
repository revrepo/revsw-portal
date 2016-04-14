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
  describe('Edit App Advanced Mode', function () {

    var adminUser = config.get('portal.users.admin');
    var app = {
          name: 'MyApp',
          platform: 'Android'
        };

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.header.goTo('Mobile Apps');
      Portal.header.goTo('Android');

      Portal.mobileApps.listPage.addNewApp(app);
      Portal.header.goTo('Android');
      var findApp = Portal.mobileApps.listPage.findApp(app);
      expect(findApp).toBe(1);
    });

    afterAll(function () {
      Portal.header.goTo('Android');
      Portal.mobileApps.listPage.searchAndDelete(app);
      Portal.dialog.clickOk();
      var findApp = Portal.mobileApps.listPage.findApp(app);
      expect(findApp).toBe(0);
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.header.goTo('Android');
    });

    afterEach(function () {
    });

    it('should edit in advanced mode and verify the json editor content',
      function () {
        Portal.mobileApps.listPage.searchAndAdvancedEdit(app);
        Portal.mobileApps.editAppAdvancedModePage.verify();

        Portal.header.goTo('Android');
        var findApp = Portal.mobileApps.listPage.findApp(app);
        expect(findApp).toBe(1);
    });

    it('should edit in advanced mode and update the json editor content',
      function () {
        Portal.mobileApps.listPage.searchAndAdvancedEdit(app);
        Portal.mobileApps.editAppAdvancedModePage.update();
        Portal.dialog.clickOk();

        Portal.header.goTo('Android');
        var findApp = Portal.mobileApps.listPage.findApp(app);
        expect(findApp).toBe(1);
    });
  });
});
