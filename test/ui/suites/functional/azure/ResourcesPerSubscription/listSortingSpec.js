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
var DataProvider = require('./../../../../common/providers/data');
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
                    .getHeader()
                    .clickSubId();
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

        beforeEach(function () {
        });

        afterEach(function () {
        });

        it('should apply `descendant` sorting by `Name` column',
            function () {
                var item1 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getName();
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickName();

                var item2 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getName();
                expect(item2).toBeGreaterThan(item1);
            });

        it('should apply `ascendant` sorting by `Name` column',
            function () {
                var item1 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getName();
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickName();

                var item2 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getName();
                expect(item2).toBeLessThan(item1);
            });

        it('should apply `ascendant` sorting by `Type` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickType();
                var item1 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getType();
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickType();

                var item2 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getType();
                item2.then(function (t1) {
                    item1.then(function (t2) {
                        expect(t1.toLowerCase()).toBeGreaterThan(t2.toLowerCase());
                    });
                });
            });

        it('should apply `descendant` sorting by `Type` column',
            function () {
                var item1 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getType();
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickType();

                var item2 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getType();
                item2.then(function (t1) {
                    item1.then(function (t2) {
                        expect(t1.toLowerCase()).toBeLessThan(t2.toLowerCase());
                    });
                });
            });

        it('should apply `ascendant` sorting by `Location` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickLocation();
                var item1 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getLocation();
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickLocation();

                var item2 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getLocation();
                expect(item2).toBeGreaterThan(item1);

            });

        it('should apply `descendant` sorting by `Location` column',
            function () {
                var item1 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getLocation();
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickLocation();

                var item2 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getLocation();
                expect(item2).toBeLessThan(item1);
            });

        it('should apply `ascendant` sorting by `Plan` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickPlan();
                var item1 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getPlan();
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickPlan();

                var item2 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getPlan();
                expect(item2).toBeGreaterThan(item1);
            });

        it('should apply `descendant` sorting by `Plan` column',
            function () {
                var item1 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getPlan();
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickPlan();

                var item2 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getPlan();
                expect(item2).toBeLessThan(item1);
            });

        it('should apply `ascendant` sorting by `Resource Group` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickResourceGroup();
                var item1 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getResourceGroup();
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickResourceGroup();

                var item2 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getResourceGroup();
                expect(item2).toBeGreaterThan(item1);
            });

        it('should apply `descendant` sorting by `Resource Group` column',
            function () {
                var item1 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getResourceGroup();
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickResourceGroup();

                var item2 = Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getFirstRow()
                    .getResourceGroup();
                expect(item2).toBeLessThan(item1);
            });

    });
});
