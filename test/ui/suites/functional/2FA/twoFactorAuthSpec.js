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
    describe('Two Factor Authentication', function () {

        var users = [
            config.get('portal.users.admin'),
            config.get('portal.users.reseller')
        ];

        users.forEach(function (user) {

            describe('With user: ' + user.role, function () {

                beforeAll(function () {
                    Portal.signIn(user);
                });

                afterAll(function () {
                    Portal.signOut();
                });
                var bret;

                it('should display QR Image when `Set Up 2FA` button is clicked',
                    function () {
                        bret = DataProvider.generateUser();
                        Portal.helpers.nav.goToUsers();
                        Portal.userListPage.clickAddNewUser();
                        Portal.addUserPage.createUser(bret);

                        Portal.signOut().then(function () {
                            Portal.signIn(bret);
                            Portal.helpers.nav.goToSecuritySettings();
                            Portal.securitySettingsPage.getSetUpTwoFactorAuthBtn().click();
                            expect(Portal
                                .securitySettingsPage
                                .getQRImage()
                                .isDisplayed()).toBeTruthy();
                        });
                    });

                it('should display `OTP` text input when `Set Up 2FA` ' +
                    'button is clicked', function () {
                        expect(Portal
                            .securitySettingsPage
                            .getOTPTxtIn()
                            .isDisplayed()).toBeTruthy();
                    });

                it('should display a successful message when enabling ' +
                    '2FA', function () {
                        Portal
                            .securitySettingsPage
                            .getASCIISecret().then(function (code) {
                                /*
                                Get the base32 code from the qr image element,
                                use speakeasy to get the OTP out of that,
                                set the value to the OTP text input and click Enable
                                */
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
                                
                            });
                    });

                it('should display `2FA` dialog on login after enabling 2FA', function () {
                    Portal.signOut().then(function () {
                        Portal.signIn(bret);
                        expect(Portal
                            .loginPage
                            .get2FADialog()
                            .isDisplayed()).toBeTruthy();
                    });
                });

                xit('should successfully log in after filling correct OTP', function () {
                    /* jshint camelcase: false */
                    /*
                    *    TODO: this test does not work now.
                    *    bret.two_factor_auth_secret_base32 is undenified
                    */
                    var otp = speakeasy.time({
                        key: bret.two_factor_auth_secret_base32,
                        encoding: 'base32'
                    });
                    Portal.loginPage.setOTP(otp);
                    Portal.loginPage.clickOTPSubmitBtn();

                    expect(Portal.header.getHeaderBar().isDisplayed()).toBeTruthy();
                    Portal.signOut();
                });

                it('should allow an admin of a user to disable that users 2FA',
                    function () {
                        Portal.signIn(user);
                        Portal.helpers.nav.goToUsers();
                        Portal
                            .userListPage
                            .searcher
                            .setSearchCriteria(bret.email);

                        Portal
                            .userListPage
                            .table
                            .getFirstRow()
                            .clickEdit();
                        Portal
                            .editUserPage
                            .clickDisable2FA();
                        Portal
                            .editUserPage
                            .clickDisable2faOkBtn();

                        var alert = Portal.alerts.getFirst();
                        expect(alert.getText())
                            .toContain(Constants
                                .alertMessages
                                .users
                                .MSG_SUCCESS_DISABLE_2FA);
                    });

                it('should not display `2FA` dialog on login after disabling 2FA', function () {
                    Portal.signOut().then(function () {
                        Portal.signIn(bret);
                        expect(Portal
                            .loginPage
                            .get2FADialog()
                            .isPresent()).toBeFalsy();
                    });
                });

                it('should successfully login after disabling 2FA', function () {
                    expect(Portal.header.getHeaderBar().isDisplayed()).toBeTruthy();
                });
            });
        });
    });
});
