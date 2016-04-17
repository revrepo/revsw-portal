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
  describe('Edit App And Update', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.goToMobileApps();
      Portal.header.goTo('Android');
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('should get title from list app list', function () {
        var title = Portal.mobileApps.listPage.getTitle();
        expect(title).toEqual('Android Apps List');
    });

    it('should edit and verify an existing app successfully', function () {
        var app = {
          name: 'MyApp',
          platform: 'Android'
        };

        var findApp = null;
        Portal.mobileApps.listPage.addNewApp(app);
        Portal.goToMobileApps();
        findApp = Portal.mobileApps.listPage.findApp(app);
        expect(findApp).toBe(1);

        Portal.mobileApps.listPage.searchAndEdit(app);
        Portal.mobileApps.editAppPage.verify(app);

        Portal.goToMobileApps();
        findApp = Portal.mobileApps.listPage.findApp(app);
        expect(findApp).toBe(1);
    });

    it('should edit and update an existing app successfully', function () {
        var app = {
          name: 'MyApp',
          platform: 'Android'
        };

        var findApp = null;
        Portal.mobileApps.listPage.addNewApp(app);
        Portal.goToMobileApps();
        findApp = Portal.mobileApps.listPage.findApp(app);
        expect(findApp).toBe(1);

        Portal.mobileApps.listPage.searchAndEdit(app);
        app.name = 'MyAppUpdated';
        Portal.mobileApps.editAppPage.update(app);
        Portal.dialog.clickOk();

        Portal.goToMobileApps();
        findApp = Portal.mobileApps.listPage.findApp(app);
        expect(findApp).toBe(1);
    });
  });
});
