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
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {
    describe('WAF analytics IP tooltip', function () {

        var user = config.get('portal.users.revAdmin');
        beforeAll(function () {
            Portal.signIn(user);
        });

        afterAll(function () {
            Portal.signOut();
        });

        beforeEach(function () {
            Portal.helpers.nav.goToWAFAnalytics();
            Portal.wafAnalitycs.getDomainDDown().setValue('waf-monitor.revsw.net');
            Portal.wafAnalitycs.clickTopIPs();
            var until = protractor.ExpectedConditions;
            var ipsTable = Portal
            .wafAnalitycs
            .table
            .getFirstRow()
            .getIPAddress();
            browser.wait(until.presenceOf(ipsTable), 10000); // wait for table to load
        });

        it('should display ip address', function () {
            expect(Portal
            .wafAnalitycs
            .table
            .getFirstRow()
            .getIPAddress()
            .isPresent()).toBeTruthy();                          
        });

        it('should display ip info tooltip when mouse is over ip address', function () {
            var ipElem = Portal
                            .wafAnalitycs
                            .table
                            .getFirstRow()
                            .getIPToolTipHolder();
            //simulating hover effect
            browser.executeScript('$(".ip-tooltip-holder:first").addClass("hover");');
            expect(Portal
                    .wafAnalitycs
                    .table
                    .getFirstRow()
                    .getIPToolTip().isDisplayed()).toBeTruthy();
        });
    });
});
