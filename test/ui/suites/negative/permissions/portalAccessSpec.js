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
var API = require('./../../../common/api').API;

describe('Functional', function () {
    describe('User permissions', function () {

        var user = config.get('portal.users.admin');

        var bret;
        describe('Portal Access With user: ' + user.role, function () {
            beforeAll(function () {
                Portal.signIn(user);
                bret = DataProvider.generateUser();
                if (user.role === 'Admin') {
                    delete bret.role;
                } else if (user.role === 'Reseller') {
                    bret.company = [user.account.companyName];
                }
                Portal.helpers.nav.goToUsers();
                Portal.userListPage.clickAddNewUser();
                Portal.addUserPage.createUser(bret);
                Portal.signOut();
            });

            afterAll(function () {
                Portal.signOut();
            });

            it('should successfully login to the portal', function () {
                Portal.signIn(bret);
                expect(Portal.isLoggedIn()).toBeTruthy();
            });

            it('should automatically logout once Portal Access is disabled',
                function () {
                    Portal.helpers.nav.goToUsers();
                    Portal.userListPage.searchAndClickEdit(bret.email);
                    Portal
                        .editUserPage
                        .form
                        .permissions
                        .setPermission('portalLogin', false);
                    Portal.editUserPage.clickUpdateUser();
                    Portal.dialog.clickOk();
                    expect(Portal.isLoggedIn()).toBeFalsy();
                    expect(Portal
                        .alerts
                        .getFirst()
                        .getText())
                        .toContain('You do not have permissions to use the admin panel');
                });

            it('should not be able to login if Portal Access is disabled',
                function () {
                    Portal.signIn(user);
                    Portal.helpers.nav.goToUsers();
                    Portal.userListPage.searchAndClickEdit(bret.email);
                    Portal
                        .editUserPage
                        .form
                        .permissions
                        .setPermission('portalLogin', false);
                    Portal.editUserPage.clickUpdateUser();
                    Portal.signOut();
                    Portal.signIn(bret, false);
                    expect(Portal.isLoggedIn()).toBeFalsy();
                    expect(Portal
                        .alerts
                        .getFirst()
                        .getText())
                        .toContain('You do not have permissions to be logged in to the portal');
                });

            it('should be able to login if Portal Access is enabled',
                function () {
                    Portal.signIn(user);
                    Portal.helpers.nav.goToUsers();
                    Portal.userListPage.searchAndClickEdit(bret.email);
                    Portal
                        .editUserPage
                        .form
                        .permissions
                        .setPermission('portalLogin', true);
                    Portal.editUserPage.clickUpdateUser();
                    Portal.signOut();
                    Portal.signIn(bret);
                    expect(Portal.isLoggedIn()).toBeTruthy();
                });
        });
    });
});
