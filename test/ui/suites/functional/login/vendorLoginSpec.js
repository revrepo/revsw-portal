/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
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
    var revAdmin = config.get('portal.users.revAdmin');
    var users = [];
    var roles = ['admin', 'user'];
    var vendors = Constants.VENDORS;

    describe('Login Vendor', function () {

        var currentVendor;

        it('should redirect user to correct login url', function () {
            /*
            * Create a user for each role, assign a different vendor to each one
            */
            vendors.forEach(function (vendor) {
                roles.forEach(function (role) {
                    Portal.signIn(revAdmin).then(function () {
                        Portal.helpers.nav.goToUsers();
                        Portal.userListPage.clickAddNewUser();
                        var data = {
                            role: role,
                            company: vendor.ACCOUNT
                        };
                        var bruce = DataProvider.generateUser(data);
                        Portal.addUserPage.createUser(bruce);
                        Portal.signOut();
                        Portal.loginPage.setEmail(bruce.email);
                        Portal.loginPage.setPassword(bruce.password);
                        Portal.loginPage.clickSignIn();

                        if (vendor.NAME === 'revapm') {
                            expect(Portal.header.getHeaderBar().isDisplayed()).toBeTruthy();
                        } else {
                            browser.sleep(60000); // sleep non angular page
                            browser.getCurrentUrl().then(function (url) {
                                expect(url).toBe(vendor.LOGIN_URL);
                                Portal.load().then(function () {
                                    Portal.signOut();
                                });
                                
                            });
                        }
                    });
                });
            });
        });
    });
});