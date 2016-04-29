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

describe('Boundary', function () {
  describe('Searching apps', function () {
    var adminUser = config.get('portal.users.admin');
    var iosApps = DataProvider.generateMobileAppData('iOS', 1);
    var androidApps = DataProvider.generateMobileAppData('Android', 1);
    var apps = iosApps.concat(androidApps);

    beforeAll(function () {
      Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    apps.forEach(function (app){
      it('should search apps with 51 characters' + app.platform, function () {
        Portal.goToMobileApps();
        Portal.header.goTo(app.platform);
        
        var length51Characters = new Array(51).join('x');
        app.name = length51Characters;
        Portal.mobileApps.listPage.addNewApp(app);
        Portal.header.goTo(app.platform);
        var countApps = Portal.mobileApps.listPage.findApp(app);
        expect(countApps).toBe(1);

        Portal.mobileApps.listPage.searchAndDelete(app);
        Portal.dialog.clickOk();
      });

      it('should search field support more higher or equal to 200 characters ' +
        app.platform, function () {
          Portal.goToMobileApps();
          Portal.header.goTo(app.platform);
          
          var length200Characters = new Array(200).join('x');
          app.name = length200Characters;
          var countApps = Portal.mobileApps.listPage.findApp(app);
          expect(countApps).toBe(0);
      });

      xit('should search text field accept special characters ' + app.platform,
        function () {
          Portal.goToMobileApps();
          Portal.header.goTo(app.platform);

          app.name = '& ^ $ @ # % ( ) _ +  / \\ ~ ` , . ; :';
          var countApps = Portal.mobileApps.listPage.findApp(app);
          expect(countApps).toBe(0);
      });
    });
  });
});
