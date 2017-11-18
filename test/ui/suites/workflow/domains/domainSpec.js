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
        var sslCertData = {
            account: [user.account.companyName]
        };
        var testSslCert = DataProvider.generateSSLCertData(sslCertData);
        var customWAFRule = DataProvider.generateCustomWAFRule(user);

        beforeAll(function (done) {
            Portal.signIn(user);

            // Create a new SSL Cert to use for these tests
            Portal.createSSLCert(testSslCert);

            // Create new WAF Customer Rule to use for these tests 
            Portal.helpers.nav.goToWAFRules();
            Portal.wafRules.listPage.clickAddNewWAFRule();
            Portal.wafRules.addPage.createCustomWAFRule(customWAFRule);

            //Create a new domain to use for these tests
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

        it('should contain all expected default attributes in a ' +
            ' newly created domain JSON object', function (done) {
                Portal.domainsHelpers.getDomainJSON(domainData.name).then(function (domain) {
                    for (var field in domain) {
                        if (domain.hasOwnProperty(field)) {
                            expect(Constants.DOMAIN_JSON_ATTRIBUTES.indexOf(field)).not.toEqual(-1);
                        }
                    }
                    done();
                });
            });

        it('should contain all expected attributes in a domain JSON object ' +
            ' after updating domain', function (done) {
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.fillDemo(domainData.name, customWAFRule, testSslCert);

                Portal.domains.editPage.clickUpdateDomain().then(function () {
                    Portal.dialog.clickOk();
                    Portal.alerts.waitToDisplay().then(function () {
                        Portal
                            .domainsHelpers
                            .getDomainJSON(domainData.name).then(function (domain) {
                                for (var i = 0;
                                    i < Constants.DOMAIN_ENABLE_JSON_ATTRIBUTES.length;
                                    i++) {
                                    var attr = Constants.DOMAIN_ENABLE_JSON_ATTRIBUTES[i];
                                    var inner = domain;
                                    for (var j = 0; j < attr.length; j++) {
                                        inner = inner[attr[j]];
                                    }
                                    expect(inner).toEqual(true);
                                }
                                done();
                            });
                    });
                });
            });

        it('should update all expected attributes in a domain JSON object ' +
            ' after updating domain', function (done) {
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.clearDemo(domainData.name);

                Portal.domains.editPage.clickUpdateDomain().then(function () {
                    Portal.dialog.clickOk();
                    Portal.alerts.waitToDisplay().then(function () {
                        Portal
                            .domainsHelpers
                            .getDomainJSON(domainData.name).then(function (domain) {
                                for (var i = 0;
                                    i < Constants.DOMAIN_ENABLE_JSON_ATTRIBUTES.length;
                                    i++) {
                                    var attr = Constants.DOMAIN_ENABLE_JSON_ATTRIBUTES[i];
                                    var inner = domain;
                                    for (var j = 0; j < attr.length; j++) {
                                        inner = inner[attr[j]];
                                    }
                                    expect(inner).toEqual(false);
                                }
                                done();
                            });
                    });
                });
            });

        it('should update domain version after domain is published', function (done) {
            Portal.domainsHelpers.getDomainJSON(domainData.name).then(function (domain) {
                var domainJSON = domain;
                var ver = domainJSON.last_published_domain_version;
                Portal.domains.listPage.searchAndClickEdit(domainData.name);
                Portal.domains.editPage.clickTabSSLconfiguration();
                Portal.domains.editPage.form.getAcceptSSLrequestsTxtIn().click();
                Portal.domains.editPage.clickPublishDomain();
                Portal.dialog.clickOk().then(function () {
                    Portal.alerts.waitToDisplay().then(function () {
                        Portal
                            .domainsHelpers
                            .getDomainJSON(domainData.name).then(function (domain2) {
                                expect(domain2
                                    .last_published_domain_version).toBeGreaterThan(ver);
                                done();
                            });
                    });
                });
            });
        });
    });
});
