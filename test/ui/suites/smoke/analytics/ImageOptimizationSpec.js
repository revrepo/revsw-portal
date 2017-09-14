
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
  var users = [
    config.get('portal.users.revAdmin'),
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.user'),
    config.get('portal.users.roUser')
  ];
var filterResults = Constants.mobileAnalytics.imageOptimizationPage.filterResults;

   users.forEach(function(user) {

    describe('With user: ' + user.role, function() {

      describe('Image Optimization', function() {

          beforeAll(function() {
          Portal.signIn(user);
          Portal.helpers.nav.goToImageOptimization();
        });

        afterAll(function() {
          Portal.signOut();
        });
  
	
    it('should displayed all performance filters', function(){ 
      Portal.mobileAnalytics.ImageOptimizationPage.getFilterPerformance()
          .getAttribute('ng-model')
            .then(function(value) {
	 		        expect(value[0]).toEqual(filterResults.attrDelay);
              expect(value[1]).toEqual(filterResults.attrCountry);
              expect(value[2]).toEqual(filterResults.attrOS);
              expect(value[3]).toEqual(filterResults.attrDevice);
              expect(value[4]).toEqual(filterResults.attrBrowser);
           });
       }); 


    it('should displayed all bandwidth filters', function(){ 
        Portal.mobileAnalytics.ImageOptimizationPage.getFilterBandwidth()
          .getAttribute('ng-model')
            .then(function(value) {      
              expect(value[0]).toEqual(filterResults.attrDelay);
              expect(value[1]).toEqual(filterResults.attrCountry);
              expect(value[2]).toEqual(filterResults.attrOS);
              expect(value[3]).toEqual(filterResults.attrDevice);
              expect(value[4]).toEqual(filterResults.attrBrowser);

           });
       }); 


    it('should displayed all format and resolution filters', function(){ 
        Portal.mobileAnalytics.ImageOptimizationPage.getFilterFormatResolution()
          .getAttribute('ng-model')
            .then(function(value) {   
              expect(value[0]).toEqual(filterResults.attrDelay);
              expect(value[1]).toEqual(filterResults.attrCountry);
              expect(value[2]).toEqual(filterResults.attrOS);
              expect(value[3]).toEqual(filterResults.attrDevice);
              expect(value[4]).toEqual(filterResults.attrBrowser);
           });
       }); 


    it('should displayed button update report', function(){ 
         Portal.mobileAnalytics.ImageOptimizationPage.getUpdateReport()
            .then(function(value) {  
              expect(value.length === 3).toBe(true);
          });
       });


    it('should displayed chart context menu', function(){ 
    	Portal.mobileAnalytics.ImageOptimizationPage.getChartContextMenu()
          .then(function(value) { 
            expect(value.length === 4).toBe(true);
    	   });
        });


    it('should displayed span toggle', function() {
        Portal.mobileAnalytics.ImageOptimizationPage.getListDomains()
           .isDisplayed().then(function(value) {
             expect(value).toBe(true);
            });
        });


    it('should displayed combobox search', function() {
         Portal.mobileAnalytics.ImageOptimizationPage.clickListDomains();
         Portal.mobileAnalytics.ImageOptimizationPage.getComboBoxSearch()
          .isDisplayed()
            .then(function(value) {
              expect(value).toBe(true);
            });  
        });


    it('should displayed button hide/show menu', function() {
	   Portal.mobileAnalytics.ImageOptimizationPage.getHideMenu().isDisplayed().then(function(value) {
              expect(value).toBe(true); 
           });
       });


         });
      });
   });
 });

