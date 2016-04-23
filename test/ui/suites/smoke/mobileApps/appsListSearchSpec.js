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

describe('Smoke', function () {
  describe('Search App List', function () {

    var adminUser = config.get('portal.users.admin');
    var apps = DataProvider.generateMobileApps();
    var tempApps = DataProvider.generateMobileApps();

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.createMobileApps(tempApps);
      Portal.goToMobileApps();
    });

    afterAll(function () {
      Portal.deleteMobileApps(tempApps);
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    apps.forEach(function (app){
      it('should search and filter an existing app - ' + app.platform,
        function () {
          Portal.goToMobileApps();
          Portal.header.goTo(app.platform);
          
          var findApp = Portal.mobileApps.listPage.findApp(app);
          expect(findApp).toBe(1);
      });

      it('should search and filter a non-existing app - ' + app.platform,
        function () {
          Portal.goToMobileApps();
          Portal.header.goTo(app.platform);
          app.name = 'Nothing';
          
          var findApp = Portal.mobileApps.listPage.findApp(app);
          expect(findApp).toBe(0);
      });
    });
  });
});
