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
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Smoke: ', function () {
    describe('Side Menu', function () {
        describe('With user: New User', function () {

            var menu;

            beforeAll(function (done) {
                Portal
                    .signUpAndVerifyUser()
                    .then(function () {
                        menu = Portal.sideMenu;
                        menu.expand(menu.getBillingOption());
                        done();
                    });
            });

            afterAll(function () {
                Portal.signOut();
                browser.sleep(1500); // fix for reseller test fail
            });
            it('should display Change Billing Plan option',
                function () {
                    expect(menu.getMenuItem(
                        menu.getChangeBillingPlanOption())
                        .isPresent()).toBeTruthy();
                });
            it('should display Billing Statements option',
                function () {
                    expect(menu.getMenuItem(
                        menu.getBillingStatementsOption())
                        .isDisplayed()).toBeTruthy();
                });
        });
    });
});
