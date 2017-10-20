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
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

describe('Workflow', function () {
    describe('Add Domain', function () {
        /*jshint camelcase: false */
        var user = config.get('portal.users.admin');
        var domainData = DataProvider.generateDomain('test-domain');

        beforeAll(function (done) {
            Portal.signIn(user);

            Portal.createDomain(domainData).then(function () {
                done();
            });
        });

        afterAll(function () {
            Portal.signOut();
        });

        beforeEach(function () {
            Portal.helpers.nav.goToDomains();
        });

        it('should create a valid domain JSON object', function (done) {
            Portal.domainsHelpers.getDomainJSON(domainData.name, function (domain) {
                var domainJSON = domain;
                expect(domainJSON.domain_name).toBe(domainData.name);
                done();
            });
        });

        it('should update JSON when image optimization is enabled', function (done) {
            Portal.domainsHelpers.getDomainJSON(domainData.name, function (domain) {
                var domainJSON = domain;
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.clickTabImageEngine();
                Portal.domains.editPage.form.clickImageEngine();
                Portal.dialog.clickOk();
                Portal.domains.editPage.clickPublishDomain();
                Portal.dialog.clickOk();
                browser.sleep(60000).then(function () { // wait for publish to finish
                    Portal
                        .domainsHelpers
                        .getDomainJSON(domainData.name, function (domain2) {
                            var domainJSON2 = domain2;
                            expect(domainJSON2
                                .image_engine
                                .enable_image_engine).toBeTruthy();
                            done();
                        });
                });
            });
        });

        it('should update JSON when image optimization is disabled', function (done) {
            Portal.domainsHelpers.getDomainJSON(domainData.name, function (domain) {
                var domainJSON = domain;
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.clickTabImageEngine();
                Portal.domains.editPage.form.clickImageEngine();
                Portal.dialog.clickOk();
                Portal.domains.editPage.clickPublishDomain();
                Portal.dialog.clickOk();
                browser.sleep(60000).then(function () { // wait for publish to finish
                    Portal
                        .domainsHelpers
                        .getDomainJSON(domainData.name, function (domain2) {
                            var domainJSON2 = domain2;
                            expect(domainJSON2
                                .image_engine
                                .enable_image_engine).toBeFalsy();
                            done();
                        });
                });
            });
        });

        it('should update JSON when waf protection is enabled', function (done) {
            Portal.domainsHelpers.getDomainJSON(domainData.name, function (domain) {
                var domainJSON = domain;
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.clickTabWAF();
                Portal.domains.editPage.form.clickWAFSwitch();
                Portal.domains.editPage.clickExpandWafRulesBtn();
                Portal.domains.editPage.wafRulesTable.getFirstRow().clickUseThisRule();
                Portal.domains.editPage.clickPublishDomain();
                Portal.dialog.clickOk();
                browser.sleep(120000).then(function () { // wait for publish to finish
                    Portal
                        .domainsHelpers
                        .getDomainWafRules(domainData.name, function (wafRules) {
                            expect(wafRules.length).toBeGreaterThan(0);
                            done();
                        });
                });
            });
        });

        it('should update JSON when waf protection is disabled', function (done) {
            Portal.domainsHelpers.getDomainJSON(domainData.name, function (domain) {
                var domainJSON = domain;
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.clickTabWAF();
                Portal.domains.editPage.clickExpandWafRulesBtn();
                Portal.domains.editPage.wafRulesTable.getFirstRow().clickUseThisRule();
                Portal.domains.editPage.clickPublishDomain();
                Portal.dialog.clickOk();
                browser.sleep(120000).then(function () { // wait for publish to finish
                    Portal
                        .domainsHelpers
                        .getDomainWafRules(domainData.name, function (wafRules) {
                            expect(wafRules.length).toEqual(0);
                            done();
                        });
                });
            });
        });
    });
});
