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
    describe('WAF Event row', function () {

        var user = config.get('portal.users.revAdmin');
        beforeAll(function () {
            Portal.signIn(user);
        });

        afterAll(function () {
            Portal.signOut();
        });

        beforeEach(function () {
            Portal.helpers.nav.goToWAFEvents();
            Portal.wafEvents.selectDomainDDown('waf-monitor.revsw.net');
        });

        it('should display ip address', function () {
            expect(Portal
                    .wafEvents
                    .table
                    .getFirstRow()
                    .getIPAddress()
                    .isPresent()).toBeTruthy();                          
        });

        it('should display ip info tooltip when mouse is over ip address', function () {
            var ipElem = Portal
                            .wafEvents
                            .table
                            .getFirstRow()
                            .getIPAddress();
            var until = protractor.ExpectedConditions;
            browser.wait(until.presenceOf(ipElem), 10000); // wait for table to load

            //simulating hover effect
            browser.executeScript('$(".ip-tooltip-holder:first").addClass("hover");');
            expect(Portal
                    .wafEvents
                    .table
                    .getFirstRow()
                    .getIPToolTip().isDisplayed()).toBeTruthy();
        });
    });
});
