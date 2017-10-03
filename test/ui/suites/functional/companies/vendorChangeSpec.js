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
    describe('Account Vendor Change', function () {

        // Defining set of users for which all below tests will be run
        var users = [
            config.get('portal.users.revAdmin')
        ];
        users.forEach(function (user) {
            describe('With user: ' + user.role, function () {
                beforeAll(function () {
                    Portal.signIn(user);
                    Portal.helpers.nav.goToAccounts();
                });

                afterAll(function () {
                    Portal.signOut();
                });

                it('should display vendor change modal on vendor click', function () {
                    Portal
                        .admin
                        .accounts
                        .listPage
                        .searchAndGetFirstRow('API QA Account')
                        .clickVendor();
                    expect(Portal
                        .admin
                        .accounts
                        .listPage
                        .changeVendorModal
                        .isDisplayed())
                        .toBeTruthy();
                });

                it('should not display vendor change modal on cancel click', function () {
                    Portal
                        .admin
                        .accounts
                        .listPage
                        .changeVendorModal
                        .clickCancel();
                    expect(Portal
                        .admin
                        .accounts
                        .listPage
                        .changeVendorModal
                        .isDisplayed())
                        .toBeFalsy();
                });

                it('should be able to change vendors', function () {
                    Portal
                        .admin
                        .accounts
                        .listPage
                        .searchAndGetFirstRow('API QA Account')
                        .clickVendor();

                    Portal
                        .admin
                        .accounts
                        .listPage
                        .changeVendorModal
                        .pickNewVendor('nuubit');
                    Portal
                        .admin
                        .accounts
                        .listPage
                        .table
                        .getFirstRow()
                        .getVendor()
                        .then(function (text) {
                            expect(
                                text
                            ).not.toBe('revapm');

                            // Go back to revapm vendor
                            Portal
                                .admin
                                .accounts
                                .listPage
                                .searchAndGetFirstRow('API QA Account')
                                .clickVendor();
                            Portal
                                .admin
                                .accounts
                                .listPage
                                .changeVendorModal
                                .pickNewVendor('revapm');
                        });

                });
            });
        });
    });
});
