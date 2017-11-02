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

    describe('Login Vendor', function () {

        var currentVendor;
        var users = [];
        beforeAll(function () {
            Portal.signIn(revAdmin);
            Portal.helpers.nav.goToUsers();
            Portal.userListPage.clickAddNewUser();
            vendors.forEach(function (vendor) {
                roles.forEach(function (role) {
                    var data = {
                        role: role,
                        company: vendor.ACCOUNT
                    };
                    var bruce = DataProvider.generateUser(data);
                    Portal.addUserPage.createUser(bruce);
                    users.push({
                        user: bruce,
                        vendor: vendor
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

        it('should redirect user to correct login url', function () {
            users.forEach(function (userObj) {
                Portal.header.getHeaderBar().isPresent().then(function (val) {
                    if (val) {
                        Portal.signOut();
                    } else {
                        Portal.load();
                    }
                    Portal.signIn(userObj.user, true);
                    browser.getCurrentUrl().then(function (url) {
                        if (userObj.vendor.NAME === 'revapm') {
                            expect(Portal.header.getHeaderBar().isDisplayed()).toBeTruthy();
                            Portal.signOut();
                        } else {
                            expect(url).toContain(userObj.vendor.LOGIN_URL);
                            Portal.load();
                        }
                    });
                });
            });
        });
    });
});