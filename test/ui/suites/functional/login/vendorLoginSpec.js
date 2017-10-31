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
    var users = [
        config.get('portal.users.admin'),
        config.get('portal.users.reseller'),
        config.get('portal.users.user'),
        config.get('portal.users.roUser')
    ];

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {

            describe('Login Vendor', function () {

                var currentVendor;

                beforeEach(function (done) {
                    // before each test get the current vendor of the user we are testing with
                    Portal.signIn(revAdmin);
                    Portal.helpers.nav.goToAccounts();
                    Portal.admin.accounts.listPage.searchAndGetFirstRow(user.account.companyName);
                    Portal
                        .admin
                        .accounts
                        .listPage
                        .table
                        .getFirstRow()
                        .getVendor().then(function (text) {
                            currentVendor = text;
                            Portal.signOut().then(function () {
                                done();
                            });
                        });
                });

                xit('should successfully login user if login url is correct', function () {
                    browser.getCurrentUrl().then(function (url) {
                        switch (currentVendor) {
                            case 'revapm':
                                expect(url).toBe(Constants.VENDORS.REVAPM.LOGIN_URL);
                                Portal.signIn(user);
                                expect(Portal.header.getHeaderBar().isDisplayed()).toBeTruthy();
                                break;
                            case 'nuubit':
                                expect(url).toBe(Constants.VENDORS.NUUBIT.LOGIN_URL);
                                Portal.signIn(user);
                                expect(Portal.header.getHeaderBar().isDisplayed()).toBeTruthy();
                                break;
                            case 'hooli':
                                expect(url).toBe(Constants.VENDORS.HOOLI.LOGIN_URL);
                                Portal.signIn(user);
                                expect(Portal.header.getHeaderBar().isDisplayed()).toBeTruthy();
                                break;
                        }
                    });
                });

                it('should redirect user to correct ' +
                    ' login url after vendor change ', function (done) {
                        Portal.signIn(revAdmin);
                        Portal.helpers.nav.goToAccounts();
                        Portal
                        .admin
                        .accounts
                        .listPage
                        .searchAndGetFirstRow(user.account.companyName);
                        Portal
                            .admin
                            .accounts
                            .listPage
                            .table
                            .getFirstRow()
                            .clickVendor();
                        var changeVendorTo;
                        switch (currentVendor) {
                            case 'revapm':
                                Portal
                                    .admin
                                    .accounts
                                    .listPage
                                    .table
                                    .getFirstRow()
                                    .setVendor('nuubit');
                                changeVendorTo = 'nuubit';
                                break;
                            case 'nuubit':
                                Portal
                                    .admin
                                    .accounts
                                    .listPage
                                    .table
                                    .getFirstRow()
                                    .setVendor('revapm');
                                changeVendorTo = 'revapm';
                                break;
                            case 'hooli':
                                Portal
                                    .admin
                                    .accounts
                                    .listPage
                                    .table
                                    .getFirstRow()
                                    .setVendor('revapm');
                                changeVendorTo = 'revapm';
                                break;
                        }

                        Portal.signOut().then(function () {
                            Portal.loginPage.setEmail(user.email);
                            Portal.loginPage.setPassword(user.password);
                            Portal.loginPage.clickSignIn();
                            browser.waitForAngular();
                            browser.sleep(60000); // non angular wait
                            browser.getCurrentUrl().then(function (url) {
                                switch (changeVendorTo) {
                                    case 'revapm':
                                        expect(url).toBe(Constants.VENDORS.REVAPM.LOGIN_URL);
                                        done();
                                        setVendor(currentVendor);
                                        break;
                                    case 'nuubit':
                                        expect(url).toBe(Constants.VENDORS.NUUBIT.LOGIN_URL);
                                        done();
                                        setVendor(currentVendor);
                                        break;
                                }
                            });
                        });
                    });

                function setVendor(vendor) {
                    Portal.load();
                    Portal.signOut().then(function () {
                        Portal.signIn(revAdmin);
                        Portal.helpers.nav.goToAccounts();
                        Portal
                        .admin
                        .accounts
                        .listPage
                        .searchAndGetFirstRow(user.account.companyName);
                        Portal
                            .admin
                            .accounts
                            .listPage
                            .table
                            .getFirstRow()
                            .clickVendor();
                        switch (vendor) {
                            case 'revapm':
                                Portal
                                    .admin
                                    .accounts
                                    .listPage
                                    .table
                                    .getFirstRow()
                                    .setVendor('revapm');
                                break;
                            case 'nuubit':
                                Portal
                                    .admin
                                    .accounts
                                    .listPage
                                    .table
                                    .getFirstRow()
                                    .setVendor('nuubit');
                                break;
                            case 'hooli':
                                Portal
                                    .admin
                                    .accounts
                                    .listPage
                                    .table
                                    .getFirstRow()
                                    .setVendor('hooli');
                                break;
                        }
                        Portal.signOut();
                    });
                }

            });
        });
    });
});
