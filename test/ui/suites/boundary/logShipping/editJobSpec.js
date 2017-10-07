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

describe('Boundary', function () {
    describe('Log Shipping Edit Job', function () {

        var users = [
            config.get('portal.users.revAdmin'),
            config.get('portal.users.reseller'),
            config.get('portal.users.admin')
        ];
        var lengthString160 = new Array(160).join('x');
        users.forEach(function (user) {
            describe('With user: ' + user.role, function () {
                var jobData;
                beforeAll(function () {
                    Portal.signIn(user);
                    Portal.helpers.nav.goToLogShipping();
                    Portal.logShipping.listPage.clickAddNewLogShippingJob();
                    var acc = {};
                    switch (user.role) {
                        case 'revAdmin':
                            acc.account = ['Rev Test'];
                            break;
                        case 'Reseller':
                            acc.account = ['API QA Reseller Company Updated'];
                            break;
                    }
                    jobData = DataProvider.generateLogShippingJobData(acc);
                    Portal.logShipping.addPage.form.setJobName(jobData.name);
                    if (user.role !== 'Admin') {
                        Portal.logShipping.addPage.form.setAccount(jobData.account);
                    } else {
                        jobData.sourceDomain = 'qa-admin-11-portal-ui-test.com';
                    }
                    Portal.logShipping.addPage.clickCreateJobBtn();
                });

                afterAll(function () {
                    Portal.signOut();
                });

                beforeEach(function () {
                    Portal.logShipping.listPage.searchAndClickEdit(jobData.name);
                    Portal
                        .logShipping
                        .editPage
                        .form
                        .fill(jobData);
                });

                afterEach(function () {
                    Portal.logShipping.editPage.clickBackToList();
                });

                it('should enable update if form is filled with valid data',
                    function () {
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeTruthy();
                    });

                it('should not enable update if `Job Name` is contains special characters',
                    function () {
                        Portal.logShipping.editPage.form.setJobName('a!b@c#d$e%f^g&');
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    });
                it('should not enable update if `Job Name` contains more than 150 characters',
                    function () {
                        Portal.logShipping.editPage.form.setJobName(lengthString160);
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    });

                it('should not enable update if `Host` contains more than 150 characters',
                    function () {
                        Portal.logShipping.editPage.form.setHost(lengthString160);
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    });

                it('should not enable update if `Username` contains special characters',
                    function () {
                        Portal.logShipping.editPage.form.setUserName('a!b@c$d%e%');
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    });

                it('should not enable update if `Username` contains more than 150 characters',
                    function () {
                        Portal.logShipping.editPage.form.setUserName(lengthString160);
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    });

                it('should not enable update if `Password` contains more than 150 characters',
                    function () {
                        Portal.logShipping.editPage.form.setPassword(lengthString160);
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    });
            });
        });
    });
});
