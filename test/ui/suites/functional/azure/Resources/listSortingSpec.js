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
    describe('Azure Resources sorting', function () {

        var revAdminUser = config.get('portal.users.revAdmin');

        beforeAll(function () {
            Portal.signIn(revAdminUser);
        });

        afterAll(function () {
            Portal.signOut();
        });

        beforeEach(function () {
            Portal.helpers.nav.goToResources();
        });

        afterEach(function () {
        });

        it('should apply `descendant` sorting by `Resource Name` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickName();
                var subId1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getName();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickName();
                var subId2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getName();

                expect(subId1).not.toEqual(subId2);
            });

        it('should apply `ascendant` sorting by `Resource Name` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickName();
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickName();
                var subId1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getName();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickName();
                var subId2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getName();

                expect(subId1).not.toEqual(subId2);
            });

        it('should apply `descendant` sorting by `Subscription ID` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickSubId();
                var subId1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickSubId();
                var subId2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(subId1).toBeLessThan(subId2);
            });

        it('should apply `ascendant` sorting by `Subscription ID` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickSubId();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickSubId();
                var subId1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickSubId();
                var subId2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(subId1).toBeGreaterThan(subId2);
            });

        it('should apply `descendant` sorting by `Last Update` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickLastUpdate();
                var sub1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickLastUpdate();
                var sub2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(sub1).not.toEqual(sub2);

            });

        it('should apply `ascendant` sorting by `Last Update` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickLastUpdate();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickLastUpdate();
                var sub1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getSubId();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickLastUpdate();
                var sub2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getSubId();

                expect(sub1).not.toEqual(sub2);
            });

        it('should apply `ascendant` sorting by `Type` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickType();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickType();
                var sub1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getType();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickType();
                var sub2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getType();

                expect(sub1).not.toEqual(sub2);
            });

        it('should apply `descendant` sorting by `Type` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickType();
                var sub1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getType();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickType();
                var sub2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getType();

                expect(sub1).not.toEqual(sub2);
            });

        it('should apply `ascendant` sorting by `Location` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickLocation();
                var sub1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getLocation();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickLocation();
                var sub2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getLocation();

                expect(sub1).not.toEqual(sub2);
            });

        it('should apply `descendant` sorting by `Location` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickLocation();
                var sub1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getLocation();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickLocation();
                var sub2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getLocation();

                expect(sub1).not.toEqual(sub2);
            });

        it('should apply `ascendant` sorting by `Plan` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickPlan();
                var sub1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getPlan();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickPlan();
                var sub2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getPlan();

                expect(sub1).not.toEqual(sub2);
            });

        it('should apply `descendant` sorting by `Plan` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickPlan();
                var sub1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getPlan();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickPlan();
                var sub2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getPlan();

                expect(sub1).not.toEqual(sub2);
            });

        it('should apply `ascendant` sorting by `Resource Group` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickResourceGroup();
                var sub1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getResourceGroup();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickResourceGroup();
                var sub2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getResourceGroup();

                expect(sub1).not.toEqual(sub2);
            });

        it('should apply `descendant` sorting by `Resource Group` column',
            function () {
                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickResourceGroup();
                var sub1 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getResourceGroup();

                Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getHeader()
                    .clickResourceGroup();
                var sub2 = Portal
                    .azureMarketplace
                    .ResourcesPage
                    .table
                    .getFirstRow()
                    .getResourceGroup();

                expect(sub1).not.toEqual(sub2);
            });
    });
});
