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
var Constants = require('./../../../page_objects/constants');

describe('Smoke', function () {

    // Defining set of users for which all below tests will be run
    var users = [
        config.get('portal.users.revAdmin'),
        config.get('portal.users.reseller'),
        config.get('portal.users.admin')
    ];

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {

            describe('Edit Log Shipping Job', function () {

                beforeAll(function () {

                });

                afterAll(function () {

                });

                beforeEach(function () {
                    Portal.signIn(user);
                    Portal.helpers.nav.goToLogShipping();
                });

                afterEach(function () {
                    Portal.signOut();
                });

                it('should display edit Log Shipping button',
                    function () {
                        var data;
                        if (user.role === 'Reseller'){
                            data = {
                                account: ['API QA Reseller Company']
                            };
                        }

                        var job = DataProvider.generateLogShippingJobData(data);
                        Portal.createLogShippingJob(job);

                        var editButton = Portal.logShipping.listPage.table
                            .getFirstRow()
                            .getEditBtn();
                        expect(editButton.isPresent()).toBeTruthy();

                        Portal.deleteLogShippingJob(job);
                    });

                it('should display "Edit Log Shipping" form',
                    function () {
                        var data;
                        if (user.role === 'Reseller'){
                            data = {
                                account: ['API QA Reseller Company']
                            };
                        }

                        var job = DataProvider.generateLogShippingJobData(data);
                        Portal.createLogShippingJob(job);

                        Portal.logShipping.listPage.table
                            .getFirstRow()
                            .clickEdit();
                        expect(Portal.logShipping.editPage.isDisplayed()).toBeTruthy();

                        Portal.deleteLogShippingJob(job);
                    });

                it('should allow to cancel an Log Shipping Job edition',
                    function () {
                        var data;
                        if (user.role === 'Reseller'){
                            data = {
                                account: ['API QA Reseller Company']
                            };
                        }

                        var job = DataProvider.generateLogShippingJobData(data);
                        Portal.createLogShippingJob(job);

                        Portal.logShipping.listPage.table
                            .getFirstRow()
                            .clickEdit();
                        Portal.logShipping.editPage.form.setJobName('Something Else');
                        Portal.logShipping.editPage.clickCancel();
                        expect(Portal.logShipping.listPage.isDisplayed()).toBeTruthy();

                        Portal.deleteLogShippingJob(job);
                    });

                it('should update Log Shipping when filling all required data',
                    function () {
                        var data;
                        if (user.role === 'Reseller'){
                            data = {
                                account: ['API QA Reseller Company']
                            };
                        }else if(user.role === 'Admin'){
                            data = {
                                sourceDomain: 'qa-admin-10-portal-ui-test.com'
                            };
                        }

                        var job = DataProvider.generateLogShippingJobData(data);
                        var updatedJob = DataProvider.generateLogShippingJobData(data);

                        Portal.createLogShippingJob(job);

                        Portal.logShipping.listPage.searcher.clearSearchCriteria();
                        Portal.logShipping.listPage.searcher.setSearchCriteria(job.name);
                        Portal.logShipping.listPage.table
                            .getFirstRow()
                            .clickEdit();

                        Portal.logShipping.editPage.updateLogShippingJob(updatedJob);

                        Portal.dialog.clickOk();
                        Portal.logShipping.editPage.clickBackToList();

                        Portal.logShipping.listPage.searcher.clearSearchCriteria();
                        Portal.logShipping.listPage.searcher.setSearchCriteria(updatedJob.name);
                        var updatedJobName = Portal.logShipping.listPage.table
                            .getFirstRow()
                            .getJobName();

                        expect(updatedJobName).toBe(updatedJob.name);

                        Portal.deleteLogShippingJob(job);
                    });
            });
        });
    });
});
