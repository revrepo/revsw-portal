
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
var DataProvider = require('./../../common/providers/data');

describe('Azure Workflow', function () {
    describe('Account Creation', function () {
        browser.ignoreSynchronization = true;
        var azureUser = config.get('azure.user');
        var azureSubId = '';
        var azureSub = {
            resourceName: 'test' + Date.now(),
            resourceGroup: 'nuubit' + Date.now(),
            pricingTier: 'Developer'
        };
        var company = DataProvider.generateAccountProfileData();
        var parentWindow;
        var popUpWindow;
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
                AzurePortal.createNuubitCDNResource().then(function (el) {
                    expect(el.isDisplayed()).toBeTruthy();
                    done();
                });
            });

        it('should successfully create a new nuu:bit CDN resource ' +
            ' after filling the form with valid data',
            function (done) {
                AzurePortal.form.setResourceName(azureSub.resourceName);
                AzurePortal.form.setResourceGroup(azureSub.resourceGroup);
                AzurePortal
                    .form
                    .setPricingTier(azureSub.pricingTier, AzurePortal).then(function () {
                        AzurePortal.form.setLegals(AzurePortal).then(function () {
                            browser.sleep(2000);
                            AzurePortal.form.clickCreate();
                            AzurePortal.waitForDeployment().then(function () {
                                expect(true).toBeTruthy();
                                done();
                            });
                        });
                    });
            });

        it('should successfully redirect to nuu:bit portal ' +
            ' after clicking manage',
            function (done) {
                AzurePortal.clickGoToResource().then(function () {
                    AzurePortal.getSubId().then(function (text) {
                        azureSubId = text;
                    });
                    AzurePortal.clickManage();
                    var winHandles = browser.getAllWindowHandles();
                    winHandles.then(function (handles) {
                        parentWindow = handles[0];
                        popUpWindow = handles[1];
                        browser.switchTo().window(popUpWindow);
                        var until = protractor.ExpectedConditions;
                        browser.wait(until.presenceOf(Portal.dialog.getOkBtn()), 60000);
                        browser.getCurrentUrl().then(function (url) {
                            expect(url).toContain(Constants.PRODUCTION_PORTAL_URL);
                            done();
                        });
                    });
                });
            });

        // Now we work with angular, finally!
        it('should display welcome dialog',
            function (done) {
                expect(Portal.dialog.isDisplayed()).toBeTruthy();
                Portal.dialog.clickOk();
                done();
            });

        it('should contain correct subscription data',
            function (done) {
                Portal.header.getUserInfoEl().getText().then(function (text) {
                    expect(text).toContain(azureSubId);
                    expect(text).toContain(azureSub.resourceName);
                    done();
                });
            });

        it('should contain correct user role (`Admin`)',
            function (done) {
                Portal.header.getUserInfoEl().getText().then(function (text) {
                    expect(text).toContain('admin');
                    done();
                });
            });

        it('should display `Account Profile` form again if data is not filled and saved',
            function (done) {
                Portal.helpers.nav.goToUsers().then(function () {
                    browser.close();
                    browser.switchTo().window(parentWindow).then(function () {
                        AzurePortal.clickManage();
                        var winHandles = browser.getAllWindowHandles();
                        winHandles.then(function (handles) {
                            var parentWindow1 = handles[0];
                            var popUpWindow1 = handles[1];
                            browser.switchTo().window(popUpWindow1);
                            var until = protractor.ExpectedConditions;
                            browser.wait(until.presenceOf(Portal.dialog.getOkBtn()), 60000);
                            Portal.dialog.clickOk();
                            expect(Portal.admin.accounts.editPage.isDisplayed()).toBeTruthy();
                            done();
                        });
                    });
                });
            });

        it('should not display `Please fill the form` dialog ' +
            ' if form was filled and successfully saved',
            function (done) {
                company.companyName = null;
                company.country = null;
                Portal.admin.accounts.formProfile.fill(company);
                Portal.admin.accounts.formBilling.fill(company);
                Portal.admin.accounts.editPage.clickUpdateCompanyProfile();
                Portal.dialog.clickOk();
                Portal.helpers.nav.goToUsers().then(function () {
                    browser.close();
                    browser.switchTo().window(parentWindow).then(function () {
                        AzurePortal.clickManage();
                        var winHandles = browser.getAllWindowHandles();
                        winHandles.then(function (handles) {
                            var parentWindow1 = handles[0];
                            var popUpWindow1 = handles[1];
                            browser.switchTo().window(popUpWindow1);
                            var until = protractor.ExpectedConditions;
                            browser.wait(until.presenceOf(Portal.header.getHeaderBar()), 60000);
                            expect(Portal.dialog.isDisplayed()).toBeFalsy();
                            done();
                        });
                    });
                });
            });
    });
});