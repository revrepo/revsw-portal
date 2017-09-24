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
var Portal = require('./../../../../page_objects/portal');
var Constants = require('./../../../../page_objects/constants');

describe('Smoke', function () {
    describe('Resources Per Subscription sorting', function () {

        var revAdminUser = config.get('portal.users.revAdmin');

        beforeAll(function () {
            Portal.signIn(revAdminUser);
            Portal.helpers.nav.goToSubscriptions().then(function () {
                Portal.azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .clickSubId();
            });
        });

        afterAll(function () {
            Portal.signOut();
        });

        it('should display `Name` filter', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPerSubscriptionPage
                .table
                .getHeader()
                .getNameCell()
                .isDisplayed()).toBeTruthy();
        });

        it('should display `Type` filter', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPerSubscriptionPage
                .table
                .getHeader()
                .getTypeCell()
                .isDisplayed()).toBeTruthy();
        });

        it('should display `Location` filter', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPerSubscriptionPage
                .table
                .getHeader()
                .getLocationCell()
                .isDisplayed()).toBeTruthy();
        });

        it('should display `Plan` filter', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPerSubscriptionPage
                .table
                .getHeader()
                .getPlanCell()
                .isDisplayed()).toBeTruthy();
        });

        it('should display `Resource Group` filter', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPerSubscriptionPage
                .table
                .getHeader()
                .getResourceGroupCell()
                .isDisplayed()).toBeTruthy();
        });

    });
});
