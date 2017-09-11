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

describe('Smoke', function () {
    describe('Apps List', function () {

        var users = [
            config.get('portal.users.reseller'),
            config.get('portal.users.revAdmin')
        ];
        var platforms = [
            Portal.constants.mobileApps.platforms.android,
            Portal.constants.mobileApps.platforms.ios,
            Portal.constants.mobileApps.platforms.windowsMobile
        ];
        var app;

        users.forEach(function (user) {

            describe('With user: ' + user.role, function () {

                platforms.forEach(function (platform) {

                    describe('For platform: ' + platform, function () {

                        beforeAll(function () {
                            Portal.signIn(user);
                        });

                        afterAll(function () {
                            Portal.signOut();
                        });

                        beforeEach(function () {
                            Portal.helpers.nav.goToMobileAppsMenuItem(platform);
                        });
                        it('should be displayed when "Back" button is clicked from ' +
                            '"All Account Resources" page', function () {
                                Portal.mobileApps.listPage.table.getFirstRow().clickAccount();
                                Portal.accountResourcesPage.clickBackButton();
                                expect(Portal.mobileApps.listPage
                                    .getTitleLbl().isDisplayed()).toBeTruthy();
                            });
                        it('should search and filter a non-existing app', function () {
                            var neApp = {
                                name: 'Non existing app ' + Date.now()
                            };
                            var count = Portal.mobileApps.listPage.searchAndCount(neApp.name);
                            expect(count).toBe(0);
                        });
                    });
                });
            });
        });
    });
});
