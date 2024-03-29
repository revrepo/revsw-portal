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

describe('Negative: ', function () {
    describe('Two Factor Authentication Setup', function () {

        var users = [
            config.get('portal.users.admin')
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

                it('should not allow click on enable button if OTP is less than 6 chars',
                    function () {
                        bret = DataProvider.generateUser();
                        Portal.helpers.nav.goToUsers();
                        Portal.userListPage.clickAddNewUser();
                        delete bret.role;
                        Portal.addUserPage.createUser(bret);
                        Portal.signOut().then(function () {
                            Portal.signIn(bret);
                            Portal.helpers.nav.goToSecuritySettings();
                            Portal.securitySettingsPage.getSetUpTwoFactorAuthBtn().click();
                            Portal
                                .securitySettingsPage
                                .clickEnableBtn();

                            expect(Portal.alerts.getAll().count()).toEqual(0);
                        });
                    });

                it('should check that Enable 2FA fails with invalid OTP',
                    function () {
                        var incorrectOTP = '!@#$%^';
                        Portal
                            .securitySettingsPage
                            .setOTPTxtIn(incorrectOTP);
                        Portal
                            .securitySettingsPage
                            .clickEnableBtn();

                        var alert = Portal.alerts.getFirst();
                        expect(alert.getText())
                            .toContain(Constants
                                .alertMessages
                                .users
                                .MSG_INVALID_OTP_2FA);

                        Portal
                            .securitySettingsPage
                            .getOTPTxtIn()
                            .clear();
                    });

                it('should check that Enable 2FA fails with incorrect OTP',
                    function () {
                        Portal.alerts.getFirst().click();
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

                                var incorrectOTP = oneTimePassword === 123456 ?
                                    [1, 2, 3, 4, 5, 7, 1] :
                                    [1, 2, 3, 4, 5, 6, 1];
                                Portal.securitySettingsPage.clearOTPTxtIn();
                                for (var i = 0; i < incorrectOTP.length; i++) {
                                    Portal
                                        .securitySettingsPage
                                        .setOTPTxtIn(incorrectOTP[i]);
                                    browser.sleep(300);
                                    if (incorrectOTP
                                        .indexOf(incorrectOTP[i]) === incorrectOTP.length - 1) {
                                        Portal
                                            .securitySettingsPage
                                            .clickEnableBtn();
                                        var alert = Portal.alerts.getFirst();
                                        expect(alert.getText())
                                            .toContain(Constants
                                                .alertMessages
                                                .users
                                                .MSG_INCORRECT_OTP_2FA);
                                        Portal
                                            .securitySettingsPage
                                            .getOTPTxtIn()
                                            .clear();
                                    }
                                }
                            });
                    });
            });
        });
    });
});
