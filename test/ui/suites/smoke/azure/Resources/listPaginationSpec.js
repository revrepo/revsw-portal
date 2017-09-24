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
    describe('Resources pagination', function () {

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

        it('should display button `first`', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPage
                .pager
                .getFirstBtn()
                .isDisplayed()).toBeTruthy();
        });

        it('should display button `last`', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPage
                .pager
                .getLastBtn()
                .isDisplayed()).toBeTruthy();
        });

        it('should display button `previous`', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPage
                .pager
                .getPreviousBtn()
                .isDisplayed()).toBeTruthy();
        });

        it('should display button `next`', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPage
                .pager
                .getNextBtn()
                .isDisplayed()).toBeTruthy();
        });

        it('should display button `1`', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPage
                .pager
                .getAllPageIndexButtons()
                .get(0)
                .getText()).toEqual('1');
        });

        it('should display button `2`', function () {
            expect(Portal
                .azureMarketplace
                .ResourcesPage
                .pager
                .getAllPageIndexButtons()
                .get(1)
                .getText()).toEqual('2');
        });
    });
});
