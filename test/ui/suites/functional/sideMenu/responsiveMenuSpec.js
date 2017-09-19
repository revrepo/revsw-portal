/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
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

describe('Functional', function () {
    describe('Side Menu Responsive', function () {

        var users = [
            config.get('portal.users.admin'),
            config.get('portal.users.revAdmin'),
            config.get('portal.users.reseller')
        ];

        users.forEach(function (user) {

            describe('With user: ' + user.role, function () {

                var SMALL_SCREEN = 980;
                var LARGE_SCREEN = 1024;

                beforeAll(function () {
                    Portal.signIn(user);
                });

                afterAll(function () {

                    // remove 'scrim' overlay so we can click logout
                    browser.executeScript('$("#scrim").remove();');
                    
                    Portal.signOut();
                });

                it('should not display side bar on resize to small screen', function () {
                    browser.manage().window().setSize(SMALL_SCREEN, 800);
                    expect(Portal.sideBar.getMenu().isDisplayed()).toBeFalsy();
                });
                it('should display side bar on resize to larger screen', function () {
                    browser.manage().window().setSize(LARGE_SCREEN, 800);
                    expect(Portal.sideBar.getMenu().isDisplayed()).toBeTruthy();
                });
                it('should display side bar when toggle button is clicked', function () {
                    browser.manage().window().setSize(SMALL_SCREEN, 800);
                    Portal.header.clickMenuToggleBtn();
                    expect(Portal.sideBar.getMenu().isDisplayed()).toBeTruthy();
                });
            });
        });
    });
});
