/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('Intro Window', function () {

    var user = config.get('portal.users.user');

    beforeAll(function () {
      Portal.signIn(user);
    });

    afterAll(function () {
      Portal.signOut();
    });
     
    it('button hide/show menu  should  be clickable', function () {
      Portal.mobileAnalytics.ImageOptimizationPage.clickHideMenu();
      Portal.mobileAnalytics.ImageOptimizationPage.clickHideMenu();

      var hideMenu = Portal.mobileAnalytics.ImageOptimizationPage.getHideMenu();
      expect(hideMenu.isEnabled()).toBe(true);  
    });
    
    it('should automatically hide/unhide  menu', function () {
      Portal.mobileAnalytics.ImageOptimizationPage.clickHideMenu();
      var mainMenu = Portal.mobileAnalytics.ImageOptimizationPage.getMainMenu();

      expect(mainMenu.isDisplayed()).toBe(false);  
      Portal.mobileAnalytics.ImageOptimizationPage.clickHideMenu();
      expect(mainMenu.isDisplayed()).toBe(true); 
    });
  });
});

