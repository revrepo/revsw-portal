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

    var User = config.get('portal.users.user');

    beforeEach(function () {
      Portal.signIn(User);
    });

    afterEach(function () {
      Portal.signOut();
    });


    it('should  click through all intro steps till the end and click button done', function(){
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.getButtonSkip().isDisplayed().then(function(value){
        expect(value).toBe(true);
     });
      Portal.dashboards.listPage.clickButtonSkip(); 
    });


    it('should loaded page without intro window with button done ', function(){
     //  var popUpContainer = Portal.dashboards.listPage.getIntroPopup();
     // expect(popUpContainer.isDisplayed()).toBe(false); 
     var dashboardElem = Portal.dashboards.listPage.getDashboardsElem();
       expect(dashboardElem .isDisplayed()).toBe(true);

   });  

    it('should loaded page without intro window with button skip', function(){
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonSkip();
        var dashboardElem = Portal.dashboards.listPage.getDashboardsElem();
      expect(dashboardElem .isDisplayed()).toBe(true);
    //     var popUpContainer = Portal.dashboards.listPage.getIntroPopup();
    //    expect(popUpContainer.isDisplayed()).toBe(false); 
    });

    it('should loaded intro window after reload', function(){
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      Portal.dashboards.listPage.clickButtonNext();
      Portal.dashboards.listPage.waitForPopup();
      browser.refresh();
        var popUpContainer = Portal.dashboards.listPage.getIntroPopup();
      expect(popUpContainer.isDisplayed()).toBe(true);
    });
  });
});

