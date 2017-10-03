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
  describe ('Logo Dashboards page', function() {
		var admin = config.get('portal.users.revAdmin');
		var nuubitHomePage = Constants.nuubitHomePage;

		afterEach(function () {
		  Portal.load();
		  Portal.signOut(admin);
		});

		it('should redirect to nuubit.com after clicking on Logo from revsw', function () {
		  Portal.load();
		  Portal.signIn(admin);
		  Portal.header.clickLogo();
		  Portal.browserTabs.switchBrowserTabs();

		  var currentUrl = browser.executeScript('return document.URL');
		  expect(currentUrl).toEqual(nuubitHomePage);
		});

		it('should redirect to nuubit.com after clicking on Logo from nuubit', function () {
		  Portal.loadNuubit();
		  Portal.signIn(admin);
		  Portal.header.clickLogo();
		  Portal.browserTabs.switchBrowserTabs();

		  var currentUrl = browser.executeScript('return document.URL');
		  expect(currentUrl).toEqual(nuubitHomePage);
		});
	});
});