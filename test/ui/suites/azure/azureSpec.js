
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
var Portal = require('./../../page_objects/portal');
var Constants = require('./../../page_objects/constants');
var AzurePortal = require('./../../page_objects/azurePortal');

describe('Azure Workflow', function () {
    describe('Account Creation', function () {
        browser.ignoreSynchronization = true;
        var azureUser = config.get('azure.user');
        beforeAll(function (done) {
            AzurePortal.signIn(azureUser).then(function () {
                done();
            });

        });

        it('should display nuu:bit CDN in Azure Marketplace',
            function (done) {
                AzurePortal.clickNewBtn().then(function () {
                    AzurePortal.setSearchMarketplace('nuubit').then(function () {
                        AzurePortal.getNuubitRow().then(function (el) {
                            expect(el.isDisplayed()).toBeTruthy();
                            done();
                        });
                    });
                });
            });

        it('should load resource creation form after ' +
            ' clicking `Create` button on nuu:bit CDN resource',
            function (done) {
                AzurePortal.clickNuubitRow().then(function (el) {
                    expect(el.isDisplayed()).toBeTruthy();
                    done();
                });
            });
    });
});