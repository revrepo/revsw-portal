
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
  describe('Subscriptions', function () {

    var revAdmin = config.get('portal.users.revAdmin');
    var filterResults = Constants.azureMarketplace.subscriptionsPage.filterResults;

    beforeAll(function () {
      Portal.signIn(revAdmin);
      Portal.helpers.nav.goToSubscriptions();
    });

    afterAll(function () {
      Portal.signOut();
    });


    it('should displayed all filters', function(){ 
        Portal.azureMarketplace.SubscriptionsPage.clickOpenMenu();
        Portal.azureMarketplace.SubscriptionsPage.getSortOrder()
         .getAttribute('ng-show')
         .then(function(value) {
              expect(value[0]).toEqual(filterResults.attrSubsID);
              expect(value[1]).toEqual(filterResults.attrCreated);
              expect(value[2]).toEqual(filterResults.attrUpdated);
              expect(value[3]).toEqual(filterResults.attrSubState);
        });
    });


    it('should displayed view button', function(){
     Portal.azureMarketplace.SubscriptionsPage
        .getViewButton().get(0).isDisplayed()
            .then(function(value) {
                expect(value).toBe(true);    
        });
    });


    it('should displayed change status', function(){
      Portal.azureMarketplace.SubscriptionsPage
        .getChangeStatus().get(0).isDisplayed()
            .then(function(value) {
                expect(value).toBe(true);
        });
    }); 


    it('should displayed search filed', function(){
       Portal.azureMarketplace.SubscriptionsPage
          .getSearchTxtIn().isDisplayed()
              .then(function(value) {
                  expect(value).toBe(true);
        });
    });

    
    it('should displayed subscription list', function(){
        Portal.azureMarketplace.SubscriptionsPage
            .getSubscriptionItems().getAttribute('ngclick')
                .then(function(value) {
                    expect(value.length > 1).toBe(true);
        });
    });


    it('should displayed subscription text',function(){
        Portal.azureMarketplace.SubscriptionsPage
            .getTextItem().isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        });
    });
    

    it('should displayed popup view subscription',function(){
        Portal.azureMarketplace.SubscriptionsPage.clickViewButton();
        Portal.azureMarketplace.SubscriptionsPage
            .getViewPopup().isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        Portal.azureMarketplace.SubscriptionsPage.clickCloseButton();
        });
    });


    it('should displayed button close',function(){
        Portal.azureMarketplace.SubscriptionsPage.clickViewButton();
        Portal.azureMarketplace.SubscriptionsPage
            .getCloseButton().isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        Portal.azureMarketplace.SubscriptionsPage.clickCloseButton();
        });
    });


    it('should displayed popup change status',function(){
        Portal.azureMarketplace.SubscriptionsPage.clickChangeStatus();
        Portal.azureMarketplace.SubscriptionsPage
            .getStatusPopup().isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        Portal.azureMarketplace.SubscriptionsPage.clickCancelButton();
        });
    });

   
    it('should displayed span status',function(){
        Portal.azureMarketplace.SubscriptionsPage.clickChangeStatus();
        Portal.azureMarketplace.SubscriptionsPage
            .getStatusDrop().isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        Portal.azureMarketplace.SubscriptionsPage.clickCancelButton();
        });
    });


    it('should displayed button cancel',function(){
        Portal.azureMarketplace.SubscriptionsPage.clickChangeStatus();
        Portal.azureMarketplace.SubscriptionsPage
            .getCancelButton().isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        Portal.azureMarketplace.SubscriptionsPage.clickCancelButton();
        });
    });

    
    it('should displayed button save',function(){
        Portal.azureMarketplace.SubscriptionsPage.clickChangeStatus();
        Portal.azureMarketplace.SubscriptionsPage
            .getSaveButton().isDisplayed()
                .then(function(value) {
                    expect(value).toBe(true);
        Portal.azureMarketplace.SubscriptionsPage.clickCancelButton(); 
        });
    });



  });
});


