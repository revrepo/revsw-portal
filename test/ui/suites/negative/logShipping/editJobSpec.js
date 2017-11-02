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

describe('Negative', function () {
    describe('Log Shipping Edit Job', function () {

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
                    Portal.logShipping.listPage.clickAddNewLogShippingJob();
                    jobData = DataProvider.generateLogShippingJobData({}, user.role);
                    Portal.logShipping.addPage.form.setJobName(jobData.name);
                    if (user.role !== 'Admin') {
                        Portal.logShipping.addPage.form.setAccount(jobData.account);
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
                        .fill(jobData, user.role === 'Admin' ? true : undefined);
                });

                afterEach(function () {
                    Portal.logShipping.editPage.clickBackToList();
                });

                it('should enable update if all fields have valid data',
                    function () {
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeTruthy();
                    });

                it('should not enable update if `Job Name` is empty',
                    function () {
                        Portal.logShipping.editPage.form.clearJobName();
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    });
                it('should not enable update if `Host` is empty',
                    function () {
                        Portal.logShipping.editPage.form.clearHost();
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    });

                it('should not enable update if `Username` is empty',
                    function () {
                        Portal.logShipping.editPage.form.clearUserName();
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    });

                it('should not enable update if `Password` is empty',
                    function () {
                        Portal.logShipping.editPage.form.clearPassword();
                        expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    });
            });
        });
    });
});
