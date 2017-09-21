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
	describe ('Logo Sign Up page', function() {
		var nuubitHomePage = Constants.nuubitHomePage;

		it('should redirect to nuubit.com after clicking on Logo from revsw', function() {
		   Portal.load();
		   Portal.loginPage.clickSignUp();
		   Portal.signUp.plansPage.clickLogo();

		   browser.getAllWindowHandles().then(function (handles) {
		   	 // Switch to Sign up window where we clicked the Logo from revsw
   			 browser.driver.switchTo().window(handles[0]);
   			 // Close current tab
		     browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('w').perform();
		     // Switch to the newly opened tab nuubit.com
   			 browser.driver.switchTo().window(handles[1]);
		   });

		   var currentUrl = browser.executeScript('return document.URL');
		   expect(currentUrl).toEqual(nuubitHomePage);
		});

		it('should redirect to nuubit.com after clicking on Logo from nuubit', function() {
		   Portal.loadNuubit();
		   Portal.loginPage.clickSignUp();
		   Portal.signUp.plansPage.clickLogo();

		   browser.getAllWindowHandles().then(function (handles) {
		   	 // Switch to Sign up window where we clicked the Logo from nuubit
   			 browser.driver.switchTo().window(handles[0]);
   			 // Close current tab
		     browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('w').perform();
		     // Switch to the newly opened tab nuubit.com
   			 browser.driver.switchTo().window(handles[1]);
		   });

		   var currentUrl = browser.executeScript('return document.URL');
		   expect(currentUrl).toEqual(nuubitHomePage);
		});

	});
});