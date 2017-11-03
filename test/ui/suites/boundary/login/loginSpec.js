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

describe('Boundary: ', function () {
    describe('Login', function () {

        var users = [
            config.get('portal.users.admin'),
            config.get('portal.users.user'),
            config.get('portal.users.reseller')
        ];

        users.forEach(function (user) {

            describe('With user: ' + user.role, function () {

                beforeAll(function () {
                    Portal.load();
                });

                beforeEach(function () {
                    Portal.loginPage.setEmail('');
                    Portal.loginPage.setPassword('');
                });

                it('should enable sign in button if form is filled with valid data',
                    function () {
                        Portal.loginPage.setEmail(user.email);
                        Portal.loginPage.setPassword(user.password);
                        expect(Portal.loginPage.getSignInBtn().isEnabled()).toBeTruthy();
                    });

                it('should not enable sign in button if `email` is an invalid email address',
                    function () {
                        Portal.loginPage.setEmail('thisisnotavalidaddress');
                        Portal.loginPage.setPassword(user.password);
                        expect(Portal.loginPage.getSignInBtn().isEnabled()).toBeFalsy();
                    });

                it('should not enable sign in button if `email` contains only white spaces',
                    function () {
                        Portal.loginPage.setEmail('   ');
                        Portal.loginPage.setPassword(user.password);
                        expect(Portal.loginPage.getSignInBtn().isEnabled()).toBeFalsy();
                    });

                it('should not enable sign in button if `email` contains more than 64 chars',
                    function () {
                        var chars65 = new Array(65).join('x');
                        Portal.loginPage.setEmail(user.email + chars65);
                        Portal.loginPage.setPassword(user.password);
                        expect(Portal.loginPage.getSignInBtn().isEnabled()).toBeFalsy();
                    });
            });
        });
    });
});
