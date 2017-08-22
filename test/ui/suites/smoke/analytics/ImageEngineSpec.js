
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
  describe('ImageEngine', function () {

    var adminUser = config.get('portal.users.admin');

    beforeAll(function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToImageEngine();
    });

    afterAll(function () {
      Portal.signOut();
    });

	


    it('should displayed all filters', function(){ 
        Portal.mobileAnalytics.ImageEnginePage.getFilterHoursPeriods()
          .getAttribute('ng-model')
            .then(function(value) {
	 	    	
	 		expect(value).toEqual([
	 			'ngFilters.delay',
				'ngFilters.country ',
				'ngFilters.os ',
				'ngFilters.device ',
				'ngFilters.browser ',
				'ngFilters.delay',
				'ngFilters.country ',
				'ngFilters.os ',
				'ngFilters.device ',
				'ngFilters.browser ',
				'ngFilters.delay',
				'ngFilters.country ',
				'ngFilters.os ',
				'ngFilters.device ',
				'ngFilters.browser '
  			  ]);    
           });
        }); 


    it('should displayed button update report', function(){ 
         Portal.mobileAnalytics.ImageEnginePage.getUpdateReport()
          .getAttribute('ng-click')
            .then(function(value) {  
              expect(value.length > 1).toBe(true);
          });
       });

    it('should displayed chart context menu', function(){ 
    	Portal.mobileAnalytics.ImageEnginePage.getChartContextMenu()
        .getAttribute('style')
          .then(function(value) { 
           expect(value.length > 1).toBe(true);
    	   });
        });

    it('should displayed span toggle', function() {
        Portal.mobileAnalytics.ImageEnginePage.getListDomains().isDisplayed().then(function(value) {
           expect(value).toBe(true);
            });
        });


    it('should displayed combobox search', function() {
         Portal.mobileAnalytics.ImageEnginePage.getListDomains().click();
         Portal.mobileAnalytics.ImageEnginePage.getComboBoxSearch()
          .isDisplayed()
            .then(function(value) {
              expect(value).toBe(true);
            });  
        });


    it('should displayed button hide/show menu', function() {
	   Portal.mobileAnalytics.ImageEnginePage.getHideMenu().isDisplayed().then(function(value) {
              expect(value).toBe(true); 
           });
       });




 });
});

