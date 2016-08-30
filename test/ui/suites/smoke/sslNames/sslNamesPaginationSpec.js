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
var Portal = require('./../../../page_objects/portal');

xdescribe('Smoke', function () {    //TODO: Since we need more than 25 items
                                    // in the list to show pagination
                                    //I will temorarly disable this

    // Defining set of users for which all below tests will be run
    var users = [
        config.get('portal.users.revAdmin'),
        config.get('portal.users.reseller'),
        config.get('portal.users.admin'),
        config.get('portal.users.user')
    ];

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {

            describe('SSL Names pagination', function () {

                beforeAll(function () {
                    Portal.signIn(user);
                });

                afterAll(function () {
                    Portal.signOut();
                });

                beforeEach(function () {
                    Portal.helpers.nav.goToSSLNames();
                });

                it('should be displayed when displaying SSL Certs List page',
                    function () {
                        var currPageBtn = Portal.sslNames.listPage.pager
                            .getCurrentPageIndexBtn();
                        expect(currPageBtn.isPresent()).toBeTruthy();
                    });
            });
        });
    });
});
