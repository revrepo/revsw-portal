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
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickName();
                expect(
                    Portal
                        .azureMarketplace
                        .ResourcesPerSubscriptionPage
                        .table
                        .getHeader()
                        .getNameCell()
                        .getAttribute('aria-sort')
                ).toBe('descending');
            });

        it('should apply `ascendant` sorting by `Name` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickName();
                expect(
                    Portal
                        .azureMarketplace
                        .ResourcesPerSubscriptionPage
                        .table
                        .getHeader()
                        .getNameCell()
                        .getAttribute('aria-sort')
                ).toBe('ascending');
            });

        it('should apply `ascendant` sorting by `Type` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickType();
                expect(
                    Portal
                        .azureMarketplace
                        .ResourcesPerSubscriptionPage
                        .table
                        .getHeader()
                        .getTypeCell()
                        .getAttribute('aria-sort')
                ).toBe('ascending');
            });

        it('should apply `descendant` sorting by `Type` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickType();
                expect(
                    Portal
                        .azureMarketplace
                        .ResourcesPerSubscriptionPage
                        .table
                        .getHeader()
                        .getTypeCell()
                        .getAttribute('aria-sort')
                ).toBe('descending');
            });

        it('should apply `ascendant` sorting by `Location` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickLocation();
                expect(
                    Portal
                        .azureMarketplace
                        .ResourcesPerSubscriptionPage
                        .table
                        .getHeader()
                        .getLocationCell()
                        .getAttribute('aria-sort')
                ).toBe('ascending');

            });

        it('should apply `descendant` sorting by `Location` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickLocation();
                expect(
                    Portal
                        .azureMarketplace
                        .ResourcesPerSubscriptionPage
                        .table
                        .getHeader()
                        .getLocationCell()
                        .getAttribute('aria-sort')
                ).toBe('descending');
            });

        it('should apply `ascendant` sorting by `Plan` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickPlan();
                expect(
                    Portal
                        .azureMarketplace
                        .ResourcesPerSubscriptionPage
                        .table
                        .getHeader()
                        .getPlanCell()
                        .getAttribute('aria-sort')
                ).toBe('ascending');
            });

        it('should apply `descendant` sorting by `Plan` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickPlan();
                expect(
                    Portal
                        .azureMarketplace
                        .ResourcesPerSubscriptionPage
                        .table
                        .getHeader()
                        .getPlanCell()
                        .getAttribute('aria-sort')
                ).toBe('descending');
            });

        it('should apply `ascendant` sorting by `Resource Group` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickResourceGroup();
                expect(
                    Portal
                        .azureMarketplace
                        .ResourcesPerSubscriptionPage
                        .table
                        .getHeader()
                        .getResourceGroupCell()
                        .getAttribute('aria-sort')
                ).toBe('ascending');
            });

        it('should apply `descendant` sorting by `Resource Group` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPerSubscriptionPage
                    .table
                    .getHeader()
                    .clickResourceGroup();
                expect(
                    Portal
                        .azureMarketplace
                        .ResourcesPerSubscriptionPage
                        .table
                        .getHeader()
                        .getResourceGroupCell()
                        .getAttribute('aria-sort')
                ).toBe('descending');
            });

    });
});
