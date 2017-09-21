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
var Portal = require('./../../../../page_objects/portal');
var Constants = require('./../../../../page_objects/constants');

describe('Smoke', function () {

    // Defining set of users for which all below tests will be run
    var users = [
        config.get('portal.users.revAdmin')
    ];

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {

            describe('Resources Per Subscription Search', function () {

                beforeAll(function () {
                    Portal.signIn(user);
                });

                afterAll(function () {
                    Portal.signOut();
                });

                beforeEach(function () {
                    Portal.helpers.nav.goToSubscriptions().then(function () {
                        Portal.azureMarketplace
                            .SubscriptionsPage
                            .table
                            .getFirstRow()
                            .clickSubId();
                    });

                });

                it('should display search combobox',
                    function () {
                        expect(
                            Portal
                                .azureMarketplace
                                .ResourcesPerSubscriptionPage
                                .getSearchComboBox()
                                .isDisplayed()
                        ).toBeTruthy();
                    });

                it('should display search input field',
                    function () {
                        expect(
                            Portal
                                .azureMarketplace
                                .ResourcesPerSubscriptionPage
                                .getSearchTxtIn()
                                .isDisplayed()
                        ).toBeTruthy();
                    });
            });
        });
    });
});
