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
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {

    // Defining set of users for which all below tests will be run
    var users = [
        config.get('portal.users.revAdmin'),
        config.get('portal.users.admin'),
        config.get('portal.users.reseller')
    ];

    var normalUser = config.get('portal.users.user');

    describe('With user: ' + normalUser.role, function () {

        describe('Log Shipping list', function () {

            beforeAll(function () {
                Portal.signIn(normalUser);
            });

            afterAll(function () {
                Portal.signOut();
            });

            beforeEach(function () {

            });

            it('should "Log Shipping" menu unavailable in sidebar for Normal user',
                function () {
                    expect(Portal.sideBar
                        .isHeaderElemExists(Constants.sideBar.billing.BILLING))
                        .toBeFalsy();
                });
        });
    });

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {

            describe('Log Shipping list', function () {

                beforeAll(function () {
                    Portal.signIn(user);
                });

                afterAll(function () {
                    Portal.signOut();
                });

                beforeEach(function () {
                    Portal.goToLogShipping();
                });

                it('should be displayed when clicking "Log Shipping" from sidebar',
                    function () {
                        expect(Portal.logShipping.listPage.isDisplayed()).toBeTruthy();
                    });

                it('should be displayed when "Back to list" button is clicked from ' +
                    '"Add Log Shipping Job" page',
                    function () {
                        Portal.logShipping.listPage.clickAddNewLogShippingJob();
                        Portal.logShipping.addPage.clickBackToList();
                        expect(Portal.logShipping.listPage.isDisplayed()).toBeTruthy();
                    });

                it('should be displayed when "Cancel" button is clicked from ' +
                    '"Add Log Shipping Job" page',
                    function () {
                        Portal.logShipping.listPage.clickAddNewLogShippingJob();
                        Portal.logShipping.addPage.clickCancel();
                        expect(Portal.logShipping.listPage.isDisplayed()).toBeTruthy();
                    });
            });
        });
    });
});