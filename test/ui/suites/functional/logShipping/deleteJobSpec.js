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
var Constants = require('./../../../page_objects/constants');
var DataProvider = require('./../../../common/providers/data');

describe('Functional', function () {
    describe('Log Shipping Delete Job', function () {

        var users = [
            config.get('portal.users.revAdmin'),
            config.get('portal.users.admin'),
            config.get('portal.users.reseller')
        ];

        users.forEach(function (user) {


            describe('With user: ' + user.role, function () {
                var jobData;
                beforeAll(function () {
                    Portal.signIn(user);
                    Portal.helpers.nav.goToLogShipping();
                    jobData = DataProvider.generateLogShippingJobData({}, user.role);
                    Portal.logShipping.listPage.clickAddNewLogShippingJob();
                    Portal.logShipping.addPage.form.setJobName(jobData.name);
                    if (user.role !== 'Admin') {
                        Portal.logShipping.addPage.form.setAccount(jobData.account);
                    }
                    Portal.logShipping.addPage.clickCreateJobBtn();
                });

                afterAll(function () {
                    Portal.signOut();
                });

                it('should successfully delete job',
                    function () {
                        Portal.logShipping.listPage.searchAndClickDelete(jobData.name);
                        Portal.logShipping.listPage.clickConfirmDeleteBtn();
                        var alert = Portal.alerts.getFirst();
                        Portal.logShipping.listPage.searchAndGetFirstRow(jobData.name);
                        expect(Portal.logShipping.listPage.table.getRows().count()).toEqual(0);

                    });
            });
        });
    });
});
