/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

describe('Smoke: ', function () {
    describe('Side Menu', function () {
        var users = [
            config.get('portal.users.revAdmin'),
            config.get('portal.users.reseller'),
            config.get('portal.users.admin'),
            config.get('portal.users.user')
        ];
        users.forEach(function (user) {
            describe('With user: ' + user.role, function () {

                var menu;

                beforeAll(function () {
                    Portal.signIn(user);
                    menu = Portal.sideMenu;
                });

                afterAll(function () {
                    Portal.signOut();
                });
                if (user.role === 'Reseller') {
                    it('should not display Change Billing Plan option',
                        function () {
                            menu.expand(menu.getBillingOption());
                            expect(menu.getMenuItem(
                                menu.getChangeBillingPlanOption())
                                .isPresent()).toBeFalsy();
                        });
                    it('should not display Billing Statements option',
                        function () {
                            expect(menu.getMenuItem(
                                menu.getBillingStatementsOption())
                                .isPresent()).toBeFalsy();
                        });
                } else if (user.role === 'Admin') {
                    it('should not display Change Billing Plan option',
                        function () {
                            menu.expand(menu.getBillingOption());
                            expect(menu.getMenuItem(
                                menu.getChangeBillingPlanOption())
                                .isPresent()).toBeFalsy();
                        });
                    it('should not display Billing Statements option',
                        function () {
                            expect(menu.getMenuItem(
                                menu.getBillingStatementsOption())
                                .isPresent()).toBeFalsy();
                        });
                } else if (user.role === 'Normal User') {
                    it('should not display Billing menu item',
                        function () {
                            expect(menu.getMenuItem(
                                menu.getBillingOption())
                                .isPresent()).toBeFalsy();
                        });
                } else {
                    it('should display Change Billing Plan option',
                        function () {
                            menu.expand(menu.getBillingOption());
                            expect(menu.getMenuItem(
                                menu.getChangeBillingPlanOption())
                                .isPresent()).toBeTruthy();
                        });
                    it('should display Billing Statements option',
                        function () {
                            expect(menu.getMenuItem(
                                menu.getBillingStatementsOption())
                                .isPresent()).toBeTruthy();
                        });
                }
            });
        });
    });
});
