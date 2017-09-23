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
    describe('Add user', function () {

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

                it('should enable 2FA', function () {
                    var bret = DataProvider.generateUser();
                    Portal.helpers.nav.goToUsers();
                    Portal.userListPage.clickAddNewUser();
                    Portal.addUserPage.createUser(bret);
                    Portal.signOut().then(function () {
                        Portal.signIn(bret);
                        Portal.helpers.nav.goToSecuritySettings();
                        Portal.securitySettingsPage.getSetUpTwoFactorAuthBtn().click();
                    });
                });
            });
        });
    });
});
