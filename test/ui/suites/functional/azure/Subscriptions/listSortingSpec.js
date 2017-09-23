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
    describe('Subscriptions sorting', function () {

        var revAdminUser = config.get('portal.users.revAdmin');

        beforeAll(function () {
            Portal.signIn(revAdminUser);
            Portal.helpers.nav.goToSubscriptions();
        });

        afterAll(function () {
            Portal.signOut();
        });

        it('should apply `descendant` sorting by `Subscription ID` column',
            function () {
                Portal.azureMarketplace.SubscriptionsPage.table.getHeader().clickSubId();
                var subId1 = Portal.azureMarketplace
                    .SubscriptionsPage.table.getFirstRow().getSubId();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickSubId();
                var subId2 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(subId1).toBeLessThan(subId2);
            });

        it('should apply `ascendant` sorting by `Subscription ID` column',
            function () {
                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickSubId();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickSubId();
                var subId1 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickSubId();
                var subId2 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(subId1).toBeGreaterThan(subId2);
            });

        it('should apply `descendant` sorting by `Registration Date` column',
            function () {
                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickRegisterDate();
                var sub1 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickRegisterDate();
                var sub2 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(sub1).not.toEqual(sub2);

            });

        it('should apply `ascendant` sorting by `Registration Date` column',
            function () {
                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickRegisterDate();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickRegisterDate();
                var sub1 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickRegisterDate();
                var sub2 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(sub1).not.toEqual(sub2);
            });

        it('should apply `descendant` sorting by `Last Update` column',
            function () {
                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickLastUpdate();
                var sub1 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickLastUpdate();
                var sub2 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(sub1).not.toEqual(sub2);

            });

        it('should apply `ascendant` sorting by `Last Update` column',
            function () {
                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickLastUpdate();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickLastUpdate();
                var sub1 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickLastUpdate();
                var sub2 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(sub1).not.toEqual(sub2);
            });

        it('should apply `descendant` sorting by `State` column',
            function () {
                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickState();
                var sub1 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickState();
                var sub2 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(sub1).not.toEqual(sub2);

            });

        it('should apply `ascendant` sorting by `State` column',
            function () {
                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickState();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickState();
                var sub1 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getHeader()
                    .clickState();
                var sub2 = Portal
                    .azureMarketplace
                    .SubscriptionsPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(sub1).not.toEqual(sub2);
            });

    });
});
