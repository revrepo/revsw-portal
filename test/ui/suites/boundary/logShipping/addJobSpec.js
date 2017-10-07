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
    describe('Log Shipping Add Job', function () {

        var users = [
            config.get('portal.users.revAdmin'),
            config.get('portal.users.reseller'),
            config.get('portal.users.admin')
        ];

        users.forEach(function (user) {
            describe('With user: ' + user.role, function () {

                beforeAll(function () {
                    Portal.signIn(user);
                    Portal.helpers.nav.goToLogShipping();

                });

                afterAll(function () {
                    Portal.signOut();
                });

                beforeEach(function () {
                    Portal.logShipping.listPage.clickAddNewLogShippingJob();
                    var acc = {};
                    switch (user.role) {
                        case 'revAdmin':
                            acc.account = ['Rev Test'];
                            break;
                        case 'Reseller':
                            acc.account = ['API QA Reseller Company Updated'];
                            break;
                        case 'Admin':
                            acc.account = null;
                            break;
                    }
                    var jobData = DataProvider.generateLogShippingJobData(acc);
                    Portal.logShipping.addPage.form.fill(jobData);
                });

                afterEach(function () {
                    Portal.logShipping.addPage.clickCancel();
                });

                it('should enable creation if form is filled with valid data',
                    function () {
                        expect(Portal.logShipping.addPage.isSaveBtnEnabled()).toBeTruthy();
                    });

                it('should not enable creation if `Job Name` contains special characters',
                    function () {
                        Portal.logShipping.addPage.form.setJobName('a!b@c#d$e%f^g&');
                        expect(Portal.logShipping.addPage.isSaveBtnEnabled()).toBeFalsy();
                    });

                it('should not enable creation if `Job Name` contains more than 150 characters',
                    function () {
                        var lengthString151 = new Array(160).join('x');
                        Portal.logShipping.addPage.form.setJobName(lengthString151);
                        expect(Portal.logShipping.addPage.isSaveBtnEnabled()).toBeFalsy();
                    });
            });
        });
    });
});
