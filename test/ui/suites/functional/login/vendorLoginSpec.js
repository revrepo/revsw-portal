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
    var roles = ['admin', 'user', 'reseller'];
    var vendors = Constants.VENDORS;
    var totalUsers = roles.length * vendors.length * 2; // total users including RO

    describe('Login Vendor', function () {

        var currentVendor;
        var users = [];

        beforeAll(function () {
            Portal.signIn(revAdmin);
            Portal.helpers.nav.goToUsers();
            Portal.userListPage.clickAddNewUser();
        });

        vendors.forEach(function (vendor) {
            roles.forEach(function (role) {
                beforeAll(function (done) {
                    /*
                    * Create a user for each vendor, role and read only. 18 Users total.
                    */
                    console.log('       > Creating user with role ' +
                        role + ' and vendor ' + vendor.NAME);
                    var data = {
                        role: role,
                        company: vendor.ACCOUNT
                    };
                    var bruce = DataProvider.generateUser(data, true);
                    var bruceRO = DataProvider.generateUser(data, true);
                    bruceRO.accessControls = [Constants.user.accessControls.READ_ONLY];
                    Portal.addUserPage.createUser(bruce)
                        .then(function () {
                            return Portal.addUserPage.createUser(bruceRO);
                        })
                        .then(function () {
                            users.push({
                                user: bruce,
                                vendor: vendor
                            });
                            users.push({
                                user: bruceRO,
                                vendor: vendor
                            });
                            done();
                        });
                });
            });
        });

        afterAll(function () {
            // user cleanup
            Portal.header.getHeaderBar().isPresent().then(function (val) {
                if (val) {
                    Portal.signOut();
                } else {
                    Portal.load();
                }
                Portal.signIn(revAdmin);
                Portal.helpers.nav.goToUsers();
                users.forEach(function (userObj) {
                    Portal.userListPage.searchAndClickDelete(userObj.user.email);
                    Portal.dialog.clickOk();
                });
            });
        });

        for (var i = 0; i < totalUsers; i++) {
            it('should redirect user to correct login url', function (done) {
                /* jshint ignore:start */
                var user = users.pop(); // pop the user and start testing
                console.log('       > Role: ' + user.user.role);
                console.log('       > Vendor: ' + user.vendor.NAME);
                Portal.header.getHeaderBar().isPresent().then(function (val) {
                    if (val) {
                        Portal.signOut();
                    } else {
                        Portal.load();
                    }
                    Portal.loginPage.setEmail(user.user.email);
                    Portal.loginPage.setPassword(user.user.password);
                    Portal.loginPage.clickSignIn();
                    if (user.vendor.NAME === 'revapm') {
                        // if vendor is revapm then it should just login
                        expect(Portal.header.getHeaderBar().isDisplayed()).toBeTruthy();
                        Portal.signOut();
                        done();
                    } else {
                        // if different vendor, should be redirected
                        browser.sleep(10000); // non angular page wait
                        browser.getCurrentUrl().then(function (url) {
                            expect(url).toContain(user.vendor.LOGIN_URL);
                            Portal.load();
                            done();
                        });
                    }
                });
                /* jshint ignore:end */
            });
        }
    });
});