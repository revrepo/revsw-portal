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
var speakeasy = require('speakeasy');
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
    describe('2FA Enforcement', function () {

        var users = [
            config.get('portal.users.admin'),
            config.get('portal.users.reseller')
        ];

        users.forEach(function (user) {

            describe('With user: ' + user.role, function () {

                beforeAll(function (done) {
                    Portal.signIn(user);
                    bret = DataProvider.generateUser();
                    if (user.role === 'Admin') {
                        delete bret.role;
                    } else if (user.role === 'Reseller') {
                        bret.company = [user.account.companyName];
                    }
                    Portal.helpers.nav.goToUsers();
                    Portal.userListPage.clickAddNewUser();
                    Portal.addUserPage.form.fill(bret);
                    Portal.addUserPage.form.permissions.setPermission('enforce2FA', true);
                    Portal.addUserPage.clickCreateUser();
                    Portal.signOut().then(function () {
                        Portal.helpers.users.completeInvitation(bret.email).then(function () {
                            done();
                        });
                    });
                });

                afterEach(function () {
                    Portal.signOut();
                });

                afterAll(function () {
                    Portal.signOut();
                });
                var bret;

                it('should redirect to 2FA setup page if 2FA enforcement is enabled', function () {
                    Portal.signIn(bret);
                    expect(Portal
                        .securitySettingsPage
                        .getSetUpTwoFactorAuthBtn()
                        .isDisplayed()).toBeTruthy();
                });

                it('should display `Setup 2FA` alert if 2FA enforcement is enabled', function () {
                    Portal.signIn(bret);
                    var alert = Portal.alerts.getFirst();
                    expect(alert.getText())
                        .toContain(Constants.alertMessages.users.MSG_ENABLE_2FA);
                });

                it('should not be able to access the portal except 2FA setup page', function () {
                    Portal.signIn(bret);
                    Portal.helpers.nav.goToDashboards();
                    var alert = Portal.alerts.getFirst();
                    expect(alert.getText())
                        .toContain(Constants.alertMessages.users.MSG_ENABLE_2FA);
                    expect(Portal
                        .securitySettingsPage
                        .getSetUpTwoFactorAuthBtn()
                        .isDisplayed()).toBeTruthy();
                });

                it('should be able to successfully setup 2FA and access the portal', function () {
                    Portal.signIn(bret);
                    Portal.securitySettingsPage.getSetUpTwoFactorAuthBtn().click();
                    Portal
                        .securitySettingsPage
                        .getASCIISecret().then(function (code) {
                            var otpSecret = code;
                            var oneTimePassword = speakeasy.time({
                                secret: code,
                                encoding: 'base32'
                            });
                            Portal
                                .securitySettingsPage
                                .setOTPTxtIn(oneTimePassword);
                            Portal
                                .securitySettingsPage
                                .clickEnableBtn();

                            var alert = Portal.alerts.getFirst();
                            expect(alert.getText())
                                .toContain(Constants
                                    .alertMessages
                                    .users
                                    .MSG_SUCCESS_ENABLE_2FA);
                            Portal.helpers.nav.goToDashboards();
                            expect(Portal.dashboards.listPage.isDisplayed()).toBeTruthy();
                        });
                });
            });
        });
    });
});