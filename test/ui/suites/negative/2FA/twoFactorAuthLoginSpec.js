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
    describe('Two Factor Authentication Login', function () {

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

                it('should check that login failes when incorrect OTP is supplied',
                    function () {
                        bret = DataProvider.generateUser();
                        Portal.helpers.nav.goToUsers();
                        Portal.userListPage.clickAddNewUser();
                        Portal.addUserPage.createUser(bret);
                        Portal.signOut().then(function () {
                            Portal.signIn(bret);
                            Portal.helpers.nav.goToSecuritySettings();
                            Portal.securitySettingsPage.getSetUpTwoFactorAuthBtn().click();
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

                                    Portal.signOut().then(function () {
                                        Portal.signIn(bret, false);
                                        var incorrectOTP = 123456;
                                        Portal
                                            .loginPage
                                            .setOTP(incorrectOTP);
                                        Portal
                                            .loginPage
                                            .clickOTPSubmitBtn();

                                        expect(Portal
                                            .loginPage
                                            .get2FADialog()
                                            .isDisplayed()).toBeTruthy();
                                    });
                                });
                        });
                    });
            });
        });
    });
});
