
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

describe('Smoke', function () {
  describe('Resources', function () {

    var revAdmin = config.get('portal.users.revAdmin');

    beforeAll(function () {
      Portal.signIn(revAdmin);
      Portal.helpers.nav.goToResources();
    });

    afterAll(function () {
      Portal.signOut();
    });


    it('should displayed all filters', function(){ 
        Portal.azureMarketplace.ResourcesPage.getResourceName().get(0).click();
          browser.sleep(1000);
        Portal.azureMarketplace.ResourcesPage
            .getSortsOrder().getAttribute('class')
                .then(function(value) {
                    expect(value.length > 1).toBe(true);
        });
    });


    it('should displayed view button', function(){
        Portal.azureMarketplace.ResourcesPage
            .getViewButton().get(0).isDisplayed()
              .then(function(value) {
                  expect(value).toBe(true);

        });
    });

    
    it('should displayed search field', function(){
        Portal.azureMarketplace.ResourcesPage
            .getSearchTxtIn().isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        });
    });


    it('should displayed button back', function(){
        Portal.azureMarketplace.ResourcesPage
            .getBackButton().isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        });
    });


    it('should displayed resources list',function(){
        Portal.azureMarketplace.ResourcesPage
            .getResourcesItems().getAttribute('ng-click')
                .then(function(value) {
                    expect(value.length > 1).toBe(true);
        });
    });

    
    it('should displayed popup view', function(){
        Portal.azureMarketplace.ResourcesPage.getViewButton().get(0).click();
        Portal.azureMarketplace.ResourcesPage
            .getviewPopup().isDisplayed()
                .then(function(value) {  
                    expect(value).toBe(true);
          Portal.azureMarketplace.ResourcesPage.getCloseButton().click();
        });
    });
    

    it('should displayed button close',function(){
        Portal.azureMarketplace.ResourcesPage.getViewButton().get(0).click();
        Portal.azureMarketplace.ResourcesPage
            .getCloseButton().isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
          Portal.azureMarketplace.ResourcesPage.getCloseButton().click();
        });
    });

    it('should displayed button first',function(){
      Portal.azureMarketplace.ResourcesPage
          .getFirstButton().get(0).isDisplayed()
              .then(function(value) {
                  expect(value).toBe(true);
        });
    });

     
    it('should displayed button previous',function(){
        Portal.azureMarketplace.ResourcesPage
            .getPreviousButton().get(0).isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        });
    }); 


    it('should displayed button 1',function(){
         Portal.azureMarketplace.ResourcesPage
            .getOneButton().get(0).isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        });
    });   

    it('should displayed button 2',function(){
        Portal.azureMarketplace.ResourcesPage
            .getTwoButton().get(0).isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        });
    });


    it('should displayed button next',function(){
         Portal.azureMarketplace.ResourcesPage
            .getNextButton().get(0).isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        });
    });


    it('should displayed button last',function(){
        Portal.azureMarketplace.ResourcesPage
            .getLastButton().get(0).isDisplayed()
                .then(function(value) {
                   expect(value).toBe(true);
       });
    });


  });
});

