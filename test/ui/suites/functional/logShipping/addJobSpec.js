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
    describe('Log Shipping Add Job', function () {

        var user = config.get('portal.users.revAdmin');


        describe('With user: ' + user.role, function () {

            beforeAll(function () {
                Portal.signIn(user);
                Portal.helpers.nav.goToLogShipping();
                Portal.logShipping.listPage.clickAddNewLogShippingJob();
            });

            afterAll(function () {
                Portal.signOut();
            });

            it('should clear form when `Cancel` is clicked',
                function () {
                    var jobData = DataProvider.generateLogShippingJobData();
                    Portal.logShipping.addPage.form.setJobName(jobData.name);
                    Portal.logShipping.addPage.form.setAccount(jobData.account);
                    Portal.logShipping.addPage.clickCancel();

                    Portal.logShipping.listPage.clickAddNewLogShippingJob();
                    expect(Portal.logShipping.addPage.form.getJobName()).toEqual('');
                });

            it('should successfully add a new log shipping job',
                function () {
                    var jobData = DataProvider.generateLogShippingJobData();
                    Portal.logShipping.addPage.form.setJobName(jobData.name);
                    Portal.logShipping.addPage.form.setAccount(jobData.account);
                    Portal.logShipping.addPage.clickCreateJobBtn();

                    var alert = Portal.alerts.getFirst();
                    expect(alert.getText())
                        .toContain(Constants.alertMessages.logShipping.MSG_SUCCESS_ADD);
                });
        });
    });
});
