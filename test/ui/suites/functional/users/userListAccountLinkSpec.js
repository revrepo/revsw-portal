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
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
    describe('User list', function () {

        var users = [
            config.get('portal.users.revAdmin'),
            config.get('portal.users.reseller')
        ];

        users.forEach(function (user) {

            describe('With user: ' + user.role, function () {

                beforeAll(function () {
                    Portal.signIn(user);
                    Portal.helpers.nav.goToUsers();
                });

                afterAll(function () {
                    Portal.signOut();
                });

                it('should display Account link',
                    function () {
                        expect(Portal.userListPage
                            .table
                            .getFirstRow()
                            .getAccountCell()
                            .getText() === '').toBeFalsy();
                    });

                it('should display All Account Resources page on account click',
                    function () {
                        Portal.userListPage
                            .table
                            .getFirstRow()
                            .clickAccount();
                        expect(Portal
                            .accountResourcesPage
                            .getTitleLbl()
                            .isDisplayed()).toBeTruthy();
                    });

                it('should be displayed when "Back" button is clicked from ' +
                    '"All Account Resources" page',
                    function () {
                        Portal.accountResourcesPage.clickBackButton();
                        expect(Portal.userListPage.isDisplayed()).toBeTruthy();
                    });
            });
        });
    });
});
