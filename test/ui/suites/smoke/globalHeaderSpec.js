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
var Portal = require('./../../page_objects/portal');
var DataProvider = require('./../../common/providers/data');
var Constants = require('./../../page_objects/constants');

describe('Smoke', function () {

    // Defining set of users for which all below tests will be run
    var users = [
        config.get('portal.users.admin'),
        config.get('portal.users.reseller'),
        config.get('portal.users.revAdmin')
    ];

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {
            describe('Global Header', function () {

                var SMALL_SCREEN = 800;
                var LARGE_SCREEN = 1280;

                beforeAll(function () {
                    Portal.signIn(user);
                });

                afterAll(function () {
                    browser.manage().window().setSize(LARGE_SCREEN, 1024);
                    Portal.signOut();
                });

                it('should display `Hide/Show Menu` button', function () {
                    expect(
                        Portal
                            .header
                            .getMenuToggleBtn()
                            .isDisplayed()
                    ).toBeTruthy();
                });

                it('should display `Hide/Show Menu` button on smaller screens', function () {
                    browser.manage().window().setSize(SMALL_SCREEN, 1024);
                    expect(
                        Portal
                            .header
                            .getMenuToggleBtn()
                            .isDisplayed()
                    ).toBeTruthy();
                });
            });
        });
    });
});
