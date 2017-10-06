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

        var user = config.get('portal.users.revAdmin');
        var lengthString160 = new Array(160).join('x');

        describe('With user: ' + user.role, function () {
            var jobData;
            beforeAll(function () {
                Portal.signIn(user);
                Portal.helpers.nav.goToLogShipping();
                Portal.logShipping.listPage.clickAddNewLogShippingJob();
                jobData = DataProvider.generateLogShippingJobData();
            });

            afterAll(function () {
                Portal.signOut();
            });

            it('should not enable update if `Job Name` is contains special characters',
                function () {
                    Portal.logShipping.addPage.form.setJobName(jobData.name);
                    Portal.logShipping.addPage.form.setAccount(jobData.account);
                    Portal.logShipping.addPage.clickCreateJobBtn();

                    var alert = Portal.alerts.getFirst();
                    expect(alert.getText())
                        .toContain(Constants.alertMessages.logShipping.MSG_SUCCESS_ADD);

                    Portal.logShipping.listPage.searchAndClickEdit(jobData.name);
                    Portal.logShipping.editPage.form.fill(jobData);
                    Portal.logShipping.editPage.form.clearJobName();
                    Portal.logShipping.editPage.form.setJobName('a!b@c#d$e%f^g&');
                    expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    Portal.logShipping.editPage.form.clearJobName();
                    Portal.logShipping.editPage.form.setJobName(jobData.name);
                });
            it('should not enable update if `Job Name` contains more than 150 characters',
                function () {
                    Portal.logShipping.editPage.form.clearJobName();
                    Portal.logShipping.editPage.form.setJobName(lengthString160);
                    expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    Portal.logShipping.editPage.form.clearJobName();
                    Portal.logShipping.editPage.form.setJobName(jobData.name);
                });

            it('should not enable update if `Host` contains more than 150 characters',
                function () {
                    Portal.logShipping.editPage.form.clearHost();
                    Portal.logShipping.editPage.form.setHost(lengthString160);
                    expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    Portal.logShipping.editPage.form.clearHost();
                    Portal.logShipping.editPage.form.setHost(jobData.host);
                });

            it('should not enable update if `Username` contains special characters',
                function () {
                    Portal.logShipping.editPage.form.clearUserName();
                    Portal.logShipping.editPage.form.setUserName('a!b@c$d%e%');
                    expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    Portal.logShipping.editPage.form.clearUserName();
                    Portal.logShipping.editPage.form.setUserName('abcd');
                });

            it('should not enable update if `Username` contains more than 150 characters',
                function () {
                    Portal.logShipping.editPage.form.clearUserName();
                    Portal.logShipping.editPage.form.setUserName(lengthString160);
                    expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    Portal.logShipping.editPage.form.clearUserName();
                    Portal.logShipping.editPage.form.setUserName('abcd');
                });

            it('should not enable update if `Password` contains more than 150 characters',
                function () {
                    Portal.logShipping.editPage.form.clearPassword();
                    Portal.logShipping.editPage.form.setPassword(lengthString160);
                    expect(Portal.logShipping.editPage.isUpdateBtnEnabled()).toBeFalsy();
                    Portal.logShipping.editPage.form.clearPassword();
                    Portal.logShipping.editPage.form.setPassword('123456789');
                });
        });
    });
});
