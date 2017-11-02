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
    describe('Log Shipping Edit Job', function () {

        var users = [
            config.get('portal.users.revAdmin'),
            config.get('portal.users.admin'),
            config.get('portal.users.reseller')
        ];

        users.forEach(function (user) {


            describe('With user: ' + user.role, function () {

                beforeAll(function () {
                    var jobData;
                    Portal.signIn(user);
                    Portal.helpers.nav.goToLogShipping();
                    jobData = DataProvider.generateLogShippingJobData({}, user.role);
                    Portal.logShipping.listPage.clickAddNewLogShippingJob();
                    Portal.logShipping.addPage.form.setJobName(jobData.name);
                    if (user.role !== 'Admin') {
                        Portal.logShipping.addPage.form.setAccount(jobData.account);
                    }
                    Portal.logShipping.addPage.clickCreateJobBtn();
                    Portal.logShipping.listPage.searchAndClickEdit(jobData.name);
                    jobData.name = jobData.name + '-UPDATED';
                    Portal
                        .logShipping
                        .editPage
                        .updateLogShippingJob(jobData, user.role === 'Admin' ? true : false);
                    Portal.logShipping.editPage.clickBackToList();
                    Portal.logShipping.listPage.searchAndGetFirstRow(jobData.name);
                });

                afterAll(function () {
                    Portal.signOut();
                });

                it('should successfully activate job after creation',
                    function () {
                        Portal.logShipping.listPage.table.getFirstRow().clickPlay();
                        Portal.logShipping.listPage.clickModalConfirmBtn();
                        var alert = Portal.alerts.getFirst();
                        expect(alert.getText())
                            .toContain(Constants.alertMessages.logShipping.MSG_SUCCESS_PLAY);
                    });

                it('should successfully pause job after activation', function () {
                    Portal.logShipping.listPage.table.getFirstRow().clickPause();
                    Portal.logShipping.listPage.clickModalConfirmBtn();
                    var alert = Portal.alerts.getFirst();
                    expect(alert.getText())
                        .toContain(Constants.alertMessages.logShipping.MSG_SUCCESS_PAUSE);
                });

                it('should successfully stop job after activation', function () {
                    Portal.logShipping.listPage.table.getFirstRow().clickStop();
                    Portal.logShipping.listPage.clickModalConfirmBtn();
                    var alert = Portal.alerts.getFirst();
                    expect(alert.getText())
                        .toContain(Constants.alertMessages.logShipping.MSG_SUCCESS_STOP);
                });
            });
        });
    });
});
