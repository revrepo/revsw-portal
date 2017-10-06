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

            it('should not enable creation if `Job Name` is empty',
                function () {
                    Portal.logShipping.addPage.form.clearJobName();
                    expect(Portal.logShipping.addPage.isSaveBtnEnabled()).toBeFalsy();
                });

            it('should not enable creation if `Account` is empty',
                function () {
                    Portal.logShipping.addPage.form.setJobName('a');
                    Portal.logShipping.addPage.form.setAccount('');
                    expect(Portal.logShipping.addPage.isSaveBtnEnabled()).toBeFalsy();
                });
        });
    });
});
