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
var DataProvider = require('./../../../common/providers/data');

describe('Smoke', function () {

    // Defining set of users for which all below tests will be run
    var users = [
        config.get('portal.users.revAdmin'),
        config.get('portal.users.admin'),
        config.get('portal.users.reseller')
    ];

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {

            describe('Log Shipping search', function () {

                beforeAll(function () {
                    Portal.signIn(user);
                });

                afterAll(function () {
                    Portal.signOut();
                });

                beforeEach(function () {
                    Portal.goToLogShipping();
                });

                it('should be displayed when displaying Log Shipping List page',
                    function () {
                        var searchField = Portal.logShipping.listPage.searcher
                            .getSearchCriteriaTxtIn();
                        expect(searchField.isPresent()).toBeTruthy();
                    });

                it('should filter items according to text filled',
                    function () {
                        var logShippingJobToSearch = DataProvider.generateLogShippingJobData();

                        if (user.role === 'Reseller'){
                            logShippingJobToSearch.account = ['API QA Reseller Company'];
                        }

                        Portal.createLogShippingJob(logShippingJobToSearch);
                        Portal.logShipping.listPage.searcher
                            .setSearchCriteria(logShippingJobToSearch.name);
                        var allRows = Portal.logShipping.listPage.table.getRows();
                        expect(allRows.count()).toEqual(1);
                        Portal.deleteLogShippingJob(logShippingJobToSearch);
                    });
            });
        });
    });
});
