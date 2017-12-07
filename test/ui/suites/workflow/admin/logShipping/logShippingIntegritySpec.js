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

describe('Workflow', function () {

    var user = config.get('portal.users.admin');

    describe('With user: ' + user.role, function () {
        /* api json is all camel_case */
        /* jshint camelcase:false */
        describe('Log Shipping Job Add Edit Integrity', function () {
            var newJob = DataProvider.generateLogShippingJobData({}, user.role);
            var newJobUpdated = newJob;
            var jobObj = {};
            beforeAll(function (done) {
                Portal.signIn(user);
                Portal.helpers.nav.goToLogShipping();
                Portal.logShipping.listPage.clickAddNewLogShippingJob();
                Portal.logShipping.addPage.createLogShippingJob(newJob).then(function () {
                    Portal.helpers.logShipping.getJob(newJob.name).then(function (job) {
                        jobObj = job;
                        done();
                    });
                });
            });

            afterAll(function () {
                Portal.signOut();
            });

            beforeEach(function () {
                Portal.helpers.nav.goToLogShipping();
                Portal.logShipping.listPage.searchAndClickEdit(newJob.name);
            });

            it('should contain correct data in a newly created Log Shipping Job JSON object',
                function () {
                    expect(jobObj.job_name).toBe(newJob.name);
                });

            it('should display correct data in the Log Shipping Job UI elements',
                function () {
                    Portal
                        .logShipping
                        .editPage
                        .form
                        .getJobName()
                        .then(function (val) {
                            expect(val).toBe(jobObj.job_name);
                        });
                });

            it('should contain correct data in the Log Shipping Job JSON object after update',
                function (done) {
                    newJobUpdated.name += '-UPDATED';

                    Portal.logShipping.editPage.updateLogShippingJob(newJobUpdated);
                    Portal.alerts.waitToDisplay().then(function () {
                        Portal
                            .helpers
                            .logShipping
                            .getJob(newJobUpdated.name)
                            .then(function (job) {
                                jobObj = job;
                                expect(jobObj.job_name).toBe(newJobUpdated.name);
                                expect(jobObj.operational_mode).toBe('stop');
                                expect(jobObj.destination_type).toBe('ftp');
                                expect(jobObj.destination_host).toBe(newJobUpdated.host);
                                expect(jobObj.destination_port).toBe(newJobUpdated.port);
                                expect(jobObj.destination_username).toBe(newJobUpdated.userName);
                                expect(jobObj.destination_password).toBe(newJobUpdated.password);
                                expect(jobObj.notification_email).toBe(newJobUpdated.email);
                                expect(jobObj.comment).toBe(newJobUpdated.comment);
                                done();
                            });

                    });
                });

            it('should display correct data in the Log Shipping Job UI elements after update',
                function () {
                    Portal
                        .logShipping
                        .editPage
                        .form
                        .getJobName()
                        .then(function (val) {
                            expect(val).toBe(jobObj.job_name);
                        });

                    Portal
                        .logShipping
                        .editPage
                        .form
                        .getHost()
                        .then(function (val) {
                            expect(val).toBe(jobObj.destination_host);
                        });

                    Portal
                        .logShipping
                        .editPage
                        .form
                        .getPort()
                        .then(function (val) {
                            expect(val).toBe(jobObj.destination_port);
                        });

                    Portal
                        .logShipping
                        .editPage
                        .form
                        .getUsername()
                        .then(function (val) {
                            expect(val).toBe(jobObj.destination_username);
                        });

                    Portal
                        .logShipping
                        .editPage
                        .form
                        .getPassword()
                        .then(function (val) {
                            expect(val).toBe(jobObj.destination_password);
                        });

                    Portal
                        .logShipping
                        .editPage
                        .form
                        .getEmail()
                        .then(function (val) {
                            expect(val).toBe(jobObj.notification_email);
                        });

                    Portal
                        .logShipping
                        .editPage
                        .form
                        .getComment()
                        .then(function (val) {
                            expect(val).toBe(jobObj.comment);
                        });
                });
        });
    });
});
