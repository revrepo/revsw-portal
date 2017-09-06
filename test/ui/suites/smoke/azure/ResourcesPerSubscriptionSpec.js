
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
  describe('Resources Per Subscription', function () {

    var revAdmin = config.get('portal.users.revAdmin');

    beforeAll(function () {
      Portal.signIn(revAdmin);
      Portal.helpers.nav.goToResourcesPerSubscription();
      Portal.azureMarketplace.ResourcesPerSubscriptionPage.clickListSubscriptions();
      Portal.azureMarketplace.ResourcesPerSubscriptionPage.clickSecondSubscription();
    });

    afterAll(function () {
      Portal.signOut();
    });


       it('should displayed all sortable columns', function(){ 
           expect(Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrderActive().isDisplayed()).toBe(true);
           Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrder().get(1).click();
           expect(Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrderActive().isDisplayed()).toBe(true);
           Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrder().get(2).click();
           expect(Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrderActive().isDisplayed()).toBe(true);
           Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrder().get(3).click();
           expect(Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrderActive().isDisplayed()).toBe(true);
           Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrder().get(4).click();
           expect(Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrderActive().isDisplayed()).toBe(true);
           Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrder().get(5).click();
           expect(Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSortOrderActive().isDisplayed()).toBe(true);
        });

      
      it('should displayed view button',function(){
          Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getViewButton().get(0).isDisplayed()
                  .then(function(value) {
                      expect(value).toBe(true);
          });
      });


      it('should displayed search field',function(){
          Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSearchInput().isDisplayed()
                  .then(function(value) {
                      expect(value).toBe(true);
          }); 
      }); 


      it('should displayed button back',function(){
          Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getBackButton().isDisplayed()
                  .then(function(value) {
                      expect(value).toBe(true);
          });
      });


      it('should displayed span toggle',function(){
          Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getListSubscriptions().isDisplayed()
                  .then(function(value) {
                      expect(value).toBe(true);
          });
      });
      
      
      it('should displayed combobox search',function(){
          Portal.azureMarketplace.ResourcesPerSubscriptionPage.clickListSubscriptions();
          Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getComboBoxSearch().isDisplayed()
                  .then(function(value) {
                      expect(value).toBe(true);
          Portal.azureMarketplace.ResourcesPerSubscriptionPage.clickListSubscriptions();

          });
      });


      it('should displayed resources per subscription list',function(){
          Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getSubscriptionItems().isDisplayed()
                  .then(function(value) {
                      expect(value.length > 1).toBe(true);
          });
      });


      it('should displayed popup view',function(){
          Portal.azureMarketplace.ResourcesPerSubscriptionPage.clickViewButton();
          Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getViewPopup().isDisplayed()
                  .then(function(value) {
                      expect(value).toBe(true);
          Portal.azureMarketplace.ResourcesPerSubscriptionPage.clickCloseButton();
          });
      });


      it('should displayed button close',function(){
          Portal.azureMarketplace.ResourcesPerSubscriptionPage.clickViewButton();
          Portal.azureMarketplace.ResourcesPerSubscriptionPage
              .getCloseButton().isDisplayed()
                  .then(function(value) {
                      expect(value).toBe(true);
          Portal.azureMarketplace.ResourcesPerSubscriptionPage.clickCloseButton();
          });
      });


    });
});
